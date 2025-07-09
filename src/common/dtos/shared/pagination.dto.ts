import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
import {
  CoinSortField,
  RankingSortField,
  SortOrder,
} from '@enums/sort-order.enum';
import { Type } from 'class-transformer';

export class PaginationDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @ApiPropertyOptional({
    name: 'page',
    required: false,
    description: 'Defines the page to start the pagination',
  })
  page = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  @ApiPropertyOptional({
    name: 'perPage',
    required: false,
    description: 'Defines documents in each page',
  })
  perPage = 20;
}

export class AllCoinsPaginationDto extends PaginationDto {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    name: 'search',
    required: false,
    nullable: true,
  })
  search?: string;

  @IsOptional()
  @IsEnum(CoinSortField)
  @ApiPropertyOptional({
    name: 'sortField',
    required: false,
    enum: CoinSortField,
    description: 'Defines which column should be sorted',
  })
  sortField: string = CoinSortField.POPULAR;

  @IsOptional()
  @IsEnum(SortOrder)
  @ApiPropertyOptional({
    name: 'sortOrder',
    enum: SortOrder,
    required: false,
    description: 'Sort Order Ascending or Descending',
  })
  sortOrder: SortOrder = SortOrder.DESC;
}

export class RankingDataPaginationDto extends PaginationDto {
  @IsEnum(RankingSortField)
  @ApiPropertyOptional({
    name: 'sortField',
    required: false,
    enum: RankingSortField,
    description: 'Defines which column should be sorted',
  })
  sortField: string = RankingSortField.MARKET_CAP;

  @IsOptional()
  @IsEnum(SortOrder)
  @ApiPropertyOptional({
    name: 'sortOrder',
    enum: SortOrder,
    required: false,
    description: 'Sort Order Ascending or Descending',
  })
  sortOrder: SortOrder = SortOrder.DESC;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    name: 'search',
    required: false,
    nullable: true,
  })
  search?: string;
}
