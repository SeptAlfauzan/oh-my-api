/*
  Warnings:

  - The primary key for the `request_body_rules` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "request_body_rules" DROP CONSTRAINT "request_body_rules_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "request_body_rules_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "request_body_rules_id_seq";
