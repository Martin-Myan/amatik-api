import * as process from 'process';
import { config } from 'dotenv';

config();

export interface I_CronConfig {
  all: boolean;
}

const allCrons = process.env.ALL_CRONS !== 'enabled';

export const cronConfig: I_CronConfig = {
  all: allCrons,
};
