import { Request, Response } from "express";
import { GetAllWorkoutsService } from "../../service/workout/GetAllWorkoutsService";

class GetAllWorkoutsController {
    async handle(req: Request, res: Response) {
        const user_id = req.user_id;

        const service = new GetAllWorkoutsService();
        const workouts = await service.execute(user_id);


        return res.json(workouts);
    }
}

export { GetAllWorkoutsController }
