import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { GeminiService } from '@/services/gemini';
import { Eye, EyeOff, Key } from 'lucide-react';

interface ApiKeySetupProps {
  onApiKeySet: () => void;
}

export const ApiKeySetup = ({ onApiKeySet }: ApiKeySetupProps) => {
  const [apiKey, setApiKey] = useState('');
  const [showKey, setShowKey] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!apiKey.trim()) {
      toast({
        title: "Error",
        description: "Please enter your Gemini API key",
        variant: "destructive"
      });
      return;
    }

    setIsValidating(true);
    
    try {
      GeminiService.getInstance().setApiKey(apiKey.trim());
      
      toast({
        title: "Success!",
        description: "API key saved successfully"
      });
      
      onApiKeySet();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to validate API key. Please check and try again.",
        variant: "destructive"
      });
    } finally {
      setIsValidating(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Enhanced animated background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-[40rem] h-[40rem] bg-gradient-to-r from-purple-500/15 to-pink-500/15 rounded-full blur-3xl animate-bounce"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl animate-ping"></div>
        <div className="absolute top-10 right-1/4 w-64 h-64 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 left-1/4 w-72 h-72 bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-full blur-3xl animate-bounce"></div>
      </div>
      
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-purple-400/60 rounded-full animate-ping"></div>
        <div className="absolute top-3/4 right-1/3 w-1 h-1 bg-blue-400/60 rounded-full animate-pulse"></div>
        <div className="absolute top-1/2 left-3/4 w-1.5 h-1.5 bg-pink-400/60 rounded-full animate-bounce"></div>
        <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-cyan-400/60 rounded-full animate-ping"></div>
      </div>
      
      <Card className="w-full max-w-lg shadow-2xl border border-white/20 bg-gradient-to-br from-white/95 via-white/85 to-white/75 backdrop-blur-2xl relative overflow-hidden z-10">
        {/* Enhanced decorative elements */}
        <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full blur-2xl animate-bounce"></div>
        <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-gradient-to-br from-emerald-500/15 to-teal-500/15 rounded-full blur-2xl animate-ping"></div>
        
        <CardHeader className="text-center space-y-6 relative z-10 pb-8">
          <div className="mx-auto w-20 h-20 bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-600 rounded-3xl flex items-center justify-center shadow-2xl animate-pulse transform hover:scale-110 transition-transform duration-300">
            <Key className="w-10 h-10 text-white drop-shadow-lg" />
          </div>
          <div>
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent">
              🤖 Setup Gemini API
            </CardTitle>
            <p className="text-slate-600 mt-3 text-lg">
              Enter your free Gemini API key to start generating proposals ✨
            </p>
          </div>
        </CardHeader>
        
        <CardContent className="relative z-10 px-8 pb-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-3">
              <Label htmlFor="apiKey" className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                🗝️ Gemini API Key
              </Label>
              <div className="relative">
                <Input
                  id="apiKey"
                  type={showKey ? 'text' : 'password'}
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="AIza..."
                  className="pr-12 py-4 text-lg transition-all focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500 bg-white/90 backdrop-blur-sm shadow-lg hover:shadow-xl border-slate-200 rounded-2xl"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-4 hover:bg-transparent rounded-2xl"
                  onClick={() => setShowKey(!showKey)}
                >
                  {showKey ? (
                    <EyeOff className="w-5 h-5 text-slate-500 hover:text-purple-600 transition-colors" />
                  ) : (
                    <Eye className="w-5 h-5 text-slate-500 hover:text-purple-600 transition-colors" />
                  )}
                </Button>
              </div>
              <p className="text-sm text-slate-500 flex items-center gap-2">
                🔒 Your API key is stored locally and never sent to our servers
              </p>
            </div>

            <Button
              type="submit"
              disabled={isValidating}
              className="w-full py-4 text-lg font-semibold bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 hover:from-purple-700 hover:via-blue-700 hover:to-cyan-700 text-white border-0 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300"
            >
              {isValidating ? "⏳ Validating..." : "💾 Save API Key"}
            </Button>
          </form>

          <div className="mt-8 p-6 bg-gradient-to-r from-purple-50/80 to-blue-50/80 rounded-2xl border border-purple-200/50 backdrop-blur-sm">
            <p className="text-sm text-slate-600 leading-relaxed">
              <strong className="text-purple-700">🚀 Need an API key?</strong> Get yours from{' '}
              <a 
                href="https://aistudio.google.com/app/apikey" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-purple-600 hover:text-purple-700 underline decoration-2 underline-offset-2 transition-all font-medium"
              >
                Google AI Studio (Free!)
              </a>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};