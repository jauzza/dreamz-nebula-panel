import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  MessageSquare, 
  Image, 
  Link, 
  AtSign, 
  Eye, 
  Copy, 
  Send,
  Plus,
  X,
  Hash,
  Users,
  Crown
} from "lucide-react";

interface EmbedField {
  id: string;
  name: string;
  value: string;
  inline: boolean;
}

interface EmbedData {
  title: string;
  description: string;
  color: string;
  thumbnail: string;
  image: string;
  author: {
    name: string;
    iconUrl: string;
    url: string;
  };
  footer: {
    text: string;
    iconUrl: string;
  };
  fields: EmbedField[];
  timestamp: boolean;
}

const mentionTypes = [
  { id: '@everyone', label: '@everyone', description: 'Mentions everyone in the server' },
  { id: '@here', label: '@here', description: 'Mentions only online members' },
  { id: '@role', label: 'Role Mention', description: 'Mention a specific role' },
  { id: '@user', label: 'User Mention', description: 'Mention a specific user' },
];

const embedColors = [
  { name: 'Discord Blurple', value: '#5865F2' },
  { name: 'Rose', value: '#F43F5E' },
  { name: 'Purple', value: '#A855F7' },
  { name: 'Green', value: '#22C55E' },
  { name: 'Yellow', value: '#EAB308' },
  { name: 'Red', value: '#EF4444' },
  { name: 'Blue', value: '#3B82F6' },
  { name: 'Orange', value: '#F97316' },
];

