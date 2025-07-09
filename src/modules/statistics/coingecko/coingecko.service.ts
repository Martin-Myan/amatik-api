import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CoingeckoServiceProvider } from '@modules/statistics/coingecko/providers/coingecko.service.provider';
import {
  mapCoinsToPopularCoinsOutputDto,
  mapToAllData,
  mapToGlobalCryptoDataFromMarketData,
  mapToGlobalCryptoDataFromSchemaMarket,
  mapToMarketResponseToGetCoinsResponse,
} from '@modules/statistics/coingecko/coingecko.serializer';
import { InjectRepository } from '@nestjs/typeorm';
import { Coin } from '@entities/statistics/coin.entity';
import { In, Repository } from 'typeorm';
import { GlobalCryptoDataType } from '@enums/global-crypto-market.enum';
import { MarketStatsOutputDto } from '@dto/statistics/market-stats.output.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { GlobalCryptoData } from '@schemas/statistics/global-crypto-data.schema';
import { COINID_BLOCKCHAINID } from '@constants/coingecko.constants';
import { AllCoinsPaginationDto } from '@dto/shared/pagination.dto';
import { paginate } from '../../../database/postgres/paginate';
import {
  ToFacebookUrl,
  ToTelegramUrl,
  ToTwitterUrl,
} from '@utils/socialLinksBuilder';
import { Blockchain } from '@entities/statistics/blockchain.entity';
import { SingleCoinOutputDto } from '@dto/statistics/single-coin.output.dto';
import { PopularCoinOutputDto } from '@dto/statistics/popular-crypto.output.dto';
import { I18nContext } from 'nestjs-i18n';
import {
  CoinsSearchField,
  RankingSortField,
  SortOrder,
} from '@enums/sort-order.enum';

@Injectable()
export class CoingeckoService {
  private readonly logger: Logger;

  constructor(
    @InjectModel(GlobalCryptoData.name)
    private globalCryptoDataModel: Model<GlobalCryptoData>,
    @InjectRepository(Coin)
    private coinRepository: Repository<Coin>,
    @InjectRepository(Blockchain)
    private blockchainRepository: Repository<Blockchain>,
    private readonly coingeckoServiceProvider: CoingeckoServiceProvider,
  ) {
    this.logger = new Logger(CoingeckoService.name);
  }

  public async syncCoins(): Promise<void> {
    const coins = await this.coingeckoServiceProvider.getCoinsMarket();
    const coinsToWrite = mapToMarketResponseToGetCoinsResponse(coins);
    try {
      const existingCoins = await this.coinRepository.find();

      const coinsToSave: Coin[] = [];
      for (const coinData of coinsToWrite) {
        const existingCoin = existingCoins.find(
          (coin) => coin.coinId === coinData.coinId,
        );
        if (existingCoin) {
          existingCoin.name = coinData.name;
          existingCoin.image = coinData.image;
          existingCoin.current_price = coinData.current_price;
          existingCoin.market_cap = coinData.market_cap;
          existingCoin.circulating_supply = coinData.circulating_supply;
          existingCoin.high_24h = coinData.high_24h;
          existingCoin.total_volume = coinData.total_volume;
          existingCoin.max_supply = coinData.max_supply;
          existingCoin.total_supply = coinData.total_supply;
          existingCoin.price_change_percentage_1h =
            +coinData.price_change_percentage_1h?.toFixed(15);
          existingCoin.price_change_percentage_24h =
            +coinData.price_change_percentage_24h?.toFixed(15);
          existingCoin.price_change_percentage_7d =
            +coinData.price_change_percentage_7d?.toFixed(15);
          existingCoin.market_cap_change_percentage_24h =
            coinData.market_cap_change_percentage_24h;
          existingCoin.sparkline_in_7d = coinData.sparkline_in_7d;

          coinsToSave.push(existingCoin);
        } else {
          coinsToSave.push(this.coinRepository.create(coinData));
        }
        coinsToSave.sort((x, y) => y.market_cap - x.market_cap);

        for (let i = 1; i <= coinsToSave.length; i++) {
          coinsToSave[i - 1].index = i;
        }
      }
      await this.coinRepository.save(coinsToSave);
    } catch (err) {
      console.log(err);
      throw new BadRequestException(err);
    }
  }

