import Head from 'next/head';
import { MantineProvider } from '@mantine/core';
import '../styles/global.css'


export default function App( props ) {
  const { Component, pageProps } = props;

  return (
    <>
      <Head>
        <title>Епинетов Всеволод | Диспетчер, фронтенд разработчик</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <meta name="description" content="Персональная страница Епинетова Всеволода. Портфолио, резюме, контакты." />
        <meta name="og:description" content="Персональная страничка Епинетова Всеволода. Портфолио, резюме, контакты." />
        <meta property="og:title" content="Епинетов Всеволод | Диспетчер, фронтенд разработчик" key="meta-title-og" />
        <meta property="title" content="Епинетов Всеволод | Диспетчер, фронтенд разработчик" key="meta-title" />
        <meta property="og:image" content="../img/meta-image.png" key="meta-image-og" />
        <link rel="shortcut icon" href="../img/favicon.png" />
      </Head>

      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          colorScheme: 'dark'
        }}
      >
        <Component {...pageProps} />
      </MantineProvider>
    </>
  );
}