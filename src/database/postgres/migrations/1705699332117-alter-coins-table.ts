import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterCoinsTable1705699332117 implements MigrationInterface {
  name = 'AlterCoinsTable1705699332117';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "coins"
            ADD "price_change_percentage_1h" numeric(25, 20)
        `);
    await queryRunner.query(`
            ALTER TABLE "coins"
            ADD "price_change_percentage_7d" numeric(25, 20)
        `);
    await queryRunner.query(`
            ALTER TABLE "coins"
            ALTER COLUMN "high_24h" DROP NOT NULL
        `);
    await queryRunner.query(`
            ALTER TABLE "coins"
            ALTER COLUMN "price_change_percentage_24h" TYPE numeric(25, 20)
        `);
    await queryRunner.query(`
            ALTER TABLE "coins"
            ALTER COLUMN "market_cap_change_percentage_24h" TYPE numeric(10, 7)
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "coins"
            ALTER COLUMN "market_cap_change_percentage_24h" TYPE numeric(8, 6)
        `);
    await queryRunner.query(`
            ALTER TABLE "coins"
            ALTER COLUMN "price_change_percentage_24h" TYPE numeric(8, 6)
        `);
    await queryRunner.query(`
            ALTER TABLE "coins"
            ALTER COLUMN "high_24h"
            SET NOT NULL
        `);
    await queryRunner.query(`
            ALTER TABLE "coins" DROP COLUMN "price_change_percentage_7d"
        `);
    await queryRunner.query(`
            ALTER TABLE "coins" DROP COLUMN "price_change_percentage_1h"
        `);
  }
}