export const EmbedBuilder = () => {
  const [embedData, setEmbedData] = useState<EmbedData>({
    title: '',
    description: '',
    color: '#5865F2',
    thumbnail: '',
    image: '',
    author: { name: '', iconUrl: '', url: '' },
    footer: { text: '', iconUrl: '' },
    fields: [],
    timestamp: false
  });

  const [mentions, setMentions] = useState<string[]>([]);
  const [selectedChannel, setSelectedChannel] = useState('');
  const [messageContent, setMessageContent] = useState('');

  const updateEmbedData = (field: string, value: any) => {
    setEmbedData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const updateNestedField = (parent: string, field: string, value: string) => {
    setEmbedData(prev => ({
      ...prev,
      [parent]: {
        ...prev[parent as keyof EmbedData] as any,
        [field]: value
      }
    }));
  };

  const addField = () => {
    const newField: EmbedField = {
      id: Date.now().toString(),
      name: '',
      value: '',
      inline: false
    };
    setEmbedData(prev => ({
      ...prev,
      fields: [...prev.fields, newField]
    }));
  };

  const updateField = (fieldId: string, property: string, value: any) => {
    setEmbedData(prev => ({
      ...prev,
      fields: prev.fields.map(field =>
        field.id === fieldId ? { ...field, [property]: value } : field
      )
    }));
  };

  const removeField = (fieldId: string) => {
    setEmbedData(prev => ({
      ...prev,
      fields: prev.fields.filter(field => field.id !== fieldId)
    }));
  };

  const addMention = (mentionType: string) => {
    if (!mentions.includes(mentionType)) {
      setMentions([...mentions, mentionType]);
    }
  };

  const removeMention = (mentionType: string) => {
    setMentions(mentions.filter(m => m !== mentionType));
  };

  const copyToClipboard = () => {
    const embedJson = JSON.stringify(embedData, null, 2);
    navigator.clipboard.writeText(embedJson);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground">Embed Builder</h2>
        <p className="text-muted-foreground mt-2">Create rich Discord embeds with mentions and custom styling</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Builder */}
        <div className="space-y-6">
          {/* Message Content & Mentions */}
          <Card className="bg-dreamz-card border-dreamz-border">
            <CardHeader>
              <CardTitle className="text-dreamz-rose flex items-center gap-2">
                <AtSign className="h-5 w-5" />
                Message & Mentions
              </CardTitle>
              <CardDescription>Add message content and configure mentions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="message-content">Message Content (optional)</Label>
                <Textarea
                  id="message-content"
                  value={messageContent}
                  onChange={(e) => setMessageContent(e.target.value)}
                  placeholder="Add text that appears above the embed..."
                  className="bg-dreamz-surface border-dreamz-border"
                />
              </div>

              <Separator className="bg-dreamz-border" />

              <div className="space-y-3">
                <Label>Mentions</Label>
                <div className="grid gap-2">
                  {mentionTypes.map((mention) => (
                    <div key={mention.id} className="flex items-center justify-between p-2 rounded-lg bg-dreamz-surface">
                      <div>
                        <p className="font-medium text-foreground">{mention.label}</p>
                        <p className="text-sm text-muted-foreground">{mention.description}</p>
                      </div>
                      <Button
                        onClick={() => 
                          mentions.includes(mention.id) 
                            ? removeMention(mention.id) 
                            : addMention(mention.id)
                        }
                        variant={mentions.includes(mention.id) ? "dreamz" : "outline"}
                        size="sm"
                      >
                        {mentions.includes(mention.id) ? 'Added' : 'Add'}
                      </Button>
                    </div>
                  ))}
                </div>

                {mentions.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {mentions.map((mention) => (
                      <Badge key={mention} className="bg-discord-blurple/20 text-blue-400">
                        {mention}
                        <button
                          onClick={() => removeMention(mention)}
                          className="ml-2 hover:text-red-400"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Basic Embed Info */}
          <Card className="bg-dreamz-card border-dreamz-border">
            <CardHeader>
              <CardTitle className="text-dreamz-rose flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Embed Content
              </CardTitle>
              <CardDescription>Configure the main embed content</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="embed-title">Title</Label>
                <Input
                  id="embed-title"
                  value={embedData.title}
                  onChange={(e) => updateEmbedData('title', e.target.value)}
                  placeholder="Embed title..."
                  className="bg-dreamz-surface border-dreamz-border"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="embed-description">Description</Label>
                <Textarea
                  id="embed-description"
                  value={embedData.description}
                  onChange={(e) => updateEmbedData('description', e.target.value)}
                  placeholder="Embed description..."
                  className="bg-dreamz-surface border-dreamz-border min-h-[100px]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="embed-color">Color</Label>
                <div className="grid gap-2 grid-cols-4">
                  {embedColors.map((color) => (
                    <button
                      key={color.value}
                      onClick={() => updateEmbedData('color', color.value)}
                      className={`p-2 rounded-lg border-2 transition-colors ${
                        embedData.color === color.value 
                          ? 'border-dreamz-rose' 
                          : 'border-dreamz-border hover:border-dreamz-border/60'
                      }`}
                      style={{ backgroundColor: color.value }}
                    >
                      <span className="text-xs text-white font-medium">{color.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Author & Footer */}
          <Card className="bg-dreamz-card border-dreamz-border">
            <CardHeader>
              <CardTitle className="text-dreamz-purple">Author & Footer</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <Label>Author</Label>
                <div className="grid gap-2">
                  <Input
                    value={embedData.author.name}
                    onChange={(e) => updateNestedField('author', 'name', e.target.value)}
                    placeholder="Author name"
                    className="bg-dreamz-surface border-dreamz-border"
                  />
                  <Input
                    value={embedData.author.iconUrl}
                    onChange={(e) => updateNestedField('author', 'iconUrl', e.target.value)}
                    placeholder="Author icon URL"
                    className="bg-dreamz-surface border-dreamz-border"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <Label>Footer</Label>
                <div className="grid gap-2">
                  <Input
                    value={embedData.footer.text}
                    onChange={(e) => updateNestedField('footer', 'text', e.target.value)}
                    placeholder="Footer text"
                    className="bg-dreamz-surface border-dreamz-border"
                  />
                  <Input
                    value={embedData.footer.iconUrl}
                    onChange={(e) => updateNestedField('footer', 'iconUrl', e.target.value)}
                    placeholder="Footer icon URL"
                    className="bg-dreamz-surface border-dreamz-border"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Switch
                  checked={embedData.timestamp}
                  onCheckedChange={(checked) => updateEmbedData('timestamp', checked)}
                />
                <Label>Include timestamp</Label>
              </div>
            </CardContent>
          </Card>

          {/* Images */}
          <Card className="bg-dreamz-card border-dreamz-border">
            <CardHeader>
              <CardTitle className="text-dreamz-purple flex items-center gap-2">
                <Image className="h-5 w-5" />
                Images
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="thumbnail">Thumbnail URL</Label>
                <Input
                  id="thumbnail"
                  value={embedData.thumbnail}
                  onChange={(e) => updateEmbedData('thumbnail', e.target.value)}
                  placeholder="https://example.com/thumbnail.png"
                  className="bg-dreamz-surface border-dreamz-border"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="image">Image URL</Label>
                <Input
                  id="image"
                  value={embedData.image}
                  onChange={(e) => updateEmbedData('image', e.target.value)}
                  placeholder="https://example.com/image.png"
                  className="bg-dreamz-surface border-dreamz-border"
                />
              </div>
            </CardContent>
          </Card>

          {/* Fields */}
          <Card className="bg-dreamz-card border-dreamz-border">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-dreamz-purple">Fields</CardTitle>
                <Button onClick={addField} variant="dreamzOutline" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Field
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {embedData.fields.map((field) => (
                  <div key={field.id} className="p-3 rounded-lg bg-dreamz-surface border border-dreamz-border">
                    <div className="grid gap-3">
                      <div className="grid gap-2 md:grid-cols-2">
                        <Input
                          value={field.name}
                          onChange={(e) => updateField(field.id, 'name', e.target.value)}
                          placeholder="Field name"
                          className="bg-dreamz-card border-dreamz-border"
                        />
                        <div className="flex items-center gap-2">
                          <Switch
                            checked={field.inline}
                            onCheckedChange={(checked) => updateField(field.id, 'inline', checked)}
                          />
                          <Label className="text-sm">Inline</Label>
                          <Button
                            onClick={() => removeField(field.id)}
                            variant="ghost"
                            size="sm"
                            className="ml-auto text-red-400 hover:text-red-300"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <Textarea
                        value={field.value}
                        onChange={(e) => updateField(field.id, 'value', e.target.value)}
                        placeholder="Field value"
                        className="bg-dreamz-card border-dreamz-border"
                      />
                    </div>
                  </div>
                ))}

                {embedData.fields.length === 0 && (
                  <p className="text-center text-muted-foreground py-4">
                    No fields added. Click "Add Field" to create one.
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Preview & Actions */}
        <div className="space-y-6">
          {/* Preview */}
          <Card className="bg-dreamz-card border-dreamz-border">
            <CardHeader>
              <CardTitle className="text-dreamz-rose flex items-center gap-2">
                <Eye className="h-5 w-5" />
                Live Preview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {/* Message content */}
                {messageContent && (
                  <div className="p-3 rounded-lg bg-discord-dark text-foreground">
                    {messageContent}
                  </div>
                )}

                {/* Mentions */}
                {mentions.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {mentions.map((mention) => (
                      <span key={mention} className="px-2 py-1 rounded text-sm bg-discord-blurple/20 text-blue-400">
                        {mention}
                      </span>
                    ))}
                  </div>
                )}

                {/* Embed preview */}
                <div className="border-l-4 p-4 rounded-r-lg bg-discord-darker" style={{ borderLeftColor: embedData.color }}>
                  {embedData.author.name && (
                    <div className="flex items-center gap-2 mb-2">
                      {embedData.author.iconUrl && (
                        <img src={embedData.author.iconUrl} alt="" className="w-6 h-6 rounded-full" />
                      )}
                      <span className="text-sm font-medium text-foreground">{embedData.author.name}</span>
                    </div>
                  )}

                  {embedData.title && (
                    <h3 className="text-lg font-semibold text-foreground mb-2">{embedData.title}</h3>
                  )}

                  {embedData.description && (
                    <p className="text-sm text-muted-foreground mb-3">{embedData.description}</p>
                  )}

                  {embedData.fields.length > 0 && (
                    <div className="grid gap-2 mb-3">
                      {embedData.fields.map((field) => (
                        <div key={field.id} className={field.inline ? 'inline-block w-1/2 pr-2' : 'block'}>
                          <p className="font-medium text-sm text-foreground">{field.name}</p>
                          <p className="text-sm text-muted-foreground">{field.value}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {embedData.image && (
                    <img src={embedData.image} alt="" className="rounded mb-3 max-w-full" />
                  )}

                  {embedData.thumbnail && (
                    <div className="float-right">
                      <img src={embedData.thumbnail} alt="" className="w-20 h-20 rounded object-cover" />
                    </div>
                  )}

                  {(embedData.footer.text || embedData.timestamp) && (
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mt-3">
                      {embedData.footer.iconUrl && (
                        <img src={embedData.footer.iconUrl} alt="" className="w-4 h-4 rounded" />
                      )}
                      <span>{embedData.footer.text}</span>
                      {embedData.timestamp && (
                        <span>• {new Date().toLocaleString()}</span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Channel Selection & Actions */}
          <Card className="bg-dreamz-card border-dreamz-border">
            <CardHeader>
              <CardTitle className="text-dreamz-purple flex items-center gap-2">
                <Send className="h-5 w-5" />
                Send Embed
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Target Channel</Label>
                <Select value={selectedChannel} onValueChange={setSelectedChannel}>
                  <SelectTrigger className="bg-dreamz-surface border-dreamz-border">
                    <SelectValue placeholder="Select a channel" />
                  </SelectTrigger>
                  <SelectContent className="bg-dreamz-card border-dreamz-border">
                    <SelectItem value="general">#general</SelectItem>
                    <SelectItem value="announcements">#announcements</SelectItem>
                    <SelectItem value="updates">#updates</SelectItem>
                    <SelectItem value="premium">#premium-content</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Button variant="dreamz" className="w-full">
                  <Send className="h-4 w-4 mr-2" />
                  Send Embed
                </Button>
                
                <Button onClick={copyToClipboard} variant="outline" className="w-full border-dreamz-border">
                  <Copy className="h-4 w-4 mr-2" />
                  Copy JSON
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Quick Templates */}
          <Card className="bg-dreamz-card border-dreamz-border">
            <CardHeader>
              <CardTitle className="text-dreamz-purple">Quick Templates</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2">
                <Button variant="dreamzOutline" className="w-full justify-start">
                  📢 Announcement Template
                </Button>
                <Button variant="dreamzOutline" className="w-full justify-start">
                  🎉 Event Template
                </Button>
                <Button variant="dreamzOutline" className="w-full justify-start">
                  📊 Poll Template
                </Button>
                <Button variant="dreamzOutline" className="w-full justify-start">
                  🎵 Music Template
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};