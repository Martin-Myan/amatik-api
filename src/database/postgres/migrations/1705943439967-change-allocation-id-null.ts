import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeAllocationIdNull1705943439967 implements MigrationInterface {
  name = 'ChangeAllocationIdNull1705943439967';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "vesting_details" DROP CONSTRAINT "FK_7b809117cba232fb4374ed4b4e2"
        `);
    await queryRunner.query(`
            ALTER TABLE "vesting_details"
            ALTER COLUMN "allocationId" DROP NOT NULL
        `);
    await queryRunner.query(`
            ALTER TABLE "vesting_details"
            ALTER COLUMN "color" DROP NOT NULL
        `);
    await queryRunner.query(`
            ALTER TABLE "vesting_details"
            ADD CONSTRAINT "FK_7b809117cba232fb4374ed4b4e2" FOREIGN KEY ("allocationId") REFERENCES "allocation"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "vesting_details" DROP CONSTRAINT "FK_7b809117cba232fb4374ed4b4e2"
        `);
    await queryRunner.query(`
            ALTER TABLE "vesting_details"
            ALTER COLUMN "color"
            SET NOT NULL
        `);
    await queryRunner.query(`
            ALTER TABLE "vesting_details"
            ALTER COLUMN "allocationId"
            SET NOT NULL
        `);
    await queryRunner.query(`
            ALTER TABLE "vesting_details"
            ADD CONSTRAINT "FK_7b809117cba232fb4374ed4b4e2" FOREIGN KEY ("allocationId") REFERENCES "allocation"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
  }
}
