import { Request, Response } from "express";
import { CreateWorkoutService } from "../../service/workout/CreateWorkoutService";

class CreateWorkoutController {
    async handle(req: Request, res: Response) {
        try {
            const { name, exercises } = req.body;
            const user_id = req.user_id;

            const service = new CreateWorkoutService();
            const workout = await service.execute({
                user_id,
                name,
                exercises,
            });

            return res.status(201).json(workout);
        } catch (err: any) {
            return res.status(400).json({ error: err.message });
        }
    }
}

export { CreateWorkoutController }
