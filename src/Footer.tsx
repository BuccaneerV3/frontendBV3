// Footer.tsx

import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { Logo } from './Logo';
import Link from './Link';

export const Footer = () => (
  <Box sx={{ background: 'linear-gradient(transparent, #0D0E22 30%)', mt: 'auto', py: 8 }}>
    <Container maxWidth="lg">
      <Grid container spacing={5} justifyContent="space-between">
        <Grid item xs={12} sm={'auto'}>
          <Logo />
        </Grid>
        <Grid xs={12} sm={9} item justifyContent="flex-end">
          <Stack
            direction="row"
            justifyContent="flex-end"
            sx={{
              flexDirection: {
                xs: 'column',
                sm: 'row',
              },
              gap: {
                xs: 4,
                sm: 12,
              },
            }}
          >
            <Stack gap={0.5}>
              <Link
                target="_blank"
                color="text.secondary"
                href="https://dexscreener.com/ethereum/0xa579de28c6510299759f90e067db06c280072ace"
                className="link-hover-glow"
              >
                Dexscreener
              </Link>
              {/*
              <Link
                target="_blank"
                color="text.secondary"
                href="https://www.dextools.io/app/en/ether/pair-explorer/0xa579de28c6510299759f90e067db06c280072ace"
              >
                Dextools
              </Link>
              */}
              <Link
                target="_blank"
                color="text.secondary"
                href="https://app.uniswap.org/swap?inputCurrency=ETH&outputCurrency=0xe96938e0D086A241D03688ddA697Bf57859Ee261&exactField=input&exactAmount=1"
                className="link-hover-glow"
              >
                Uniswap Trade
              </Link>
              <Link
                color="text.secondary"
                href="/legal"
                className="link-hover-glow"
                target="_self"
              >
                Legal
              </Link>
              {/* 
              <Link
                target="_blank"
                color="text.secondary"
                href="https://v2.info.uniswap.org/token/0xe96938e0D086A241D03688ddA697Bf57859Ee261"
                className="link-hover-glow"
              >
                Uniswap Analytics
              </Link>
              */}
            </Stack>
            <Stack gap={0.5}>
              <Link
                color="text.secondary"
                href="https://etherscan.io/address/0xe96938e0d086a241d03688dda697bf57859ee261"
                target="_blank"
                className="link-hover-glow"
              >
                Etherscan Token Page
              </Link>
              <Link
                target="_blank"
                color="text.secondary"
                href="https://app.gysr.io/pool/0xb63815c251d6302be6f4563d82822bf2395bf520?network=ethereum"
                className="link-hover-glow"
              >
                Liquidity Staking
              </Link>
              <Link
                color="text.secondary"
                href="../bv3_staking_instructions.pdf"
                className="link-hover-glow"
                target="_blank"
              >
                Staking Directions
              </Link>
              {/* Added Legal link */}
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </Container>
  </Box>
);
