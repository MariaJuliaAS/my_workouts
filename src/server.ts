import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import { router } from "./routes";

const app = express();

app.use(express.json());

app.use(
    cors({
        origin: "https://my-workouts-frontend-six.vercel.app",
        credentials: true,
        optionsSuccessStatus: 200,
    })
);

app.use(router);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof Error) {
        return res.status(400).json({
            error: err.message,
        });
    }

    return res.status(500).json({
        status: "error",
        message: "Internal Server Error.",
    });
});

const port = Number(process.env.PORT) || 3000;

app.listen(port, () => console.log(`Server running on port ${port}.`));