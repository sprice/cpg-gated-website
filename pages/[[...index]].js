import { Fragment, useState, useEffect } from "react";
import { useRouter } from "next/router";
import ErrorPage from "next/error";
import ReactHtmlParser from "react-html-parser";
const { NotionBlocksHtmlParser } = require("@notion-stuff/blocks-html-parser");
const parser = NotionBlocksHtmlParser.getInstance();
import Head from "next/head";
import NavBar from "../components/NavBar";
import { getPage } from "../config";

export default function Page() {
  const router = useRouter();
  const [path, setPath] = useState();
  const [response, setResponse] = useState();
  const [blockId, setBlockId] = useState();
  const [markup, setMarkup] = useState();
  const [notFound, setNotFound] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [ownsToken, setOwnsToken] = useState(false);
  const [isTokenGated, setIsTokenGated] = useState(false);

  useEffect(() => {
    if (!path) return;
    const page = getPage(path);
    if (!page?.blockId) {
      setNotFound(true);
    } else {
      setBlockId(page.blockId);
      setIsTokenGated(page.private);
    }
  }, [path]);

  useEffect(() => {
    if (router?.asPath === "/[[...index]]") return; // @TODO: This doesn't feel very Nexty
    if (path && path !== router?.asPath) {
      setRefresh(true);
    }
    setPath(router?.asPath);
  }, [router?.asPath, path]);

  useEffect(() => {
    if (isTokenGated && !ownsToken) return;
    async function getResponse() {
      if (!blockId) return;
      fetch(`/api/block/${blockId}`)
        .then((response) => response.json())
        .then((data) => {
          const { response } = data;
          setResponse(response);
        });
    }
    getResponse();
  }, [path, blockId, setRefresh, ownsToken, isTokenGated]);

  useEffect(() => {
    if (!response?.results) return;
    setMarkup(parser.parse(response?.results));
    setResponse(undefined); // @TODO: Find a way to not do this
    setBlockId(undefined); // @TODO: Find a way to not do this
    setRefresh(false);
  }, [response, blockId]);

  if (notFound) {
    return <ErrorPage statusCode="404" />;
  }

  return (
    <Fragment>
      <Head>
        <title>Pop 🎈</title>
      </Head>
      <NavBar ownsToken={ownsToken} setOwnsToken={setOwnsToken} />
      {ReactHtmlParser(markup)}
    </Fragment>
  );
}
