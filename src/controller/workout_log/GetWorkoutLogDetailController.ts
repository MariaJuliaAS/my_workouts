import { Request, Response } from "express";
import { GetWorkoutLogDetailService } from "../../service/workout_log/GetWorkoutLogDetailService";

class GetWorkoutLogDetailController {
    async handle(req: Request, res: Response) {
        const { workout_log_id } = req.params as { workout_log_id: string };

        const service = new GetWorkoutLogDetailService();
        const workout_log = await service.execute(workout_log_id);

        return res.json(workout_log);
    }
}

export { GetWorkoutLogDetailController }
