import { Request, Response } from "express";
import { GetExerciseLogsByWorkoutLogService } from "../../service/exercise_log/GetExerciseLogsByWorkoutLogService";

class GetExerciseLogsByWorkoutLogController {
    async handle(req: Request, res: Response) {
        const { workout_log_id } = req.params as { workout_log_id: string };

        const service = new GetExerciseLogsByWorkoutLogService();
        const exercise_logs = await service.execute(workout_log_id);

        return res.json(exercise_logs);
    }
}

export { GetExerciseLogsByWorkoutLogController }
