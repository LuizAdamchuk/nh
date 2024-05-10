/*
  Warnings:

  - The values [financial_service] on the enum `OrganizationFieldType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "OrganizationFieldType_new" AS ENUM ('financialService', 'health', 'ong', 'default');
ALTER TABLE "Organization" ALTER COLUMN "field" DROP DEFAULT;
ALTER TABLE "Organization" ALTER COLUMN "field" TYPE "OrganizationFieldType_new" USING ("field"::text::"OrganizationFieldType_new");
ALTER TYPE "OrganizationFieldType" RENAME TO "OrganizationFieldType_old";
ALTER TYPE "OrganizationFieldType_new" RENAME TO "OrganizationFieldType";
DROP TYPE "OrganizationFieldType_old";
ALTER TABLE "Organization" ALTER COLUMN "field" SET DEFAULT 'default';
COMMIT;
