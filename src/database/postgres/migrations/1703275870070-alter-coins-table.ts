import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterCoinsTable1703275870070 implements MigrationInterface {
  name = 'AlterCoinsTable1703275870070';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "coins" ADD "price_change_percentage_24h" numeric(8,6)`,
    );
    await queryRunner.query(
      `ALTER TABLE "coins" ADD "market_cap_change_percentage_24h" numeric(8,6)`,
    );
    await queryRunner.query(
      `ALTER TABLE "coins" ADD "homepage" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "coins" ADD "chat_url" character varying`,
    );
    await queryRunner.query(`ALTER TABLE "coins" ADD "sparkline_in_7d" jsonb`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "coins" DROP COLUMN "sparkline_in_7d"`,
    );
    await queryRunner.query(`ALTER TABLE "coins" DROP COLUMN "chat_url"`);
    await queryRunner.query(`ALTER TABLE "coins" DROP COLUMN "homepage"`);
    await queryRunner.query(
      `ALTER TABLE "coins" DROP COLUMN "market_cap_change_percentage_24h"`,
    );
    await queryRunner.query(
      `ALTER TABLE "coins" DROP COLUMN "price_change_percentage_24h"`,
    );
  }
}
