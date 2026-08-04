import { prisma } from "../../prisma/prisma";

class GetLastCompletedWorkoutLogService {
    async execute(workout_id: string) {
        if (!workout_id) throw new Error("Workout ID is required");

        const last_log = await prisma.workout_logs.findFirst({
            where: {
                workouts_id: workout_id,
                completed_at: { not: null },
                deleted_at: null,
            },
            orderBy: { completed_at: "desc" },
            include: {
                exercises_logs: {
                    where: { deleted_at: null },
                    select: {
                        exercise_id: true,
                        set_number: true,
                        weight: true,
                        reps: true,
                    },
                    orderBy: [
                        { exercise_id: "asc" },
                        { set_number: "asc" },
                    ]
                }
            }
        })

        return last_log;
    }
}

export { GetLastCompletedWorkoutLogService }
