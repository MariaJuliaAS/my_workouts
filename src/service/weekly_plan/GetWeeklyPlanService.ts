import { prisma } from "../../prisma/prisma";

class GetWeeklyPlanService {
    async execute(user_id: string) {
        if (!user_id) throw new Error("User ID is required");

        const weekly_plans = await prisma.weekly_plan.findMany({
            where: {
                user_id,
                deleted_at: null,
            },
            include: {
                workout: { select: { id: true, name: true } }
            },
            orderBy: { day_of_week: "asc" }
        })

        return weekly_plans;
    }
}

export { GetWeeklyPlanService }
