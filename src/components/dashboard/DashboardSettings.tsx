import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Settings, Shield, Palette, Bot, Hash, Plus } from "lucide-react";

const mockChannels = [
  { id: 1, name: "#general", enabled: true, description: "General discussion" },
  { id: 2, name: "#videos", enabled: true, description: "Video content" },
  { id: 3, name: "#vip-content", enabled: true, description: "VIP exclusive content" },
  { id: 4, name: "#announcements", enabled: false, description: "Server announcements" },
  { id: 5, name: "#news", enabled: false, description: "News and updates" },
];

export const DashboardSettings = () => {
  const [channels, setChannels] = useState(mockChannels);
  const [isConnected, setIsConnected] = useState(true);

  const toggleChannel = (channelId: number) => {
    setChannels(channels.map(channel => 
      channel.id === channelId 
        ? { ...channel, enabled: !channel.enabled }
        : channel
    ));
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground">Settings</h2>
        <p className="text-muted-foreground mt-2">Configure your Discord bot and dashboard preferences</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Discord Connection */}
        <Card className="bg-dreamz-card border-dreamz-border">
          <CardHeader>
            <CardTitle className="text-dreamz-rose flex items-center gap-2">
              <Bot className="h-5 w-5" />
              Discord Integration
            </CardTitle>
            <CardDescription>Manage your Discord bot connection</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-lg bg-dreamz-surface">
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <div>
                  <p className="font-medium text-foreground">
                    {isConnected ? 'Connected' : 'Disconnected'}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {isConnected ? 'Dreamz Bot is online' : 'Bot is offline'}
                  </p>
                </div>
              </div>
              <Badge variant={isConnected ? "secondary" : "destructive"}>
                {isConnected ? 'Active' : 'Inactive'}
              </Badge>
            </div>

            <Separator className="bg-dreamz-border" />

            <div className="space-y-3">
              <div>
                <Label htmlFor="bot-token">Bot Token</Label>
                <Input 
                  id="bot-token" 
                  type="password" 
                  value="••••••••••••••••••••••••••••••••"
                  className="bg-dreamz-surface border-dreamz-border"
                  readOnly
                />
              </div>
              <div>
                <Label htmlFor="server-id">Server ID</Label>
                <Input 
                  id="server-id" 
                  value="123456789012345678"
                  className="bg-dreamz-surface border-dreamz-border"
                  readOnly
                />
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant="dreamzOutline" className="flex-1">
                Reconnect Bot
              </Button>
              <Button variant="outline" className="border-dreamz-border">
                Test Connection
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Theme Preview */}
        <Card className="bg-dreamz-card border-dreamz-border">
          <CardHeader>
            <CardTitle className="text-dreamz-rose flex items-center gap-2">
              <Palette className="h-5 w-5" />
              Theme Preview
            </CardTitle>
            <CardDescription>Current dashboard theme configuration</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 rounded-lg bg-gradient-to-br from-dreamz-rose to-dreamz-purple">
              <p className="text-white font-medium mb-2">Dreamz Dashboard</p>
              <p className="text-white/80 text-sm">Dark theme with rose and purple accents</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="text-center">
                <div className="w-full h-12 rounded-lg bg-dreamz-rose mb-2"></div>
                <p className="text-sm text-muted-foreground">Rose Accent</p>
              </div>
              <div className="text-center">
                <div className="w-full h-12 rounded-lg bg-dreamz-purple mb-2"></div>
                <p className="text-sm text-muted-foreground">Purple Accent</p>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-dreamz-surface border border-dreamz-border">
              <p className="text-sm font-medium text-foreground mb-1">Sample Card</p>
              <p className="text-xs text-muted-foreground">This is how cards appear in the dashboard</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Channel Management */}
      <Card className="bg-dreamz-card border-dreamz-border">
        <CardHeader>
          <CardTitle className="text-dreamz-rose flex items-center gap-2">
            <Hash className="h-5 w-5" />
            Channel Management
          </CardTitle>
          <CardDescription>Configure which Discord channels the bot can access</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {channels.map((channel) => (
              <div key={channel.id} className="flex items-center justify-between p-3 rounded-lg bg-dreamz-surface">
                <div className="flex items-center gap-3">
                  <Hash className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium text-foreground">{channel.name}</p>
                    <p className="text-sm text-muted-foreground">{channel.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge 
                    variant={channel.enabled ? "secondary" : "outline"}
                    className={channel.enabled ? "bg-dreamz-rose/20 text-dreamz-rose border-dreamz-rose/30" : ""}
                  >
                    {channel.enabled ? 'Enabled' : 'Disabled'}
                  </Badge>
                  <Switch
                    checked={channel.enabled}
                    onCheckedChange={() => toggleChannel(channel.id)}
                  />
                </div>
              </div>
            ))}
          </div>

          <Separator className="bg-dreamz-border my-4" />

          <Button variant="dreamzOutline" className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Add New Channel
          </Button>
        </CardContent>
      </Card>

      {/* Security Settings */}
      <Card className="bg-dreamz-card border-dreamz-border">
        <CardHeader>
          <CardTitle className="text-dreamz-rose flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Security & Permissions
          </CardTitle>
          <CardDescription>Manage access and security settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="auto-moderation">Auto Moderation</Label>
                  <p className="text-sm text-muted-foreground">Filter inappropriate content automatically</p>
                </div>
                <Switch id="auto-moderation" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="admin-only">Admin Only Mode</Label>
                  <p className="text-sm text-muted-foreground">Restrict bot usage to administrators</p>
                </div>
                <Switch id="admin-only" />
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="logging">Activity Logging</Label>
                  <p className="text-sm text-muted-foreground">Log all bot activities</p>
                </div>
                <Switch id="logging" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="notifications">Push Notifications</Label>
                  <p className="text-sm text-muted-foreground">Get notified of important events</p>
                </div>
                <Switch id="notifications" defaultChecked />
              </div>
            </div>
          </div>

          <Separator className="bg-dreamz-border" />

          <div className="flex gap-4">
            <Button variant="dreamz">Save Settings</Button>
            <Button variant="outline" className="border-dreamz-border">Reset to Default</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};