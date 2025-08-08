import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { 
  Upload, 
  X, 
  Package, 
  Users, 
  Crown, 
  Star, 
  AlertCircle,
  FolderOpen,
  CheckCircle2,
  ArrowRight
} from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface VideoFile {
  id: string;
  name: string;
  size: number;
  duration: number;
  selected: boolean;
}

interface VideoBundle {
  id: string;
  name: string;
  videos: VideoFile[];
  totalSize: number;
  tiers: ('basic' | 'medium' | 'premium')[];
  channels: string[];
}

const mockVideos: VideoFile[] = [
  { id: '1', name: 'latina_teen_01.mp4', size: 45000000, duration: 180, selected: false },
  { id: '2', name: 'latina_teen_02.mp4', size: 52000000, duration: 220, selected: false },
  { id: '3', name: 'latina_teen_03.mp4', size: 48000000, duration: 195, selected: false },
  { id: '4', name: 'latina_teen_04.mp4', size: 55000000, duration: 240, selected: false },
  { id: '5', name: 'latina_teen_05.mp4', size: 41000000, duration: 165, selected: false },
  { id: '6', name: 'latina_teen_06.mp4', size: 49000000, duration: 205, selected: false },
  { id: '7', name: 'latina_teen_07.mp4', size: 46000000, duration: 188, selected: false },
  { id: '8', name: 'latina_teen_08.mp4', size: 53000000, duration: 230, selected: false },
  { id: '9', name: 'latina_teen_09.mp4', size: 44000000, duration: 175, selected: false },
  { id: '10', name: 'latina_teen_10.mp4', size: 50000000, duration: 210, selected: false },
];

const mockChannels = [
  { id: 'basic-1', name: '#basic-content', tier: 'basic' },
  { id: 'basic-2', name: '#basic-videos', tier: 'basic' },
  { id: 'medium-1', name: '#medium-content', tier: 'medium' },
  { id: 'medium-2', name: '#medium-videos', tier: 'medium' },
  { id: 'premium-1', name: '#premium-content', tier: 'premium' },
  { id: 'premium-2', name: '#vip-exclusive', tier: 'premium' },
];

const formatFileSize = (bytes: number) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

const formatDuration = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

