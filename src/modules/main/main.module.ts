import { Logger, Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { MainController } from './main.controller';
import { CacheModule } from '@nestjs/cache-manager';
import { MainService } from '@modules/main/main.service';
import { GatewayModule } from '@modules/gateway/gateway.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    GatewayModule,
    HttpModule,
    CacheModule.register({ isGlobal: true }),
    ScheduleModule.forRoot(),
  ],
  providers: [MainService, Logger],
  controllers: [MainController],
  exports: [MainService],
})
export class MainModule {}
