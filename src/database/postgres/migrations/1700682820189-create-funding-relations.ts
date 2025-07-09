import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateFundingRelations1700682820189 implements MigrationInterface {
  name = 'CreateFundingRelations1700682820189';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "funding_rounds" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "name" character varying NOT NULL, "start_date" TIMESTAMP DEFAULT now(), "avatar" character varying, "price" bigint, "funds_raised" bigint, "tokens_for_sale" bigint, "total_supply_percent" integer, "platform" bigint, "pre_value" bigint NOT NULL, "roi_usd" bigint, "roi_btc" bigint, "roi_eth" bigint, "distribution_type" character varying, "coinId" integer, CONSTRAINT "CHK_23e9887e78218088999189297b" CHECK ("total_supply_percent" >= 0 AND "total_supply_percent" <= 100), CONSTRAINT "PK_97ceda929557b9a726c83108962" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "funding_details" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "link" character varying NOT NULL, "fundingId" integer NOT NULL, "coinId" integer, CONSTRAINT "PK_7b8e2d6521a77b972ca3e65d094" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`ALTER TABLE "investors" ADD "fundingId" integer`);
    await queryRunner.query(
      `ALTER TABLE "investors" ADD CONSTRAINT "FK_ccdff6a97d33b41bd4a8fe1ba19" FOREIGN KEY ("fundingId") REFERENCES "funding_rounds"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "funding_rounds" ADD CONSTRAINT "FK_03003334dd9d1ef67354a8877e6" FOREIGN KEY ("coinId") REFERENCES "coins"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "funding_details" ADD CONSTRAINT "FK_e405a15d6e015af6b14e5d6f856" FOREIGN KEY ("coinId") REFERENCES "funding_rounds"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "funding_details" DROP CONSTRAINT "FK_e405a15d6e015af6b14e5d6f856"`,
    );
    await queryRunner.query(
      `ALTER TABLE "funding_rounds" DROP CONSTRAINT "FK_03003334dd9d1ef67354a8877e6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "investors" DROP CONSTRAINT "FK_ccdff6a97d33b41bd4a8fe1ba19"`,
    );
    await queryRunner.query(`ALTER TABLE "investors" DROP COLUMN "fundingId"`);
    await queryRunner.query(`DROP TABLE "funding_details"`);
    await queryRunner.query(`DROP TABLE "funding_rounds"`);
  }
}
