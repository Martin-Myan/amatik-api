import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { IsNull, Not, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Coin } from '@entities/statistics/coin.entity';
import { Investor } from '@entities/statistics/investor.entity';
import { Funding } from '@entities/statistics/funding_rounds.entity';
import { FundingDetails } from '@entities/statistics/funding_details.entity';
import { GlobalScrapingsServiceProvider } from '@modules/statistics/global-scrapings/providers/global-scrapings.service.provider';
import { DevelopersReportInterface } from '@modules/statistics/global-scrapings/interfaces/developers-report.interface';
import { Allocation } from '@entities/statistics/allocation.entity';
import { VestingDetails } from '@entities/statistics/vestingDetails.entity';
import { IResponse } from './interfaces/vesting.interface';
import { ChartDataset } from '@entities/statistics/chart_dataset.entity';
import { ChartDate } from '@entities/statistics/chart_date.entity';
import { Blockchain } from '@entities/statistics/blockchain.entity';

@Injectable()
export class GlobalScrapingsService {
  private readonly logger: Logger;

  constructor(
    private readonly globalScrapingsServiceProvider: GlobalScrapingsServiceProvider,
    @InjectRepository(Coin)
    private readonly coinRepository: Repository<Coin>,
    @InjectRepository(Investor)
    private readonly investorRepository: Repository<Investor>,
    @InjectRepository(Allocation)
    private readonly allocationRepository: Repository<Allocation>,
    @InjectRepository(VestingDetails)
    private readonly vestingDetailsRepository: Repository<VestingDetails>,
    @InjectRepository(Funding)
    private readonly fundingRepository: Repository<Funding>,
    @InjectRepository(FundingDetails)
    private readonly fundingDetailsRepository: Repository<FundingDetails>,
    @InjectRepository(ChartDataset)
    private readonly chartDatasetRepository: Repository<ChartDataset>,
    @InjectRepository(ChartDate)
    private readonly chartDateRepository: Repository<ChartDate>,
    @InjectRepository(Blockchain)
    private readonly blockchainRepository: Repository<Blockchain>,
  ) {
    this.logger = new Logger(GlobalScrapingsService.name);
  }

  public async setDevelopersReport(): Promise<DevelopersReportInterface[]> {
    const result =
      await this.globalScrapingsServiceProvider.getDevelopersReport();

    const coins = await this.coinRepository.find({
      relations: { blockchain: true },
    });

    const resultMap = result.reduce((previousValue, currentValue) => {
      const coinSymbol = currentValue.ecosystem[1].split('/')[2];
      previousValue.set(coinSymbol, currentValue.ft);

      return previousValue;
    }, new Map<string, number>());

    coins.forEach((coin) => {
      coin.developers =
        resultMap.get(coin.coinId) ??
        resultMap.get(coin.symbol) ??
        resultMap.get(coin.blockchain?.blockchainId) ??
        0;
    });

    await this.coinRepository.save(coins);

    return result;
  }

