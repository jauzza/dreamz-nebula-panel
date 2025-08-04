import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider } from "@/components/ui/sidebar";
import { Hash, Video, Check, X } from "lucide-react";

interface Video {
  id: string;
  name: string;
  size: string;
  duration: string;
  channel?: string;
}

const mockVideos: Video[] = [
  { id: "1", name: "video1.mp4", size: "45.2 MB", duration: "3:24" },
  { id: "2", name: "content_2023.mov", size: "67.8 MB", duration: "5:12" },
  { id: "3", name: "new_upload.webm", size: "23.1 MB", duration: "2:08" },
  { id: "4", name: "preview_video.mp4", size: "89.4 MB", duration: "7:33" },
];

const channels = [
  { id: "general", name: "#general", description: "General content" },
  { id: "videos", name: "#videos", description: "Video content" },
  { id: "vip", name: "#vip-content", description: "VIP exclusive content" },
  { id: "announcements", name: "#announcements", description: "Important announcements" },
];

export const ChannelAssignment = () => {
  const [videos, setVideos] = useState<Video[]>(mockVideos);
  const [selectedChannel, setSelectedChannel] = useState("general");
  const [selectedVideos, setSelectedVideos] = useState<string[]>([]);

  const assignChannelToVideos = () => {
    setVideos(videos.map(video => 
      selectedVideos.includes(video.id) 
        ? { ...video, channel: selectedChannel }
        : video
    ));
    setSelectedVideos([]);
  };

  const toggleVideoSelection = (videoId: string) => {
    setSelectedVideos(prev => 
      prev.includes(videoId) 
        ? prev.filter(id => id !== videoId)
        : [...prev, videoId]
    );
  };

  const getChannelName = (channelId: string) => {
    return channels.find(c => c.id === channelId)?.name || channelId;
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground">Channel Assignment</h2>
        <p className="text-muted-foreground mt-2">Assign your uploaded videos to Discord channels</p>
      </div>

      <SidebarProvider>
        <div className="min-h-screen flex w-full">
          <Sidebar className="w-60 bg-dreamz-card border-dreamz-border">
            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupLabel className="text-dreamz-rose">Discord Channels</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {channels.map((channel) => (
                      <SidebarMenuItem key={channel.id}>
                        <SidebarMenuButton
                          asChild
                          className={`cursor-pointer ${
                            selectedChannel === channel.id 
                              ? "bg-dreamz-rose/20 text-dreamz-rose" 
                              : "hover:bg-dreamz-surface"
                          }`}
                          onClick={() => setSelectedChannel(channel.id)}
                        >
                          <div className="flex items-center space-x-2 p-2">
                            <Hash className="h-4 w-4" />
                            <div>
                              <p className="font-medium">{channel.name}</p>
                              <p className="text-xs text-muted-foreground">{channel.description}</p>
                            </div>
                          </div>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
          </Sidebar>

          <main className="flex-1 p-6">
            <div className="space-y-6">
              <Card className="bg-dreamz-card border-dreamz-border">
                <CardHeader>
                  <CardTitle className="text-dreamz-rose flex items-center gap-2">
                    <Video className="h-5 w-5" />
                    Uploaded Videos
                  </CardTitle>
                  <CardDescription>
                    Select videos and assign them to the chosen channel: {getChannelName(selectedChannel)}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {selectedVideos.length > 0 && (
                    <div className="flex items-center gap-4 p-4 bg-dreamz-surface rounded-lg border border-dreamz-border">
                      <span className="text-sm font-medium">
                        {selectedVideos.length} video(s) selected
                      </span>
                      <Button 
                        onClick={assignChannelToVideos}
                        variant="dreamz" 
                        size="sm"
                      >
                        Assign to {getChannelName(selectedChannel)}
                      </Button>
                    </div>
                  )}

                  <div className="grid gap-4">
                    {videos.map((video) => (
                      <div
                        key={video.id}
                        className={`flex items-center space-x-4 p-4 rounded-lg border transition-colors ${
                          selectedVideos.includes(video.id)
                            ? "border-dreamz-rose bg-dreamz-rose/10"
                            : "border-dreamz-border bg-dreamz-surface hover:bg-dreamz-surface/80"
                        }`}
                      >
                        <Checkbox
                          checked={selectedVideos.includes(video.id)}
                          onCheckedChange={() => toggleVideoSelection(video.id)}
                        />
                        <Video className="h-8 w-8 text-muted-foreground" />
                        <div className="flex-1">
                          <p className="font-medium text-foreground">{video.name}</p>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span>{video.size}</span>
                            <span>{video.duration}</span>
                          </div>
                        </div>
                        {video.channel && (
                          <Badge variant="secondary" className="bg-dreamz-surface text-dreamz-rose border-dreamz-border">
                            <Check className="h-3 w-3 mr-1" />
                            {getChannelName(video.channel)}
                          </Badge>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between pt-4">
                    <Button variant="outline" className="border-dreamz-border">
                      <X className="h-4 w-4 mr-2" />
                      Cancel
                    </Button>
                    <Button variant="dreamz">
                      <Check className="h-4 w-4 mr-2" />
                      Finish Assignment
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </SidebarProvider>
    </div>
  );
};