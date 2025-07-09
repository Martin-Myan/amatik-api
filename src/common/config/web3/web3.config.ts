import { registerAs } from '@nestjs/config';

export interface I_Web3Config {
  clientName: string;
  endpointUrl: string;
  signMessage: string;
  binanceChainId: string;
  contractAddress: string;
  bscanChainbaseApiKey: string;
  bscanChainbaseApiUrl: string;
  network: string;
  chains: any;
}

export default registerAs(
  'web3',
  (): I_Web3Config => ({
    clientName: process.env.WEB3_CLIENT_NAME,
    endpointUrl: process.env.WEB3_ENDPOINT_URL,
    signMessage: process.env.WEB3_SIGN_MESSAGE,
    binanceChainId: process.env.WEB3_BINANCE_CHAIN_ID,
    bscanChainbaseApiKey: process.env.WEB3_CHAINBASE_BSCAN_API_KEY,
    bscanChainbaseApiUrl: process.env.WEB3_CHAINBASE_BSCAN_API,
    contractAddress: process.env.WEB3_CONTRACT_ADDRESS,
    network: process.env.WEB3_NETWORK,
    chains: {
      mainnet: {
        name: 'binance',
        chainId: 56,
        chainIdHex: '0x38',
        providerUrl: process.env.WEB3_MAINNET_ENDPOINT,
        contractAddresses: {
          bnb: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
          amatik: '0x970f855e0B383CF0b3224a16b856C0f2511ffc1e',
          payment: '0x574f794862563f19a27eb28fDF9C191b25A26A02',
          stack: '0xc74cf86727baED88c81726204F22999F045f6023',
          asr: '0xcF0feBd3f17CEf5b47b0cD257aCf6025c5BFf3b7',
        },
      },
      testnet: {
        name: 'binance',
        chainId: 97,
        chainIdHex: '0x61',
        providerUrl: process.env.WEB3_TESTNET_ENDPOINT,
        contractAddresses: {
          bnb: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
          amatik: '0xd130E6c157EbcEcc619Cde6D8919b1F3b993e1c0',
          payment: '0x7385e66f9923493F752C8d004Cb746A2E3B185F7',
          stack: '0x87Ce1214CeAda403408219Fe35B02e2C0D73F4a2',
          asr: '0xcF0feBd3f17CEf5b47b0cD257aCf6025c5BFf3b7',
        },
      },
    },
  }),
);
