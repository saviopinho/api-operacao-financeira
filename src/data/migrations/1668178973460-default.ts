import { MigrationInterface, QueryRunner } from "typeorm";

export class default1668178973460 implements MigrationInterface {
    name = 'default1668178973460'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "transactions" ("id" text NOT NULL, "value" numeric(12,2) NOT NULL, "description" text NOT NULL, "accountId" text NOT NULL, "reversedAt" TIMESTAMP WITH TIME ZONE, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, CONSTRAINT "PK_a219afd8dd77ed80f5a862f1db9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "people" ("id" text NOT NULL, "document" text NOT NULL, "name" text NOT NULL, "password" text NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, CONSTRAINT "UQ_997a421a0bac0513909d23a1c2a" UNIQUE ("document"), CONSTRAINT "PK_aa866e71353ee94c6cc51059c5b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "cards" ("id" text NOT NULL, "type" text NOT NULL, "number" text NOT NULL, "cvv" text NOT NULL, "document" text NOT NULL, "accountId" text NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, CONSTRAINT "PK_5f3269634705fdff4a9935860fc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "accounts" ("id" text NOT NULL, "branch" text NOT NULL, "account" text NOT NULL, "document" text NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, CONSTRAINT "PK_5a7a02c20412299d198e097a8fe" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "accounts"`);
        await queryRunner.query(`DROP TABLE "cards"`);
        await queryRunner.query(`DROP TABLE "people"`);
        await queryRunner.query(`DROP TABLE "transactions"`);
    }

}
