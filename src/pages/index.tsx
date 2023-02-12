import { type NextPage } from "next";
import Head from "next/head";
import Main from '../pages/components/Main/Main.jsx';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';

const queryClient = new QueryClient();

const Home: NextPage = () => {
  return (

    <QueryClientProvider client={queryClient}>
     <Head>
        <meta name="description" content="The game" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Main />
    </QueryClientProvider>
  );
};

export default Home;
