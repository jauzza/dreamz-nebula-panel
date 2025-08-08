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
  Shield, 
  Plus, 
  X, 
  Ban, 
  AlertTriangle, 
  MessageSquare, 
  Link, 
  Clock,
  Users,
  Settings
} from "lucide-react";

interface ModerationRule {
  id: string;
  name: string;
  type: 'content' | 'link' | 'spam' | 'mention';
  action: 'warn' | 'mute' | 'kick' | 'ban';
  enabled: boolean;
  pattern: string;
  duration?: number;
  description: string;
}

const defaultRules: ModerationRule[] = [
  {
    id: '1',
    name: 'Discord Server Links',
    type: 'link',
    action: 'ban',
    enabled: true,
    pattern: 'discord.gg/*',
    description: 'Automatically ban users posting Discord server invites'
  },
  {
    id: '2',
    name: 'Excessive Mentions',
    type: 'mention',
    action: 'mute',
    enabled: true,
    pattern: '@everyone, @here',
    duration: 300,
    description: 'Mute users abusing mass mentions'
  },
  {
    id: '3',
    name: 'Spam Detection',
    type: 'spam',
    action: 'warn',
    enabled: true,
    pattern: 'Repeated messages',
    description: 'Warn users for spam behavior'
  },
  {
    id: '4',
    name: 'Inappropriate Content',
    type: 'content',
    action: 'ban',
    enabled: true,
    pattern: 'Filtered keywords',
    description: 'Ban users for inappropriate content'
  }
];