  // 30min
  public async updatePricesHourly(): Promise<Coin[]> {
    const coins = await this.coinRepository.find({
      relations: {
        blockchain: true,
      },
    });

    // for each coin who has blockchain (determine from COINID_BLOCKCHAINID) and doesn't have blockchain object, create one
    coins.forEach((coin) => {
      if (COINID_BLOCKCHAINID[coin.coinId] && !coin.blockchain) {
        coin.blockchain = this.blockchainRepository.create();
        coin.blockchain.coinId = coin.id;
        coin.blockchain.blockchainId = COINID_BLOCKCHAINID[coin.coinId];
      }
    });

    for (const coin of coins) {
      const newData = await this.coingeckoServiceProvider.getCoinStatistics(
        coin.coinId,
      );

      if (!newData) continue;

      coin.homepage = newData.links.homepage.find((url) => url !== '') ?? null;
      coin.chat_url = newData.links.chat_url.find((url) => url !== '') ?? null;
      coin.facebook_url = ToFacebookUrl(newData.links.facebook_username);
      coin.twitter_url = ToTwitterUrl(newData.links.twitter_screen_name);
      coin.telegram_url = ToTelegramUrl(
        newData.links.telegram_channel_identifier,
      );
      coin.subreddit_url = newData.links.subreddit_url;
      coin.repo_url = newData.links.repos_url.github[0];
    }

    const blockchains = coins
      .filter((c) => COINID_BLOCKCHAINID[c.coinId])
      .map((coin) => coin.blockchain);
    await this.blockchainRepository.save(blockchains);

    await this.coinRepository.save(coins);

    return coins.map((coin) => coin);
  }

  // 1 minute or 45 seconds
  public async getAllData(query: AllCoinsPaginationDto) {
    const { page, perPage } = query;
    let { sortField, sortOrder } = query;

    const fields = [
      CoinsSearchField.COIN_ID,
      CoinsSearchField.NAME,
      CoinsSearchField.SYMBOL,
    ];
    const searchArray = query.search
      ? fields.map((field) => `${field} ${query.search}`)
      : undefined;
    sortField = sortField ?? RankingSortField.MARKET_CAP;
    sortOrder = sortOrder ?? SortOrder.DESC;
    const pagination = paginate<Coin>({
      page,
      perPage,
      sortField,
      sortOrder,
      search: searchArray,
    });

    const result = await this.coinRepository.findAndCount({
      ...pagination,
    });

    return { coins: mapToAllData(result[0]), count: result[1] };
  }

  public async getPopularCoins(): Promise<PopularCoinOutputDto[]> {
    const coins = await this.coinRepository.find({
      order: { market_cap: 'desc' },
      take: 10,
    });

    return mapCoinsToPopularCoinsOutputDto(coins);
  }

  public async getPopularSingleCoin(
    coinId: string,
  ): Promise<SingleCoinOutputDto> {
    const singleCoin = await this.coinRepository.findOne({
      relations: { blockchain: true },
      where: { coinId },
    });

    if (!singleCoin) {
      const i18n = I18nContext.current();

      throw new NotFoundException(i18n.t('exception.CoinNotExist'));
    }

    return new SingleCoinOutputDto(singleCoin);
  }

  public async getGlobalMarket(): Promise<MarketStatsOutputDto> {
    const result = await this.globalCryptoDataModel
      .findOne({ dataType: GlobalCryptoDataType.MARKETSTAT })
      .exec();
    if (!result) {
      const i18n = I18nContext.current();

      throw new NotFoundException(i18n.t('exception.MarketStatNotExist'));
    }

    return mapToGlobalCryptoDataFromSchemaMarket(result);
  }

  public async updateGlobalMarketData() {
    try {
      const globalMarketDataDraft =
        await this.coingeckoServiceProvider.getGlobalMarketData();
      let globalMarketData = mapToGlobalCryptoDataFromMarketData(
        globalMarketDataDraft,
      );
      globalMarketData = await this.assignPicsToMarketData(globalMarketData);
      globalMarketData.dataType = GlobalCryptoDataType.MARKETSTAT;
      await this.globalCryptoDataModel.deleteMany({
        dataType: GlobalCryptoDataType.MARKETSTAT,
      });
      await this.globalCryptoDataModel.create(globalMarketData);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  private async assignPicsToMarketData(marketData) {
    const coins = await this.coinRepository.find({
      where: {
        symbol: In(marketData.dominanceCoins.map((coin) => coin.coinSymbol)),
      },
    });

    marketData.dominanceCoins = coins.reduce((result, coin) => {
      const dominanceCoin = marketData.dominanceCoins.find(
        (c) => c.coinSymbol === coin.symbol,
      );
      if (dominanceCoin) {
        dominanceCoin.image = coin.image;
        result.push(dominanceCoin);
      }
      return result;
    }, []);

    return marketData;
  }
}