  public async setDropsTab() {
    try {
      const coins = await this.coinRepository.find({
        relations: {
          investors: true,
          fundings: {
            details: true,
          },
        },
      });

      for (const coin of coins) {
        const singleCoinData =
          await this.globalScrapingsServiceProvider.getDropsTabByCoinId(
            coin.coinId,
          );
        if (singleCoinData && singleCoinData.launchDate) {
          coin.launchDate = singleCoinData.launchDate;
        }
        if (!coin.investors) {
          coin.investors = [];
        }

        if (!coin.fundings) {
          coin.fundings = [];
        }

        if (!singleCoinData) {
          this.logger.error(
            `Error on retrieving dropsTab data from Scraping for ${coin.coinId}`,
          );

          continue;
        }

        singleCoinData.investors?.forEach((investor) => {
          const foundInvestor = coin.investors.find(
            (inv) => inv.avatar == investor.image,
          );

          if (foundInvestor) {
            foundInvestor.name = investor.name;
            foundInvestor.type = investor.type;
            foundInvestor.tier = investor.tier;
            foundInvestor.rating = investor.rating;
            foundInvestor.avatar = investor.image;
            foundInvestor.coinId = coin.id;
          } else {
            const newInvestor = this.investorRepository.create({
              name: investor.name,
              type: investor.type,
              tier: investor.tier,
              rating: investor.rating,
              avatar: investor.image,
              coinId: coin.id,
            });

            coin.investors.push(newInvestor);
          }
        });

        singleCoinData.fundraising?.forEach((funding) => {
          let foundFunding = coin.fundings.find((eachFunding) => {
            return eachFunding.slug === funding.id;
          });

          if (foundFunding) {
            foundFunding.name = funding.name;
            foundFunding.start_date = funding.startDate
              ? new Date(funding.startDate)
              : null;
            foundFunding.price = funding.price ?? null;
            foundFunding.funds_raised = funding.raised ?? null;
            foundFunding.tokens_for_sale = funding.tokensForSaleAmount ?? null;
            foundFunding.total_supply_percent = funding.tokensForSalePercent;
            foundFunding.platformName = funding.platform?.name;
            foundFunding.start_date = new Date(funding.endDate);
            foundFunding.platformPicture = funding.platform?.logo;
            foundFunding.pre_value = funding.preValuation;
            foundFunding.slug = funding.id;
            foundFunding.roi_usd = funding?.roi?.USD ?? null;
            foundFunding.roi_btc = funding?.roi?.BTC ?? null;
            foundFunding.roi_eth = funding?.roi?.ETH ?? null;
            foundFunding.roi_bnb = funding?.roi?.BNB ?? null;
            foundFunding.distribution_type = funding?.unlockType ?? null;

            if (!foundFunding.details) {
              foundFunding.details = [];
            }

            funding.moreDetailsLinks.forEach((eachResponseDetail) => {
              let foundDetail = foundFunding.details.find(
                (eachFoundDetail) =>
                  eachFoundDetail.url === eachResponseDetail.url,
              );

              if (foundDetail) {
                foundDetail.url = eachResponseDetail.url;
                foundDetail.title = eachResponseDetail.title;
              } else {
                foundDetail = this.fundingDetailsRepository.create({
                  title: eachResponseDetail.title,
                  url: eachResponseDetail.url,
                  fundingId: foundFunding.id,
                });

                foundFunding.details.push(foundDetail);
              }
            });
          } else {
            foundFunding = this.fundingRepository.create({
              name: funding.name,
              price: funding.price ?? null,
              funds_raised: funding.raised ?? null,
              tokens_for_sale: funding.tokensForSaleAmount ?? null,
              total_supply_percent: funding.tokensForSalePercent,
              platformName: funding.platform?.name,
              start_date: new Date(funding.endDate),
              platformPicture: funding.platform?.logo,
              coinId: coin.id,
              slug: funding.id,
              pre_value: funding.preValuation,
              roi_usd: funding?.roi?.USD ?? null,
              roi_btc: funding?.roi?.BTC ?? null,
              roi_eth: funding?.roi?.ETH ?? null,
              roi_bnb: funding?.roi?.BNB ?? null,
            });

            if (!foundFunding.details) {
              foundFunding.details = [];
            }

            funding.moreDetailsLinks.forEach((eachResponseDetail) => {
              let foundDetail = foundFunding.details.find((eachFoundDetail) => {
                return eachFoundDetail.url === eachResponseDetail.url;
              });

              if (foundDetail) {
                foundDetail.url = eachResponseDetail.url;
                foundDetail.title = eachResponseDetail.title;
              } else {
                foundDetail = this.fundingDetailsRepository.create({
                  title: eachResponseDetail.title,
                  url: eachResponseDetail.url,
                  fundingId: foundFunding.id,
                });

                foundFunding.details.push(foundDetail);
              }
            });

            coin.fundings.push(foundFunding);
          }

          funding.investors.forEach((nestedInvestor) => {
            const foundInvestor = coin.investors.find(
              (inv) => inv.avatar == nestedInvestor.image,
            );

            if (foundInvestor) {
              foundInvestor.stage = funding.name;
              foundInvestor.fundingId = foundFunding.id;
            } else {
              const newInvestor = this.investorRepository.create({
                name: nestedInvestor.name,
                type: nestedInvestor.type,
                tier: nestedInvestor.tier,
                rating: nestedInvestor.rating,
                avatar: nestedInvestor.image,
                fundingId: foundFunding.id,
                coinId: coin.id,
                stage: funding.name,
              });

              coin.investors.push(newInvestor);
            }
          });
        });
      }
      await this.coinRepository.save(coins);

      await this.investorRepository.save(
        coins.flatMap((coin) => coin.investors),
      );

      await this.fundingRepository.save(coins.flatMap((coin) => coin.fundings));

      this.logger.log('Successfully finished updating DropsTab end to end');
    } catch (err) {
      this.logger.error('Failed Updating DropsTab', err);
      console.log(err);
      throw new BadRequestException(err);
    }
  }

