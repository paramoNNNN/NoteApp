import type { AppProps } from 'next/app';
import Head from 'next/head';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import UserContextWrapper from '../contexts/User';
import { MainLayout } from '../layout/Main';
import '../styles/globals.css';
import 'react-loading-skeleton/dist/skeleton.css';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Note App</title>
      </Head>
      <QueryClientProvider client={queryClient}>
        <UserContextWrapper>
          <MainLayout>
            <Component {...pageProps} />
          </MainLayout>
        </UserContextWrapper>
      </QueryClientProvider>
    </>
  );
}

export default MyApp;
