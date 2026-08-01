import { Request, Response } from "express";
import { CreateWeeklyPlanService } from "../../service/weekly_plan/CreateWeeklyPlanService";
import { PlanType } from "../../../generated/prisma/enums";

class CreateWeeklyPlanController {
    async handle(req: Request, res: Response) {
        const user_id = req.user_id;
        const { day_of_week, workout_id, note, type } = req.body as {
            day_of_week: number
            workout_id?: string
            note?: string
            type: PlanType
        }

        const service = new CreateWeeklyPlanService();
        const weekly_plan = await service.execute({ user_id, day_of_week, workout_id, note, type });

        return res.json(weekly_plan);
    }
}

export { CreateWeeklyPlanController }
