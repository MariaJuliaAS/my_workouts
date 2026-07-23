import { Request, Response } from "express";
import { CreateExerciseLogService } from "../../service/exercise_log/CreateExerciseLogService";

class CreateExerciseLogController {
    async handle(req: Request, res: Response) {
        const { workout_logs_id, exercise_id, set_number, weight, reps } = req.body as {
            workout_logs_id: string
            exercise_id: string
            set_number: number
            weight: number
            reps: number
        }

        const service = new CreateExerciseLogService();
        const exercise_log = await service.execute({ workout_logs_id, exercise_id, set_number, weight, reps });

        return res.json(exercise_log);
    }
}

export { CreateExerciseLogController }
