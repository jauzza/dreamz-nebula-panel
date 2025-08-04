import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { TrendingUp, Video, MessageSquare, Users, Eye, Activity, Zap, Clock } from "lucide-react";

const mockBarData = [
  { name: "Mon", videos: 4, announcements: 2 },
  { name: "Tue", videos: 3, announcements: 1 },
  { name: "Wed", videos: 7, announcements: 3 },
  { name: "Thu", videos: 5, announcements: 2 },
  { name: "Fri", videos: 8, announcements: 4 },
  { name: "Sat", videos: 6, announcements: 1 },
  { name: "Sun", videos: 9, announcements: 2 },
];

const mockPieData = [
  { name: "VIP Content", value: 35, color: "#f43f5e" },
  { name: "General Videos", value: 45, color: "#a855f7" },
  { name: "Announcements", value: 15, color: "#6366f1" },
  { name: "Scheduled", value: 5, color: "#8b5cf6" },
];

const statCards = [
  {
    title: "Total Videos",
    value: "142",
    change: "+12% from last month",
    icon: Video,
    trend: "up",
  },
  {
    title: "Total Views",
    value: "24.8K",
    change: "+8% from last month",
    icon: Eye,
    trend: "up",
  },
  {
    title: "Announcements",
    value: "38",
    change: "+4% from last month",
    icon: MessageSquare,
    trend: "up",
  },
  {
    title: "Active Users",
    value: "1.2K",
    change: "+15% from last month",
    icon: Users,
    trend: "up",
  },
];

export const Stats = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground">Analytics Dashboard</h2>
        <p className="text-muted-foreground mt-2">Track your content performance and engagement metrics</p>
      </div>

      {/* Bot Status Cards */}
      <div className="grid gap-4 md:grid-cols-3 mb-6">
        <Card className="bg-dreamz-card border-dreamz-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Bot Status</p>
                <div className="flex items-center gap-2 mt-1">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <h2 className="text-xl font-bold text-foreground">Online</h2>
                </div>
                <p className="text-xs text-green-500 mt-1">All systems operational</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
                <Activity className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-dreamz-card border-dreamz-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Uptime</p>
                <h2 className="text-xl font-bold text-foreground">15d 7h 23m</h2>
                <p className="text-xs text-dreamz-rose mt-1">99.8% this month</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-dreamz-rose to-dreamz-purple flex items-center justify-center">
                <Clock className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-dreamz-card border-dreamz-border">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Response Time</p>
                <h2 className="text-xl font-bold text-foreground">120ms</h2>
                <p className="text-xs text-dreamz-rose mt-1">Avg last 24h</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-dreamz-rose to-dreamz-purple flex items-center justify-center">
                <Zap className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Stat Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => (
          <Card key={stat.title} className="bg-dreamz-card border-dreamz-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </p>
                  <div className="flex items-baseline gap-2">
                    <h2 className="text-3xl font-bold text-foreground">
                      {stat.value}
                    </h2>
                  </div>
                  <p className="text-xs text-dreamz-rose mt-1 flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" />
                    {stat.change}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-dreamz-rose to-dreamz-purple flex items-center justify-center">
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Bar Chart */}
        <Card className="bg-dreamz-card border-dreamz-border">
          <CardHeader>
            <CardTitle className="text-dreamz-rose">Weekly Activity</CardTitle>
            <CardDescription>Posts created over the last 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockBarData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--dreamz-border))" />
                  <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Bar dataKey="videos" fill="hsl(var(--dreamz-rose))" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="announcements" fill="hsl(var(--dreamz-purple))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="flex items-center justify-center gap-6 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-dreamz-rose"></div>
                <span className="text-sm text-muted-foreground">Videos</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-dreamz-purple"></div>
                <span className="text-sm text-muted-foreground">Announcements</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Pie Chart */}
        <Card className="bg-dreamz-card border-dreamz-border">
          <CardHeader>
            <CardTitle className="text-dreamz-rose">Content Distribution</CardTitle>
            <CardDescription>Breakdown of content types</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={mockPieData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    stroke="none"
                  >
                    {mockPieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {mockPieData.map((entry) => (
                <div key={entry.name} className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: entry.color }}
                  ></div>
                  <span className="text-sm text-muted-foreground">{entry.name}</span>
                  <span className="text-sm font-medium text-foreground ml-auto">{entry.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="bg-dreamz-card border-dreamz-border">
        <CardHeader>
          <CardTitle className="text-dreamz-rose">Recent Activity</CardTitle>
          <CardDescription>Latest actions on your Discord bot</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { action: "Video uploaded", details: "New VIP content posted to #vip-content", time: "2 hours ago", type: "video" },
              { action: "Announcement sent", details: "Maintenance notice posted to #announcements", time: "5 hours ago", type: "announcement" },
              { action: "Video scheduled", details: "Behind the scenes content scheduled for tomorrow", time: "1 day ago", type: "schedule" },
              { action: "Video uploaded", details: "General content posted to #videos", time: "2 days ago", type: "video" },
            ].map((activity, index) => (
              <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-dreamz-surface">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  activity.type === "video" ? "bg-dreamz-rose/20" :
                  activity.type === "announcement" ? "bg-dreamz-purple/20" : "bg-blue-500/20"
                }`}>
                  {activity.type === "video" ? (
                    <Video className={`h-4 w-4 ${activity.type === "video" ? "text-dreamz-rose" : ""}`} />
                  ) : activity.type === "announcement" ? (
                    <MessageSquare className="h-4 w-4 text-dreamz-purple" />
                  ) : (
                    <TrendingUp className="h-4 w-4 text-blue-400" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{activity.action}</p>
                  <p className="text-xs text-muted-foreground">{activity.details}</p>
                </div>
                <div className="text-xs text-muted-foreground">
                  {activity.time}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};