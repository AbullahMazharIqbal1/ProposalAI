import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { GeminiService } from '@/services/gemini';
import { Loader2, Wand2, Briefcase, DollarSign, Clock, User } from 'lucide-react';

interface ProposalFormData {
  jobTitle: string;
  jobDescription: string;
  budget: string;
  deadline: string;
  clientName: string;
  tone: 'professional' | 'friendly' | 'confident' | 'creative';
  experience: string;
}

interface ProposalFormProps {
  onProposalGenerated: (proposal: string) => void;
}

export const ProposalForm = ({ onProposalGenerated }: ProposalFormProps) => {
  const [formData, setFormData] = useState<ProposalFormData>({
    jobTitle: '',
    jobDescription: '',
    budget: '',
    deadline: '',
    clientName: '',
    tone: 'professional',
    experience: ''
  });
  
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (field: keyof ProposalFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.jobTitle.trim() || !formData.jobDescription.trim()) {
      toast({
        title: "Missing Information",
        description: "Please fill in the job title and description",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);

    try {
      const geminiService = GeminiService.getInstance();
      const proposal = await geminiService.generateProposal(formData);
      
      onProposalGenerated(proposal);
      
      toast({
        title: "Proposal Generated!",
        description: "Your AI-powered proposal is ready"
      });
    } catch (error) {
      toast({
        title: "Generation Failed",
        description: error instanceof Error ? error.message : "Failed to generate proposal",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Card className="w-full shadow-2xl border border-white/20 bg-gradient-to-br from-white/95 via-white/85 to-white/75 backdrop-blur-2xl relative overflow-hidden rounded-3xl">
      {/* Enhanced decorative background elements */}
      <div className="absolute -top-6 -left-6 w-32 h-32 bg-gradient-to-br from-blue-500/15 to-purple-500/15 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute -bottom-6 -right-6 w-40 h-40 bg-gradient-to-br from-purple-500/15 to-pink-500/15 rounded-full blur-3xl animate-bounce"></div>
      <div className="absolute top-1/4 right-1/4 w-24 h-24 bg-gradient-to-br from-cyan-500/10 to-emerald-500/10 rounded-full blur-3xl animate-ping"></div>
      
      <CardHeader className="space-y-4 relative z-10 pb-8">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-600 rounded-2xl flex items-center justify-center shadow-xl animate-pulse transform hover:scale-110 transition-transform duration-300">
            <Briefcase className="w-7 h-7 text-white drop-shadow-lg" />
          </div>
          <div>
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent">
              📝 Job Details
            </CardTitle>
            <p className="text-slate-600 text-lg">Enter the job information to generate your proposal</p>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="relative z-10">
        <form onSubmit={handleSubmit} className="space-y-8 relative z-10 px-8 pb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="jobTitle" className="text-sm font-medium flex items-center gap-2 text-primary">
                <Briefcase className="w-4 h-4" />
                Job Title *
              </Label>
              <Input
                id="jobTitle"
                value={formData.jobTitle}
                onChange={(e) => handleInputChange('jobTitle', e.target.value)}
                placeholder="e.g. Build a React Dashboard"
                className="transition-all focus:ring-2 focus:ring-primary/30 focus:border-primary bg-white/80 backdrop-blur-sm shadow-md hover:shadow-lg"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="budget" className="text-sm font-medium flex items-center gap-2 text-success">
                <DollarSign className="w-4 h-4" />
                Budget
              </Label>
              <Input
                id="budget"
                value={formData.budget}
                onChange={(e) => handleInputChange('budget', e.target.value)}
                placeholder="e.g. $500-1000"
                className="transition-all focus:ring-2 focus:ring-success/30 focus:border-success bg-white/80 backdrop-blur-sm shadow-md hover:shadow-lg"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="deadline" className="text-sm font-medium flex items-center gap-2 text-warning">
                <Clock className="w-4 h-4" />
                Deadline
              </Label>
              <Input
                id="deadline"
                value={formData.deadline}
                onChange={(e) => handleInputChange('deadline', e.target.value)}
                placeholder="e.g. 2 weeks"
                className="transition-all focus:ring-2 focus:ring-warning/30 focus:border-warning bg-white/80 backdrop-blur-sm shadow-md hover:shadow-lg"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="clientName" className="text-sm font-medium flex items-center gap-2 text-info">
                <User className="w-4 h-4" />
                Client Name
              </Label>
              <Input
                id="clientName"
                value={formData.clientName}
                onChange={(e) => handleInputChange('clientName', e.target.value)}
                placeholder="e.g. John"
                className="transition-all focus:ring-2 focus:ring-info/30 focus:border-info bg-white/80 backdrop-blur-sm shadow-md hover:shadow-lg"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="jobDescription" className="text-sm font-medium text-secondary">
              📄 Job Description *
            </Label>
            <Textarea
              id="jobDescription"
              value={formData.jobDescription}
              onChange={(e) => handleInputChange('jobDescription', e.target.value)}
              placeholder="Paste the job description here..."
              rows={4}
              className="resize-none transition-all focus:ring-2 focus:ring-secondary/30 focus:border-secondary bg-white/80 backdrop-blur-sm shadow-md hover:shadow-lg"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="tone" className="text-sm font-medium text-accent">
                🎨 Tone
              </Label>
              <Select value={formData.tone} onValueChange={(value) => handleInputChange('tone', value)}>
                <SelectTrigger className="transition-all focus:ring-2 focus:ring-accent/30 focus:border-accent bg-white/80 backdrop-blur-sm shadow-md hover:shadow-lg">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white/95 backdrop-blur-xl border-accent/20">
                  <SelectItem value="professional">🎯 Professional</SelectItem>
                  <SelectItem value="friendly">😊 Friendly</SelectItem>
                  <SelectItem value="confident">💪 Confident</SelectItem>
                  <SelectItem value="creative">🎨 Creative</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="experience" className="text-sm font-medium text-primary">
                ⭐ Relevant Experience
              </Label>
              <Input
                id="experience"
                value={formData.experience}
                onChange={(e) => handleInputChange('experience', e.target.value)}
                placeholder="e.g. 5 years React development"
                className="transition-all focus:ring-2 focus:ring-primary/30 focus:border-primary bg-white/80 backdrop-blur-sm shadow-md hover:shadow-lg"
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={isGenerating}
            className="w-full text-xl py-8 font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 hover:from-purple-700 hover:via-blue-700 hover:to-cyan-700 text-white border-0 rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-[1.02] transition-all duration-300"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-6 h-6 mr-3 animate-spin" />
                ✨ Generating Proposal...
              </>
            ) : (
              <>
                <Wand2 className="w-6 h-6 mr-3" />
                🚀 Generate AI Proposal
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};