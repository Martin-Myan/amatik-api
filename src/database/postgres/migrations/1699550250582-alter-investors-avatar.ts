import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterInvestorsAvatar1699550250582 implements MigrationInterface {
  name = 'AlterInvestorsAvatar1699550250582';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "investors" ALTER COLUMN "avatar" DROP NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "investors" ALTER COLUMN "avatar" SET NOT NULL`,
    );
  }
}
