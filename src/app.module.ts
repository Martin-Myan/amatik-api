import { Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import {
  configApp,
  configCryptoCompareProvider,
  configGlobalScrapingsProvider,
  configMongo,
  configPostgres,
  configRapidProvider,
  configWeb3,
} from './common/config';
import { HttpModule } from '@nestjs/axios';
import { GlobalModule } from '@common/global.module';
import { SchedulerModule } from '@modules/scheduler/scheduler.module';
import { GatewayModule } from '@modules/gateway/gateway.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        configApp,
        configWeb3,
        configMongo,
        configPostgres,
        configRapidProvider,
        configCryptoCompareProvider,
        configGlobalScrapingsProvider,
      ],
      envFilePath: ['.env'],
    }),
    HttpModule,
    GatewayModule,
    SchedulerModule,
    GlobalModule,
  ],
  controllers: [AppController],
  providers: [AppService, Logger],
})
export class AppModule {}
