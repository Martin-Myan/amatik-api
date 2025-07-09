import { registerAs } from '@nestjs/config';

export interface I_GlobalScrapingsProviderConfig {
  global_scrapings_url: string;
  // global_scrapings_api_key: string;
}

export default registerAs(
  'global-scrapings-provider',
  (): I_GlobalScrapingsProviderConfig => ({
    global_scrapings_url: process.env.GLOBAL_SCRAPINGS_API_BASE_URL,
    // global_scrapings_api_key: process.env.GLOBAL_SCRAPINGS_API_KEY,
  }),
);
