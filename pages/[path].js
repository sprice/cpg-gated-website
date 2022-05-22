import { Fragment, useState, useEffect } from "react";
import { useRouter } from "next/router";
import ReactHtmlParser from "react-html-parser";
const { NotionBlocksHtmlParser } = require("@notion-stuff/blocks-html-parser");
const parser = NotionBlocksHtmlParser.getInstance();
import Head from "next/head";
import NavBar from "../components/NavBar";

export default function Page() {
  const router = useRouter();
  const [path, setPath] = useState();
  const [response, setResponse] = useState();
  const [blockId, setBlockId] = useState();
  const [markup, setMarkup] = useState();

  useEffect(() => {
    if (blockId) return;
    setBlockId("aae345d6a11c4cce9e39e8cde5036335");
  }, []);

  useEffect(() => {
    setPath(router?.query?.path);
  }, [router?.query?.path]);

  useEffect(() => {
    async function getResponse() {
      if (!path || response || !blockId) return;
      console.log("blockId", blockId);
      fetch(`/api/block/${blockId}`)
        .then((response) => response.json())
        .then((data) => {
          console.log("data", data);
          const { response } = data;
          setResponse(response);
        });
    }
    getResponse();
  }, [path, response, blockId]);

  useEffect(() => {
    if (!response || markup || !blockId) return;
    setMarkup(parser.parse(response.results));
  }, [response, markup, blockId]);

  return (
    <Fragment>
      <Head>
        <title>Pop 🎈</title>
      </Head>
      <NavBar />
      {ReactHtmlParser(markup)}
    </Fragment>
  );
}
