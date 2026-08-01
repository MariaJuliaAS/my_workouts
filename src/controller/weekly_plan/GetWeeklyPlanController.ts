import { Request, Response } from "express";
import { GetWeeklyPlanService } from "../../service/weekly_plan/GetWeeklyPlanService";

class GetWeeklyPlanController {
    async handle(req: Request, res: Response) {
        const user_id = req.user_id;

        const service = new GetWeeklyPlanService();
        const weekly_plans = await service.execute(user_id);

        return res.json(weekly_plans);
    }
}

export { GetWeeklyPlanController }
