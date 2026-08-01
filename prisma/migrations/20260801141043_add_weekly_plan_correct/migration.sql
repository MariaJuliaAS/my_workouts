-- CreateTable
CREATE TABLE "Weekly_plans" (
    "id" TEXT NOT NULL,
    "day_of_week" INTEGER NOT NULL,
    "note" TEXT,
    "deleted_at" TIMESTAMP(3),
    "user_id" TEXT NOT NULL,
    "workout_id" TEXT,

    CONSTRAINT "Weekly_plans_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Weekly_plans" ADD CONSTRAINT "Weekly_plans_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Weekly_plans" ADD CONSTRAINT "Weekly_plans_workout_id_fkey" FOREIGN KEY ("workout_id") REFERENCES "Workouts"("id") ON DELETE SET NULL ON UPDATE CASCADE;
