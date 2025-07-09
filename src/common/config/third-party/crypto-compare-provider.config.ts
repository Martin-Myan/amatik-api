import { registerAs } from '@nestjs/config';

export interface I_CryptoCompareProviderConfig {
  crypto_compare_url: string;
  crypto_compare_api_key: string;
}

export default registerAs(
  'crypto-compare-provider',
  (): I_CryptoCompareProviderConfig => ({
    crypto_compare_url: process.env.CRYPTO_COMPARE_API_BASE_URL,
    crypto_compare_api_key: process.env.CRYPTO_COMPARE_API_KEY,
  }),
);
