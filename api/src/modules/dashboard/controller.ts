import { Response } from "express";
import { DashboardService } from "./service";

const dashboardService = new DashboardService();

export class DashboardController {
    async getUserDashboard(req: any, res: Response) {
        try {
            const userId = req.user.userId;
            const result = await dashboardService.getUserDashboardStats(userId);
            return res.status(200).json({ success: true, data: result });
        } catch (error) {
            console.error("Dashboard error:", error);
            return res.status(500).json({ success: false, message: "Dashboard verileri alınırken hata oluştu" });
        }
    }
}
