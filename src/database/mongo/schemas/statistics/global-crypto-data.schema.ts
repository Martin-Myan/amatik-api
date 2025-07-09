import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { GlobalCryptoDataType } from '@enums/global-crypto-market.enum';

export type T_GlobalCryptoDoc = GlobalCryptoData & Document;

@Schema({ _id: false })
export class Period {
  @Prop({ type: Number })
  value: number;

  @Prop({ type: String })
  valueText: string;
}

@Schema({ _id: false })
export class CoinDominance {
  @Prop({ type: String })
  coinSymbol: string;
  @Prop({ type: String })
  percent: string;
  @Prop({ type: String })
  image: string;
}

@Schema()
export class GlobalCryptoData extends Document {
  @Prop({
    type: Period,
    required() {
      return this.dataType === GlobalCryptoDataType.FGI;
    },
  })
  now: Period;

  @Prop({
    type: Period,
    required() {
      return this.dataType === GlobalCryptoDataType.FGI;
    },
  })
  previousClose: Period;

  @Prop({
    type: Period,
    required() {
      return this.dataType === GlobalCryptoDataType.FGI;
    },
  })
  oneWeekAgo: Period;

  @Prop({
    type: Period,
    required() {
      return this.dataType === GlobalCryptoDataType.FGI;
    },
  })
  oneMonthAgo: Period;

  @Prop({
    type: Period,
    required() {
      return this.dataType === GlobalCryptoDataType.FGI;
    },
  })
  oneYearAgo: Period;

  @Prop({
    type: String,
    required() {
      return this.dataType === GlobalCryptoDataType.MARKETSTAT;
    },
  })
  marketCap: string;
  @Prop({
    type: String,
    required() {
      return this.dataType === GlobalCryptoDataType.MARKETSTAT;
    },
  })
  marketCapPercent: string;
  @Prop({
    type: String,
    required() {
      return this.dataType === GlobalCryptoDataType.MARKETSTAT;
    },
  })
  dayVol: string;

  @Prop({
    type: Array<CoinDominance>,
    required() {
      return this.dataType === GlobalCryptoDataType.MARKETSTAT;
    },
  })
  dominanceCoins: CoinDominance[];

  @Prop({
    type: String,
    required() {
      return this.dataType === GlobalCryptoDataType.MARKETSTAT;
    },
  })
  cryptoCount: number;

  @Prop({ enum: GlobalCryptoDataType, type: String })
  dataType: GlobalCryptoDataType;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const GlobalCryptoDataSchema =
  SchemaFactory.createForClass(GlobalCryptoData);
