import {
  Brackets,
  FindManyOptions,
  FindOptionsOrder,
  ILike,
  SelectQueryBuilder,
} from 'typeorm';
import { RegularEntity } from '@entities/regular.entity';
import { SortOrder } from '@enums/sort-order.enum';

export interface PaginateOptions {
  page?: number;
  perPage?: number;
  sortField?: string;
  sortOrder?: SortOrder;
  search?: string[];
}

export const paginate = <T extends RegularEntity>(
  paginate: PaginateOptions,
): FindManyOptions<T> => {
  const { page, perPage, sortField, sortOrder, search } = paginate;
  const pagination: FindManyOptions<T> = {};

  const whereOption: FindManyOptions<T>['where'] = [];
  if (search && search.length > 0 && search[0] !== undefined) {
    search.forEach((searchString) => {
      const [property, searchValue] = searchString.split(' ');
      const condition = {};
      condition[property] = ILike(searchValue + '%');
      whereOption.push(condition);
    });
  }

  pagination.where = whereOption;

  if (sortField && sortOrder) {
    const currentSortOrder: FindOptionsOrder<T> = {};

    const sortFieldModified = sortField.split('.');

    if (sortFieldModified[1]) {
      currentSortOrder[sortFieldModified[0]] = {};
      currentSortOrder[sortFieldModified[0]][sortFieldModified[1]] = sortOrder;
    } else {
      currentSortOrder[sortField] = sortOrder;
    }

    pagination.order = currentSortOrder;
  }
  if (page && perPage) {
    pagination.skip = (page - 1) * perPage;
    pagination.take = perPage || 10;
  }

  return pagination;
};

export const paginateOptionsQB = <T extends RegularEntity>(
  queryBuilder: SelectQueryBuilder<T>,
  paginate: PaginateOptions,
  searchKey?: string,
): SelectQueryBuilder<T> => {
  let { page, perPage, sortField, sortOrder } = paginate;
  const { search } = paginate;
  if (!perPage) {
    perPage = 20;
  }
  if (!page) {
    page = 1;
  }
  if (!sortOrder || !sortField) {
    sortOrder = SortOrder.DESC;
    sortField = 'id';
  }

  if (search && search.length > 0 && search[0] !== undefined) {
    queryBuilder.andWhere(
      new Brackets((qb) => {
        search.forEach((searchString) => {
          const [property, searchValue] = searchString.split(' ');
          qb.orWhere(
            `LOWER(${
              searchKey ? searchKey + '.' + property : property
            }) LIKE :searchValue`,
            {
              searchValue: '%' + searchValue.trim().toLowerCase() + '%',
            },
          );
        });
      }),
    );
  }
  // Apply ORDER BY condition

  console.log(
    sortField,
    sortField === 'blockchain.dapps' || sortField === 'blockchain.uaw'
      ? `blockchain.${sortField}`
      : `${queryBuilder.alias}.${sortField}`,
  );

  queryBuilder.orderBy(
    sortField === 'blockchain.dapps' || sortField === 'blockchain.uaw'
      ? sortField
      : `${queryBuilder.alias}.${sortField}`,
    sortOrder.toUpperCase() as 'ASC' | 'DESC',
  );

  queryBuilder.skip((Number(page) - 1) * Number(perPage)).take(Number(perPage));

  return queryBuilder;
};
