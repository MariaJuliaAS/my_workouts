import { Request, Response } from "express";
import { GetHomeStatsService } from "../../service/home_stats/GetHomeStatsService";

class GetHomeStatsController {
    async handle(req: Request, res: Response) {
        const user_id = req.user_id;
        const service = new GetHomeStatsService();
        const stats = await service.execute(user_id);
        return res.json(stats);
    }
}

export { GetHomeStatsController }
