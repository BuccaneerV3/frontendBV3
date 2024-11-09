// pages/bermuda.tsx

import { useMemo, useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useWeb3React } from '@web3-react/core';
import { Container } from '@mui/material';
import Head from 'next/head';
import { zodResolver } from '@hookform/resolvers/zod';
import { saveAs } from 'file-saver';


import { gasLimit, Steps, Message } from '../src/constants'; // Removed progressMessagesMap
import { Schema, SchemaType } from '../src/validation';

import { getContract2, getContract3 } from '../src/lib/contracts';
import { Layout } from '../src/Layout';
import { ProgressMessageCard } from '../src/components/ProgressMessageCard';
import { PrivateSendForm } from '../src/components/PrivateSendForm';
import { HashForm } from '../src/HashForm';

import { handleErrors } from '../src/lib/handleErrors';

import { abi as abi2, address as address2 } from '../src/contracts/contract2';
import { abi as abi3, address as address3 } from '../src/contracts/contract3';

// Updated progress messages with step indicators
const progressMessagesMap: Record<Steps, Message> = {
  0: {
    title: 'Attention Required',
    description: (
      <>
        The website is still in test mode; manuals have not been completed yet. Conduct transactions at your own risk.
        <br />
        <br />
        Do not conduct any transactions or press any buttons/toggles before reading the user guide mirror1 mirror2
        mirror3. Uninformed actions may result in loss of privacy and funds.
      </>
    ),
    buttonTitle: '',
  },
  1: {
    title: 'Sending a Private Tx (1/2)',
    description:
      'You are sending a private BV3 transaction. Your entire public balance will be encrypted, and a hash will be created to send your amount. It is a two-part transaction; please confirm the second transaction to send off the private amount. If you are unsure what your balance will be after, you can always go to the Tortuga page and decrypt after you have sent your private transaction. Please remember a private transaction is two parts: one to create the hash, the other to send it off. Please confirm both transactions to send the private transaction.',
    buttonTitle: 'Setting up the hash. Part 1 / 2',
  },
  2: {
    title: 'Completing the Private Transaction Send (2/2)',
    description: (
      <>
        Please confirm and do not exit the page until you sign and confirm the amount. Please copy the SALT and the
        amount you are sending until the transaction is confirmed so that if the transaction fails for whatever reason,
        you can get back the token you are sending. If you for any reason reject the second transaction of the private
        send and do not have the correct amount and the salt,{' '}
        <span style={{ fontWeight: 'bold', textDecoration: 'underline' }}>
          you will lose the amount you are sending permanently.
        </span>
      </>
    ),
    buttonTitle: 'Sending BV3 to Recipient. Part 2 / 2',
  },
  3: {
    title: 'Your Private Transaction was Successful',
    description:
      'You have successfully sent your tokens to your recipient. Your public balance has been fully privatized. You may continue sending other private transactions (if you have the balance) or do partial decryptions to publicly move or sell tokens from this wallet. You can also do a Decrypt transaction to reveal your prior public balance after a transaction, although this is highly not recommended as the amount you sent will be known.',
    buttonTitle: '',
  },
  4: {
    title: 'You have successfully retrieved your tokens',
    description: '',
    buttonTitle: '',
  },
};

