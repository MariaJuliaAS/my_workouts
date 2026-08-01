import { Request, Response } from "express";
import { UpdateWeeklyPlanService } from "../../service/weekly_plan/UpdateWeeklyPlanService";
import { PlanType } from "../../../generated/prisma/enums";

class UpdateWeeklyPlanController {
    async handle(req: Request, res: Response) {
        const { plan_id } = req.params as { plan_id: string };
        const { workout_id, note, type } = req.body as {
            workout_id?: string | null
            note?: string
            type: PlanType
        }

        const service = new UpdateWeeklyPlanService();
        const updated = await service.execute({ plan_id, workout_id, note, type });

        return res.json(updated);
    }
}

export { UpdateWeeklyPlanController }
