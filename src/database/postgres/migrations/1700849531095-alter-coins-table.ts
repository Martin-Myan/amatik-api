import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterCoinsTable1700849531095 implements MigrationInterface {
  name = 'AlterCoinsTable1700849531095';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "blockchains" DROP COLUMN "developers"`,
    );
    await queryRunner.query(`ALTER TABLE "coins" ADD "developers" integer`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "coins" DROP COLUMN "developers"`);
    await queryRunner.query(
      `ALTER TABLE "blockchains" ADD "developers" integer`,
    );
  }
}
