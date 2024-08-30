-- CreateTable
CREATE TABLE "parameter_endpoints" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "api_endpoint_id" TEXT NOT NULL,

    CONSTRAINT "parameter_endpoints_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "parameter_endpoints" ADD CONSTRAINT "parameter_endpoints_api_endpoint_id_fkey" FOREIGN KEY ("api_endpoint_id") REFERENCES "api_endpoints"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
