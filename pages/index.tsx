// pages/index.tsx

import { Layout } from '../src/Layout';
import Head from 'next/head';
import TopSection from '../src/components/TopSection';
import FeatureSection from '../src/components/FeatureSection';
import { Box, Card, CardContent, Typography, Stack } from '@mui/material';

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>BV3</title>
      </Head>

      {/* Top Section */}
      <TopSection />

      {/* Middle Section */}
      <Box sx={{ position: 'relative', mt: 8 }}>
        <Card variant="outlined">
          <CardContent
            sx={{ display: 'flex', justifyContent: 'center', p: '38px 42px!important' }}
          >
            <Box
              component="img"
              src="/Ethereum_logo_2014.svg"
              alt="ethereum logo"
              sx={{
                position: 'absolute',
                top: 0,
                right: 0,
                height: 90,
                animation: 'floatUpDown 4s ease-in-out infinite',
              }}
            />

            <Typography fontWeight="600" variant="h3" sx={{ maxWidth: 960 }} align="center">
              Wallet-to-Wallet Transfers Without Needing ETH
            </Typography>
          </CardContent>
        </Card>
      </Box>

      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          mt: 16,
          mb: 8,
        }}
      >
        <Stack sx={{ maxWidth: 400 }} justifyContent="center">
          <Typography gutterBottom align="center" variant="h3" fontWeight="700">
            Why We're
            <br />
            Truly{' '}
            <Typography fontWeight="600" variant="h3" component="span" color="#4f5b9a">
              Different.
            </Typography>
          </Typography>
        </Stack>
        <Typography align="center" color="text.secondary">
          Say goodbye to slow, cumbersome, regulation-heavy privacy products.
          <br />
          Buccaneer V3 empowers you with unstoppable, fast, and streamlined privacy—true on-chain
          freedom.
        </Typography>
      </Box>

      {/* Feature Sections */}
      <FeatureSection
        title="Resilient by Design"
        description="BUCC is built directly on Ethereum's core, making it truly unstoppable. Unlike others, we fully embody an absolutist vision of 100% on-chain integrity—powered by smart contracts and boasting unmatched uptime. Even our DApps are hosted on IPFS for absolute resilience. Plus, complementary on-chain tools like Proxy-BUCC offer solutions to circumvent blacklisting, ensuring BUCC’s continuous functionality."
        videoSrc="/1.mp4"
      />

      <FeatureSection
        title="No ETH? No problem."
        description="Stay completely untethered with ETHless BUCC transactions. Leveraging a re-engineered GSN utility, BUCC enables gas-free transfers from address to address—no need to hold ETH. No other ERC20 token can match this level of convenience."
        videoSrc="/2.mp4"
        reverse
      />

      <FeatureSection
        title="The Funding Problem? Consider It Solved."
        description="Tortuga is your seamless, one-button solution to obtain enough ETH for a DEX trade. Simply swap BUCC for ETH without needing any upfront ETH to cover transaction fees—thanks to the GSN. Forget about funding new wallets with traceable ETH sources; Tortuga has you covered."
        videoSrc="/3.mp4"
      />
    </Layout>
  );
}
