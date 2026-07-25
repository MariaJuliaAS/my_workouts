import { prisma } from "../../prisma/prisma";

class GetAllWorkoutLogsService {
    async execute(user_id: string) {
        if (!user_id) {
            throw new Error("User ID is required");
        }

        const workout_logs = await prisma.workout_logs.findMany({
            where: {
                deleted_at: null,
                workouts: {
                    user_id,
                    deleted_at: null,
                }
            },
            include: {
                workouts: {
                    select: {
                        id: true,
                        name: true,
                    }
                }
            },
            orderBy: {
                started_at: "desc"
            }
        })

        return workout_logs;
    }
}

export { GetAllWorkoutLogsService }
