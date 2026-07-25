import { Request, Response } from "express";
import { GetAllWorkoutLogsService } from "../../service/workout_log/GetAllWorkoutLogsService";

class GetAllWorkoutLogsController {
    async handle(req: Request, res: Response) {
        const user_id = req.user_id;

        const service = new GetAllWorkoutLogsService();
        const workout_logs = await service.execute(user_id);

        return res.json(workout_logs);
    }
}

export { GetAllWorkoutLogsController }
