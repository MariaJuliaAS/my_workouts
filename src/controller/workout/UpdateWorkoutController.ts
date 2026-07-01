import { Request, Response } from "express";
import { UpdateWorkoutService } from "../../service/workout/UpdateWorkoutService";

class UpdateWorkoutController {
    async handle(req: Request, res: Response) {
        try {
            const { id } = req.params as { id: string };
            const { name, exercises } = req.body;
            const user_id = req.user_id;

            const service = new UpdateWorkoutService();
            const updated = await service.execute({
                name,
                workout_id: id,
                exercises,
                user_id,
            });
            return res.json(updated);
        } catch (err: any) {
            return res.status(400).json({ error: err.message });
        }
    }
}

export { UpdateWorkoutController }
