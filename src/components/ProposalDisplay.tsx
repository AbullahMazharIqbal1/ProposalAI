import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { Copy, Edit3, Check, RotateCcw, FileText } from 'lucide-react';

interface ProposalDisplayProps {
  proposal: string;
  onGenerateNew: () => void;
}

export const ProposalDisplay = ({ proposal, onGenerateNew }: ProposalDisplayProps) => {
  const [editedProposal, setEditedProposal] = useState(proposal);
  const [isEditing, setIsEditing] = useState(false);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(editedProposal);
      setCopied(true);
      
      toast({
        title: "Copied!",
        description: "Proposal copied to clipboard"
      });

      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast({
        title: "Copy Failed",
        description: "Failed to copy to clipboard",
        variant: "destructive"
      });
    }
  };

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleReset = () => {
    setEditedProposal(proposal);
    setIsEditing(false);
  };

  return (
    <Card className="w-full shadow-rainbow border-0 bg-gradient-to-br from-white/90 via-white/70 to-white/50 backdrop-blur-xl relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-br from-accent/10 to-warning/10 rounded-full blur-3xl"></div>
      
      <CardHeader className="space-y-3 relative z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary via-secondary to-accent rounded-xl flex items-center justify-center shadow-rainbow animate-pulse">
              <FileText className="w-5 h-5 text-white drop-shadow-lg" />
            </div>
            <div>
              <CardTitle className="text-xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                ✨ Generated Proposal
              </CardTitle>
              <p className="text-sm text-muted-foreground">Review, edit, and copy your proposal</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleEdit}
              className="transition-all hover:bg-primary/5 hover:border-primary/30 hover:shadow-md transform hover:scale-105"
            >
              <Edit3 className="w-4 h-4 mr-1" />
              {isEditing ? 'Preview' : 'Edit'}
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={handleReset}
              className="transition-all hover:bg-warning/5 hover:border-warning/30 hover:shadow-md transform hover:scale-105"
            >
              <RotateCcw className="w-4 h-4 mr-1" />
              Reset
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6 relative z-10">
        <div className="relative">
          {isEditing ? (
            <Textarea
              value={editedProposal}
              onChange={(e) => setEditedProposal(e.target.value)}
              rows={12}
              className="w-full resize-none transition-all focus:ring-2 focus:ring-primary/30 focus:border-primary bg-white/50 backdrop-blur-sm font-mono text-sm shadow-md"
            />
          ) : (
            <div className="w-full min-h-[300px] p-4 rounded-lg bg-gradient-to-br from-muted/40 to-muted/20 border border-muted/50 backdrop-blur-sm shadow-md">
              <pre className="whitespace-pre-wrap text-sm leading-relaxed font-sans">
                {editedProposal}
              </pre>
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            onClick={handleCopy}
            variant="gradient"
            className="flex-1 transition-all duration-300"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 mr-2" />
                ✅ Copied!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 mr-2" />
                📋 Copy Proposal
              </>
            )}
          </Button>
          
          <Button
            variant="accent"
            onClick={onGenerateNew}
            className="flex-1 transition-all duration-300"
          >
            🔄 Generate New Proposal
          </Button>
        </div>

        <div className="text-xs text-muted-foreground bg-gradient-to-r from-info/10 to-success/10 p-3 rounded-lg border border-info/20 backdrop-blur-sm">
          <strong>💡 Pro Tip:</strong> Review the proposal carefully and personalize it further based on your specific expertise and the client's unique needs before sending.
        </div>
      </CardContent>
    </Card>
  );
};