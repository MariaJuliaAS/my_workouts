import { Request, Response } from "express";
import { GetPendingWorkoutLogService } from "../../service/workout_log/GetPendingWorkoutLogService";

class GetPendingWorkoutLogController {
    async handle(req: Request, res: Response) {
        const { workout_id } = req.params as { workout_id: string };

        const service = new GetPendingWorkoutLogService();
        const pending_log = await service.execute(workout_id);

        return res.json(pending_log);
    }
}

export { GetPendingWorkoutLogController }
