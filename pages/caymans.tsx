import React, { useState } from 'react';
import {
  Typography,
  Card,
  CardActionArea,
  Container,
  CardContent,
  Collapse,
  Stack,
  Tabs,
  Tab,
  Box,
} from '@mui/material';
import { FaChevronDown } from 'react-icons/fa';
import { Layout } from '../src/Layout';
import Head from 'next/head';
import { useWeb3React } from '@web3-react/core';

// Import your new components
import { LatestTokens } from '../src/exchange/LatestTokens';
import { CreateToken } from '../src/exchange/CreateToken';
import { Portfolio } from '../src/exchange/Portfolio';
import { ChartingTools } from '../src/exchange/ChartingTools';

export const messages = {
  default: {
    title: 'Caymans Exchange',
    description:
      'Welcome to Caymans, where you can launch private meme tokens and batch deploy them to reduce gas costs.',
  },
  createToken: {
    title: 'Create Your Private Meme Token',
    description:
      "Create your own private meme token with a unique identifier of up to six characters. Customize the token supply and the amount of BV3 tokens paired in the liquidity pool. By default, your BV3 tokens will be locked for one month, and you’ll receive a 0.25% fee on all buys and sells. An additional 0.25% will go to the pool to build up liquidity. As the pool owner, you’ll also receive 2% of the token supply immediately upon creation, available for immediate use.",
  },
};

export default function Caymans() {
  const [tabIndex, setTabIndex] = useState(0); // For managing active tab

  const { library, account, active } = useWeb3React();

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  // Determine the message based on the selected tab
  const message =
    tabIndex === 1 ? messages.createToken : messages.default;

  return (
    <Layout>
      <Head>
        <title>Caymans | Buccaneer</title>
      </Head>
      <Container disableGutters maxWidth={false} sx={{ mt: 6 }}>
        <Card variant="outlined" sx={{ borderRadius: 4 }}>
          <CardActionArea>
            <CardContent sx={{ p: '22px 32px !important' }}>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                gap={2}
              >
                <Stack direction="row" alignItems="center" gap={2}>
                  <Typography variant="h5" fontWeight="600">
                    {message.title}
                  </Typography>
                </Stack>
              </Stack>
              <Collapse in={true}>
                <Typography sx={{ mt: 1 }}>{message.description}</Typography>
              </Collapse>
            </CardContent>
          </CardActionArea>
        </Card>

        {/* Tabs for Menus */}
        <Box sx={{ mt: 3 }}>
                    <Tabs
                    value={tabIndex}
                    onChange={handleTabChange}
                    variant="fullWidth"
                    textColor="primary"
                    indicatorColor="primary"
                    sx={{
                      '& .MuiTab-root': {
                        color: 'rgba(255, 255, 255, 0.7)',
                      },
                      '& .Mui-selected': {
                        color: '#fff !important',
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      },
                      '& .MuiTabs-indicator': {
                        backgroundColor: '#f39718',
                      },
                    }}
                    >
                    <Tab label="Latest" />
                    <Tab label="Create Token" />
                    <Tab label="Portfolio" />
                    <Tab label="Charting Tools" />
                    </Tabs>
        </Box>

        {/* Tab Panels */}
        <Box sx={{ mt: 2 }}>
            {tabIndex === 0 && <LatestTokens />}
            {tabIndex === 1 && <CreateToken />}
            {tabIndex === 2 && <Portfolio />}
            {tabIndex === 3 && <ChartingTools />}
        </Box>



      </Container>
    </Layout>
  );
}
