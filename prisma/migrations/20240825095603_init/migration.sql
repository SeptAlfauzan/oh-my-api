/*
  Warnings:

  - Added the required column `jsonResponseUrl` to the `api_endpoints` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "api_endpoints" ADD COLUMN     "jsonResponseUrl" TEXT NOT NULL;
