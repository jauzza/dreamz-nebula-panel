import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Settings, Shield, Palette, Bot, Hash, Plus, Crown } from "lucide-react";

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

      {/* Discord Profile-Style Card */}
      <Card className="bg-gradient-to-br from-discord-dark to-discord-darker border-discord-blurple/20 shadow-premium">
        <CardContent className="p-0">
          {/* Header Banner */}
          <div className="h-24 bg-gradient-discord rounded-t-lg relative">
            <div className="absolute -bottom-6 left-6">
              <div className="w-20 h-20 rounded-full bg-dreamz-card border-4 border-discord-dark flex items-center justify-center">
                <Bot className="h-10 w-10 text-discord-blurple" />
              </div>
            </div>
          </div>
          
          {/* Profile Content */}
          <div className="pt-8 p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-2xl font-bold text-foreground">Dreamz Bot</h2>
                  <Badge className="bg-discord-boost/20 text-purple-400 border-discord-boost/30">
                    <Crown className="h-3 w-3 mr-1" />
                    PREMIUM
                  </Badge>
                </div>
                <p className="text-muted-foreground">#1337</p>
                <div className="flex items-center gap-2 mt-2">
                  <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-discord-green' : 'bg-discord-red'}`}></div>
                  <span className="text-sm text-muted-foreground">
                    {isConnected ? 'Online' : 'Offline'}
                  </span>
                </div>
              </div>
              <Button variant="dreamz" size="sm">
                Edit Profile
              </Button>
            </div>

            <Separator className="bg-discord-darker mb-4" />

            {/* About Section */}
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-2 uppercase tracking-wide">About</h3>
                <p className="text-sm text-muted-foreground">
                  Advanced Discord bot for content management and community engagement. Specialized in video distribution and automated moderation.
                </p>
              </div>

              {/* Member Since */}
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-2 uppercase tracking-wide">Member Since</h3>
                <p className="text-sm text-muted-foreground">January 15, 2024</p>
              </div>

              {/* Roles */}
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-2 uppercase tracking-wide">Roles</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-discord-blurple/20 text-blue-400">Bot</Badge>
                  <Badge className="bg-discord-boost/20 text-purple-400">Administrator</Badge>
                  <Badge className="bg-discord-green/20 text-green-400">Content Manager</Badge>
                  <Badge className="bg-discord-yellow/20 text-yellow-400">Moderator</Badge>
                </div>
              </div>

              {/* Server Info */}
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-2 uppercase tracking-wide">Server Information</h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex justify-between">
                    <span>Server ID:</span>
                    <span className="font-mono">123456789012345678</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Permissions:</span>
                    <span>Administrator</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Uptime:</span>
                    <span className="text-discord-green">99.9%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 mt-6">
              <Button variant="dreamz" className="flex-1">
                Reconnect Bot
              </Button>
              <Button variant="outline" className="border-dreamz-border">
                Test Connection
              </Button>
              <Button variant="outline" className="border-dreamz-border">
                View Logs
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Discord Connection Status */}
        <Card className="bg-dreamz-card border-dreamz-border">
          <CardHeader>
            <CardTitle className="text-dreamz-rose flex items-center gap-2">
              <Bot className="h-5 w-5" />
              Connection Details
            </CardTitle>
            <CardDescription>Technical bot connection information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div>
                <Label htmlFor="bot-token">Bot Token</Label>
                <Input 
                  id="bot-token" 
                  type="password" 
                  value="••••••••••••••••••••••••••••••••"
                  className="bg-dreamz-surface border-dreamz-border font-mono"
                  readOnly
                />
              </div>
              <div>
                <Label htmlFor="client-id">Client ID</Label>
                <Input 
                  id="client-id" 
                  value="987654321098765432"
                  className="bg-dreamz-surface border-dreamz-border font-mono"
                  readOnly
                />
              </div>
              <div>
                <Label htmlFor="guild-count">Guilds Connected</Label>
                <Input 
                  id="guild-count" 
                  value="1 server"
                  className="bg-dreamz-surface border-dreamz-border"
                  readOnly
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Theme Preview */}
        <Card className="bg-dreamz-card border-dreamz-border">
          <CardHeader>
            <CardTitle className="text-dreamz-rose flex items-center gap-2">
              <Palette className="h-5 w-5" />
              Discord Theme Preview
            </CardTitle>
            <CardDescription>How your bot appears in Discord</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 rounded-lg bg-discord-darker border border-discord-blurple/20">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-full bg-gradient-primary"></div>
                <div>
                  <p className="text-white font-medium">Dreamz Bot</p>
                  <p className="text-xs text-gray-400">BOT • Today at 12:34 PM</p>
                </div>
              </div>
              <div className="bg-discord-dark p-3 rounded border-l-4 border-dreamz-rose">
                <p className="text-white font-semibold mb-1">New Content Available!</p>
                <p className="text-gray-300 text-sm">Check out the latest videos in your tier channels.</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="text-center">
                <div className="w-full h-8 rounded bg-discord-blurple mb-2"></div>
                <p className="text-xs text-muted-foreground">Discord Blue</p>
              </div>
              <div className="text-center">
                <div className="w-full h-8 rounded bg-gradient-primary mb-2"></div>
                <p className="text-xs text-muted-foreground">Bot Accent</p>
              </div>
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