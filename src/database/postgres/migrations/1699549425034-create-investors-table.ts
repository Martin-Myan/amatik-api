import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateInvestorsTable1699549425034 implements MigrationInterface {
  name = 'CreateInvestorsTable1699549425034';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "investors" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "coinId" integer, "name" character varying NOT NULL, "avatar" character varying(255) NOT NULL, "tier" integer NOT NULL, "type" character varying(255) NOT NULL, "stage" character varying(255) NOT NULL, CONSTRAINT "REL_79d262bd6e8fb41623bfaebde0" UNIQUE ("coinId"), CONSTRAINT "CHK_0b88187a08d6eb07193cf8a1a0" CHECK ("tier" >= 1 AND "tier" <= 5), CONSTRAINT "PK_7ab129212e4ce89e68d6a27ea4e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`ALTER TABLE "coins" ADD "investorId" integer`);
    await queryRunner.query(
      `ALTER TABLE "coins" ADD CONSTRAINT "UQ_4b6e6531236804ad867d9e44ea1" UNIQUE ("investorId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "investors" ADD CONSTRAINT "FK_79d262bd6e8fb41623bfaebde01" FOREIGN KEY ("coinId") REFERENCES "coins"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "coins" ADD CONSTRAINT "FK_4b6e6531236804ad867d9e44ea1" FOREIGN KEY ("investorId") REFERENCES "investors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "coins" DROP CONSTRAINT "FK_4b6e6531236804ad867d9e44ea1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "investors" DROP CONSTRAINT "FK_79d262bd6e8fb41623bfaebde01"`,
    );
    await queryRunner.query(
      `ALTER TABLE "coins" DROP CONSTRAINT "UQ_4b6e6531236804ad867d9e44ea1"`,
    );
    await queryRunner.query(`ALTER TABLE "coins" DROP COLUMN "investorId"`);
    await queryRunner.query(`DROP TABLE "investors"`);
  }
}
