import { useState, useEffect } from 'react';
import { AppHeader } from '@/components/AppHeader';
import { ApiKeySetup } from '@/components/ApiKeySetup';
import { ProposalForm } from '@/components/ProposalForm';
import { ProposalDisplay } from '@/components/ProposalDisplay';
import { GeminiService } from '@/services/gemini';

const Index = () => {
  const [hasApiKey, setHasApiKey] = useState(false);
  const [generatedProposal, setGeneratedProposal] = useState<string | null>(null);

  useEffect(() => {
    const geminiService = GeminiService.getInstance();
    setHasApiKey(geminiService.hasApiKey());
  }, []);

  const handleApiKeySet = () => {
    setHasApiKey(true);
  };

  const handleResetApiKey = () => {
    localStorage.removeItem('freelance_assistant_gemini_key');
    setHasApiKey(false);
    setGeneratedProposal(null);
  };

  const handleProposalGenerated = (proposal: string) => {
    setGeneratedProposal(proposal);
  };

  const handleGenerateNew = () => {
    setGeneratedProposal(null);
  };

  if (!hasApiKey) {
    return <ApiKeySetup onApiKeySet={handleApiKeySet} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
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
      
      <AppHeader onResetApiKey={handleResetApiKey} />
      
      <main className="max-w-7xl mx-auto p-8 relative z-10">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
          <div className="space-y-8">
            <ProposalForm onProposalGenerated={handleProposalGenerated} />
          </div>
          
          <div className="space-y-8">
            {generatedProposal ? (
              <ProposalDisplay 
                proposal={generatedProposal} 
                onGenerateNew={handleGenerateNew} 
              />
            ) : (
              <div className="h-full flex items-center justify-center">
                <div className="text-center p-12 bg-gradient-to-br from-white/90 via-white/70 to-white/50 backdrop-blur-2xl rounded-3xl border border-white/20 shadow-2xl relative overflow-hidden max-w-md">
                  {/* Enhanced decorative elements */}
                  <div className="absolute -top-12 -right-12 w-24 h-24 bg-gradient-to-br from-purple-500/30 to-pink-500/30 rounded-full blur-2xl animate-pulse"></div>
                  <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-gradient-to-br from-blue-500/30 to-cyan-500/30 rounded-full blur-2xl animate-bounce"></div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-full blur-2xl animate-ping"></div>
                  
                  <div className="relative z-10">
                    <div className="w-24 h-24 mx-auto mb-8 bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-600 rounded-3xl flex items-center justify-center shadow-2xl animate-pulse transform hover:scale-110 transition-transform duration-300">
                      <svg 
                        className="w-12 h-12 text-white drop-shadow-lg" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent">
                      ⚡ AI-Powered Proposals
                    </h3>
                    <p className="text-slate-600 text-lg leading-relaxed">
                      Fill in the job details to generate professional, 
                      personalized proposals powered by <span className="font-semibold text-purple-600">Google Gemini AI</span>! ✨
                    </p>
                    <div className="mt-6 flex justify-center">
                      <div className="px-4 py-2 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full text-sm text-purple-700 font-medium">
                        🆓 Free to use • No credit card required
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
