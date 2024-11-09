// components/TopSection.tsx

import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid } from '@mui/material';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { isMacOs } from 'react-device-detect';
import StepCard from './StepCard';

/*
const videoFiles = [
  '/Videos/pirate1.mp4',
  '/Videos/pirate2.mp4',
  '/Videos/pirate3.mp4',
  '/Videos/pirate4.mp4',
];
*/

const TopSection = () => {
  const [macOs, setMacOs] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);

  // Store the selected video file in state to prevent it from changing on re-renders
  /*
  const [videoFile] = useState(() => {
    const index = Math.floor(Math.random() * videoFiles.length);
    return videoFiles[index];
  });
*/

  useEffect(() => {
    setMacOs(isMacOs);
  }, []);

  return (
    <Box
      sx={{
        position: 'relative',
        overflow: 'hidden',
        borderRadius: 4,
        mb: 8,
      }}
    >
      {/* Video Background */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 1,
        }}
      >
        {/*
        <video
          src={videoFile}
          autoPlay
          muted
          loop
          onLoadedData={() => setVideoLoaded(true)}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
        */}
        {/* Overcast Layer */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: '#1C234E',
            opacity: 0.7,
          }}
        />
      </Box>

      {/* Content Overlaid on Video */}
      <Box
        sx={{
          position: 'relative',
          zIndex: 2,
          padding: { xs: 4, md: 8 },
          minHeight: '75vh',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Grid container spacing={4} alignItems="center">
          {/* Left Column: Introductory Text */}
          <Grid item xs={12} md={6}>
            <Typography
              gutterBottom
              variant="h2"
              fontWeight="600"
              sx={{ position: 'relative' }}
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
              Introducing Ethereum's First Private Currency.
              <br />
              Now Available.
            </Typography>
            <Typography color="text.secondary">
              Experience complete on-chain privacy. Buccaneer V3 is an innovative protocol built
              entirely on smart contracts, featuring custom encryption and methods crafted
              specifically for Ethereum. This is the first and only solution of its kind, allowing
              truly private transactions in mere seconds—no pools, no mixing, no waiting. No fixed
              amounts or limits. Just freedom.
            </Typography>

          <Stack
              direction="row"
              alignItems="center"
              sx={{ mt: 5 }}
              gap={2}
            >
              <Button
              size="large"
              href="/Manual.pdf"
              className="user-guide-button"
            >
              User Guide
            </Button>

            </Stack>

          </Grid>

          {/* Right Column: Steps Section */}
          <Grid item xs={12} md={6}>
            <Grid container spacing={2.5}>
              <Grid item xs={12} sm={6}>
                <StepCard
                  imageSrc="/uniswap.svg"
                  imageAlt="uniswap"
                  stepTitle="Step 1: Buy"
                  description="Purchase BUCC tokens directly from any DEX (Uniswap for now) of your choice."
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <StepCard
                  imageSrc="/metamask.svg"
                  imageAlt="metamask"
                  stepTitle="Step 2: Send"
                  description="Navigate to the Bermuda DApp on IPFS (Buccaneerv3.com for now) to initiate your transaction."
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <StepCard
                  imageSrc="/3.svg"
                  imageAlt="buccaneer"
                  stepTitle="Step 3: Break Trace"
                  description="Send BUCC to any Ethereum address, including brand-new wallets, for enhanced privacy."
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <StepCard
                  imageSrc="/4.png"
                  imageAlt="pirate flag"
                  stepTitle="Step 4: Resurface"
                  description="Visit Tortuga to seamlessly swap BUCC for ETH—no need to hold ETH in your wallet."
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default TopSection;
