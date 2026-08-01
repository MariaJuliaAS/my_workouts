import { prisma } from "../../prisma/prisma";

class DeleteWeeklyPlanService {
    async execute(plan_id: string) {
        if (!plan_id) throw new Error("Plan ID is required");

        const plan = await prisma.weekly_plan.findFirst({
            where: { id: plan_id, deleted_at: null }
        })
        if (!plan) throw new Error("Weekly plan not found");

        const deleted = await prisma.weekly_plan.update({
            where: { id: plan_id },
            data: { deleted_at: new Date() }
        })

        return deleted;
    }
}

export { DeleteWeeklyPlanService }
