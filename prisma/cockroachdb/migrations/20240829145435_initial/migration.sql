/*
  Warnings:

  - You are about to drop the column `useAuthorization` on the `request_body_rules` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "api_endpoints" ADD COLUMN     "useAuthorization" BOOL NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "request_body_rules" DROP COLUMN "useAuthorization";
