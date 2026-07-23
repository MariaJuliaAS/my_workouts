import { prisma } from "../../prisma/prisma";

interface CreateExerciseLogRequest {
    workout_logs_id: string
    exercise_id: string
    set_number: number
    weight: number
    reps: number
}

class CreateExerciseLogService {
    async execute({ workout_logs_id, exercise_id, set_number, weight, reps }: CreateExerciseLogRequest) {
        if (!workout_logs_id || !exercise_id) {
            throw new Error("workout_logs_id and exercise_id are required");
        }

        const workoutLog = await prisma.workout_logs.findFirst({
            where: { id: workout_logs_id }
        })
        if (!workoutLog) {
            throw new Error("Workout log not found");
        }

        const exercise = await prisma.exercises.findFirst({
            where: { id: exercise_id }
        })
        if (!exercise) {
            throw new Error("Exercise not found");
        }

        const exercise_log = await prisma.exercises_logs.create({
            data: {
                set_number,
                weight,
                reps,
                completed: true,
                workout_logs: {
                    connect: { id: workout_logs_id }
                },
                exercise: {
                    connect: { id: exercise_id }
                }
            }
        })

        return exercise_log;
    }
}

export { CreateExerciseLogService }
