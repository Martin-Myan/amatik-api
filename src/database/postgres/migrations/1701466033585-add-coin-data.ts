import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddCoinData1701466033585 implements MigrationInterface {
  name = 'AddCoinData1701466033585';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "investors" DROP CONSTRAINT "FK_ccdff6a97d33b41bd4a8fe1ba19"`,
    );
    await queryRunner.query(`ALTER TABLE "investors" DROP COLUMN "fundingId"`);
    await queryRunner.query(
      `ALTER TABLE "coins" ADD "max_supply" numeric(30,10)`,
    );
    await queryRunner.query(
      `ALTER TABLE "coins" ADD "total_supply" numeric(30,10)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "coins" DROP COLUMN "total_supply"`);
    await queryRunner.query(`ALTER TABLE "coins" DROP COLUMN "max_supply"`);
    await queryRunner.query(`ALTER TABLE "investors" ADD "fundingId" integer`);
    await queryRunner.query(
      `ALTER TABLE "investors" ADD CONSTRAINT "FK_ccdff6a97d33b41bd4a8fe1ba19" FOREIGN KEY ("fundingId") REFERENCES "funding_rounds"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
