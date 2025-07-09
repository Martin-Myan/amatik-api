import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddChartTable1704809170510 implements MigrationInterface {
  name = 'AddChartTable1704809170510';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "chart_dataset" (
                "id" SERIAL NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                "deletedAt" TIMESTAMP,
                "coinId" integer,
                "label" character varying NOT NULL,
                "bg_color" character varying NOT NULL,
                "data" numeric array NOT NULL,
                CONSTRAINT "PK_6e6eb6538b9f57eee12c45e6807" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "chart_date" (
                "id" SERIAL NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                "deletedAt" TIMESTAMP,
                "coinId" integer,
                "date" character varying array,
                CONSTRAINT "REL_87ed39724c6c7c992421dbfc62" UNIQUE ("coinId"),
                CONSTRAINT "PK_7027304c9f11fc686846222004e" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            ALTER TABLE "chart_dataset"
            ADD CONSTRAINT "FK_e8d87c9c36757db29572552fb34" FOREIGN KEY ("coinId") REFERENCES "coins"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "chart_date"
            ADD CONSTRAINT "FK_87ed39724c6c7c992421dbfc624" FOREIGN KEY ("coinId") REFERENCES "coins"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "chart_date" DROP CONSTRAINT "FK_87ed39724c6c7c992421dbfc624"
        `);
    await queryRunner.query(`
            ALTER TABLE "chart_dataset" DROP CONSTRAINT "FK_e8d87c9c36757db29572552fb34"
        `);
    await queryRunner.query(`
            DROP TABLE "chart_date"
        `);
    await queryRunner.query(`
            DROP TABLE "chart_dataset"
        `);
  }
}
