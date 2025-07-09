import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterCoinsTable1704828248457 implements MigrationInterface {
  name = 'AlterCoinsTable1704828248457';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "coins"
            ADD "launchDate" character varying
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "coins" DROP COLUMN "launchDate"
        `);
  }
}
