import { prisma } from "../../prisma/prisma";

class DeleteWorkoutService {
    async execute(workout_id: string, user_id: string) {
        if (!workout_id) throw new Error("Workout ID is required");
        if (!user_id) throw new Error("User ID is required");

        const workout = await prisma.workouts.findFirst({
            where: {
                id: workout_id,
                user: { id: user_id },
                deleted_at: null
            }
        });
        if (!workout) throw new Error("Workout not found or not owned by user");

        const deleted_at = new Date();

        await prisma.exercises.updateMany({
            where: { workouts_id: workout_id, deleted_at: null },
            data: { deleted_at }
        });

        await prisma.workout_logs.updateMany({
            where: { workouts_id: workout_id, deleted_at: null },
            data: { deleted_at }
        });

        await prisma.workouts.update({
            where: { id: workout_id },
            data: { deleted_at }
        });

        return {
            message: "Workout '" + workout.name + "' deleted",
        };
    }
}

export { DeleteWorkoutService }
