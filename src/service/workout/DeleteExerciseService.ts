import { prisma } from "../../prisma/prisma";

class DeleteExerciseService {
    async execute(exercise_id: string, user_id: string) {
        if (!exercise_id) throw new Error("Exercise ID is required");
        if (!user_id) throw new Error("User ID is required");

        const exercise = await prisma.exercises.findFirst({
            where: {
                id: exercise_id,
                workouts: {
                    user_id,
                },
                deleted_at: null,
            },
            include: {
                workouts: true,
            },
        });

        if (!exercise) throw new Error("Exercise not found or not owned by user");

        const deleted_at = new Date();

        await prisma.exercises_logs.updateMany({
            where: {
                exercise_id,
                deleted_at: null,
            },
            data: {
                deleted_at,
            },
        });

        await prisma.exercises.update({
            where: { id: exercise_id },
            data: {
                deleted_at,
            },
        });

        return {
            message: "Exercise '" + exercise.name + "' deleted",
        };
    }
}

export { DeleteExerciseService };