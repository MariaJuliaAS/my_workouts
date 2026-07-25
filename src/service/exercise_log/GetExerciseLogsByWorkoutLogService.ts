import { prisma } from "../../prisma/prisma";

class GetExerciseLogsByWorkoutLogService {
    async execute(workout_logs_id: string) {
        if (!workout_logs_id) {
            throw new Error("workout_logs_id is required");
        }

        const exercise_logs = await prisma.exercises_logs.findMany({
            where: {
                workout_logs_id,
                deleted_at: null,
            },
            orderBy: [
                { exercise_id: "asc" },
                { set_number: "asc" }
            ]
        })

        return exercise_logs;
    }
}

export { GetExerciseLogsByWorkoutLogService }
