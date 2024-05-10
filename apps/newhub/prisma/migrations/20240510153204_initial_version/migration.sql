/*
  Warnings:

  - The `status` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('inactive', 'active', 'pendingEmailValidation', 'pendingOrganization', 'pendingBIIntegration', 'pendingUserConfigs');

-- CreateEnum
CREATE TYPE "OrganizationFieldType" AS ENUM ('financial_service', 'health', 'ong', 'default');

-- AlterTable
ALTER TABLE "Organization" ADD COLUMN     "field" "OrganizationFieldType" NOT NULL DEFAULT 'default';

-- AlterTable
ALTER TABLE "User" DROP COLUMN "status",
ADD COLUMN     "status" "UserStatus" DEFAULT 'inactive';
