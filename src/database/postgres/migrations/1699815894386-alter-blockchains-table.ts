import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterBlockchainsTable1699815894386 implements MigrationInterface {
  name = 'AlterBlockchainsTable1699815894386';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "coinstats" ALTER COLUMN "type" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "coinstats" ALTER COLUMN "percent" TYPE numeric(16,12)`,
    );
    await queryRunner.query(
      `ALTER TABLE "blockchains" ALTER COLUMN "developers" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "blockchains" ALTER COLUMN "dapps" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "blockchains" ALTER COLUMN "uaw" DROP NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "coinstats" ALTER COLUMN "percent" TYPE numeric(16,16)`,
    );
    await queryRunner.query(
      `ALTER TABLE "coinstats" ALTER COLUMN "type" DROP NOT NULL`,
    );

    await queryRunner.query(
      `ALTER TABLE "blockchains" ALTER COLUMN "uaw" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "blockchains" ALTER COLUMN "dapps" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "blockchains" ALTER COLUMN "developers" SET NOT NULL`,
    );
  }
}
