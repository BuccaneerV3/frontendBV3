// signer.tsx

import { ethers } from 'ethers';
import { abi as forwarderAbi, address as forwarderAddress } from '../src/contracts/contract5';

// Define ForwardRequestData type (do not include nonce here)
export type ForwardRequestData = {
  from: string;
  to: string;
  value: ethers.BigNumber;
  gas: ethers.BigNumber;
  deadline: number;
  data: string;
  signature?: string;
};

// Define the EIP-712 Domain
const domain = {
  name: '', // Will be set dynamically
  version: '', // Will be set dynamically
  chainId: 1, // Will be set dynamically
  verifyingContract: forwarderAddress,
};

// Update the Types to match the EIP-712 message (includes nonce)
const types = {
  ForwardRequest: [
    { name: 'from', type: 'address' },
    { name: 'to', type: 'address' },
    { name: 'value', type: 'uint256' },
    { name: 'gas', type: 'uint256' },
    { name: 'nonce', type: 'uint256' },
    { name: 'deadline', type: 'uint48' },
    { name: 'data', type: 'bytes' },
  ],
};

// Function to sign the EIP-712 message and return the full request
export async function signTransaction(
  signer: ethers.providers.JsonRpcSigner,
  request: Omit<ForwardRequestData, 'signature'>
) {
  // Fetch the nonce from the forwarder contract
  const forwarder = new ethers.Contract(forwarderAddress, forwarderAbi, signer);
  const nonce = await forwarder.nonces(request.from);

  // Prepare the message to be signed (includes nonce)
  const message = {
    from: request.from,
    to: request.to,
    value: request.value.toString(),
    gas: request.gas.toString(),
    nonce: nonce.toString(),
    deadline: request.deadline,
    data: request.data,
  };

  // Fetch domain data from the contract
  const domainData = await forwarder.eip712Domain();

  // Update the domain with the correct values
  domain.name = domainData.name;
  domain.version = domainData.version;
  domain.chainId = (await signer.provider.getNetwork()).chainId;

  // Sign the typed data using EIP-712
  const signature = await signer._signTypedData(domain, types, message);

  // Include the signature in the request (do not include nonce)
  const fullRequest: ForwardRequestData = {
    ...request,
    signature: signature,
  };

  return fullRequest;
}
