import { registerAs } from '@nestjs/config';

export interface I_RapidProviderConfig {
  rapid_url: string;
  rapid_api_key: string;
}

export default registerAs(
  'rapid-provider',
  (): I_RapidProviderConfig => ({
    rapid_url: process.env.RAPID_API_BASE_URL,
    rapid_api_key: process.env.RAPID_API_KEY,
  }),
);
