import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddAllocation1703591280475 implements MigrationInterface {
  name = 'AddAllocation1703591280475';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "vesting_details" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "allocationId" integer NOT NULL, "stageName" character varying, "order" integer, "color" character varying(10) NOT NULL, "price" numeric(10,2), "priceDisplay" character varying, "tokens" numeric(10,2), "tokenPercent" numeric(5,2), "roundRaise" character varying, "roundRaiseDisplay" character varying, "valuation" character varying, "valuationDisplay" character varying, "vesting" character varying, "vestingDisplay" character varying, CONSTRAINT "PK_6b9a2190c933349d4c34c266980" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "allocation" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "totalRaise" character varying NOT NULL, "totalCirculation" character varying NOT NULL, "ticker" character varying NOT NULL, "coinId" integer, CONSTRAINT "REL_ac0c922fe27f5813b4d5827d91" UNIQUE ("coinId"), CONSTRAINT "PK_7df89c736595e454b6ae07264fe" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "vesting_details" ADD CONSTRAINT "FK_7b809117cba232fb4374ed4b4e2" FOREIGN KEY ("allocationId") REFERENCES "allocation"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "allocation" ADD CONSTRAINT "FK_ac0c922fe27f5813b4d5827d914" FOREIGN KEY ("coinId") REFERENCES "coins"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "allocation" DROP CONSTRAINT "FK_ac0c922fe27f5813b4d5827d914"`,
    );
    await queryRunner.query(
      `ALTER TABLE "vesting_details" DROP CONSTRAINT "FK_7b809117cba232fb4374ed4b4e2"`,
    );
    await queryRunner.query(`DROP TABLE "allocation"`);
    await queryRunner.query(`DROP TABLE "vesting_details"`);
  }
}
