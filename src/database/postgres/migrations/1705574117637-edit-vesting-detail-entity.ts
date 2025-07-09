import { MigrationInterface, QueryRunner } from 'typeorm';

export class EditVestingDetailEntity1705574117637
  implements MigrationInterface
{
  name = 'EditVestingDetailEntity1705574117637';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "vesting_details"
            ALTER COLUMN "tokens" TYPE numeric
        `);
    await queryRunner.query(`
            ALTER TABLE "vesting_details"
            ALTER COLUMN "tokenPercent" TYPE numeric
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "vesting_details"
            ALTER COLUMN "tokenPercent" TYPE numeric(5, 2)
        `);
    await queryRunner.query(`
            ALTER TABLE "vesting_details"
            ALTER COLUMN "tokens" TYPE numeric(10, 2)
        `);
  }
}
