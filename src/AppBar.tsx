import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Stack from '@mui/material/Stack';
import Link from './Link';
import { Telegram, Twitter, Menu } from '@mui/icons-material';
import { useRouter } from 'next/router';
import { Logo } from './Logo';
import { FaDiscord, FaGithub } from 'react-icons/fa6';

import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';

import { useEffect, useState } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Dialog, DialogActions, DialogTitle } from '@mui/material';
import { useWeb3React } from '@web3-react/core';
import { ConnectWallet } from './components/ConnectWallet';

const drawerWidth = 240;

// Updated pages array without 'Staking' and 'Legal'
const pages = [
  { label: 'Home', url: '/', target: '_self' },
  { label: 'Bermuda', url: '/bermuda', target: '_self' },
  { label: 'Tortuga', url: '/tortuga', target: '_self' },
  { label: 'Exchange', url: '/caymans', target: '_self' },
];

const socials = [
  { label: 'Twitter', icon: <Twitter />, url: 'https://twitter.com/buccaneerV3' },
  { label: 'Telegram', icon: <Telegram />, url: 'https://t.me/BuccaneerV3' },
  { label: 'Discord', icon: <FaDiscord size={24} />, url: 'https://discord.com/invite/YhDDGp5wWV' },
  { label: 'GitHub', icon: <FaGithub size={24} />, url: 'https://github.com/BuccaneerV3/Buccaneer-V3-Frontend-Code' },
];

export const TopAppBar = () => {
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const smDown = useMediaQuery((theme: any) => theme.breakpoints.down('sm'));

  const { chainId, library, active } = useWeb3React();
  const isMismatched = active && chainId !== 1;

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  useEffect(() => {
    setDialogOpen(isMismatched);
  }, [isMismatched]);

  const switchNetwork = async () => {
    if (library?.provider?.request) {
      try {
        await library.provider.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0x1' }],
        });
      } catch (error) {
        console.error('Failed to switch network', error);
      }
    }
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <List>
        {pages.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton
              component={Link}
              href={item.url}
              target={item.target}
              sx={{ borderRadius: 999 }}
            >
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
        <Divider sx={{ my: 3 }} />
        {socials.map((item) => (
          <ListItem key={item.label} disablePadding sx={{ px: 1 }}>
            <ListItemButton component={Link} href={item.url} sx={{ borderRadius: 999 }}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const handleClose = (event: any, reason: any) => {
    if (reason && reason === 'backdropClick') return;
    setDialogOpen(false);
  };

  return (
    <>
      <AppBar position="static" color="transparent" sx={{ py: 3, boxShadow: 'none' }}>
        {/* Network Mismatch Dialog */}
        <Dialog
          open={dialogOpen}
          maxWidth="xs"
          disableEscapeKeyDown
          BackdropProps={{
            sx: {
              backdropFilter: 'blur(10px)',
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
            },
          }}
          onClose={handleClose}
          PaperProps={{
            sx: {
              borderRadius: 5,
              paddingY: 2,
              paddingX: 3,
              border: '1px solid rgba(255,255,255,0.1)',
              background:
                'linear-gradient(109.31deg, #1b1b4e 0.09%, rgba(24, 30, 74, 0.45) 73.5%), linear-gradient(0deg, #131737, #101330)',
            },
          }}
        >
          <DialogTitle>Please switch to the Ethereum main network.</DialogTitle>
          <DialogActions>
            <Button
              variant="outlined"
              color="secondary"
              sx={{ color: 'white' }}
              size="large"
              fullWidth
              onClick={switchNetwork}
            >
              Switch to Ethereum Mainnet
            </Button>
          </DialogActions>
        </Dialog>
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          {/* Mobile Menu Button */}
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              size="large"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ height: 48, width: 48 }}
            >
              <Menu />
            </IconButton>
          </Box>

          {/* Logo */}
          <Logo />

          {/* Navigation Links */}
          <Box
            sx={{
              mx: 3,
              display: { xs: 'none', md: 'flex' },
              justifyContent: 'center',
            }}
          >
            <Stack
              direction="row"
              gap={1}
              sx={{
                border: 1,
                p: 0.5,
                pr: 2,
                borderColor: '#393F62',
                borderRadius: 999,
              }}
            >
              {pages.map((page) => {
                const isActive = router.pathname === page.url;

                return (
                  <Button
                    component={Link}
                    target={page.target}
                    color={'primary'}
                    variant={isActive ? 'contained' : 'text'}
                    key={page.url}
                    href={page.url}
                    sx={{ color: 'white', fontWeight: 400, minHeight: 24, width: 100 }}
                  >
                    {page.label}
                  </Button>
                );
              })}
              {socials.map((social) => (
                <Tooltip arrow title={social.label} key={social.url}>
                  <IconButton component={Link} href={social.url} target="_blank">
                    {social.icon}
                  </IconButton>
                </Tooltip>
              ))}
            </Stack>
          </Box>

          {/* Connect Wallet Button */}
          <ConnectWallet />
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <nav>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          PaperProps={{
            sx: {
              border: '1px solid rgba(255,255,255,0.1)',
              background:
                'linear-gradient(109.31deg, #1b1b4e 0.09%, rgba(24, 30, 74, 0.45) 73.5%), linear-gradient(0deg, #131737, #101330)',
            },
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </>
  );
};
