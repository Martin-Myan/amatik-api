import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterCoinsTable1699565189892 implements MigrationInterface {
  name = 'AlterCoinsTable1699565189892';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "coins" DROP COLUMN "current_price"`);
    await queryRunner.query(
      `ALTER TABLE "coins" ADD "current_price" numeric(20,10) NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "coins" DROP COLUMN "market_cap"`);
    await queryRunner.query(
      `ALTER TABLE "coins" ADD "market_cap" numeric(30,10) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "coins" DROP COLUMN "circulating_supply"`,
    );
    await queryRunner.query(
      `ALTER TABLE "coins" ADD "circulating_supply" numeric(30,10) NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "coins" DROP COLUMN "high_24h"`);
    await queryRunner.query(
      `ALTER TABLE "coins" ADD "high_24h" numeric(30,10) NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "coins" DROP COLUMN "total_volume"`);
    await queryRunner.query(
      `ALTER TABLE "coins" ADD "total_volume" numeric(30,10) NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "coins" DROP COLUMN "total_volume"`);
    await queryRunner.query(
      `ALTER TABLE "coins" ADD "total_volume" integer NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "coins" DROP COLUMN "high_24h"`);
    await queryRunner.query(
      `ALTER TABLE "coins" ADD "high_24h" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "coins" DROP COLUMN "circulating_supply"`,
    );
    await queryRunner.query(
      `ALTER TABLE "coins" ADD "circulating_supply" integer NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "coins" DROP COLUMN "market_cap"`);
    await queryRunner.query(
      `ALTER TABLE "coins" ADD "market_cap" integer NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "coins" DROP COLUMN "current_price"`);
    await queryRunner.query(
      `ALTER TABLE "coins" ADD "current_price" integer NOT NULL`,
    );
  }
}
