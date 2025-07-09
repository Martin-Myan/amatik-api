import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterCoinsTable1707652993514 implements MigrationInterface {
  name = 'AlterCoinsTable1707652993514';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "coins"
            ADD "description" text
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "coins" DROP COLUMN "description"
        `);
  }
}
