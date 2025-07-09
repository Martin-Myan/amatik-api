import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddFundingRounds1701941415435 implements MigrationInterface {
  name = 'AddFundingRounds1701941415435';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "investors" ADD "fundingId" integer`);
    await queryRunner.query(
      `ALTER TABLE "investors" ADD CONSTRAINT "FK_ccdff6a97d33b41bd4a8fe1ba19" FOREIGN KEY ("fundingId") REFERENCES "funding_rounds"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "investors" DROP CONSTRAINT "FK_ccdff6a97d33b41bd4a8fe1ba19"`,
    );
    await queryRunner.query(`ALTER TABLE "investors" DROP COLUMN "fundingId"`);
  }
}
