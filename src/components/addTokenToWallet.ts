// addTokenToWallet.tsx

export const addTokenToWallet = async () => {
    const tokenAddress = '0xe96938e0D086A241D03688ddA697Bf57859Ee261';
    const tokenSymbol = 'BUCC';
    const tokenDecimals = 18;
    const tokenImage = 'https://buccaneerv3.com/64.png'; // Replace with the full HTTPS URL to your image
  
    try {
      const { ethereum } = window as any;
      if (ethereum && ethereum.request) {
        const wasAdded = await ethereum.request({
          method: 'wallet_watchAsset',
          params: {
            type: 'ERC20', // Only 'ERC20' is supported
            options: {
              address: tokenAddress, // The address of your token contract
              symbol: tokenSymbol,   // The symbol of your token, up to 5 characters
              decimals: tokenDecimals, // The number of decimals your token uses
              image: tokenImage,     // A string URL of the token logo image
            },
          },
        });
  
        if (wasAdded) {
          console.log('Token added to wallet!');
        } else {
          console.log('Token addition rejected by user.');
        }
      } else {
        console.log('No wallet provider found');
      }
    } catch (error) {
      console.error('Error adding token to wallet:', error);
    }
  };
  