import { PlanType } from "../../../generated/prisma/enums";
import { prisma } from "../../prisma/prisma";

interface UpdateWeeklyPlanRequest {
    plan_id: string
    workout_id?: string | null
    note?: string
    type: PlanType
}

class UpdateWeeklyPlanService {
    async execute({ plan_id, workout_id, note, type }: UpdateWeeklyPlanRequest) {
        if (!plan_id) throw new Error("Plan ID is required");

        const plan = await prisma.weekly_plan.findFirst({
            where: { id: plan_id, deleted_at: null }
        })
        if (!plan) throw new Error("Weekly plan not found");
        if (type === "WORKOUT" && !workout_id) {
            throw new Error("Workout is required.");
        }

        const updated = await prisma.weekly_plan.update({
            where: { id: plan_id },
            data: {
                note,
                type,
                workout_id: workout_id ?? null,
            },
            include: {
                workout: { select: { id: true, name: true } }
            }
        })

        return updated;
    }
}

export { UpdateWeeklyPlanService }
