import { MessageSquare } from "lucide-react";

export const Navbar = () => {
  return (
    <nav className="h-16 bg-black/30 backdrop-blur-md fixed top-0 left-0 right-0 z-50 flex items-center px-6 border-b border-white/10">
      <div className="flex items-center space-x-3">
        <MessageSquare className="w-6 h-6 text-white/90" />
        <span className="text-xl font-semibold text-white/90">Slack Clone</span>
      </div>
    </nav>
  );
};