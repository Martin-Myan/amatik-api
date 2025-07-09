import {
  GlobalCryptoData,
  GlobalCryptoDataSchema,
} from '@schemas/statistics/global-crypto-data.schema';

export const statisticsSchemasMongo = [
  {
    name: GlobalCryptoData.name,
    schema: GlobalCryptoDataSchema,
  },
];
