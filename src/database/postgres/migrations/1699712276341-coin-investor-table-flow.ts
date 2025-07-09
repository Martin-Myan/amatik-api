import { MigrationInterface, QueryRunner } from 'typeorm';

export class CoinInvestorTableFlow1699712276341 implements MigrationInterface {
  name = 'CoinInvestorTableFlow1699712276341';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "coins" DROP CONSTRAINT "FK_4b6e6531236804ad867d9e44ea1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "coins" DROP CONSTRAINT "UQ_4b6e6531236804ad867d9e44ea1"`,
    );
    await queryRunner.query(`ALTER TABLE "coins" DROP COLUMN "investorId"`);
    await queryRunner.query(
      `ALTER TABLE "investors" DROP CONSTRAINT "FK_79d262bd6e8fb41623bfaebde01"`,
    );
    await queryRunner.query(
      `ALTER TABLE "investors" ALTER COLUMN "coinId" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "investors" DROP CONSTRAINT "REL_79d262bd6e8fb41623bfaebde0"`,
    );
    await queryRunner.query(
      `ALTER TABLE "investors" ADD CONSTRAINT "FK_79d262bd6e8fb41623bfaebde01" FOREIGN KEY ("coinId") REFERENCES "coins"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "investors" DROP CONSTRAINT "FK_79d262bd6e8fb41623bfaebde01"`,
    );
    await queryRunner.query(
      `ALTER TABLE "investors" ADD CONSTRAINT "REL_79d262bd6e8fb41623bfaebde0" UNIQUE ("coinId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "investors" ALTER COLUMN "coinId" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "investors" ADD CONSTRAINT "FK_79d262bd6e8fb41623bfaebde01" FOREIGN KEY ("coinId") REFERENCES "coins"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(`ALTER TABLE "coins" ADD "investorId" integer`);
    await queryRunner.query(
      `ALTER TABLE "coins" ADD CONSTRAINT "UQ_4b6e6531236804ad867d9e44ea1" UNIQUE ("investorId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "coins" ADD CONSTRAINT "FK_4b6e6531236804ad867d9e44ea1" FOREIGN KEY ("investorId") REFERENCES "investors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
