import {
  Inject,
  Injectable,
  Logger,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { firstValueFrom } from 'rxjs';
import { I18nService } from 'nestjs-i18n';
import { Cache } from 'cache-manager';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

import { ResSuccessDto } from '@responses/resSuccess.dto';
import { ChainBase } from '@enums/chainbase.enum';
import { I_Web3Config } from '@common/config/web3/web3.config';
import { WsService } from '@modules/gateway/ws.service';
import apeSwapRouterABI from '@common/config/abi/apeSwapRouterABI';
import { EVENTS } from '@modules/gateway/events';

@Injectable()
export class MainService {
  logger: Logger;
  web3Config: I_Web3Config;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    private readonly wsService: WsService,
    @Inject(I18nService) private readonly i18nService: I18nService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {
    this.logger = new Logger(MainService.name);
    this.web3Config = this.configService.get<I_Web3Config>('web3');
  }

  async cryptoInfo(url: string): Promise<any> {
    try {
      const { data } = await firstValueFrom(this.httpService.get(url));

      return new ResSuccessDto({ data });
    } catch (error) {
      throw new UnprocessableEntityException('Url not working');
    }
  }

  async getBSCanHolders(chainBase: ChainBase) {
    const holdersCount = await this.cacheManager.get(chainBase);

    if (!holdersCount) {
      return await this.getAmatikBSCanHolders();
    }

    return holdersCount;
  }

  async getAmatikToBnbPrice() {
    this.logger.log('Start sending 1 AMT to bnb price');

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const Web3 = require('web3');
    const contractAddresses =
      this.web3Config.chains[this.web3Config.network].contractAddresses;

    try {
      const client = new Web3(
        this.web3Config.chains[this.web3Config.network].providerUrl,
      );

      const apeSwapRouterContract = new client.eth.Contract(
        apeSwapRouterABI as any,
        contractAddresses.asr,
      );

      const inputTokenAddress = contractAddresses.amatik;
      const outputTokenAddress = contractAddresses.bnb;

      const inputAmount = client.utils.toWei('1');
      const path = [inputTokenAddress, outputTokenAddress];

      const response = await apeSwapRouterContract.methods
        .getAmountsOut(inputAmount, path)
        .call();

      this.wsService.emitToAll(
        EVENTS.GET_BNB_AMOUNT,
        Number(client.utils.fromWei(response[1])),
      );

      this.logger.log('Finished sending 1 AMT to bnb price successfully');
    } catch (err) {
      this.logger.error(err, 'Failed sending 1 AMT to bnb price');
    }
  }

  async setBSCanHoldersCount(amatikHoldersCount: number) {
    await this.cacheManager.set(ChainBase.BSCAN, amatikHoldersCount);
  }

  async getAmatikBSCanHolders() {
    this.logger.log('Process getting BSCAN holders');

    const language = 'en';
    const errorCode = 'exception.HoldersNotAvailable';
    try {
      const bscanChainbaseData = this.httpService.get(
        this.web3Config.bscanChainbaseApiUrl,
        {
          headers: {
            'x-api-key': this.web3Config.bscanChainbaseApiKey,
          },
          params: {
            chain_id: this.web3Config.binanceChainId,
            contract_address: this.web3Config.contractAddress,
            page: 1,
            limit: 1,
          },
        },
      );

      const amatikHoldersData = (await firstValueFrom(bscanChainbaseData)).data;
      await this.setBSCanHoldersCount(amatikHoldersData.count);
      return await amatikHoldersData.count;
    } catch (error) {
      const errorMessage = this.i18nService.translate(errorCode, {
        lang: language,
      });

      this.logger.log(errorMessage);
      throw error;
    }
  }
}
