
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";

const ChatDemo: React.FC = () => {
  const [messages, setMessages] = useState<{ role: 'user' | 'ai'; text: string }[]>([
    { role: 'ai', text: "Neural link established. I'm a Digital Architecture Agent. Tell me which industry you're in, and I'll show you how we can automate your revenue." }
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
          systemInstruction: `You are a professional Deployment Architect for 'DigitalEmployee.me'. Your mission is to convince local business owners of the value of custom Generative AI agents. 
          Context: We serve 7 sectors: Healthcare, Professional Services (incl. CAs/Tax), Education, Food/Hospitality, Personal Care, Retail, and Home Services.
          Voice: Direct, silicon valley standard, ROI-focused, and confident. 
          Rules:
          - Use industry-specific terminology.
          - Be brief. Maximum 2 sentences.
          - End by suggesting they book a 'Neural Audit' below.`,
          temperature: 0.7,
        },
      });

      setMessages(prev => [...prev, { role: 'ai', text: response.text || "Connection lost. Please try again." }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'ai', text: "Deployment nodes are at capacity. Please book an audit session via the form below." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <section className="py-24 relative overflow-hidden bg-slate-900/20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h3 className="text-3xl sm:text-5xl font-black text-white mb-6 tracking-tight">Experience Local Intelligence.</h3>
          <p className="text-slate-400">Test our neural reasoning core live.</p>
        </div>

        <div className="glass-card rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col h-[550px] border-white/10">
          <div className="bg-slate-900/80 px-8 py-4 border-b border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active Neural Session</span>
            </div>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-8 space-y-6 scroll-smooth">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] rounded-2xl px-6 py-4 text-sm ${
                  msg.role === 'user' 
                    ? 'bg-red-600 text-white font-bold' 
                    : 'bg-slate-800 text-slate-200'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-slate-800 text-slate-400 px-6 py-4 rounded-2xl">
                  <span className="flex gap-1">
                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                  </span>
                </div>
              </div>
            )}
          </div>

          <div className="p-6 bg-slate-900/40 border-t border-white/5">
            <div className="flex gap-4">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type your industry (e.g. Real Estate)..."
                className="flex-1 bg-slate-950 border border-white/10 rounded-xl px-6 py-4 text-white focus:outline-none focus:border-red-600 transition-all font-medium"
              />
              <button
                onClick={handleSend}
                disabled={isTyping}
                className="bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white px-6 rounded-xl font-black transition-all active:scale-95 shadow-xl shadow-red-600/20"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChatDemo;
