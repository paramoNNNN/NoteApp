import type { AppProps } from 'next/app';
import Head from 'next/head';
import UserContextWrapper, { UserContext } from '../contexts/User';
import { MainLayout } from '../layout/Main';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Note App</title>
      </Head>
      <UserContextWrapper>
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      </UserContextWrapper>
    </>
  );
}

export default MyApp;