export const VideoBundler = () => {
  const [videos, setVideos] = useState<VideoFile[]>(mockVideos);
  const [bundles, setBundles] = useState<VideoBundle[]>([]);
  const [bundleName, setBundleName] = useState("");
  const [currentStep, setCurrentStep] = useState<'upload' | 'bundle' | 'assign'>('upload');

  const selectedVideos = videos.filter(v => v.selected);
  const totalSelectedSize = selectedVideos.reduce((acc, v) => acc + v.size, 0);
  const maxSize = 500 * 1024 * 1024; // 500MB
  const maxVideos = 10;

  const isValidSelection = selectedVideos.length <= maxVideos && totalSelectedSize <= maxSize;

  const toggleVideoSelection = (videoId: string) => {
    setVideos(videos.map(v => 
      v.id === videoId ? { ...v, selected: !v.selected } : v
    ));
  };

  const createBundle = () => {
    if (!bundleName.trim() || !isValidSelection) return;
    
    const newBundle: VideoBundle = {
      id: Date.now().toString(),
      name: bundleName,
      videos: selectedVideos,
      totalSize: totalSelectedSize,
      tiers: [],
      channels: []
    };

    setBundles([...bundles, newBundle]);
    setBundleName("");
    
    // Clear selection
    setVideos(videos.map(v => ({ ...v, selected: false })));
  };

  const removeBundle = (bundleId: string) => {
    setBundles(bundles.filter(b => b.id !== bundleId));
  };

  const updateBundleTiers = (bundleId: string, tiers: ('basic' | 'medium' | 'premium')[]) => {
    setBundles(bundles.map(b => 
      b.id === bundleId ? { ...b, tiers } : b
    ));
  };

  const updateBundleChannels = (bundleId: string, channels: string[]) => {
    setBundles(bundles.map(b => 
      b.id === bundleId ? { ...b, channels } : b
    ));
  };

  const getTierIcon = (tier: string) => {
    switch (tier) {
      case 'basic': return <Users className="h-4 w-4" />;
      case 'medium': return <Star className="h-4 w-4" />;
      case 'premium': return <Crown className="h-4 w-4" />;
      default: return null;
    }
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'basic': return 'bg-gray-500/20 text-gray-300';
      case 'medium': return 'bg-discord-yellow/20 text-yellow-400';
      case 'premium': return 'bg-discord-boost/20 text-purple-400';
      default: return '';
    }
  };

  if (currentStep === 'upload') {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-foreground">Video Bundler</h2>
            <p className="text-muted-foreground mt-2">Create tiered video bundles for your subscription system</p>
          </div>
          <div className="flex gap-2">
            <Badge variant="outline" className="bg-dreamz-surface">
              Step 1: Upload & Bundle
            </Badge>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Video Selection */}
          <div className="lg:col-span-2">
            <Card className="bg-dreamz-card border-dreamz-border">
              <CardHeader>
                <CardTitle className="text-dreamz-rose flex items-center gap-2">
                  <FolderOpen className="h-5 w-5" />
                  Uploaded Videos ({videos.length})
                </CardTitle>
                <CardDescription>Select videos to bundle (max 10 videos, 500MB total)</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {videos.map((video) => (
                    <div 
                      key={video.id}
                      className={`flex items-center gap-3 p-3 rounded-lg border transition-colors ${
                        video.selected 
                          ? 'bg-dreamz-rose/10 border-dreamz-rose/30' 
                          : 'bg-dreamz-surface border-dreamz-border hover:border-dreamz-border/60'
                      }`}
                    >
                      <Checkbox
                        checked={video.selected}
                        onCheckedChange={() => toggleVideoSelection(video.id)}
                      />
                      <div className="flex-1">
                        <p className="font-medium text-foreground">{video.name}</p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>{formatFileSize(video.size)}</span>
                          <span>{formatDuration(video.duration)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Bundle Creation */}
          <div>
            <Card className="bg-dreamz-card border-dreamz-border">
              <CardHeader>
                <CardTitle className="text-dreamz-rose flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Create Bundle
                </CardTitle>
                <CardDescription>Bundle selected videos</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="bundle-name">Bundle Name</Label>
                  <Input
                    id="bundle-name"
                    value={bundleName}
                    onChange={(e) => setBundleName(e.target.value)}
                    placeholder="e.g., Latina Teen Part 1"
                    className="bg-dreamz-surface border-dreamz-border"
                  />
                </div>

                <Separator className="bg-dreamz-border" />

                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Selected Videos:</span>
                    <span className={selectedVideos.length > maxVideos ? 'text-red-400' : 'text-foreground'}>
                      {selectedVideos.length} / {maxVideos}
                    </span>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Total Size:</span>
                      <span className={totalSelectedSize > maxSize ? 'text-red-400' : 'text-foreground'}>
                        {formatFileSize(totalSelectedSize)}
                      </span>
                    </div>
                    <Progress 
                      value={(totalSelectedSize / maxSize) * 100}
                      className="h-2"
                    />
                    <p className="text-xs text-muted-foreground">
                      Limit: {formatFileSize(maxSize)}
                    </p>
                  </div>
                </div>

                {!isValidSelection && selectedVideos.length > 0 && (
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-red-500/10 border border-red-500/20">
                    <AlertCircle className="h-4 w-4 text-red-400" />
                    <p className="text-sm text-red-400">
                      {selectedVideos.length > maxVideos 
                        ? `Too many videos (max ${maxVideos})`
                        : 'File size exceeds 500MB limit'
                      }
                    </p>
                  </div>
                )}

                <Button
                  onClick={createBundle}
                  disabled={!bundleName.trim() || !isValidSelection || selectedVideos.length === 0}
                  className="w-full"
                  variant="dreamz"
                >
                  Create Bundle
                </Button>
              </CardContent>
            </Card>

            {/* Created Bundles */}
            {bundles.length > 0 && (
              <Card className="bg-dreamz-card border-dreamz-border mt-6">
                <CardHeader>
                  <CardTitle className="text-dreamz-purple flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5" />
                    Created Bundles ({bundles.length})
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {bundles.map((bundle) => (
                    <div key={bundle.id} className="flex items-center justify-between p-2 rounded-lg bg-dreamz-surface">
                      <div>
                        <p className="font-medium text-foreground">{bundle.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {bundle.videos.length} videos • {formatFileSize(bundle.totalSize)}
                        </p>
                      </div>
                      <Button
                        onClick={() => removeBundle(bundle.id)}
                        variant="ghost"
                        size="sm"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  
                  <Button
                    onClick={() => setCurrentStep('assign')}
                    className="w-full mt-4"
                    variant="dreamz"
                    disabled={bundles.length === 0}
                  >
                    Next: Assign Tiers & Channels
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (currentStep === 'assign') {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-foreground">Tier & Channel Assignment</h2>
            <p className="text-muted-foreground mt-2">Assign subscription tiers and channels to your bundles</p>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={() => setCurrentStep('upload')}
              variant="outline"
              className="border-dreamz-border"
            >
              Back
            </Button>
            <Badge variant="outline" className="bg-dreamz-surface">
              Step 2: Assign Distribution
            </Badge>
          </div>
        </div>

        <div className="grid gap-6">
          {bundles.map((bundle, index) => (
            <Card key={bundle.id} className="bg-dreamz-card border-dreamz-border">
              <CardHeader>
                <CardTitle className="text-dreamz-rose flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  {bundle.name} (Bundle #{index + 1})
                </CardTitle>
                <CardDescription>
                  {bundle.videos.length} videos • {formatFileSize(bundle.totalSize)}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  {/* Tier Selection */}
                  <div className="space-y-4">
                    <Label className="text-base font-medium">Subscription Tiers</Label>
                    <div className="space-y-3">
                      {['basic', 'medium', 'premium'].map((tier) => (
                        <div key={tier} className="flex items-center gap-3">
                          <Checkbox
                            checked={bundle.tiers.includes(tier as any)}
                            onCheckedChange={(checked) => {
                              const newTiers = checked
                                ? [...bundle.tiers, tier as any]
                                : bundle.tiers.filter(t => t !== tier);
                              updateBundleTiers(bundle.id, newTiers);
                            }}
                          />
                          <div className={`flex items-center gap-2 px-3 py-2 rounded-lg ${getTierColor(tier)}`}>
                            {getTierIcon(tier)}
                            <span className="font-medium capitalize">{tier}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Channel Selection */}
                  <div className="space-y-4">
                    <Label className="text-base font-medium">Target Channels</Label>
                    <div className="space-y-2">
                      {mockChannels.map((channel) => (
                        <div key={channel.id} className="flex items-center gap-3">
                          <Checkbox
                            checked={bundle.channels.includes(channel.id)}
                            onCheckedChange={(checked) => {
                              const newChannels = checked
                                ? [...bundle.channels, channel.id]
                                : bundle.channels.filter(c => c !== channel.id);
                              updateBundleChannels(bundle.id, newChannels);
                            }}
                          />
                          <div className="flex items-center gap-2">
                            <span className="text-muted-foreground">#</span>
                            <span className="text-foreground">{channel.name.slice(1)}</span>
                            <Badge variant="outline" className={`text-xs ${getTierColor(channel.tier)}`}>
                              {channel.tier}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bundle Preview */}
                <div className="p-4 rounded-lg bg-dreamz-surface border border-dreamz-border">
                  <p className="text-sm font-medium text-foreground mb-2">Distribution Preview:</p>
                  <div className="flex flex-wrap gap-2">
                    {bundle.tiers.map((tier) => (
                      <Badge key={tier} className={getTierColor(tier)}>
                        {getTierIcon(tier)}
                        <span className="ml-1 capitalize">{tier}</span>
                      </Badge>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Will be posted to {bundle.channels.length} channel{bundle.channels.length !== 1 ? 's' : ''}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="bg-gradient-to-br from-dreamz-rose/10 to-dreamz-purple/10 border-dreamz-border">
          <CardContent className="p-6">
            <div className="text-center">
              <h3 className="text-xl font-bold text-foreground mb-2">Ready to Deploy</h3>
              <p className="text-muted-foreground mb-4">
                {bundles.length} bundles configured for tiered distribution
              </p>
              <Button variant="dreamz" size="lg">
                Deploy All Bundles
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return null;
};