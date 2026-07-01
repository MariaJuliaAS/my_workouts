import { Request, Response } from "express";
import { DeleteExerciseService } from "../../service/workout/DeleteExerciseService";

class DeleteExerciseController {
    async handle(req: Request, res: Response) {
        try {
            const { id } = req.params as { id: string };
            const user_id = req.user_id;

            const service = new DeleteExerciseService();
            const result = await service.execute(id, user_id);

            return res.json(result);
        } catch (err: any) {
            return res.status(400).json({ error: err.message });
        }
    }
}

export { DeleteExerciseController };