import { prisma } from "../../prisma/prisma";

class GetAllWorkoutsService {
    async execute(user_id: string) {
        if (!user_id) throw new Error("User ID is required");

        const workouts = await prisma.workouts.findMany({
            where: {
                user: { id: user_id },
                deleted_at: null
            },
            include: {
                exercises: {
                    where: { deleted_at: null }
                },
                workout_logs: {
                    where: { deleted_at: null }
                },
            }
        });

        return workouts;
    }
}

export { GetAllWorkoutsService }
