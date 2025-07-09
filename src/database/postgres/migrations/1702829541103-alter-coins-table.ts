import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterCoinsTable1702829541103 implements MigrationInterface {
  name = 'AlterCoinsTable1702829541103';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "coins" ADD "index" integer`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "coins" DROP COLUMN "index"`);
  }
}
