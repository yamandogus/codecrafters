"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Area,
  AreaChart,
} from "recharts";

// Sample data - bu gerçek uygulamada API'den gelecek
const userGrowthData = [
  { month: "Oca", users: 120, active: 85 },
  { month: "Şub", users: 180, active: 140 },
  { month: "Mar", users: 250, active: 200 },
  { month: "Nis", users: 320, active: 280 },
  { month: "May", users: 400, active: 350 },
  { month: "Haz", users: 480, active: 420 },
];

const eventData = [
  { month: "Oca", events: 8, attendees: 120 },
  { month: "Şub", events: 12, attendees: 180 },
  { month: "Mar", events: 15, attendees: 220 },
  { month: "Nis", events: 18, attendees: 290 },
  { month: "May", events: 22, attendees: 340 },
  { month: "Haz", events: 25, attendees: 420 },
];

const userTypeData = [
  { name: "Kullanıcı", value: 850, color: "#8884d8" },
  { name: "Moderatör", value: 35, color: "#82ca9d" },
  { name: "Admin", value: 15, color: "#ffc658" },
];

const blogStatsData = [
  { month: "Oca", posts: 45, views: 2400, likes: 890 },
  { month: "Şub", posts: 52, views: 3200, likes: 1200 },
  { month: "Mar", posts: 48, views: 3800, likes: 1450 },
  { month: "Nis", posts: 61, views: 4200, likes: 1680 },
  { month: "May", posts: 55, views: 4800, likes: 1920 },
  { month: "Haz", posts: 67, views: 5400, likes: 2150 },
];

export function UserGrowthChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={userGrowthData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Area 
          type="monotone" 
          dataKey="users" 
          stackId="1" 
          stroke="#8884d8" 
          fill="#8884d8" 
          name="Toplam Kullanıcı"
        />
        <Area 
          type="monotone" 
          dataKey="active" 
          stackId="1" 
          stroke="#82ca9d" 
          fill="#82ca9d" 
          name="Aktif Kullanıcı"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function EventsChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={eventData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="events" fill="#8884d8" name="Etkinlik Sayısı" />
        <Bar dataKey="attendees" fill="#82ca9d" name="Katılımcı Sayısı" />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function UserTypeChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={userTypeData}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {userTypeData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip 
          formatter={(value: number) => {
            const total = userTypeData.reduce((sum, item) => sum + item.value, 0);
            const percent = ((value / total) * 100).toFixed(1);
            return [`${value} (${percent}%)`, 'Kullanıcı Sayısı'];
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}

export function BlogStatsChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={blogStatsData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line 
          type="monotone" 
          dataKey="posts" 
          stroke="#8884d8" 
          strokeWidth={2}
          name="Blog Yazıları"
        />
        <Line 
          type="monotone" 
          dataKey="views" 
          stroke="#82ca9d" 
          strokeWidth={2}
          name="Görüntüleme"
        />
        <Line 
          type="monotone" 
          dataKey="likes" 
          stroke="#ffc658" 
          strokeWidth={2}
          name="Beğeni"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}