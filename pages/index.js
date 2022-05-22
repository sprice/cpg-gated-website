import { Fragment } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import NavBar from "../components/NavBar";

export default function Page() {
  const router = useRouter();
  const { route } = router;
  console.log("route", route);
  return (
    <Fragment>
      <Head>
        <title>Pop 🎈</title>
      </Head>
      <NavBar />
    </Fragment>
  );
}
