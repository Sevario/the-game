import { type NextPage } from "next";
import Head from "next/head";
import Main from '../pages/components/Main/Main.jsx';


const Home: NextPage = () => {
  return (
    <>
     <Head>
        <meta name="description" content="The game" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Main />
    </>
  );
};

export default Home;
