import { PlanType } from "../../../generated/prisma/enums";
import { prisma } from "../../prisma/prisma";

interface CreateWeeklyPlanRequest {
    user_id: string
    day_of_week: number
    workout_id?: string
    note?: string
    type: PlanType
}

class CreateWeeklyPlanService {
    async execute({ user_id, day_of_week, workout_id, note, type }: CreateWeeklyPlanRequest) {
        if (!user_id) throw new Error("User ID is required");
        if (day_of_week === undefined || day_of_week < 0 || day_of_week > 6) {
            throw new Error("day_of_week must be between 0 and 6");
        }
        if (type === "WORKOUT" && !workout_id) {
            throw new Error("Workout is required.");
        }

        const weekly_plan = await prisma.weekly_plan.create({
            data: {
                day_of_week,
                note,
                type,
                user: {
                    connect: { id: user_id }
                },

                ...(type === "WORKOUT" && {
                    workout: {
                        connect: { id: workout_id }
                    }
                })
            },
            include: {
                workout: {
                    select: {
                        id: true,
                        name: true
                    }
                }
            }
        });

        return weekly_plan;
    }
}

export { CreateWeeklyPlanService }
