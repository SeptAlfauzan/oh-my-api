/*
  Warnings:

  - Changed the type of `field_type` on the `request_body_rules` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "FieldType" AS ENUM ('INTEGER', 'DOUBLE', 'TEXT', 'BOOLEAN');

-- AlterTable
ALTER TABLE "request_body_rules" DROP COLUMN "field_type";
ALTER TABLE "request_body_rules" ADD COLUMN     "field_type" "FieldType" NOT NULL;
