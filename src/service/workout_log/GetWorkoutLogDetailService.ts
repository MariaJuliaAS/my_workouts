import { prisma } from "../../prisma/prisma";

class GetWorkoutLogDetailService {
    async execute(workout_log_id: string) {
        if (!workout_log_id) {
            throw new Error("Workout log ID is required");
        }

        const workout_log = await prisma.workout_logs.findFirst({
            where: {
                id: workout_log_id,
                deleted_at: null,
            },
            include: {
                workouts: {
                    select: {
                        id: true,
                        name: true,
                    }
                },
                exercises_logs: {
                    where: {
                        deleted_at: null,
                    },
                    include: {
                        exercise: {
                            select: {
                                id: true,
                                name: true,
                                notes: true
                            }
                        }
                    },
                    orderBy: [
                        { exercise_id: "asc" },
                        { set_number: "asc" }
                    ]
                }
            }
        })

        if (!workout_log) {
            throw new Error("Workout log not found");
        }

        return workout_log;
    }
}

export { GetWorkoutLogDetailService }
