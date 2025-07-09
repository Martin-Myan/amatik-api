import { MarketsResponse } from '@modules/statistics/coingecko/interfaces/coin.interface';
import { scientificToDecimal } from '@utils/scientificToDecimal';
import { MarketStats } from '@modules/statistics/coingecko/interfaces/global-market.interface';
import { CoinDominance } from '@schemas/statistics/global-crypto-data.schema';
import { GlobalCryptoDataType } from '@enums/global-crypto-market.enum';
import { MarketStatsOutputDto } from '@dto/statistics/market-stats.output.dto';
import { PopularCoinOutputDto } from '@dto/statistics/popular-crypto.output.dto';
import { Coin } from '@entities/statistics/coin.entity';

export const mapToMarketResponseToGetCoinsResponse = (
  data: MarketsResponse[],
) => {
  return data.map((responseItem) => {
    const { id, name, image, current_price, ...metadata } = responseItem;
    return {
      coinId: id,
      name,
      image,
      current_price:
        current_price.toString().indexOf('e') !== -1
          ? +scientificToDecimal(current_price.toString())
          : +current_price,
      symbol: metadata.symbol,
      max_supply: metadata.max_supply,
      total_supply: metadata.total_supply,
      market_cap: metadata.market_cap,
      circulating_supply: metadata.circulating_supply,
      high_24h: metadata.high_24h,
      total_volume: metadata.total_volume,
      price_change_percentage_24h:
        metadata.price_change_percentage_24h_in_currency,
      price_change_percentage_1h:
        metadata.price_change_percentage_1h_in_currency,
      price_change_percentage_7d:
        metadata.price_change_percentage_7d_in_currency,
      market_cap_change_percentage_24h:
        metadata.market_cap_change_percentage_24h,
      sparkline_in_7d: JSON.stringify(metadata.sparkline_in_7d.price),
    };
  });
};

export const mapToAllData = (data) => {
  return data.map((responseItem) => {
    const {
      index,
      coinId,
      symbol,
      name,
      image,
      current_price,
      circulating_supply,
      high_24h,
      total_volume,
      price_change_percentage_1h,
      price_change_percentage_24h,
      price_change_percentage_7d,
    } = responseItem;

    const statistics = {
      hourStat: price_change_percentage_1h,
      dailyStat: price_change_percentage_24h,
      weeklyStat: price_change_percentage_7d,
    };
    return {
      id: coinId,
      index,
      symbol,
      name,
      image,
      current_price: scientificToDecimal(current_price.toString()),
      market_cap_price: circulating_supply,
      high_24h:
        high_24h !== null ? scientificToDecimal(high_24h.toString()) : null,
      total_volume: total_volume,
      statistics: statistics,
    };
  });
};

export const mapCoinsToPopularCoinsOutputDto = (data: Coin[]) => {
  return data.map((responseItem) => ({
    image: responseItem.image,
    symbol: responseItem.symbol,
    name: responseItem.name,
    coinId: responseItem.coinId,
    current_price: scientificToDecimal(responseItem.current_price.toString()),
  })) as PopularCoinOutputDto[];
};

export const mapToGlobalCryptoDataFromMarketData = (
  marketStatsData: MarketStats,
) => {
  const dominanceCoins: Array<CoinDominance> = Object.keys(
    marketStatsData.market_cap_percentage,
  )
    .slice(0, 2)
    .map((key) => {
      return {
        coinSymbol: key,
        percent: marketStatsData.market_cap_percentage[key],
        image: null,
      } as CoinDominance;
    });

  return {
    cryptoCount: marketStatsData.active_cryptocurrencies,
    dataType: GlobalCryptoDataType.MARKETSTAT,
    marketCap: marketStatsData.total_market_cap.usd,
    marketCapPercent: marketStatsData.market_cap_change_percentage_24h_usd,
    dayVol: marketStatsData.total_volume.usd,
    dominanceCoins,
  };
};
export const mapToGlobalCryptoDataFromSchemaMarket = (marketData) => {
  return {
    cryptoCount: +marketData.cryptoCount,
    marketCap: marketData.marketCap,
    marketCapPercent: marketData.marketCapPercent,
    dayVol: marketData.dayVol,
    dominanceCoins: marketData.dominanceCoins,
  } as MarketStatsOutputDto;
};
