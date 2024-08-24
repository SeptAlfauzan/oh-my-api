/*
  Warnings:

  - You are about to drop the `ApiEndpoint` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RequestBodyRule` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Workspace` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ApiEndpoint" DROP CONSTRAINT "ApiEndpoint_workspace_id_fkey";

-- DropForeignKey
ALTER TABLE "RequestBodyRule" DROP CONSTRAINT "RequestBodyRule_api_endpoint_id_fkey";

-- DropForeignKey
ALTER TABLE "Workspace" DROP CONSTRAINT "Workspace_author_id_fkey";

-- DropTable
DROP TABLE "ApiEndpoint";

-- DropTable
DROP TABLE "RequestBodyRule";

-- DropTable
DROP TABLE "User";

-- DropTable
DROP TABLE "Workspace";

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "workspaces" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "author_id" TEXT NOT NULL,

    CONSTRAINT "workspaces_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "api_endpoints" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "desc" TEXT,
    "workspace_id" TEXT NOT NULL,
    "httpMethod" "HttpMethod" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "api_endpoints_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "request_body_rules" (
    "id" SERIAL NOT NULL,
    "api_endpoint_id" TEXT NOT NULL,
    "field_name" TEXT NOT NULL,
    "field_type" TEXT NOT NULL,
    "is_required" BOOLEAN NOT NULL,
    "min_length" INTEGER,
    "max_length" INTEGER,
    "pattern" TEXT,

    CONSTRAINT "request_body_rules_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "workspaces" ADD CONSTRAINT "workspaces_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "api_endpoints" ADD CONSTRAINT "api_endpoints_workspace_id_fkey" FOREIGN KEY ("workspace_id") REFERENCES "workspaces"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "request_body_rules" ADD CONSTRAINT "request_body_rules_api_endpoint_id_fkey" FOREIGN KEY ("api_endpoint_id") REFERENCES "api_endpoints"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
