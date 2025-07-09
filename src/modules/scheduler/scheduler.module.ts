import { Module } from '@nestjs/common';
import { Web3Module } from 'nest-web3';
import { ScheduleModule } from '@nestjs/schedule';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MainModule } from '@modules/main/main.module';

import { SchedulerService } from './scheduler.service';
import { I_Web3Config } from '@common/config/web3/web3.config';
import { StatisticsModule } from '@modules/statistics/statistics.module';

@Module({
  imports: [
    MainModule,
    ScheduleModule.forRoot(),
    StatisticsModule,
    Web3Module.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const web3Conf = configService.get<I_Web3Config>('web3');
        return {
          name: web3Conf.clientName,
          url: web3Conf.chains[web3Conf.network].providerUrl,
        };
      },
    }),
  ],
  providers: [SchedulerService],
})
export class SchedulerModule {}
