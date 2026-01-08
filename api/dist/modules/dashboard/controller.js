import { DashboardService } from "./service";
const dashboardService = new DashboardService();
export class DashboardController {
    async getUserDashboard(req, res) {
        try {
            if (!req.user) {
                return res.status(401).json({ success: false, message: "Yetkisiz erişim" });
            }
            const userId = req.user.userId;
            const result = await dashboardService.getUserDashboardStats(userId);
            return res.status(200).json({ success: true, data: result });
        }
        catch (error) {
            console.error("Dashboard error:", error);
            return res.status(500).json({ success: false, message: "Dashboard verileri alınırken hata oluştu" });
        }
    }
}
