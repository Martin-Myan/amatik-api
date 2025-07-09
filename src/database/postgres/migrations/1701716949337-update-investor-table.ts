import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateInvestorTable1701716949337 implements MigrationInterface {
  name = 'UpdateInvestorTable1701716949337';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "investors" DROP CONSTRAINT "CHK_0b88187a08d6eb07193cf8a1a0"`,
    );
    await queryRunner.query(
      `ALTER TABLE "investors" ADD "rating" integer NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "investors" DROP COLUMN "tier"`);
    await queryRunner.query(
      `ALTER TABLE "investors" ADD "tier" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "investors" ALTER COLUMN "type" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "investors" ALTER COLUMN "stage" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "investors" ADD CONSTRAINT "CHK_fc74c60c6e24cf1786d4dbc23c" CHECK ("rating" >= 0 AND "rating" <= 5)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "investors" DROP CONSTRAINT "CHK_fc74c60c6e24cf1786d4dbc23c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "investors" ALTER COLUMN "stage" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "investors" ALTER COLUMN "type" SET NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "investors" DROP COLUMN "tier"`);
    await queryRunner.query(
      `ALTER TABLE "investors" ADD "tier" integer NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "investors" DROP COLUMN "rating"`);
    await queryRunner.query(
      `ALTER TABLE "investors" ADD CONSTRAINT "CHK_0b88187a08d6eb07193cf8a1a0" CHECK (((tier >= 1) AND (tier <= 5)))`,
    );
  }
}
