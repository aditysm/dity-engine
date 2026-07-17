import React, { useState, useEffect } from 'react';
import { Send, User, Bot, Loader2, Maximize2, Minimize2 } from 'lucide-react';
import { cn } from '../lib/utils';
import ReactMarkdown from 'react-markdown';
import { Project } from '../types';

interface Message {
  role: 'user' | 'model';
  text: string;
}

interface GeminiChatProps {
  project?: Project | null;
  isMaximized?: boolean;
  onToggleMaximize?: () => void;
}

export const GeminiChat = ({ project, isMaximized, onToggleMaximize }: GeminiChatProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Reset messages when project changes
    setMessages([
      { 
        role: 'model', 
        text: project 
          ? `Halo! Saya Dity Assistant. Kita sedang berada di workspace **${project.name}**. Apa yang ingin Anda diskusikan mengenai proyek ini?` 
          : 'Halo! Saya Dity Assistant. Saya siap membantu Anda di luar konteks proyek. Ada yang bisa dibantu?'
      }
    ]);
  }, [project?.id]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const systemInstruction = project
      ? `You are Dity Assistant, a professional project architect. The user is currently in the workspace for a project named "${project.name}". Project Audience: "${project.audience}". Project Purpose: "${project.purpose}". Tech Stack: ${project.tech_stack.join(', ')}. Design Style: "${project.design_style}". Assist the user with this specific project.`
      : 'You are Dity Assistant, a professional AI assistant. You are currently in a generic room outside of any specific project workspace. Assist the user with general inquiries.';

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage].map(m => ({
            role: m.role,
            parts: [{ text: m.text }]
          })),
          systemInstruction
        })
      });

      const data = await response.json();
      if (data.text) {
        setMessages(prev => [...prev, { role: 'model', text: data.text }]);
      }
    } catch (error) {
      console.error('Chat error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-surface-container-low border border-white/5 rounded-xl overflow-hidden">
      <div className="p-4 border-b border-white/5 flex justify-between items-center bg-surface-container/50">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-primary/10 rounded-lg text-primary">
            <Bot size={16} />
          </div>
          <span className="text-label-md font-bold text-on-surface">Dity Assistant</span>
        </div>
        {onToggleMaximize && (
          <button onClick={onToggleMaximize} className="p-1.5 hover:bg-white/10 rounded-lg text-on-surface-variant transition-colors" title={isMaximized ? "Perkecil" : "Perbesar"}>
            {isMaximized ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((m, i) => (
          <div key={i} className={cn(
            "flex gap-3 max-w-[85%]",
            m.role === 'user' ? "ml-auto flex-row-reverse" : "mr-auto"
          )}>
            <div className={cn(
              "w-8 h-8 rounded-lg flex items-center justify-center shrink-0",
              m.role === 'user' ? "bg-surface-container-highest text-outline" : "bg-primary/20 text-primary"
            )}>
              {m.role === 'user' ? <User size={14} /> : <Bot size={14} />}
            </div>
            <div className={cn(
              "p-3 rounded-2xl text-body-md text-sm leading-relaxed",
              m.role === 'user' 
                ? "bg-surface-container-highest text-on-surface rounded-tr-none" 
                : "bg-surface-container text-on-surface-variant border border-white/5 rounded-tl-none"
            )}>
              <div className="prose prose-invert prose-sm max-w-none">
                <ReactMarkdown>{m.text}</ReactMarkdown>
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex gap-3 mr-auto">
            <div className="w-8 h-8 rounded-lg bg-primary/20 text-primary flex items-center justify-center">
              <Loader2 size={14} className="animate-spin" />
            </div>
            <div className="p-3 bg-surface-container text-outline text-sm rounded-2xl rounded-tl-none">
              Sedang berpikir...
            </div>
          </div>
        )}
      </div>

      <form onSubmit={sendMessage} className="p-4 bg-surface-container-lowest border-t border-white/5">
        <div className="relative group">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ketik pesan..."
            className="w-full bg-surface-container border border-white/10 rounded-xl px-4 py-3 pr-14 text-body-md text-sm focus:ring-1 focus:ring-primary focus:border-primary transition-all min-h-[50px] max-h-[150px] resize-none"
            rows={1}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage(e);
              }
            }}
          />
          <div className="absolute right-2 bottom-2 flex gap-1">
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-all disabled:opacity-50"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
