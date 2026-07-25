import { prisma } from "../../prisma/prisma";

class GetPendingWorkoutLogService {
    async execute(workout_id: string) {
        if (!workout_id) {
            throw new Error("Workout ID is required");
        }

        const pending_log = await prisma.workout_logs.findFirst({
            where: {
                workouts_id: workout_id,
                completed_at: null,
                deleted_at: null,
            },
            orderBy: {
                started_at: "desc"
            }
        })

        return pending_log;
    }
}

export { GetPendingWorkoutLogService }
