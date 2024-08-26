-- CreateEnum
CREATE TYPE "HttpMethod" AS ENUM ('GET', 'POST', 'PUT', 'DELETE', 'PATCH');

-- CreateTable
CREATE TABLE "users" (
    "id" STRING NOT NULL,
    "username" STRING NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "workspaces" (
    "id" STRING NOT NULL,
    "name" STRING NOT NULL,
    "last_edited" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "author_id" STRING NOT NULL,

    CONSTRAINT "workspaces_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "api_endpoints" (
    "id" STRING NOT NULL,
    "name" STRING NOT NULL,
    "desc" STRING,
    "httpMethod" "HttpMethod" NOT NULL,
    "jsonResponseUrl" STRING NOT NULL,
    "workspace_id" STRING NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "api_endpoints_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "request_body_rules" (
    "id" STRING NOT NULL,
    "api_endpoint_id" STRING NOT NULL,
    "field_name" STRING NOT NULL,
    "field_type" STRING NOT NULL,
    "is_required" BOOL NOT NULL,
    "min_length" INT4,
    "max_length" INT4,
    "pattern" STRING,
    "useAuthorization" BOOL NOT NULL DEFAULT false,

    CONSTRAINT "request_body_rules_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "workspaces" ADD CONSTRAINT "workspaces_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "api_endpoints" ADD CONSTRAINT "api_endpoints_workspace_id_fkey" FOREIGN KEY ("workspace_id") REFERENCES "workspaces"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "request_body_rules" ADD CONSTRAINT "request_body_rules_api_endpoint_id_fkey" FOREIGN KEY ("api_endpoint_id") REFERENCES "api_endpoints"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
