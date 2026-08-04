import { Request, Response } from "express";
import { GetLastCompletedWorkoutLogService } from "../../service/workout_log/GetLastCompletedWorkoutLogService";

class GetLastCompletedWorkoutLogController {
    async handle(req: Request, res: Response) {
        const { workout_id } = req.params as { workout_id: string };

        const service = new GetLastCompletedWorkoutLogService();
        const last_log = await service.execute(workout_id);

        return res.json(last_log);
    }
}

export { GetLastCompletedWorkoutLogController }
