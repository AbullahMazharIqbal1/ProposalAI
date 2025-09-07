import { Button } from '@/components/ui/button';
import { Settings, RefreshCw } from 'lucide-react';
import heroImage from '@/assets/hero-image.jpg';

interface AppHeaderProps {
  onResetApiKey: () => void;
}

export const AppHeader = ({ onResetApiKey }: AppHeaderProps) => {
  return (
    <header className="w-full bg-gradient-to-r from-primary via-secondary to-accent p-6 shadow-rainbow relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 animate-pulse"></div>
      <div className="absolute top-0 left-1/4 w-32 h-32 bg-warning/10 rounded-full blur-3xl animate-bounce"></div>
      <div className="absolute bottom-0 right-1/4 w-40 h-40 bg-info/10 rounded-full blur-3xl animate-pulse"></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-rainbow bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-md border border-white/30 transform hover:scale-110 transition-all duration-300">
              <img 
                src={heroImage} 
                alt="Freelance Assistant" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-3xl font-bold text-white drop-shadow-lg">
                <span className="bg-gradient-to-r from-white via-white/90 to-white/80 bg-clip-text text-transparent">
                  Freelance Assistant
                </span>
              </h1>
              <p className="text-white/90 text-lg drop-shadow-md">
                ✨ AI-Powered Proposal Writer for Fiverr & Upwork
              </p>
            </div>
          </div>
          
          <Button
            variant="outline"
            onClick={onResetApiKey}
            className="bg-white/15 hover:bg-white/25 text-white border-white/30 hover:border-white/50 backdrop-blur-md shadow-elegant hover:shadow-glow transition-all duration-300 transform hover:scale-105"
          >
            <Settings className="w-4 h-4 mr-2" />
            API Settings
          </Button>
        </div>
      </div>
    </header>
  );
};