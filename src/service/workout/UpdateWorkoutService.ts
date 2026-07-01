import { prisma } from "../../prisma/prisma";

interface ExerciseInput {
    id?: string;
    name: string;
    sets: number;
    reps: number;
    notes?: string;
}

interface UpdateWorkoutRequest {
    name: string;
    exercises?: ExerciseInput[];
    workout_id: string;
    user_id: string;
}

class UpdateWorkoutService {
    async execute({ name, workout_id, exercises, user_id }: UpdateWorkoutRequest) {
        if (!workout_id) throw new Error("Workout ID is required");
        if (!user_id) throw new Error("User ID is required");

        const workout = await prisma.workouts.findFirst({
            where: {
                id: workout_id,
                user_id,
                deleted_at: null,
            }
        });
        if (!workout) throw new Error("Workout not found or not owned by user");

        const existingExercises = exercises?.filter((exercise) => exercise.id) ?? [];
        const newExercises = exercises?.filter((exercise) => !exercise.id) ?? [];

        const updated = await prisma.$transaction(async (transaction) => {
            for (const exercise of existingExercises) {
                await transaction.exercises.update({
                    where: { id: exercise.id as string },
                    data: {
                        name: exercise.name,
                        sets: exercise.sets,
                        reps: exercise.reps,
                        notes: exercise.notes,
                    }
                });
            }

            if (newExercises.length > 0) {
                await transaction.exercises.createMany({
                    data: newExercises.map((exercise) => ({
                        name: exercise.name,
                        sets: exercise.sets,
                        reps: exercise.reps,
                        notes: exercise.notes,
                        workouts_id: workout_id,
                    }))
                });
            }

            return transaction.workouts.update({
                where: { id: workout_id },
                data: {
                    name,
                },
                include: {
                    exercises: {
                        where: { deleted_at: null },
                    },
                }
            });
        });

        return updated;
    }
}

export { UpdateWorkoutService }
