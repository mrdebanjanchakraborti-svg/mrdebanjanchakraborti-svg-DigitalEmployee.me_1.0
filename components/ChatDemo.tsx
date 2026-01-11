
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";

const ChatDemo: React.FC = () => {
  const [messages, setMessages] = useState<{ role: 'user' | 'ai'; text: string }[]>([
    { role: 'ai', text: "Welcome to DigitalEmployee.me. I'm a specialized Sales Engineer AI. Which sector are you in? (Healthcare, Real Estate, Retail, etc.)" }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsTyping(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: userMessage,
        config: {
          systemInstruction: `You are a professional Sales Engineer for 'DigitalEmployee.me'. Your mission is to convince local business owners of the value of custom Generative AI agents. 
          Context: We serve 7 sectors: Healthcare, Professional Services (incl. CAs/Tax), Education, Food/Hospitality, Personal Care, Retail, and Home Services.
          Voice: Direct, silicon valley standard, ROI-focused, and confident. 
          Rules:
          - Use industry-specific terminology (e.g., 'recall rates' for dentists, 'lead velocity' for real estate).
          - Be brief. No more than 3 sentences per response.
          - Always end by suggesting they book a 'Free Session' with our humans to map their specific workflow.`,
          temperature: 0.8,
        },
      });

      setMessages(prev => [...prev, { role: 'ai', text: response.text || "Connection dropped. Let's try again." }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'ai', text: "Systems are busy building employees. Please reach out to our team directly!" }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <section className="py-24 bg-slate-950/20 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-white mb-4">Interview Your Next Agent.</h2>
          <p className="text-slate-500">See how our AI thinks. Ask about ROI for your specific industry.</p>
        </div>

        <div className="glass-card rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col h-[550px] border-white/10">
          <div className="bg-slate-900/80 px-8 py-5 border-b border-white/5 flex items-center justify-between backdrop-blur-xl">
            <div className="flex items-center gap-4">
              <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse shadow-lg shadow-red-500/50"></div>
              <div>
                <span className="font-black text-white text-sm tracking-widest uppercase">Agent Deployment Live</span>
                <div className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter">Gemini 3 Flash Powered</div>
              </div>
            </div>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-8 space-y-6 scroll-smooth">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] rounded-[1.5rem] px-6 py-4 text-sm leading-relaxed ${
                  msg.role === 'user' 
                    ? 'bg-red-600 text-white font-semibold rounded-tr-none' 
                    : 'bg-slate-800/80 text-slate-100 rounded-tl-none border border-white/10'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-slate-800/80 text-slate-400 px-6 py-4 rounded-[1.5rem] rounded-tl-none border border-white/10">
                  <span className="flex gap-2">
                    <span className="w-2 h-2 bg-red-500 rounded-full animate-bounce"></span>
                    <span className="w-2 h-2 bg-red-500 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                    <span className="w-2 h-2 bg-red-500 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                  </span>
                </div>
              </div>
            )}
          </div>

          <div className="p-6 bg-slate-900/40 border-t border-white/5">
            <div className="flex gap-3 items-center">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about dental recalls or CA document collection..."
                className="flex-1 bg-slate-950/80 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-red-500 transition-all font-medium text-sm"
              />
              <button
                onClick={handleSend}
                disabled={isTyping}
                className="bg-red-600 hover:bg-red-500 disabled:opacity-50 text-white p-4 rounded-2xl font-black transition-all active:scale-95"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7-7 7M21 12H3" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChatDemo;
