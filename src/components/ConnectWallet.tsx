// src/components/ConnectWallet.tsx

import { useWeb3React } from '@web3-react/core';
import { InjectedConnector } from '@web3-react/injected-connector';
import Button from '@mui/material/Button';
import { addTokenToWallet } from './addTokenToWallet'; // Adjust the path if necessary

const injected = new InjectedConnector({ supportedChainIds: [1] });

export const ConnectWallet = () => {
  const { active, account, activate, deactivate } = useWeb3React();

  const connect = async () => {
    try {
      await activate(injected);

      // Optionally, you can remove the localStorage check to prompt every time for testing
      // const tokenAdded = localStorage.getItem('tokenAdded');
      // if (!tokenAdded) {
        await addTokenToWallet();
        // localStorage.setItem('tokenAdded', 'true');
      // }
    } catch (ex) {
      console.error(ex);
    }
  };

  const disconnect = async () => {
    try {
      deactivate();
      // localStorage.removeItem('tokenAdded'); // Optional: reset the token added flag on disconnect
    } catch (ex) {
      console.error(ex);
    }
  };

  return active ? (
    <Button variant="contained" onClick={disconnect}>
      Disconnect (
      {account && `${account.substring(0, 6)}...${account.substring(account.length - 4)}`}
      )
    </Button>
  ) : (
    <Button variant="contained" onClick={connect}>
      Connect Wallet
    </Button>
  );
};
