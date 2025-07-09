import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddNullableAndRelation1715184054280 implements MigrationInterface {
  name = 'AddNullableAndRelation1715184054280';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "allocation" DROP CONSTRAINT "FK_ac0c922fe27f5813b4d5827d914"
        `);
    await queryRunner.query(`
            ALTER TABLE "allocation"
            ALTER COLUMN "totalRaise" DROP NOT NULL
        `);
    await queryRunner.query(`
            ALTER TABLE "allocation"
            ALTER COLUMN "totalCirculation" DROP NOT NULL
        `);
    await queryRunner.query(`
            ALTER TABLE "allocation" DROP CONSTRAINT "REL_ac0c922fe27f5813b4d5827d91"
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "allocation"
            ADD CONSTRAINT "REL_ac0c922fe27f5813b4d5827d91" UNIQUE ("coinId")
        `);
    await queryRunner.query(`
            ALTER TABLE "allocation"
            ALTER COLUMN "totalCirculation"
            SET NOT NULL
        `);
    await queryRunner.query(`
            ALTER TABLE "allocation"
            ALTER COLUMN "totalRaise"
            SET NOT NULL
        `);
    await queryRunner.query(`
            ALTER TABLE "allocation"
            ADD CONSTRAINT "FK_ac0c922fe27f5813b4d5827d914" FOREIGN KEY ("coinId") REFERENCES "coins"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
  }
}
