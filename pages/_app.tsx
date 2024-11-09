// pages/_app.tsx

import '@fontsource/montserrat/400.css';
import '@fontsource/montserrat/600.css';
import '@fontsource/montserrat/700.css';
import './global.css';
import theme from '../src/theme';

import { isMobile } from 'react-device-detect';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { CacheProvider, EmotionCache } from '@emotion/react';

import createEmotionCache from '../src/createEmotionCache';
import { TopAppBar } from '../src/AppBar';
import { Footer } from '../src/Footer';
import { PropsWithChildren, useEffect, useState } from 'react';
import SplashLoader from '../src/SplashLoader';

import dynamic from 'next/dynamic';
import { ethers } from 'ethers';

import { TokenProvider } from '../src/context/TokenContext';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

// Define getLibrary function
const getLibrary = (provider: any) => {
  return new ethers.providers.Web3Provider(provider);
};

// Create a dynamic component to prevent SSR issues
const Web3ProviderNetwork = dynamic(
  () =>
    import('@web3-react/core').then(({ Web3ReactProvider }) => ({ children }: { children: React.ReactNode }) => (
      <Web3ReactProvider getLibrary={getLibrary}>{children}</Web3ReactProvider>
    )),
  { ssr: false }
);

const MyAppInner = ({ children }: PropsWithChildren) => {
  return (
    <Box
      sx={{
        minHeight: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        background: '#040413',
        backgroundImage: 'url(/background.svg)',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        width: '100%',
      }}
    >
      <Web3ProviderNetwork>
        <Container maxWidth="lg" sx={{ overflowX: 'hidden' }}>
          {children}
        </Container>
      </Web3ProviderNetwork>
      <Footer />
    </Box>
  );
};

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const [videoVisible, setVideoVisible] = useState(true);
  const [mobile, setMobile] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    document.querySelectorAll('input[type="number"]').forEach((input) => {
      input.addEventListener('wheel', (e) => {
        e.preventDefault();
      });
    });
  }, []);

  useEffect(() => {
    setMobile(isMobile || router.pathname.includes('terms-of-use'));
  }, [router.pathname]);

  useEffect(() => {
    if (mobile) {
      document.body.style.overflow = 'auto';

      // Cleanup on component unmount
      return () => {
        document.body.style.overflow = 'auto';
      };
    }
  }, [mobile]);

  if (!mounted) {
    // Prevent SSR flash
    return null;
  }

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <meta name="description" content="Ethereum's first private currency. Now live." />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <TokenProvider>
          {mobile || router.pathname.includes('terms-of-use') ? (
            <MyAppInner>
              <TopAppBar />
              <Component {...pageProps} />
            </MyAppInner>
          ) : (
            <>
              <SplashLoader videoVisible={videoVisible} setVideoVisible={setVideoVisible} />

              <Box
                sx={{
                  opacity: videoVisible ? 0 : 1,
                }}
              >
                <MyAppInner>
                  {!videoVisible && <TopAppBar />}
                  <Component {...pageProps} />
                </MyAppInner>
              </Box>
            </>
          )}
        </TokenProvider>
      </ThemeProvider>
    </CacheProvider>
  );
}
