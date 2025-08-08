import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, MessageSquare, Calendar, BarChart3, Settings, FolderOpen, Package, Shield } from "lucide-react";
import { UploadVideo } from "@/components/dashboard/UploadVideo";
import { Announcements } from "@/components/dashboard/Announcements";
import { ScheduledPosts } from "@/components/dashboard/ScheduledPosts";
import { Stats } from "@/components/dashboard/Stats";
import { DashboardSettings } from "@/components/dashboard/DashboardSettings";
import { ChannelAssignment } from "@/components/dashboard/ChannelAssignment";
import { VideoBundler } from "@/components/dashboard/VideoBundler";
import { ModerationPanel } from "@/components/dashboard/ModerationPanel";
import { EmbedBuilder } from "@/components/dashboard/EmbedBuilder";
import { DreamzLogo } from "@/components/dashboard/DreamzLogo";

const Index = () => {
  const [activeTab, setActiveTab] = useState("upload");

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-dreamz-border bg-dreamz-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <DreamzLogo />
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-dreamz-rose to-dreamz-purple bg-clip-text text-transparent">
                  Dreamz Dashboard
                </h1>
                <p className="text-sm text-muted-foreground">Discord Bot Admin Panel</p>
              </div>
            </div>
            <div className="text-sm text-muted-foreground">
              Connected to Discord
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-9 bg-dreamz-card border border-dreamz-border rounded-lg p-1">
            <TabsTrigger 
              value="upload" 
              className="flex items-center gap-2 data-[state=active]:bg-dreamz-surface data-[state=active]:text-dreamz-rose text-xs"
            >
              <Upload className="h-4 w-4" />
              Upload
            </TabsTrigger>
            <TabsTrigger 
              value="bundler"
              className="flex items-center gap-2 data-[state=active]:bg-dreamz-surface data-[state=active]:text-dreamz-rose text-xs"
            >
              <Package className="h-4 w-4" />
              Bundler
            </TabsTrigger>
            <TabsTrigger 
              value="announcements"
              className="flex items-center gap-2 data-[state=active]:bg-dreamz-surface data-[state=active]:text-dreamz-rose text-xs"
            >
              <MessageSquare className="h-4 w-4" />
              Announce
            </TabsTrigger>
            <TabsTrigger 
              value="scheduled"
              className="flex items-center gap-2 data-[state=active]:bg-dreamz-surface data-[state=active]:text-dreamz-rose text-xs"
            >
              <Calendar className="h-4 w-4" />
              Scheduled
            </TabsTrigger>
            <TabsTrigger 
              value="stats"
              className="flex items-center gap-2 data-[state=active]:bg-dreamz-surface data-[state=active]:text-dreamz-rose text-xs"
            >
              <BarChart3 className="h-4 w-4" />
              Stats
            </TabsTrigger>
            <TabsTrigger 
              value="channels"
              className="flex items-center gap-2 data-[state=active]:bg-dreamz-surface data-[state=active]:text-dreamz-rose text-xs"
            >
              <FolderOpen className="h-4 w-4" />
              Channels
            </TabsTrigger>
            <TabsTrigger 
              value="moderation"
              className="flex items-center gap-2 data-[state=active]:bg-dreamz-surface data-[state=active]:text-dreamz-rose text-xs"
            >
              <Shield className="h-4 w-4" />
              Moderation
            </TabsTrigger>
            <TabsTrigger 
              value="embeds"
              className="flex items-center gap-2 data-[state=active]:bg-dreamz-surface data-[state=active]:text-dreamz-rose text-xs"
            >
              <MessageSquare className="h-4 w-4" />
              Embeds
            </TabsTrigger>
            <TabsTrigger 
              value="settings"
              className="flex items-center gap-2 data-[state=active]:bg-dreamz-surface data-[state=active]:text-dreamz-rose text-xs"
            >
              <Settings className="h-4 w-4" />
              Settings
            </TabsTrigger>
          </TabsList>

          <div className="mt-8">
            <TabsContent value="upload" className="space-y-6">
              <UploadVideo />
            </TabsContent>
            
            <TabsContent value="bundler" className="space-y-6">
              <VideoBundler />
            </TabsContent>
            
            <TabsContent value="announcements" className="space-y-6">
              <Announcements />
            </TabsContent>
            
            <TabsContent value="scheduled" className="space-y-6">
              <ScheduledPosts />
            </TabsContent>
            
            <TabsContent value="stats" className="space-y-6">
              <Stats />
            </TabsContent>
            
            <TabsContent value="channels" className="space-y-6">
              <ChannelAssignment />
            </TabsContent>
            
            <TabsContent value="moderation" className="space-y-6">
              <ModerationPanel />
            </TabsContent>
            
            <TabsContent value="embeds" className="space-y-6">
              <EmbedBuilder />
            </TabsContent>
            
            <TabsContent value="settings" className="space-y-6">
              <DashboardSettings />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;