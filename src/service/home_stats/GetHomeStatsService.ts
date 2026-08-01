import { prisma } from "../../prisma/prisma";

class GetHomeStatsService {
    async execute(user_id: string) {
        if (!user_id) throw new Error("User ID is required");

        const now = new Date();

        const dayOfWeek = now.getDay();
        const diffToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
        const monday = new Date(now);
        monday.setDate(now.getDate() + diffToMonday);
        monday.setHours(0, 0, 0, 0);
        const sunday = new Date(monday);
        sunday.setDate(monday.getDate() + 6);
        sunday.setHours(23, 59, 59, 999);

        const weekLogs = await prisma.workout_logs.findMany({
            where: {
                completed_at: { not: null, gte: monday, lte: sunday },
                deleted_at: null,
                workouts: { user_id, deleted_at: null },
            },
            select: { started_at: true, completed_at: true }
        })

        const weekMinutes = weekLogs.reduce((acc, log) => {
            if (!log.completed_at) return acc;
            return acc + (log.completed_at.getTime() - log.started_at.getTime()) / 1000 / 60;
        }, 0)
        const weekHours = parseFloat((weekMinutes / 60).toFixed(1));

        const allLogs = await prisma.workout_logs.findMany({
            where: {
                completed_at: { not: null },
                deleted_at: null,
                workouts: { user_id, deleted_at: null },
            },
            select: { completed_at: true },
            orderBy: { completed_at: "desc" }
        })
        const trainedDates = new Set(
            allLogs.map(l => l.completed_at!.toISOString().slice(0, 10))
        )

        const restDays = await prisma.weekly_plan.findMany({
            where: { user_id, workout_id: null, deleted_at: null },
            select: { day_of_week: true }
        })
        const restDayNumbers = new Set(restDays.map(r => r.day_of_week))

        let streak = 0;
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        for (let i = 0; i < 365; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() - i);
            const dateStr = date.toISOString().slice(0, 10);
            const dow = date.getDay();

            if (trainedDates.has(dateStr)) {
                streak++;
            } else if (restDayNumbers.has(dow)) {
                continue;
            } else {
                break;
            }
        }

        const lastPr = await prisma.personal_records.findFirst({
            where: { user_id, deleted_at: null },
            orderBy: { date: "desc" },
            select: { exercise_name: true, weight: true, reps: true }
        })

        return { streak, weekHours, lastPr }
    }
}

export { GetHomeStatsService }
