// pages/tortuga.tsx

import { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import Container from '@mui/material/Container';
import CardContent from '@mui/material/CardContent';
import Collapse from '@mui/material/Collapse';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import { FaChevronDown, FaCircle } from 'react-icons/fa';
import { Layout } from '../src/Layout';
import { ethers } from 'ethers';
import { signTransaction, ForwardRequestData } from '../src/signer';
import { abi as abi4, address as address4 } from '../src/contracts/contract4';
import Head from 'next/head';
import { DecryptSection } from '../src/DecryptSection';
import { useWeb3React } from '@web3-react/core';

export const messages = {
  default: {
    title: 'Swap BUCC for ETH on Tortuga',
    description:
      'Tortuga allows you to swap a set amount of BUCC for ETH without needing ETH for the transaction itself as gas fees are paid for using BUCC via GSN.',
  },
  decryptSuccess: {
    title: 'Full Decryption Successful',
    description: 'Your balance has been decrypted successfully.',
  },
  partialDecryptSuccess: {
    title: 'Partial Decryption Successful',
    description: 'Your partial balance has been decrypted successfully.',
  },
  swapSuccess: {
    title: 'Swap Successful',
    description: 'You have swapped 3000 BV3 for 0.018 ETH.',
  },
  processingTransaction: {
    title: 'Processing Transaction',
    description: 'Your transaction is being processed. Please wait...',
  },
};

export default function Tortuga() {
  const [message, setMessage] = useState(messages.default);
  const [collapsed, setCollapsed] = useState(true);
  const [isTransactionInProgress, setIsTransactionInProgress] = useState(false);
  const [gasPrice, setGasPrice] = useState<number | null>(null);
  const [gasIndicator, setGasIndicator] = useState<{
    color: string;
    text: string;
  }>({ color: '', text: '' });

  // New states for ETH balances
  const [relayerBalance, setRelayerBalance] = useState<number | null>(null);
  const [gsnBalance, setGsnBalance] = useState<number | null>(null);
  const [ethPrice, setEthPrice] = useState<number | null>(null);

  const { library, account, active } = useWeb3React();

  useEffect(() => {
    async function fetchGasPrice() {
      if (library) {
        try {
          const price = await library.getGasPrice();
          const priceInGwei = Number(ethers.utils.formatUnits(price, 'gwei'));
          setGasPrice(priceInGwei);

          if (priceInGwei < 20) {
            setGasIndicator({
              color: 'green',
              text: 'ETH Gas Cost Low, transaction failure highly unlikely',
            });
          } else if (priceInGwei >= 20 && priceInGwei <= 50) {
            setGasIndicator({
              color: 'yellow',
              text: 'ETH Gas Cost Moderate, transactions may take longer',
            });
          } else {
            setGasIndicator({
              color: 'red',
              text: 'High Gas Cost, Transactions Likely to Fail',
            });
          }
        } catch (error) {
          console.error('Error fetching gas price:', error);
        }
      }
    }

    fetchGasPrice();
    const interval = setInterval(fetchGasPrice, 60000);
    return () => clearInterval(interval);
  }, [library]);

  // Fetch ETH price and balances
  useEffect(() => {
    async function fetchEthPrice() {
      try {
        const response = await fetch(
          'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd'
        );
        const data = await response.json();
        setEthPrice(data.ethereum.usd);
      } catch (error) {
        console.error('Error fetching ETH price:', error);
      }
    }

    async function fetchBalances() {
      if (library && ethPrice !== null) {
        try {
          const relayerAddress = '0x26cF1dfbB6A4f34f47261738F563B50c66d30A4B';
          const gsnAddress = '0xF3c15d71CBD725A7686a837F1aCAd42C71d60bFb';

          const relayerBalanceWei = await library.getBalance(relayerAddress);
          const gsnBalanceWei = await library.getBalance(gsnAddress);

          const relayerBalanceEth = parseFloat(
            ethers.utils.formatEther(relayerBalanceWei)
          );
          const gsnBalanceEth = parseFloat(
            ethers.utils.formatEther(gsnBalanceWei)
          );

          setRelayerBalance(relayerBalanceEth * ethPrice);
          setGsnBalance(gsnBalanceEth * ethPrice);
        } catch (error) {
          console.error('Error fetching balances:', error);
        }
      }
    }

    fetchEthPrice();
    fetchBalances();

    const interval = setInterval(() => {
      fetchEthPrice();
      fetchBalances();
    }, 60000);

    return () => clearInterval(interval);
  }, [library, ethPrice]);

  const requestSignature = async () => {
    if (!active || !account) {
      alert('Please connect your wallet.');
      return;
    }

    try {
      setIsTransactionInProgress(true);
      setMessage(messages.processingTransaction);

      const signer = library.getSigner();
      const address = await signer.getAddress();
      const contract = new ethers.Contract(address4, abi4, signer);
      const data = contract.interface.encodeFunctionData('Swap_BV3_for_ETH');

      const requestWithoutSignature = {
        from: address,
        to: address4,
        value: ethers.BigNumber.from(0),
        gas: ethers.BigNumber.from(400000),
        deadline: Math.floor(Date.now() / 1000) + 60 * 10,
        data: data,
      };

      const fullRequest: ForwardRequestData = await signTransaction(
        signer,
        requestWithoutSignature
      );

      const payload = {
        ...fullRequest,
        value: fullRequest.value.toString(),
        gas: fullRequest.gas.toString(),
      };

      const response = await fetch(
        'https://api.defender.openzeppelin.com/actions/bec86e34-84ce-45ed-b870-7a29691014f0/runs/webhook/bf9615fa-bf4c-41e5-99cf-54ffe6cb3cc4/PmWpQWetY5Qj3LhMV9VX4z',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        }
      );

      const result = await response.json();

      if (response.ok) {
        // Optionally, wait for the transaction receipt or confirmation
        setMessage(messages.swapSuccess);
      } else {
        setMessage({
          title: 'Transaction Failed',
          description: result.error || 'An error occurred during the transaction.',
        });
      }
    } catch (err) {
      console.error('Error signing message:', err);
      setMessage({
        title: 'Transaction Failed',
        description: 'An error occurred during the transaction.',
      });
    } finally {
      setIsTransactionInProgress(false);
    }
  };

  return (
    <Layout>
      <Head>
        <title>Tortuga | Buccaneer</title>
      </Head>
      <Container disableGutters maxWidth="sm" sx={{ mt: 6 }}>
        <Card variant="outlined" sx={{ borderRadius: 4 }}>
          <CardActionArea onClick={() => setCollapsed((val) => !val)}>
            <CardContent sx={{ p: '22px 32px !important' }}>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                gap={2}
              >
                <Stack direction="row" alignItems="center" gap={2}>
                  <Typography variant="h5" fontWeight="600">
                    {message?.title || 'Default Title'}
                  </Typography>
                </Stack>
                {message.description && (
                  <FaChevronDown style={{ color: '#FFFFFF99' }} />
                )}
              </Stack>
              <Collapse
                in={message.title !== messages.default.title ? false : collapsed}
              >
                {message?.description && (
                  <Typography sx={{ mt: 1 }}>{message.description}</Typography>
                )}
              </Collapse>
            </CardContent>
          </CardActionArea>
        </Card>

        {/* Gas Price Indicator */}
        {gasPrice !== null && gasIndicator.color && (
          <Card variant="outlined" sx={{ mt: 3, borderRadius: 4 }}>
            <CardContent sx={{ p: '16px !important', display: 'flex', alignItems: 'center' }}>
              <FaCircle color={gasIndicator.color} style={{ marginRight: '8px' }} />
              <Typography variant="body1">
                {gasIndicator.text} (Current Gas Price: {gasPrice.toFixed(1)} Gwei)
              </Typography>
            </CardContent>
          </Card>
        )}

        {/* Relayer Balance Indicator */}
        {relayerBalance !== null && (
          <Card variant="outlined" sx={{ mt: 3, borderRadius: 4 }}>
            <CardContent sx={{ p: '16px !important', display: 'flex', alignItems: 'center' }}>
              <FaCircle
                color={relayerBalance >= 20 ? 'green' : 'red'}
                style={{ marginRight: '8px' }}
              />
              <Typography variant="body1">
                Relayer Balance: ${relayerBalance.toFixed(2)}
                {relayerBalance < 20 && ' - Not enough ETH likely in the relayer'}
              </Typography>
            </CardContent>
          </Card>
        )}

        {/* GSN Contract Balance Indicator */}
        {gsnBalance !== null && (
          <Card variant="outlined" sx={{ mt: 3, borderRadius: 4 }}>
            <CardContent sx={{ p: '16px !important', display: 'flex', alignItems: 'center' }}>
              <FaCircle
                color={gsnBalance >= 20 ? 'green' : 'red'}
                style={{ marginRight: '8px' }}
              />
              <Typography variant="body1">
                GSN Contract Balance: ${gsnBalance.toFixed(2)}
                {gsnBalance < 20 && ' - Not enough ETH likely in the GSN contract'}
              </Typography>
            </CardContent>
          </Card>
        )}

        <Card variant="outlined" sx={{ mt: 3 }}>
          <CardContent
            sx={{ p: { xs: '22px 32px!important', sm: '32px 42px!important' } }}
          >
            <Button
              fullWidth
              size="large"
              sx={{ fontSize: 18, mb: 3 }}
              variant="contained"
              onClick={requestSignature}
              disabled={isTransactionInProgress}
            >
              {isTransactionInProgress ? (
                <>
                  <CircularProgress
                    size={24}
                    sx={{ mr: 2, color: '#fff', minWidth: 24, opacity: '0.5' }}
                  />
                  Processing transaction...
                </>
              ) : (
                'Swap 3000 BV3 for 0.018 ETH gaslessly'
              )}
            </Button>
            <DecryptSection setMessage={setMessage} />
          </CardContent>
        </Card>
      </Container>
    </Layout>
  );
}
