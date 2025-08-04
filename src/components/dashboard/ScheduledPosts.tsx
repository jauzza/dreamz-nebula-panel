import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Edit, Trash2, Video, MessageSquare } from "lucide-react";

const mockScheduledPosts = [
  {
    id: 1,
    type: "video",
    title: "New Premium Content Release",
    description: "Exclusive video content for VIP members",
    channel: "#vip-content",
    scheduledDate: "2024-08-15",
    scheduledTime: "18:00",
    tags: ["VIP", "Premium", "Exclusive"]
  },
  {
    id: 2,
    type: "announcement",
    title: "Server Maintenance Notice",
    description: "The bot will be offline for maintenance",
    channel: "#announcements",
    scheduledDate: "2024-08-16",
    scheduledTime: "02:00",
    tags: ["Maintenance", "Important"]
  },
  {
    id: 3,
    type: "video",
    title: "Behind the Scenes Content",
    description: "Get a glimpse of how content is created",
    channel: "#general",
    scheduledDate: "2024-08-17",
    scheduledTime: "15:30",
    tags: ["BTS", "Content", "Fun"]
  }
];

export const ScheduledPosts = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Scheduled Posts</h2>
          <p className="text-muted-foreground mt-2">Manage your upcoming video and announcement posts</p>
        </div>
        <div className="text-sm text-muted-foreground">
          {mockScheduledPosts.length} posts scheduled
        </div>
      </div>

      <div className="grid gap-4">
        {mockScheduledPosts.map((post) => (
          <Card key={post.id} className="bg-dreamz-card border-dreamz-border">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                  <div className="flex-shrink-0">
                    {post.type === "video" ? (
                      <div className="w-12 h-12 rounded-lg bg-dreamz-rose/20 flex items-center justify-center">
                        <Video className="h-6 w-6 text-dreamz-rose" />
                      </div>
                    ) : (
                      <div className="w-12 h-12 rounded-lg bg-dreamz-purple/20 flex items-center justify-center">
                        <MessageSquare className="h-6 w-6 text-dreamz-purple" />
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-semibold text-foreground truncate">
                        {post.title}
                      </h3>
                      <Badge 
                        variant="secondary" 
                        className={`text-xs ${
                          post.type === "video" 
                            ? "bg-dreamz-rose/20 text-dreamz-rose border-dreamz-rose/30" 
                            : "bg-dreamz-purple/20 text-dreamz-purple border-dreamz-purple/30"
                        }`}
                      >
                        {post.type}
                      </Badge>
                    </div>
                    
                    <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                      {post.description}
                    </p>
                    
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {post.scheduledDate}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {post.scheduledTime}
                      </div>
                      <div className="text-dreamz-rose">
                        {post.channel}
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-1">
                      {post.tags.map((tag) => (
                        <Badge 
                          key={tag} 
                          variant="outline" 
                          className="text-xs bg-dreamz-surface border-dreamz-border text-muted-foreground"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 ml-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-muted-foreground hover:text-dreamz-rose"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {mockScheduledPosts.length === 0 && (
        <Card className="bg-dreamz-card border-dreamz-border">
          <CardContent className="p-12 text-center">
            <Calendar className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No scheduled posts</h3>
            <p className="text-muted-foreground mb-4">
              You don't have any posts scheduled yet. Create your first scheduled post to get started.
            </p>
            <Button variant="dreamz">Schedule First Post</Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};