export default function Bermuda() {
  const { library, account, active } = useWeb3React();

  // State Hooks
  const [error, setError] = useState<{ title: string; description: string } | null>(null);
  const [isInProcess, setIsInProcess] = useState(false);
  const [encryptedValuesState, setEncryptedValuesState] = useState<BigInt[] | null>(null);
  const [rejected, setRejected] = useState(false);
  const [step, setStep] = useState<Steps>(0);
  const [hash, setHash] = useState('');

  const message = useMemo<Message>(
    () => (error ? { ...error, buttonTitle: '' } : progressMessagesMap[step]),
    [step, error]
  );

  useEffect(() => {
    if (!library || !account) return;

    async function viewHash() {
      try {
        const contract2 = getContract2(library, address2, abi2);
        const fetchedHash = await contract2.viewHash(account);

        console.log('Fetched hash:', fetchedHash);

        setHash(fetchedHash);
      } catch (err) {
        console.error('Error fetching hash:', err);
      }
    }

    viewHash();
  }, [library, account, step]);

  // Form setup
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<SchemaType>({ resolver: zodResolver(Schema) });

  // Watch form fields
  const salt = watch('salt');
  const amount = watch('amount');
  const remainingDigits = 39 - (salt?.toString().length || 0);

  const onSubmit: SubmitHandler<SchemaType> = async (data) => {
    if (!active || !account || !library) {
      alert('Please connect your wallet.');
      return;
    }

    try {
      setIsInProcess(true);
      setError(null);

      const contract2 = getContract2(library, address2, abi2);
      const contract3 = getContract3(library, address3, abi3);

      let values: BigInt[];

      if (!encryptedValuesState) {
        // Call encryptValues function
        values = await contract2.encryptValues(
          data.address,
          ethers.utils.parseEther(data.amount.toString()).toBigInt(),
          data.salt
        );

        setStep(1);

        // Call PART_I_
        const tx1 = await contract2.PART_I_(values.map((v: BigInt) => v.toString()), {
          gasLimit: ethers.utils.parseUnits(gasLimit, 'wei'),
        });

        // Wait for the transaction to be mined
        const receipt1 = await tx1.wait();

        // Capture transaction details
        const senderAddress = account;
        const recipientAddress = data.address;
        const amountSent = data.amount;
        const timestamp = new Date().toLocaleString();
        const saltValue = data.salt.toString(); // Get the SALT value as a string

        // Create the text content
        const textContent = `
Buccaneer V3 Private TX
Timestamp: ${timestamp}
Sender: ${senderAddress}
Recipient: ${recipientAddress}
Amount: ${amountSent}
SALT: ${saltValue}

*****PLEASE MAKE SURE TO CONFIRM THE SECOND TRANSACTION*****
        `.trim();

        // Trigger file download
        const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
        saveAs(blob, 'transaction_details.txt');

        setEncryptedValuesState(values);

        // Proceed to PART_II_ after PART_I_ completes
        const lillypadAddress = await contract3.processAddress(data.address);

        setStep(2);

        // Call PART_II_
        const tx2 = await contract2.PART_II_(lillypadAddress, values, {
          gasLimit: ethers.utils.parseUnits(gasLimit, 'wei'),
        });

        // Wait for the second transaction to be mined
        await tx2.wait();

        setEncryptedValuesState(null);
        setStep(3);
        setRejected(false);
        reset();
      } else {
        // If encryptedValuesState exists, prompt for the second transaction
        const lillypadAddress = await contract3.processAddress(data.address);

        setStep(2);

        // Call PART_II_
        const tx2 = await contract2.PART_II_(lillypadAddress, encryptedValuesState, {
          gasLimit: ethers.utils.parseUnits(gasLimit, 'wei'),
        });

        // Wait for the second transaction to be mined
        await tx2.wait();

        setEncryptedValuesState(null);
        setStep(3);
        setRejected(false);
        reset();
      }
    } catch (error) {
      handleErrors(error, setError, {
        title: 'Transaction Failed',
        description: 'An error occurred during the transaction process. Please try again.',
      });
    } finally {
      setIsInProcess(false);
    }
  };

  // Determine if HashForm should be displayed
  const zeroHash = '0x0000000000000000000000000000000000000000000000000000000000000000';
  const hasHash = Boolean(hash && hash.toLowerCase() !== zeroHash.toLowerCase());

  const isNotSent = step === 0;
  const isPart2Rejected = Boolean(encryptedValuesState) && rejected;

  return (
    <Layout>
      <Head>
        <title>Bermuda | Buccaneer</title>
      </Head>
      <Container disableGutters maxWidth="sm" sx={{ mt: 4 }}>
        <ProgressMessageCard message={message} step={step} error={error} />

        {/* Display HashForm if hash exists and transaction is not sent or rejected */}
        {hasHash && (isNotSent || isPart2Rejected) ? (
          <HashForm
            amount={amount}
            salt={salt}
            hash={hash}
            onSubmit={async (data) => {
              if (!active || !account || !library) {
                alert('Please connect your wallet.');
                return;
              }

              try {
                const contract2 = getContract2(library, address2, abi2);

                await contract2.editHash_EMERGENCY(
                  ethers.utils.parseEther(data.amount.toString()).toBigInt(),
                  data.salt,
                  { gasLimit: ethers.utils.parseUnits('100000', 'wei') }
                );

                setStep(4);
                setHash(''); // Reset hash to unlock the PrivateSendForm
              } catch (error) {
                handleErrors(error, setError, {
                  title: 'Retrieve tokens failed',
                  description: '',
                });
              } finally {
                setEncryptedValuesState(null);
                setRejected(false);
              }
            }}
          />
        ) : null}

        {/* PrivateSendForm with updated isLocked prop */}

        <PrivateSendForm
          onSubmit={handleSubmit(onSubmit)} // Keep this as handleSubmit(onSubmit)
          isInProcess={isInProcess}
          errors={errors}
          register={register}
          encryptedValuesState={encryptedValuesState}
          remainingDigits={remainingDigits}
          message={message}
          isLocked={hasHash && (isNotSent || isPart2Rejected)}
          step={step}
        />


      </Container>
    </Layout>
  );
}
