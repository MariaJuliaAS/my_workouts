import { Router } from "express";
import { CreateUserController } from "./controller/user/CreateUserController";
import { AuthUserController } from "./controller/user/AuthUserController";
import { rateLimiter } from "./middleware/rateLimiter";
import { isAuthenticated } from "./middleware/isAuthenticated";
import { DetailUserController } from "./controller/user/DetailUserController";
import { CreateWorkoutController } from "./controller/workout/CreateWorkoutController";
import { GetAllWorkoutsController } from "./controller/workout/GetAllWorkoutsController";
import { GetWorkoutController } from "./controller/workout/GetWorkoutController";
import { UpdateWorkoutController } from "./controller/workout/UpdateWorkoutController";
import { DeleteWorkoutController } from "./controller/workout/DeleteWorkoutController";
import { DeleteExerciseController } from "./controller/workout/DeleteExerciseController";
import { StartWorkoutLogController } from "./controller/workout_log/StartWorkoutLogController";
import { CompletedWorkoutLogController } from "./controller/workout_log/CompletedWorkoutLogController";
import { CreatePrController } from "./controller/personal_record/CreatePrController";
import { GetAllPrController } from "./controller/personal_record/GetAllPrController";
import { DeletePrController } from "./controller/personal_record/DeletePrController";

const router = Router();

router.post("/user", new CreateUserController().handle)
router.post("/user/auth", rateLimiter, new AuthUserController().handle)
router.get("/user/detail", isAuthenticated, new DetailUserController().handle)

router.post("/workout", isAuthenticated, new CreateWorkoutController().handle)
router.get("/workout", isAuthenticated, new GetAllWorkoutsController().handle)
router.get("/workout/:id", isAuthenticated, new GetWorkoutController().handle)
router.put("/workout/:id", isAuthenticated, new UpdateWorkoutController().handle)
router.delete("/workout/:id", isAuthenticated, new DeleteWorkoutController().handle)
router.delete("/workout/exercise/:id", isAuthenticated, new DeleteExerciseController().handle)

router.post("/workout_log/start/:workout_id", isAuthenticated, new StartWorkoutLogController().handle)
router.put("/workout_log/completed/:workoutLog_id", isAuthenticated, new CompletedWorkoutLogController().handle)

router.post("/personal_record", isAuthenticated, new CreatePrController().handle)
router.get("/personal_record", isAuthenticated, new GetAllPrController().handle)
router.delete("/personal_record/:id", isAuthenticated, new DeletePrController().handle)

export { router };