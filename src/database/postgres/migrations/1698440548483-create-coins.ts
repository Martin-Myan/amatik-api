import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateCoins1698440548483 implements MigrationInterface {
  name = 'CreateCoins1698440548483';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "coinstats" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "type" integer NOT NULL, "percent" integer NOT NULL, "coinId" integer NOT NULL, CONSTRAINT "PK_ab1bd93314db0c6064368ca2f50" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "coins" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "coinId" character varying NOT NULL, "name" character varying NOT NULL, "image" character varying NOT NULL, "current_price" integer NOT NULL, "symbol" character varying NOT NULL, "circulating_supply" integer NOT NULL, "high_24h" integer NOT NULL, "total_volume" integer NOT NULL, "blockchainId" integer, CONSTRAINT "UQ_6f9cd369c68a7f912ded9553a12" UNIQUE ("coinId"), CONSTRAINT "REL_d37a27973dbbc70a1d713a623a" UNIQUE ("blockchainId"), CONSTRAINT "PK_af01e5dcef2c05e6385611205c6" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "blockchains" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "blockchainId" character varying NOT NULL, "coinId" integer, "developers" integer NOT NULL, "dapps" integer NOT NULL, "uaw" character varying NOT NULL, CONSTRAINT "UQ_413f39484e4bf9f856dda20dd51" UNIQUE ("blockchainId"), CONSTRAINT "REL_19b4882648ed9eac06ef3971e1" UNIQUE ("coinId"), CONSTRAINT "PK_388138041975d49f3d0446cf634" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "coinstats" ADD CONSTRAINT "FK_af4b466eede4acfc92cf9155db9" FOREIGN KEY ("coinId") REFERENCES "coins"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "coins" ADD CONSTRAINT "FK_d37a27973dbbc70a1d713a623ae" FOREIGN KEY ("blockchainId") REFERENCES "blockchains"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "blockchains" ADD CONSTRAINT "FK_19b4882648ed9eac06ef3971e1c" FOREIGN KEY ("coinId") REFERENCES "coins"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "blockchains" DROP CONSTRAINT "FK_19b4882648ed9eac06ef3971e1c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "coins" DROP CONSTRAINT "FK_d37a27973dbbc70a1d713a623ae"`,
    );
    await queryRunner.query(
      `ALTER TABLE "coinstats" DROP CONSTRAINT "FK_af4b466eede4acfc92cf9155db9"`,
    );
    await queryRunner.query(`DROP TABLE "blockchains"`);
    await queryRunner.query(`DROP TABLE "coins"`);
    await queryRunner.query(`DROP TABLE "coinstats"`);
  }
}
