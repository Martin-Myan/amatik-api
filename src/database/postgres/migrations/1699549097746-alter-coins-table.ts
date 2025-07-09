import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterCoinsTable1699549097746 implements MigrationInterface {
  name = 'AlterCoinsTable1699549097746';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "coins" ADD "market_cap" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "coins" ADD "facebook_url" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "coins" ADD "twitter_url" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "coins" ADD "telegram_url" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "coins" ADD "subreddit_url" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "coins" ADD "repo_url" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "coins" DROP COLUMN "repo_url"`);
    await queryRunner.query(`ALTER TABLE "coins" DROP COLUMN "subreddit_url"`);
    await queryRunner.query(`ALTER TABLE "coins" DROP COLUMN "telegram_url"`);
    await queryRunner.query(`ALTER TABLE "coins" DROP COLUMN "twitter_url"`);
    await queryRunner.query(`ALTER TABLE "coins" DROP COLUMN "facebook_url"`);
    await queryRunner.query(`ALTER TABLE "coins" DROP COLUMN "market_cap"`);
  }
}
