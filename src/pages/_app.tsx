import { AppProps } from 'next/app';
import Head from 'next/head';

import { ChakraProvider } from '@chakra-ui/react';
import theme from '../styles/theme';
import Provider from '../context/cart';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <Head>
        <title>Loja de Ferragens | PJ Ferragens</title>

        <meta
          name="description"
          content="Na PJ ferragens você encontra itens como: Fechadura, Maçaneta, Trinco, Dobradiça, Parafuso, Puxadores e todas as demais ferragens para sua casa."
        />

        <link rel="icon" href="/icon.jpg" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Provider>
        <Component {...pageProps} />
      </Provider>
    </ChakraProvider>
  );
}

export default MyApp;
