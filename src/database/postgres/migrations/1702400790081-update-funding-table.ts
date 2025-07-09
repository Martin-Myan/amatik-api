import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateFundingTable1702400790081 implements MigrationInterface {
  name = 'UpdateFundingTable1702400790081';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "funding_rounds" DROP COLUMN "platform"`,
    );
    await queryRunner.query(
      `ALTER TABLE "funding_rounds" ADD "platformName" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "funding_rounds" ADD "platformPicture" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "funding_rounds" ADD "roi_bnb" double precision`,
    );
    await queryRunner.query(`ALTER TABLE "funding_rounds" DROP COLUMN "price"`);
    await queryRunner.query(
      `ALTER TABLE "funding_rounds" ADD "price" double precision`,
    );
    await queryRunner.query(
      `ALTER TABLE "funding_rounds" ADD "slug" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "funding_rounds" ADD CONSTRAINT "UQ_413f39484e4bf9f856dda20dd52" UNIQUE ("slug")`,
    );
    await queryRunner.query(
      `ALTER TABLE "funding_rounds" DROP COLUMN "tokens_for_sale"`,
    );
    await queryRunner.query(
      `ALTER TABLE "funding_rounds" ADD "tokens_for_sale" double precision`,
    );
    await queryRunner.query(
      `ALTER TABLE "funding_rounds" DROP CONSTRAINT "CHK_23e9887e78218088999189297b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "funding_rounds" DROP COLUMN "total_supply_percent"`,
    );
    await queryRunner.query(
      `ALTER TABLE "funding_rounds" ADD "total_supply_percent" double precision`,
    );
    await queryRunner.query(
      `ALTER TABLE "funding_rounds" DROP COLUMN "pre_value"`,
    );
    await queryRunner.query(
      `ALTER TABLE "funding_rounds" ADD "pre_value" double precision NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "funding_rounds" DROP COLUMN "roi_usd"`,
    );
    await queryRunner.query(
      `ALTER TABLE "funding_rounds" ADD "roi_usd" double precision`,
    );
    await queryRunner.query(
      `ALTER TABLE "funding_rounds" DROP COLUMN "roi_btc"`,
    );
    await queryRunner.query(
      `ALTER TABLE "funding_rounds" ADD "roi_btc" double precision`,
    );
    await queryRunner.query(
      `ALTER TABLE "funding_rounds" DROP COLUMN "roi_eth"`,
    );
    await queryRunner.query(
      `ALTER TABLE "funding_rounds" ADD "roi_eth" double precision`,
    );
    await queryRunner.query(
      `ALTER TABLE "funding_rounds" ADD CONSTRAINT "CHK_23e9887e78218088999189297b" CHECK ("total_supply_percent" >= 0 AND "total_supply_percent" <= 100)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "investors" DROP CONSTRAINT "FK_ccdff6a97d33b41bd4a8fe1ba19"`,
    );
    await queryRunner.query(
      `ALTER TABLE "funding_rounds" DROP CONSTRAINT "CHK_23e9887e78218088999189297b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "funding_rounds" DROP COLUMN "roi_eth"`,
    );
    await queryRunner.query(
      `ALTER TABLE "funding_rounds" ADD "roi_eth" bigint`,
    );
    await queryRunner.query(
      `ALTER TABLE "funding_rounds" DROP COLUMN "roi_btc"`,
    );
    await queryRunner.query(
      `ALTER TABLE "funding_rounds" ADD "roi_btc" bigint`,
    );
    await queryRunner.query(
      `ALTER TABLE "funding_rounds" DROP COLUMN "roi_usd"`,
    );
    await queryRunner.query(
      `ALTER TABLE "funding_rounds" ADD "roi_usd" bigint`,
    );
    await queryRunner.query(
      `ALTER TABLE "funding_rounds" DROP COLUMN "pre_value"`,
    );
    await queryRunner.query(
      `ALTER TABLE "funding_rounds" ADD "pre_value" bigint NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "funding_rounds" DROP COLUMN "total_supply_percent"`,
    );
    await queryRunner.query(
      `ALTER TABLE "funding_rounds" ADD "total_supply_percent" integer`,
    );
    await queryRunner.query(
      `ALTER TABLE "funding_rounds" ADD CONSTRAINT "CHK_23e9887e78218088999189297b" CHECK (((total_supply_percent >= 0) AND (total_supply_percent <= 100)))`,
    );
    await queryRunner.query(
      `ALTER TABLE "funding_rounds" DROP COLUMN "tokens_for_sale"`,
    );
    await queryRunner.query(
      `ALTER TABLE "funding_rounds" ADD "tokens_for_sale" bigint`,
    );
    await queryRunner.query(
      `ALTER TABLE "blockchains" DROP CONSTRAINT "UQ_413f39484e4bf9f856dda20dd52"`,
    );
    await queryRunner.query(`ALTER TABLE "funding_rounds" DROP COLUMN "price"`);
    await queryRunner.query(`ALTER TABLE "funding_rounds" ADD "price" bigint`);
    await queryRunner.query(
      `ALTER TABLE "funding_rounds" DROP COLUMN "roi_bnb"`,
    );
    await queryRunner.query(
      `ALTER TABLE "funding_rounds" DROP COLUMN "platformPicture"`,
    );
    await queryRunner.query(
      `ALTER TABLE "funding_rounds" DROP COLUMN "platformName"`,
    );
    await queryRunner.query(
      `ALTER TABLE "funding_rounds" ADD "platform" bigint`,
    );
  }
}
