-- CreateEnum
CREATE TYPE "PlanType" AS ENUM ('WORKOUT', 'REST', 'CARDIO');

-- AlterTable
ALTER TABLE "Weekly_plans" ADD COLUMN     "type" "PlanType" NOT NULL DEFAULT 'REST';
