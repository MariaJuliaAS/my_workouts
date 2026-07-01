import { prisma } from "../../prisma/prisma";

class GetWorkoutByIdService {
    async execute(workout_id: string, user_id: string) {
        if (!workout_id) throw new Error("Workout ID is required");
        if (!user_id) throw new Error("User ID is required");

        const workout = await prisma.workouts.findFirst({
            where: {
                id: workout_id,
                user: { id: user_id },
                deleted_at: null
            },
            include: {
                exercises: {
                    where: { deleted_at: null }
                },
                workout_logs: {
                    where: { deleted_at: null }
                }
            }
        });
        if (!workout) throw new Error("Workout not found");

        return workout;
    }
}

export { GetWorkoutByIdService }
