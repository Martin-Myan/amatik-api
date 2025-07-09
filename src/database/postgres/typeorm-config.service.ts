import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: this.configService.get('postgres.type'),
      host: this.configService.get('postgres.host'),
      port: this.configService.get('postgres.port'),
      username: this.configService.get('postgres.username'),
      password: this.configService.get('postgres.password'),
      database: this.configService.get('postgres.name'),
      synchronize: this.configService.get('postgres.synchronize'),
      dropSchema: false,
      keepConnectionAlive: true,
      logging: this.configService.get('app.nodeEnv') !== 'production',
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
      cli: {
        entitiesDir: 'src',
        migrationsDir: 'src/database/migrations',
        subscribersDir: 'subscriber',
      },
      ssl: {
        ca:
          Buffer.from(process.env.DATABASE_CA, 'base64').toString('utf-8') ||
          undefined,
        rejectUnauthorized: this.configService.get(
          'postgres.rejectUnauthorized',
        ),
      },
      extra: {
        // based on https://node-postgres.com/apis/pool
        // max connection pool size
        max: this.configService.get('postgres.maxConnections'),
      },
    } as TypeOrmModuleOptions;
  }
}
