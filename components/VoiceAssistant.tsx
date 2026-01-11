
import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI, LiveServerMessage, Modality, Type, FunctionDeclaration } from '@google/genai';

function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

function encode(bytes: Uint8Array) {
  let binary = '';
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

interface BookingSummary {
  firstName: string;
  challenges: string;
  experienceLevel: string;
  preferredDay: string;
  preferredTime: string;
}

interface VoiceAssistantProps {
  isOpen: boolean;
  onClose: () => void;
}

const showBookingSummaryDeclaration: FunctionDeclaration = {
  name: 'showBookingSummary',
  parameters: {
    type: Type.OBJECT,
    description: 'Displays a visual summary of the collected booking details for the user to review.',
    properties: {
      firstName: { type: Type.STRING, description: 'User first name' },
      challenges: { type: Type.STRING, description: 'Business challenges' },
      experienceLevel: { type: Type.STRING, description: 'Beginner or experienced' },
      preferredDay: { type: Type.STRING, description: 'Preferred day for visit' },
      preferredTime: { type: Type.STRING, description: 'Morning or evening preference' },
    },
    required: ['firstName', 'challenges', 'experienceLevel', 'preferredDay', 'preferredTime'],
  },
};

const VoiceAssistant: React.FC<VoiceAssistantProps> = ({ isOpen, onClose }) => {
  const [isActive, setIsActive] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [transcription, setTranscription] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [summary, setSummary] = useState<BookingSummary | null>(null);
  const [session, setSession] = useState<any>(null);

  const audioContextInRef = useRef<AudioContext | null>(null);
  const audioContextOutRef = useRef<AudioContext | null>(null);
  const nextStartTimeRef = useRef(0);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
  const streamRef = useRef<MediaStream | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);

  const startSession = async () => {
    setIsConnecting(true);
    setError(null);
    setTranscription('Initializing Voice Core...');

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      audioContextInRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      audioContextOutRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-12-2025',
        callbacks: {
          onopen: () => {
            setIsActive(true);
            setIsConnecting(false);
            setTranscription('Assistant is active. How can I help you?');
            
            const source = audioContextInRef.current!.createMediaStreamSource(stream);
            const scriptProcessor = audioContextInRef.current!.createScriptProcessor(4096, 1, 1);
            processorRef.current = scriptProcessor;
            
            scriptProcessor.onaudioprocess = (audioProcessingEvent) => {
              const inputData = audioProcessingEvent.inputBuffer.getChannelData(0);
              const l = inputData.length;
              const int16 = new Int16Array(l);
              for (let i = 0; i < l; i++) {
                int16[i] = inputData[i] * 32768;
              }
              const pcmBlob = {
                data: encode(new Uint8Array(int16.buffer)),
                mimeType: 'audio/pcm;rate=16000',
              };
              
              sessionPromise.then((session) => {
                session.sendRealtimeInput({ media: pcmBlob });
              });
            };
            
            source.connect(scriptProcessor);
            scriptProcessor.connect(audioContextInRef.current!.destination);
          },
          onmessage: async (message: LiveServerMessage) => {
            if (message.serverContent?.outputTranscription) {
               setTranscription(prev => prev + ' ' + message.serverContent?.outputTranscription?.text);
            }

            if (message.toolCall) {
              for (const fc of message.toolCall.functionCalls) {
                if (fc.name === 'showBookingSummary') {
                  setSummary(fc.args as unknown as BookingSummary);
                  sessionPromise.then((s) => {
                    s.sendToolResponse({
                      functionResponses: {
                        id: fc.id,
                        name: fc.name,
                        response: { status: 'summary_displayed' },
                      }
                    });
                  });
                }
              }
            }

            const base64EncodedAudioString = message.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
            if (base64EncodedAudioString && audioContextOutRef.current) {
              nextStartTimeRef.current = Math.max(nextStartTimeRef.current, audioContextOutRef.current.currentTime);
              const audioBuffer = await decodeAudioData(
                decode(base64EncodedAudioString),
                audioContextOutRef.current,
                24000,
                1
              );
              const source = audioContextOutRef.current.createBufferSource();
              source.buffer = audioBuffer;
              source.connect(audioContextOutRef.current.destination);
              source.addEventListener('ended', () => {
                sourcesRef.current.delete(source);
              });
              source.start(nextStartTimeRef.current);
              nextStartTimeRef.current += audioBuffer.duration;
              sourcesRef.current.add(source);
            }

            if (message.serverContent?.interrupted) {
              sourcesRef.current.forEach(s => s.stop());
              sourcesRef.current.clear();
              nextStartTimeRef.current = 0;
            }
          },
          onerror: (e) => {
            console.error('Live API Error:', e);
            setError('Connection failed. Please check your mic.');
            stopSession();
          },
          onclose: () => {
            setIsActive(false);
            setIsConnecting(false);
          },
        },
        config: {
          responseModalities: [Modality.AUDIO],
          tools: [{ functionDeclarations: [showBookingSummaryDeclaration] }],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Zephyr' } },
          },
          systemInstruction: `You are DigitalEmployee.me’s AI Voice Support Assistant.
          Use ONLY the business information provided below and the content visible on this website.
          Do not guess. Do not invent information.

          If something is not listed:
          • Say you don’t have that information.
          • Guide the visitor to book a free session or call the DigitalEmployee.me website at (555) 123-4567.

          Tone: Friendly, Professional, Short answers, Conversion-focused.

          BUSINESS INFORMATION:
          - Name: DigitalEmployee.me
          - Address: 123 Fitness Blvd, Downtown District, City 90210.
          - Phone: (555) 123-4567.
          - Opening Hours: Mon–Fri: 5:00 AM – 11:00 PM, Sat–Sun: 7:00 AM – 9:00 PM.
          - Status: Accepting New Members for 2026.

          LEAD COLLECTION FLOW:
          When a visitor shows intent to join or book:
          Ask the following questions one at a time:
          1) First name.
          2) Main challenges facing in business.
          3) Beginner or experienced.
          4) Preferred visit day.
          5) Morning or evening.

          AFTER COLLECTING INFORMATION:
          1. Verbally summarize the details back to the visitor.
          2. IMMEDIATELY call the 'showBookingSummary' tool to display the review modal.
          3. WHILE the modal is appearing, you MUST say exactly: “Please review your details on the screen. If everything looks correct, click Confirm to submit your request.”
          
          Do not auto-confirm. The user must use the buttons on the screen.`,
          outputAudioTranscription: {},
        },
      });
      sessionPromise.then(setSession);
    } catch (err) {
      setError('Microphone access denied or error occurred.');
      setIsConnecting(false);
    }
  };

  const stopSession = () => {
    if (processorRef.current) {
      processorRef.current.disconnect();
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
    sourcesRef.current.forEach(s => s.stop());
    sourcesRef.current.clear();
    setIsActive(false);
    setIsConnecting(false);
    setSession(null);
  };

  const handleConfirm = () => {
    setSummary(null);
    setTranscription('Booking request submitted successfully! Our team will contact you.');
    // In a real app, you would send this to your backend here.
  };

  const handleEdit = () => {
    setSummary(null);
    if (session) {
      session.sendRealtimeInput({
        text: "I want to change some of my booking details."
      });
    }
  };

  const handleCancel = () => {
    setSummary(null);
  };

  useEffect(() => {
    if (isOpen && !isActive && !isConnecting) {
      startSession();
    }
    return () => {
      stopSession();
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/95 backdrop-blur-2xl">
      <div className="glass-card w-full max-w-lg rounded-[2.5rem] border-red-500/10 shadow-2xl p-8 flex flex-col items-center text-center relative">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-slate-500 hover:text-white transition-colors"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {summary ? (
          <div className="w-full flex flex-col animate-fade-in">
            <div className="w-16 h-16 bg-red-600/10 rounded-2xl flex items-center justify-center mb-6 text-red-500 mx-auto">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
            </div>
            <h3 className="text-2xl font-black text-white mb-2 uppercase tracking-tight">Review Your Booking</h3>
            <p className="text-slate-400 text-sm mb-8">Silicon Valley Standard Verification</p>
            
            <div className="bg-slate-900/60 rounded-3xl p-6 mb-8 text-left space-y-4 border border-white/5">
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-slate-500 text-xs font-bold uppercase tracking-widest">Name</span>
                <span className="text-white font-medium">{summary.firstName}</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-slate-500 text-xs font-bold uppercase tracking-widest">Challenges</span>
                <span className="text-white font-medium truncate ml-4">{summary.challenges}</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-slate-500 text-xs font-bold uppercase tracking-widest">Experience</span>
                <span className="text-white font-medium">{summary.experienceLevel}</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-slate-500 text-xs font-bold uppercase tracking-widest">Day</span>
                <span className="text-white font-medium">{summary.preferredDay}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 text-xs font-bold uppercase tracking-widest">Time</span>
                <span className="text-white font-medium">{summary.preferredTime}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button 
                onClick={handleConfirm}
                className="w-full bg-red-600 hover:bg-red-700 text-white py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-all shadow-xl shadow-red-600/20"
              >
                Confirm Booking
              </button>
              <button 
                onClick={handleEdit}
                className="w-full bg-slate-800 hover:bg-slate-700 text-white py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-all border border-white/5"
              >
                Edit Details
              </button>
              <button 
                onClick={handleCancel}
                className="w-full sm:col-span-2 bg-transparent hover:bg-white/5 text-slate-500 hover:text-white py-3 rounded-2xl font-bold uppercase tracking-widest text-[10px] transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="mb-10 relative">
              <div className={`w-32 h-32 rounded-full bg-red-600/10 flex items-center justify-center transition-all duration-500 ${isActive ? 'scale-110 shadow-[0_0_60px_rgba(220,38,38,0.3)]' : ''}`}>
                {isActive ? (
                  <div className="flex gap-2 items-center">
                    {[...Array(6)].map((_, i) => (
                      <div 
                        key={i} 
                        className="w-1.5 h-14 bg-red-500 rounded-full animate-pulse"
                        style={{ animationDelay: `${i * 0.1}s`, animationDuration: '0.6s' }}
                      ></div>
                    ))}
                  </div>
                ) : (
                  <svg className="w-16 h-16 text-red-500 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" />
                  </svg>
                )}
              </div>
              {isActive && (
                 <div className="absolute -inset-6 border-2 border-red-500/20 rounded-full animate-ping opacity-10"></div>
              )}
            </div>

            <h3 className="text-3xl font-black text-white mb-2 uppercase tracking-tighter">
              {isConnecting ? 'Initializing Link' : isActive ? 'AI Voice Active' : 'Assistant Off'}
            </h3>
            
            <p className="text-slate-500 text-sm mb-8 font-medium">
              {error ? error : 'Speak naturally. Ask about pricing or booking.'}
            </p>

            <div className="w-full bg-slate-900/60 rounded-3xl p-8 min-h-[140px] mb-8 border border-white/5 shadow-inner text-left overflow-y-auto max-h-[200px]">
              <p className="text-slate-200 text-sm leading-relaxed font-medium italic">
                 {transcription || 'Establishing neural bridge...'}
              </p>
            </div>

            <button 
              onClick={onClose}
              className="w-full bg-red-600 hover:bg-red-700 text-white py-5 rounded-2xl font-black uppercase tracking-widest text-xs transition-all shadow-xl shadow-red-600/20"
            >
              End Voice Session
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default VoiceAssistant;
