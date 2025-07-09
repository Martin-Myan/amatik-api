import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateFundingDetailTable1702675418558
  implements MigrationInterface
{
  name = 'UpdateFundingDetailTable1702675418558';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "funding_details" DROP CONSTRAINT "FK_e405a15d6e015af6b14e5d6f856"`,
    );
    await queryRunner.query(`ALTER TABLE "funding_details" DROP COLUMN "link"`);
    await queryRunner.query(
      `ALTER TABLE "funding_details" DROP COLUMN "coinId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "funding_details" ADD "title" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "funding_details" ADD "url" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "funding_details" ADD CONSTRAINT "FK_adf60328d35085c17627e9df18b" FOREIGN KEY ("fundingId") REFERENCES "funding_rounds"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "funding_details" DROP CONSTRAINT "FK_adf60328d35085c17627e9df18b"`,
    );
    await queryRunner.query(`ALTER TABLE "funding_details" DROP COLUMN "url"`);
    await queryRunner.query(
      `ALTER TABLE "funding_details" DROP COLUMN "title"`,
    );
    await queryRunner.query(
      `ALTER TABLE "funding_details" ADD "coinId" integer`,
    );
    await queryRunner.query(
      `ALTER TABLE "funding_details" ADD "link" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "funding_details" ADD CONSTRAINT "FK_e405a15d6e015af6b14e5d6f856" FOREIGN KEY ("coinId") REFERENCES "funding_rounds"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
