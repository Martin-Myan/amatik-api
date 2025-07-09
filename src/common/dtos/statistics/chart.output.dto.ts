import { ApiProperty } from '@nestjs/swagger';
import { ResSuccessDto } from '@common/responses/resSuccess.dto';
import { ChartDataset } from '@entities/statistics/chart_dataset.entity';
import { ChartDate } from '@entities/statistics/chart_date.entity';

export class ChartDataDto {
  @ApiProperty({
    example: [
      '2020-03-23',
      '2020-03-24',
      '2020-03-25',
      '2020-03-26',
      '2020-03-27',
      '2020-03-28',
      '2020-03-29',
      '2020-03-30',
      '2020-03-31',
    ],
  })
  readonly labels: Array<ChartDate>;
  @ApiProperty({
    example: [
      {
        label: 'Foundation',
        bg_color: 'B4664F',
        dataset: [
          11365063, 13365063, 13365063, 13365063, 13365063, 13365063, 13365063,
          13365063, 13365063,
        ],
      },
    ],
  })
  datasets: Array<ChartDataset>;
}

export class ChartDataResDto extends ResSuccessDto {
  @ApiProperty({ type: ChartDataDto })
  declare data: ChartDataDto;
}
