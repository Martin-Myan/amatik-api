import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';

export const AppDataSource = new DataSource({
  type: process.env.DATABASE_TYPE,
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  synchronize: process.env.DATABASE_SYNCHRONIZE === 'true',
  dropSchema: false,
  keepConnectionAlive: true,
  logging: process.env.NODE_ENV !== 'production',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
  cli: {
    entitiesDir: 'src',
    migrationsDir: 'src/database/postgres/migrations',
    subscribersDir: 'subscriber',
  },
  ssl: {
    ca:
      Buffer.from(process.env.DATABASE_CA, 'base64').toString('utf-8') ||
      undefined,
    rejectUnauthorized: false,
  },
  extra: {
    max: parseInt(process.env.DATABASE_MAX_CONNECTIONS, 10) || 100,
  },
} as DataSourceOptions);
