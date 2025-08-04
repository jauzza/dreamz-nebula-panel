import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, X, Calendar, Clock, FolderOpen } from "lucide-react";

export const UploadVideo = () => {
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");
  const [schedulePost, setSchedulePost] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    // Handle file drop logic here
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground">Upload Video</h2>
        <p className="text-muted-foreground mt-2">Upload and manage your video content for Discord</p>
      </div>

      <Tabs defaultValue="single" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-dreamz-surface border-dreamz-border">
          <TabsTrigger value="single" className="data-[state=active]:bg-dreamz-rose/20 data-[state=active]:text-dreamz-rose">
            Single Upload
          </TabsTrigger>
          <TabsTrigger value="bulk" className="data-[state=active]:bg-dreamz-rose/20 data-[state=active]:text-dreamz-rose">
            Bulk Upload
          </TabsTrigger>
        </TabsList>

        <TabsContent value="single" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* File Upload */}
            <Card className="bg-dreamz-card border-dreamz-border">
              <CardHeader>
                <CardTitle className="text-dreamz-rose">Video File</CardTitle>
                <CardDescription>Upload your video file (.mp4, .mov, .webm)</CardDescription>
              </CardHeader>
              <CardContent>
                <div
                  className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                    dragActive
                      ? "border-dreamz-rose bg-dreamz-rose/10"
                      : "border-dreamz-border hover:border-dreamz-rose/50"
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-lg font-medium text-foreground mb-2">
                    Drop your video here or click to browse
                  </p>
                  <p className="text-sm text-muted-foreground mb-4">
                    Supports MP4, MOV, and WEBM files up to 500MB
                  </p>
                  <Button variant="dreamzOutline">Choose File</Button>
                </div>
              </CardContent>
            </Card>

            {/* Video Details */}
            <Card className="bg-dreamz-card border-dreamz-border">
              <CardHeader>
                <CardTitle className="text-dreamz-rose">Video Details</CardTitle>
                <CardDescription>Add title and description for your video</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input id="title" placeholder="Enter video title" className="bg-dreamz-surface border-dreamz-border" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea 
                    id="description" 
                    placeholder="Enter video description" 
                    className="bg-dreamz-surface border-dreamz-border min-h-[100px]"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Channel Selection */}
            <Card className="bg-dreamz-card border-dreamz-border">
              <CardHeader>
                <CardTitle className="text-dreamz-rose">Discord Channel</CardTitle>
                <CardDescription>Select the channel to post your video</CardDescription>
              </CardHeader>
              <CardContent>
                <Select>
                  <SelectTrigger className="bg-dreamz-surface border-dreamz-border">
                    <SelectValue placeholder="Select a channel" />
                  </SelectTrigger>
                  <SelectContent className="bg-dreamz-card border-dreamz-border">
                    <SelectItem value="general">#general</SelectItem>
                    <SelectItem value="videos">#videos</SelectItem>
                    <SelectItem value="vip">#vip-content</SelectItem>
                    <SelectItem value="announcements">#announcements</SelectItem>
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            {/* Tags */}
            <Card className="bg-dreamz-card border-dreamz-border">
              <CardHeader>
                <CardTitle className="text-dreamz-rose">Tags</CardTitle>
                <CardDescription>Add relevant tags to categorize your content</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder="Add a tag"
                    className="bg-dreamz-surface border-dreamz-border"
                    onKeyPress={(e) => e.key === 'Enter' && addTag()}
                  />
                  <Button onClick={addTag} variant="dreamzOutline">Add</Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="bg-dreamz-surface text-dreamz-rose border-dreamz-border">
                      {tag}
                      <button onClick={() => removeTag(tag)} className="ml-2 hover:text-destructive">
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Publishing Options */}
          <Card className="bg-dreamz-card border-dreamz-border">
            <CardHeader>
              <CardTitle className="text-dreamz-rose">Publishing Options</CardTitle>
              <CardDescription>Choose when to publish your video</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-2">
                <Switch
                  id="schedule"
                  checked={schedulePost}
                  onCheckedChange={setSchedulePost}
                />
                <Label htmlFor="schedule">Schedule post for later</Label>
              </div>

              {schedulePost && (
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="date">Date</Label>
                    <div className="relative">
                      <Input
                        id="date"
                        type="date"
                        className="bg-dreamz-surface border-dreamz-border"
                      />
                      <Calendar className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="time">Time</Label>
                    <div className="relative">
                      <Input
                        id="time"
                        type="time"
                        className="bg-dreamz-surface border-dreamz-border"
                      />
                      <Clock className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>
                </div>
              )}

              <div className="flex gap-4">
                <Button variant="dreamz" className="flex-1">
                  {schedulePost ? "Schedule Video" : "Upload & Post Now"}
                </Button>
                <Button variant="outline" className="border-dreamz-border">
                  Save as Draft
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bulk" className="space-y-6">
          {/* Bulk Upload */}
          <Card className="bg-dreamz-card border-dreamz-border">
            <CardHeader>
              <CardTitle className="text-dreamz-rose">Bulk Video Upload</CardTitle>
              <CardDescription>Upload multiple videos at once</CardDescription>
            </CardHeader>
            <CardContent>
              <div
                className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
                  dragActive
                    ? "border-dreamz-rose bg-dreamz-rose/10"
                    : "border-dreamz-border hover:border-dreamz-rose/50"
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <FolderOpen className="mx-auto h-16 w-16 text-muted-foreground mb-6" />
                <p className="text-xl font-medium text-foreground mb-3">
                  Drop multiple videos here or click to browse
                </p>
                <p className="text-muted-foreground mb-6">
                  Upload multiple .mp4, .mov, or .webm files at once
                </p>
                <Button variant="dreamz" size="lg">
                  Choose Multiple Files
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Channel Assignment Mode */}
          <Card className="bg-dreamz-card border-dreamz-border">
            <CardHeader>
              <CardTitle className="text-dreamz-rose">Upload Mode</CardTitle>
              <CardDescription>Choose how to assign channels to your videos</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <Button variant="dreamzOutline" className="h-20 flex-col">
                  <Upload className="h-6 w-6 mb-2" />
                  Upload to One Channel
                </Button>
                <Button variant="dreamzOutline" className="h-20 flex-col">
                  <FolderOpen className="h-6 w-6 mb-2" />
                  Assign Channels Later
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};