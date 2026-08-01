import { Request, Response } from "express";
import { DeleteWeeklyPlanService } from "../../service/weekly_plan/DeleteWeeklyPlanService";

class DeleteWeeklyPlanController {
    async handle(req: Request, res: Response) {
        const { plan_id } = req.params as { plan_id: string };

        const service = new DeleteWeeklyPlanService();
        const deleted = await service.execute(plan_id);

        return res.json(deleted);
    }
}

export { DeleteWeeklyPlanController }
