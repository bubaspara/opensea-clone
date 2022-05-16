import { useWeb3 } from "@3rdweb/hooks";
import { useEffect } from "react";
import { client } from "../lib/sanityClient";
import toast, { Toaster } from "react-hot-toast";

import Head from "next/head";
import Header from "../components/Header";
import Hero from "../components/Hero";

const style = {
  wrapper: ``,
  walletConnectWrapper: `flex flex-col justify-center items-center h-screen w-screen bg-[#3b3d42] `,
  button: `border border-[#282b2f] bg-[#2081e2] p-[0.8rem] text-xl font-semibold rounded-lg cursor-pointer text-black`,
  details: `text-lg text-center text=[#282b2f] font-semibold mt-4`,
};

export default function Home({ connectors }) {
  const { address, connectWallet } = useWeb3();

  const welcomeUser = (userName, toastHandler = toast) => {
    toastHandler.success(
      `Welcome back ${userName !== "Unnamed" ? `${userName}` : ``}!`,
      {
        style: {
          background: "#04111d",
          color: "#fff",
        },
      }
    );
  };

  useEffect(() => {
    if (!address) return;

    // IIFE -> Immediately Invoked Function Expression
    (async () => {
      const userDoc = {
        _type: "users",
        _id: address,
        userName: "Unnamed",
        walletAddress: address,
      };

      const result = await client.createIfNotExists(userDoc);
      welcomeUser(result.userName);
    })();
  }, [address]);

  return (
    <>
      <Head>
        <title>Opensea</title>
        <link rel="icon" href="./images/opensea.png" />
      </Head>
      <div className={style.wrapper}>
        <Toaster position="top-center" />
        {address ? (
          <>
            <Header /> <Hero />
          </>
        ) : (
          // Add network check
          <div className={style.walletConnectWrapper}>
            <button
              className={style.button}
              onClick={() => connectWallet("injected")}
            >
              Connect Wallet
            </button>
            <div className={style.details}>
              You need Chrome to be
              <br /> able to run this app.
            </div>
          </div>
        )}
      </div>
    </>
  );
}
