import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Upload, Calendar, Clock, Image } from "lucide-react";

export const Announcements = () => {
  const [schedulePost, setSchedulePost] = useState(false);
  const [hasImage, setHasImage] = useState(false);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground">Announcements</h2>
        <p className="text-muted-foreground mt-2">Create and manage announcements for your Discord server</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Announcement Details */}
        <Card className="bg-dreamz-card border-dreamz-border">
          <CardHeader>
            <CardTitle className="text-dreamz-rose">Announcement Content</CardTitle>
            <CardDescription>Create your announcement message</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="ann-title">Title</Label>
              <Input id="ann-title" placeholder="Announcement title" className="bg-dreamz-surface border-dreamz-border" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ann-message">Message</Label>
              <Textarea 
                id="ann-message" 
                placeholder="Write your announcement message here..." 
                className="bg-dreamz-surface border-dreamz-border min-h-[120px]"
              />
            </div>
          </CardContent>
        </Card>

        {/* Optional Image */}
        <Card className="bg-dreamz-card border-dreamz-border">
          <CardHeader>
            <CardTitle className="text-dreamz-rose">Optional Image</CardTitle>
            <CardDescription>Add an image to your announcement</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <Switch
                id="add-image"
                checked={hasImage}
                onCheckedChange={setHasImage}
              />
              <Label htmlFor="add-image">Include image</Label>
            </div>

            {hasImage && (
              <div className="border-2 border-dashed border-dreamz-border rounded-lg p-6 text-center hover:border-dreamz-rose/50 transition-colors">
                <Image className="mx-auto h-10 w-10 text-muted-foreground mb-3" />
                <p className="text-sm font-medium text-foreground mb-2">
                  Drop image here or click to browse
                </p>
                <p className="text-xs text-muted-foreground mb-3">
                  PNG, JPG, GIF up to 10MB
                </p>
                <Button variant="dreamzOutline" size="sm">Choose Image</Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Channel Selection */}
        <Card className="bg-dreamz-card border-dreamz-border">
          <CardHeader>
            <CardTitle className="text-dreamz-rose">Target Channel</CardTitle>
            <CardDescription>Select where to post the announcement</CardDescription>
          </CardHeader>
          <CardContent>
            <Select>
              <SelectTrigger className="bg-dreamz-surface border-dreamz-border">
                <SelectValue placeholder="Select a channel" />
              </SelectTrigger>
              <SelectContent className="bg-dreamz-card border-dreamz-border">
                <SelectItem value="announcements">#announcements</SelectItem>
                <SelectItem value="general">#general</SelectItem>
                <SelectItem value="news">#news</SelectItem>
                <SelectItem value="updates">#updates</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {/* Publishing Options */}
        <Card className="bg-dreamz-card border-dreamz-border">
          <CardHeader>
            <CardTitle className="text-dreamz-rose">Publishing</CardTitle>
            <CardDescription>Choose when to send the announcement</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <Switch
                id="schedule-ann"
                checked={schedulePost}
                onCheckedChange={setSchedulePost}
              />
              <Label htmlFor="schedule-ann">Schedule announcement</Label>
            </div>

            {schedulePost && (
              <div className="grid gap-3 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="ann-date">Date</Label>
                  <div className="relative">
                    <Input
                      id="ann-date"
                      type="date"
                      className="bg-dreamz-surface border-dreamz-border"
                    />
                    <Calendar className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ann-time">Time</Label>
                  <div className="relative">
                    <Input
                      id="ann-time"
                      type="time"
                      className="bg-dreamz-surface border-dreamz-border"
                    />
                    <Clock className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Action Buttons */}
      <Card className="bg-dreamz-card border-dreamz-border">
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <Button variant="dreamz" className="flex-1">
              {schedulePost ? "Schedule Announcement" : "Post Now"}
            </Button>
            <Button variant="outline" className="border-dreamz-border">
              Preview
            </Button>
            <Button variant="outline" className="border-dreamz-border">
              Save Draft
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};