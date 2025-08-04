import { Bot } from "lucide-react";

export const DreamzLogo = () => {
  return (
    <div className="flex items-center gap-2">
      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-dreamz-rose to-dreamz-purple flex items-center justify-center">
        <Bot className="h-6 w-6 text-white" />
      </div>
    </div>
  );
};