export const ModerationPanel = () => {
  const [rules, setRules] = useState<ModerationRule[]>(defaultRules);
  const [newRule, setNewRule] = useState<Partial<ModerationRule>>({
    name: '',
    type: 'content',
    action: 'warn',
    pattern: '',
    description: '',
    enabled: true
  });
  const [showAddRule, setShowAddRule] = useState(false);

  const toggleRule = (ruleId: string) => {
    setRules(rules.map(rule => 
      rule.id === ruleId ? { ...rule, enabled: !rule.enabled } : rule
    ));
  };

  const deleteRule = (ruleId: string) => {
    setRules(rules.filter(rule => rule.id !== ruleId));
  };

  const addRule = () => {
    if (!newRule.name || !newRule.pattern) return;

    const rule: ModerationRule = {
      id: Date.now().toString(),
      name: newRule.name!,
      type: newRule.type!,
      action: newRule.action!,
      pattern: newRule.pattern!,
      description: newRule.description || '',
      enabled: newRule.enabled!,
      duration: newRule.duration
    };

    setRules([...rules, rule]);
    setNewRule({
      name: '',
      type: 'content',
      action: 'warn',
      pattern: '',
      description: '',
      enabled: true
    });
    setShowAddRule(false);
  };

  const getActionColor = (action: string) => {
    switch (action) {
      case 'warn': return 'bg-discord-yellow/20 text-yellow-400';
      case 'mute': return 'bg-discord-blurple/20 text-blue-400';
      case 'kick': return 'bg-orange-500/20 text-orange-400';
      case 'ban': return 'bg-discord-red/20 text-red-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'content': return <MessageSquare className="h-4 w-4" />;
      case 'link': return <Link className="h-4 w-4" />;
      case 'spam': return <AlertTriangle className="h-4 w-4" />;
      case 'mention': return <Users className="h-4 w-4" />;
      default: return <Shield className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Moderation Panel</h2>
          <p className="text-muted-foreground mt-2">Configure automated moderation rules and actions</p>
        </div>
        <Button
          onClick={() => setShowAddRule(!showAddRule)}
          variant="dreamz"
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Add Rule
        </Button>
      </div>

      {/* Moderation Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="bg-dreamz-card border-dreamz-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-discord-green/20">
                <Shield className="h-5 w-5 text-green-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">24/7</p>
                <p className="text-sm text-muted-foreground">Auto Moderation</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-dreamz-card border-dreamz-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-discord-red/20">
                <Ban className="h-5 w-5 text-red-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">147</p>
                <p className="text-sm text-muted-foreground">Actions Today</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-dreamz-card border-dreamz-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-discord-yellow/20">
                <AlertTriangle className="h-5 w-5 text-yellow-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{rules.filter(r => r.enabled).length}</p>
                <p className="text-sm text-muted-foreground">Active Rules</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-dreamz-card border-dreamz-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-discord-blurple/20">
                <Clock className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">99.8%</p>
                <p className="text-sm text-muted-foreground">Uptime</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add New Rule */}
      {showAddRule && (
        <Card className="bg-dreamz-card border-dreamz-border">
          <CardHeader>
            <CardTitle className="text-dreamz-rose flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Add New Moderation Rule
            </CardTitle>
            <CardDescription>Create a custom moderation rule for your server</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="rule-name">Rule Name</Label>
                <Input
                  id="rule-name"
                  value={newRule.name}
                  onChange={(e) => setNewRule({ ...newRule, name: e.target.value })}
                  placeholder="e.g., No External Links"
                  className="bg-dreamz-surface border-dreamz-border"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="rule-type">Rule Type</Label>
                <Select value={newRule.type} onValueChange={(value: any) => setNewRule({ ...newRule, type: value })}>
                  <SelectTrigger className="bg-dreamz-surface border-dreamz-border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-dreamz-card border-dreamz-border">
                    <SelectItem value="content">Content Filter</SelectItem>
                    <SelectItem value="link">Link Detection</SelectItem>
                    <SelectItem value="spam">Spam Protection</SelectItem>
                    <SelectItem value="mention">Mention Abuse</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="rule-action">Action</Label>
                <Select value={newRule.action} onValueChange={(value: any) => setNewRule({ ...newRule, action: value })}>
                  <SelectTrigger className="bg-dreamz-surface border-dreamz-border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-dreamz-card border-dreamz-border">
                    <SelectItem value="warn">Warn User</SelectItem>
                    <SelectItem value="mute">Mute User</SelectItem>
                    <SelectItem value="kick">Kick User</SelectItem>
                    <SelectItem value="ban">Ban User</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {(newRule.action === 'mute') && (
                <div className="space-y-2">
                  <Label htmlFor="rule-duration">Duration (seconds)</Label>
                  <Input
                    id="rule-duration"
                    type="number"
                    value={newRule.duration || ''}
                    onChange={(e) => setNewRule({ ...newRule, duration: parseInt(e.target.value) })}
                    placeholder="300"
                    className="bg-dreamz-surface border-dreamz-border"
                  />
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="rule-pattern">Pattern/Keywords</Label>
              <Input
                id="rule-pattern"
                value={newRule.pattern}
                onChange={(e) => setNewRule({ ...newRule, pattern: e.target.value })}
                placeholder="e.g., discord.gg/*, banned-word, @everyone"
                className="bg-dreamz-surface border-dreamz-border"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="rule-description">Description</Label>
              <Textarea
                id="rule-description"
                value={newRule.description}
                onChange={(e) => setNewRule({ ...newRule, description: e.target.value })}
                placeholder="Describe what this rule does..."
                className="bg-dreamz-surface border-dreamz-border"
              />
            </div>

            <div className="flex items-center gap-2">
              <Switch
                checked={newRule.enabled}
                onCheckedChange={(checked) => setNewRule({ ...newRule, enabled: checked })}
              />
              <Label>Enable rule immediately</Label>
            </div>

            <div className="flex gap-2">
              <Button onClick={addRule} variant="dreamz">
                Add Rule
              </Button>
              <Button 
                onClick={() => setShowAddRule(false)} 
                variant="outline"
                className="border-dreamz-border"
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Active Rules */}
      <Card className="bg-dreamz-card border-dreamz-border">
        <CardHeader>
          <CardTitle className="text-dreamz-rose flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Moderation Rules ({rules.length})
          </CardTitle>
          <CardDescription>Manage your automated moderation rules</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {rules.map((rule) => (
              <div key={rule.id} className={`p-4 rounded-lg border transition-colors ${
                rule.enabled 
                  ? 'bg-dreamz-surface border-dreamz-border' 
                  : 'bg-dreamz-surface/50 border-dreamz-border/50'
              }`}>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3 flex-1">
                    <div className="p-2 rounded-lg bg-dreamz-card">
                      {getTypeIcon(rule.type)}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-medium text-foreground">{rule.name}</h3>
                        <Badge variant="outline" className={getActionColor(rule.action)}>
                          {rule.action.toUpperCase()}
                        </Badge>
                        {!rule.enabled && (
                          <Badge variant="outline" className="bg-gray-500/20 text-gray-400">
                            DISABLED
                          </Badge>
                        )}
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-2">{rule.description}</p>
                      
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>Pattern: {rule.pattern}</span>
                        {rule.duration && <span>Duration: {rule.duration}s</span>}
                        <span>Type: {rule.type}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Switch
                      checked={rule.enabled}
                      onCheckedChange={() => toggleRule(rule.id)}
                    />
                    <Button
                      onClick={() => deleteRule(rule.id)}
                      variant="ghost"
                      size="sm"
                      className="text-red-400 hover:text-red-300"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Global Settings */}
      <Card className="bg-dreamz-card border-dreamz-border">
        <CardHeader>
          <CardTitle className="text-dreamz-purple flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Global Moderation Settings
          </CardTitle>
          <CardDescription>Configure global moderation behavior</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex items-center justify-between">
              <div>
                <Label>Auto-Delete Messages</Label>
                <p className="text-sm text-muted-foreground">Automatically delete flagged messages</p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Log All Actions</Label>
                <p className="text-sm text-muted-foreground">Keep detailed logs of moderation actions</p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>DM Users on Action</Label>
                <p className="text-sm text-muted-foreground">Send DM notifications for actions</p>
              </div>
              <Switch />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Whitelist Admins</Label>
                <p className="text-sm text-muted-foreground">Exempt administrators from rules</p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>

          <Separator className="bg-dreamz-border" />

          <div className="flex gap-4">
            <Button variant="dreamz">Save Settings</Button>
            <Button variant="outline" className="border-dreamz-border">Export Rules</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};