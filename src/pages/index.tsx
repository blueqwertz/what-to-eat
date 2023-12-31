import Head from "next/head";
import Body from "~/components/body";
import Header from "~/components/header";
import toast, { Toaster } from "react-hot-toast";

export default function Home() {
  return (
    <>
      <Head>
        <title>🍝 What-To-Eat</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Toaster />
      <main className="container flex min-h-screen min-w-[300px] flex-col items-center justify-start bg-white px-4 sm:px-8">
        {/* bg-gradient-to-b from-[#2e026d] to-[#15162c] */}
        <Header />
        <Body />
      </main>
    </>
  );
}