  public async setAllocationInfo() {
    try {
      const coins: Coin[] = await this.coinRepository.find({
        relations: { allocation: true },
      });
      if (coins) {
        for (const coin of coins) {
          const tokenVesting: IResponse =
            await this.globalScrapingsServiceProvider.getTokenAllocationByTokenId(
              coin.coinId,
            );
          if (!tokenVesting || !tokenVesting.allocations) {
            this.logger.error(
              `Error on retrieving vesting info ${coin.coinId}`,
            );
            continue;
          }
          if (!coin.allocation) {
            coin.allocation = [];
          }
          const vesting = tokenVesting.allocations.vesting.map((vesting) => {
            return this.vestingDetailsRepository.create({
              stageName: vesting.stage.stage,
              order: vesting.stage.order,
              color: vesting.stage.color,
              price: vesting.price,
              priceDisplay: vesting.priceDisplay,
              tokens: vesting.tokens,
              tokenPercent: vesting.tokenPercent,
              roundRaise: vesting.roundRaise,
              roundRaiseDisplay: vesting.roundRaiseDisplay,
              valuation: vesting.valuation,
              valuationDisplay: vesting.valuationDisplay,
              vesting: vesting.vesting,
              vestingDisplay: vesting.vestingDisplay,
            });
          });
          const foundAllocation = coin.allocation.find(
            (allocation) =>
              allocation.ticker === tokenVesting.allocations.ticker,
          );
          if (foundAllocation) {
            foundAllocation.totalRaise = tokenVesting.allocations.totalRaise;
            (foundAllocation.totalCirculation =
              tokenVesting.allocations.totalCirculation),
              (foundAllocation.ticker = tokenVesting.allocations.ticker);
            foundAllocation.coinId = coin.id;
            foundAllocation.vesting = vesting;
          } else {
            coin.allocation.push(
              this.allocationRepository.create({
                totalRaise: tokenVesting.allocations.totalRaise,
                totalCirculation: tokenVesting.allocations.totalCirculation,
                ticker: tokenVesting.allocations.ticker,
                vesting: vesting,
                coinId: coin.id,
              }),
            );
          }
        }
        await this.allocationRepository.save(
          coins.flatMap((coin) => coin.allocation),
        );
      }
      this.logger.log(
        'Successfully finished updating Allocations and VestigDetails',
      );
    } catch (error) {
      this.logger.error('Failed updating Allocations', error);
      throw new BadRequestException(error);
    }
  }

  public async setChartData() {
    try {
      const coins = await this.coinRepository.find({
        relations: { chart: true, chart_date: true },
      });
      for (const coin of coins) {
        const tokenVesting: IResponse =
          await this.globalScrapingsServiceProvider.getTokenChartByTokenId(
            coin.coinId,
          );
        if (!tokenVesting || !tokenVesting.chart) {
          this.logger.error(`Error on retrieving vesting info ${coin.coinId}`);
          continue;
        }
        if (!coin.chart) {
          coin.chart = [];
        }

        if (tokenVesting.chart) {
          for (const dataset of tokenVesting.chart.datasets) {
            const foundDataset = coin.chart.find(
              (chartDataset) => chartDataset.label === dataset.label,
            );
            if (foundDataset) {
              foundDataset.label = dataset.label;
              foundDataset.data = dataset.data;
              foundDataset.bg_color = dataset.bg_color;
              foundDataset.coinId = coin.id;
            } else {
              coin.chart.push(
                this.chartDatasetRepository.create({
                  label: dataset.label,
                  data: dataset.data,
                  bg_color: dataset.bg_color,
                  coinId: coin.id,
                }),
              );
            }
          }

          if (!coin.chart_date) {
            coin.chart_date = [];
          }

          const foundDateLabel = coin.chart_date.find(
            (date) => date.coinId === coin.id,
          );
          if (foundDateLabel) {
            foundDateLabel.coinId = coin.id;
            foundDateLabel.date = tokenVesting.chart.labels;
          } else {
            coin.chart_date.push(
              this.chartDateRepository.create({
                coinId: coin.id,
                date: tokenVesting.chart.labels,
              }),
            );
          }
        }
      }
      await this.chartDatasetRepository.save(
        coins.flatMap((coin) => coin.chart),
      );
      await this.chartDateRepository.save(
        coins.flatMap((coins) => coins.chart_date),
      );
      this.logger.log('Successfully finished updating TokenChart');
    } catch (error) {
      console.log(error);
    }
  }

  async setUAW() {
    const coins = await this.coinRepository.find({
      where: {
        blockchainId: Not(IsNull()),
      },
      relations: {
        blockchain: true,
      },
    });
    const data = await this.globalScrapingsServiceProvider.getBlochchainUaw();

    for (const coin of coins) {
      const foundData = data.find(
        (element) => element.token.symbol === coin.symbol,
      );
      if (!foundData) {
        this.logger.warn(`Not dapp for coin ${coin}`);
        continue;
      }

      coin.blockchain.dapps = foundData.dappCount;
      coin.blockchain.uaw = foundData.uawCount;
    }

    await this.blockchainRepository.save(coins.map((coin) => coin.blockchain));
    await this.coinRepository.save(coins);
  }
}
