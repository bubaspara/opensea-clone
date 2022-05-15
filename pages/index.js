import Head from "next/head";
import Header from "../components/Header";
import Hero from "../components/Hero";

export default function Home() {
  return (
    <>
      <Head>
        <title>Opensea</title>
        <link rel="icon" href="./images/opensea.png" />
      </Head>
      <Header />
      <Hero />
    </>
  );
}
