import { GoogleGenerativeAI } from '@google/generative-ai';

interface ProposalRequest {
  jobTitle: string;
  jobDescription: string;
  budget?: string;
  deadline?: string;
  clientName?: string;
  tone?: 'professional' | 'friendly' | 'confident' | 'creative';
  experience?: string;
}

interface ApiKeyStore {
  getApiKey(): string | null;
  setApiKey(key: string): void;
  hasApiKey(): boolean;
}

export class GeminiService {
  private static instance: GeminiService;
  private genAI: GoogleGenerativeAI | null = null;
  private apiKeyStore: ApiKeyStore;

  private constructor() {
    this.apiKeyStore = {
      getApiKey: () => localStorage.getItem('freelance_assistant_gemini_key'),
      setApiKey: (key: string) => localStorage.setItem('freelance_assistant_gemini_key', key),
      hasApiKey: () => !!localStorage.getItem('freelance_assistant_gemini_key')
    };
    
    this.initializeGemini();
  }

  static getInstance(): GeminiService {
    if (!GeminiService.instance) {
      GeminiService.instance = new GeminiService();
    }
    return GeminiService.instance;
  }

  private initializeGemini(): void {
    const apiKey = this.apiKeyStore.getApiKey();
    if (apiKey) {
      this.genAI = new GoogleGenerativeAI(apiKey);
    }
  }

  setApiKey(apiKey: string): void {
    this.apiKeyStore.setApiKey(apiKey);
    this.initializeGemini();
  }

  hasApiKey(): boolean {
    return this.apiKeyStore.hasApiKey();
  }

  async generateProposal(request: ProposalRequest): Promise<string> {
    if (!this.genAI) {
      throw new Error('Gemini API key not configured');
    }

    const toneMap = {
      professional: 'professional and formal',
      friendly: 'friendly and approachable',
      confident: 'confident and assertive',
      creative: 'creative and engaging'
    };

    const tone = toneMap[request.tone || 'professional'];
    
    const prompt = `Write a compelling freelance proposal for the following job:

Job Title: ${request.jobTitle}
Job Description: ${request.jobDescription}
${request.budget ? `Budget: ${request.budget}` : ''}
${request.deadline ? `Deadline: ${request.deadline}` : ''}
${request.clientName ? `Client: ${request.clientName}` : ''}
${request.experience ? `My relevant experience: ${request.experience}` : ''}

Write the proposal in a ${tone} tone. The proposal should:
1. Address the client's specific needs mentioned in the job description
2. Highlight relevant skills and experience 
3. Propose a clear solution or approach
4. Be concise but compelling (around 200-300 words)
5. Include a professional opening and closing
6. Show enthusiasm for the project

Do not include placeholder text or brackets. Make it ready to send.`;

    try {
      const model = this.genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const result = await model.generateContent(prompt);
      const response = await result.response;
      return response.text() || 'Failed to generate proposal';
    } catch (error) {
      console.error('Error generating proposal:', error);
      throw new Error('Failed to generate proposal. Please check your API key and try again.');
    }
  }
}