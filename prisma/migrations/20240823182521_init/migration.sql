-- CreateEnum
CREATE TYPE "HttpMethod" AS ENUM ('GET', 'POST', 'PUT', 'DELETE', 'PATCH');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Workspace" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "author_id" TEXT NOT NULL,

    CONSTRAINT "Workspace_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ApiEndpoint" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "desc" TEXT,
    "workspace_id" TEXT NOT NULL,
    "httpMethod" "HttpMethod" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ApiEndpoint_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RequestBodyRule" (
    "id" SERIAL NOT NULL,
    "api_endpoint_id" TEXT NOT NULL,
    "field_name" TEXT NOT NULL,
    "field_type" TEXT NOT NULL,
    "is_required" BOOLEAN NOT NULL,
    "min_length" INTEGER,
    "max_length" INTEGER,
    "pattern" TEXT,

    CONSTRAINT "RequestBodyRule_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Workspace" ADD CONSTRAINT "Workspace_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApiEndpoint" ADD CONSTRAINT "ApiEndpoint_workspace_id_fkey" FOREIGN KEY ("workspace_id") REFERENCES "Workspace"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RequestBodyRule" ADD CONSTRAINT "RequestBodyRule_api_endpoint_id_fkey" FOREIGN KEY ("api_endpoint_id") REFERENCES "ApiEndpoint"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
