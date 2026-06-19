'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, Plus, ArrowUp, RotateCcw } from 'lucide-react';

interface Product {
  slug: string;
  name: string;
  category: string;
  brand: string;
  range: string;
  spec: string;
  badge: string;
  headline: string;
  description: string;
  features: string[];
  specs: Array<{ label: string; value: string }>;
}

// ─── Sweep animation CSS ─────────────────
const SWEEP_CSS = `
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&family=Syne:wght@700;800&display=swap');

html, body { background: #070707; }

@property --angle {
  syntax: '<angle>';
  initial-value: 0deg;
  inherits: false;
}

@keyframes sweepRotate { from { --angle: 0deg; } to { --angle: 360deg; } }
@keyframes sweepFade { 0% { opacity: 0; } 10% { opacity: 1; } 78% { opacity: 1; } 100% { opacity: 0; } }
@keyframes sweepFadeBlur { 0% { opacity: 0; } 10% { opacity: 0.5; } 78% { opacity: 0.5; } 100% { opacity: 0; } }
@keyframes fadeUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
@keyframes msgIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
@keyframes typingDot { 0%,60%,100% { transform: translateY(0); opacity: 0.4; } 30% { transform: translateY(-5px); opacity: 1; } }

.fu { opacity: 0; animation: fadeUp 0.65s cubic-bezier(0.16,1,0.3,1) forwards; }
.msg-in { opacity: 0; animation: msgIn 0.4s cubic-bezier(0.16,1,0.3,1) forwards; }

.glow-border { position: relative; border-radius: 20px; }
.glow-border::before {
  content: '';
  position: absolute;
  inset: -1.5px;
  border-radius: 21px;
  background: conic-gradient(from var(--angle), transparent 0%, transparent 68%, rgba(52,211,153,0.2) 76%, rgba(52,211,153,0.7) 84%, rgba(255,255,255,1) 88%, rgba(52,211,153,0.7) 92%, rgba(52,211,153,0.2) 96%, transparent 100%);
  animation: sweepRotate 4.5s linear forwards, sweepFade 4.5s ease forwards;
  z-index: 0;
}
.glow-border::after {
  content: '';
  position: absolute;
  inset: -5px;
  border-radius: 25px;
  background: conic-gradient(from var(--angle), transparent 0%, transparent 72%, rgba(52,211,153,0.1) 80%, rgba(52,211,153,0.4) 88%, rgba(52,211,153,0.1) 96%, transparent 100%);
  animation: sweepRotate 4.5s linear forwards, sweepFadeBlur 4.5s ease forwards;
  z-index: 0;
  filter: blur(10px);
}
.glow-border-inner {
  position: relative;
  z-index: 1;
  border-radius: 18px;
  overflow: hidden;
  background: #0e0e0e;
}

.typing-dot:nth-child(1) { animation: typingDot 1.2s 0.0s ease-in-out infinite; }
.typing-dot:nth-child(2) { animation: typingDot 1.2s 0.2s ease-in-out infinite; }
.typing-dot:nth-child(3) { animation: typingDot 1.2s 0.4s ease-in-out infinite; }

.custom-scroll::-webkit-scrollbar { width: 4px; }
.custom-scroll::-webkit-scrollbar-track { background: transparent; }
.custom-scroll::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 2px; }
`;

// ─── AI AGENTS DATA ────────────────────────────────────────────────────────
const ALL_PRODUCTS: Product[] = [
  {
    slug: 'customer-support-agent',
    name: 'Customer Support Agent',
    category: 'Support',
    brand: 'Aether',
    range: 'Enterprise & SMB',
    spec: '24/7 Autonomous',
    badge: 'High Demand',
    headline: 'AI agents that resolve customer issues without human escalation.',
    description: 'Our flagship customer support agent handles inquiries, troubleshooting, refunds, and escalations with human-like empathy and precision.',
    features: ['Multi-channel support (email, chat, voice)', 'Contextual memory across conversations', 'Seamless handoff to human agents'],
    specs: [
      { label: 'Channels', value: 'Web, Mobile, WhatsApp, Email' },
      { label: 'Resolution Rate', value: 'Up to 87%' },
      { label: 'Languages', value: '12+' }
    ]
  },
  {
    slug: 'research-agent',
    name: 'Research Agent',
    category: 'Intelligence',
    brand: 'Aether',
    range: 'Deep Analysis',
    spec: 'Real-time Web + Internal Knowledge',
    badge: 'Popular',
    headline: 'Autonomous research agents that deliver actionable intelligence.',
    description: 'Conducts deep market, competitor, and academic research with source citation and confidence scoring.',
    features: ['Multi-source verification', 'Report generation in multiple formats', 'Scheduled deep dives'],
    specs: [{ label: 'Speed', value: '10x faster than manual research' }]
  },
  {
    slug: 'workflow-automation-agent',
    name: 'Workflow Automation Agent',
    category: 'Automation',
    brand: 'Aether',
    range: 'End-to-End',
    spec: '200+ Tool Integrations',
    badge: 'Enterprise',
    headline: 'Automate complex business processes across your tech stack.',
    description: 'Orchestrates multi-step workflows involving CRM, ERP, email, Slack, and custom APIs.',
    features: ['No-code + code hybrid builder', 'Human-in-the-loop approvals', 'Audit & compliance logging'],
    specs: [{ label: 'Integrations', value: 'Zapier, Make, Custom API' }]
  },
  // Add more agents as needed...
];

const CONTACT_EMAIL = 'hello@aether-ai.com';

const FALLBACK = `Sorry, I couldn't find an answer to that. Feel free to reach out to our team at **${CONTACT_EMAIL}**.`;

function normalize(str: string): string {
  return str.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim();
}

// Keyword map for AI Agents
const KEYWORD_MAP = [
  { tokens: ['support', 'customer service', 'helpdesk'], slugs: ['customer-support-agent'] },
  { tokens: ['research', 'market research', 'intelligence'], slugs: ['research-agent'] },
  { tokens: ['workflow', 'automation', 'process'], slugs: ['workflow-automation-agent'] },
  // Extend as needed
];

const CATEGORY_MAP: Record<string, string[]> = {
  support: ['customer-support-agent'],
  intelligence: ['research-agent'],
  automation: ['workflow-automation-agent'],
};

const INTENTS = {
  greeting: /^(hi|hello|hey|good (morning|afternoon|evening)|howdy)/,
  contact: /(contact|email|reach|support|help|human)/,
  listAll: /(all (products|agents|offerings)|catalog|what do you offer)/,
  listCategory: /(support|intelligence|automation)/,
  quote: /(quote|pricing|demo|cost)/,
  availability: /(available|demo|try|access)/,
};

function getBotReply(userMessage: string): string {
  const q = normalize(userMessage);

  if (INTENTS.greeting.test(q) && q.split(' ').length <= 5) {
    return "Hello! Welcome to **Aether AI**. I'm your AI assistant. I can tell you about our autonomous agents for support, research, and automation. What are you looking for?";
  }

  if (INTENTS.contact.test(q)) {
    return `Our team is ready to help. Reach us at **${CONTACT_EMAIL}** or continue chatting here.`;
  }

  if (INTENTS.quote.test(q)) {
    return "Pricing is tailored to your use case and scale. Book a demo or email **hello@aether-ai.com** — we'll respond within a few hours.";
  }

  if (INTENTS.listAll.test(q)) {
    const grouped = ALL_PRODUCTS.reduce((acc, p) => {
      acc[p.category] = acc[p.category] || [];
      acc[p.category].push(p.name);
      return acc;
    }, {} as Record<string, string[]>);

    return "Here's our agent catalog:\n\n" +
      Object.entries(grouped)
        .map(([cat, names]) => `**${cat}**\n${names.map(n => `• ${n}`).join('\n')}`)
        .join('\n\n');
  }

  // Category match
  const catMatch = q.match(INTENTS.listCategory);
  if (catMatch) {
    const cat = catMatch[1];
    const slugs = CATEGORY_MAP[cat];
    if (slugs) {
      const products = slugs.map(s => ALL_PRODUCTS.find(p => p.slug === s)).filter(Boolean) as Product[];
      return `We offer **${products.length} ${cat} agents**:\n\n${products.map(p => `• **${p.name}** — ${p.range}`).join('\n')}`;
    }
  }

  // Keyword matching
  const matchedSlugs = new Set<string>();
  for (const { tokens, slugs } of KEYWORD_MAP) {
    for (const token of tokens) {
      if (q.includes(token)) slugs.forEach(s => matchedSlugs.add(s));
    }
  }

  for (const p of ALL_PRODUCTS) {
    if (q.includes(normalize(p.name)) || q.includes(normalize(p.brand))) {
      matchedSlugs.add(p.slug);
    }
  }

  if (matchedSlugs.size === 0) return FALLBACK;

  const matched = [...matchedSlugs]
    .map(s => ALL_PRODUCTS.find(p => p.slug === s))
    .filter(Boolean) as Product[];

  if (matched.length === 1) {
    const p = matched[0];
    const specsLine = p.specs.map(s => `${s.label}: ${s.value}`).join(' | ');
    const featLines = p.features.slice(0, 3).map(f => `• ${f}`).join('\n');

    let reply = `**${p.name}** — ${p.brand}\n${p.headline}\n\n${p.description}\n\n**Key Specs:** ${specsLine}\n\n**Features:**\n${featLines}`;

    if (INTENTS.availability.test(q)) {
      reply += `\n\n✅ Available now. Request a personalized demo via this chat or email **${CONTACT_EMAIL}**.`;
    }
    return reply;
  }

  return `Found **${matched.length} relevant agents**:\n\n${matched.map(p => `• **${p.name}** — ${p.range} | ${p.spec}`).join('\n')}\n\nAsk me for details on any agent.`;
}

const SUGGESTIONS = [
  "Tell me about your Customer Support Agent",
  "How does the Research Agent work?",
  "I want a demo of Workflow Automation",
  "What are your pricing options?",
];

export default function AetherAIChatbot() {
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'bot'; text: string; id: number }>>([]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [started, setStarted] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  useEffect(() => {
    if (!textareaRef.current) return;
    textareaRef.current.style.height = 'auto';
    textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 160) + 'px';
  }, [input]);

  const send = async (text?: string) => {
    const msg = (text || input).trim();
    if (!msg) return;

    setInput('');
    setStarted(true);
    setMessages(prev => [...prev, { role: 'user', text: msg, id: Date.now() }]);
    setTyping(true);

    await new Promise(r => setTimeout(r, 600 + Math.random() * 500));
    setTyping(false);

    setMessages(prev => [...prev, { role: 'bot', text: getBotReply(msg), id: Date.now() + 1 }]);
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  const reset = () => {
    setMessages([]);
    setStarted(false);
    setInput('');
  };

  const renderText = (text: string) => {
    return text.split('\n').map((line, i) => {
      const parts = line.split(/(\*\*[^*]+\*\*)/g).map((part, j) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={j} className="text-white/90 font-semibold">{part.slice(2, -2)}</strong>;
        }
        return part;
      });
      return <span key={i}>{parts}{i < text.split('\n').length - 1 && <br />}</span>;
    });
  };

  return (
    <main className="min-h-screen bg-[#070707] flex flex-col items-center justify-center relative overflow-hidden px-4">
      <style dangerouslySetInnerHTML={{ __html: SWEEP_CSS }} />

      {/* Background elements */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.018]" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.9) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(52,211,153,0.06) 0%, transparent 65%)' }} />

      <AnimatePresence>
        {started && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-2xl flex-1 flex flex-col pt-28 pb-4 overflow-y-auto no-scrollbar"
            style={{ maxHeight: 'calc(100vh - 220px)' }}
          >
            <div className="flex flex-col gap-5 px-2">
              {messages.map(m => (
                <div key={m.id} className={`msg-in flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {m.role === 'bot' && (
                    <div className="flex items-start gap-3 max-w-[88%]">
                      <div className="shrink-0 w-7 h-7 rounded-lg bg-[#0e0e0e] border border-white/10 flex items-center justify-center mt-0.5">
                        <div className="w-4 h-4 rounded bg-emerald-400/20 flex items-center justify-center">
                          <span className="text-[10px] text-emerald-400">AI</span>
                        </div>
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="text-[10px] font-mono text-white/25 mb-1 tracking-widest uppercase">AETHER AI</span>
                        <div className="px-4 py-3 rounded-2xl rounded-tl-sm bg-[#111] border border-white/[0.07] text-sm text-white/80 leading-relaxed whitespace-pre-wrap" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                          {renderText(m.text)}
                        </div>
                      </div>
                    </div>
                  )}

                  {m.role === 'user' && (
                    <div className="max-w-[80%] px-4 py-3 rounded-2xl rounded-tr-sm bg-white/[0.07] border border-white/10 text-sm text-white/90 leading-relaxed whitespace-pre-wrap" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                      {m.text}
                    </div>
                  )}
                </div>
              ))}

              {typing && (
                <div className="flex justify-start">
                  <div className="flex items-start gap-3">
                    <div className="shrink-0 w-7 h-7 rounded-lg bg-[#0e0e0e] border border-white/10 flex items-center justify-center mt-0.5">
                      <div className="w-4 h-4 rounded bg-emerald-400/20 flex items-center justify-center">
                        <span className="text-[10px] text-emerald-400">AI</span>
                      </div>
                    </div>
                    <div className="px-4 py-3.5 rounded-2xl rounded-tl-sm bg-[#111] border border-white/[0.07] flex items-center gap-1.5">
                      {[0, 1, 2].map(i => <div key={i} className="typing-dot w-1.5 h-1.5 rounded-full bg-white/40" />)}
                    </div>
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!started && (
        <div className="w-full max-w-2xl flex flex-col items-center mb-8">
          <div className="fu text-center mb-2" style={{ animationDelay: '0.05s' }}>
            <div className="flex items-center justify-center gap-2 mb-5">
              <span className="h-px w-6 bg-white/20" />
              <span className="text-[10px] font-mono text-emerald-400/60 uppercase tracking-[0.2em]">AI AGENTS</span>
              <span className="h-px w-6 bg-white/20" />
            </div>
            <h1 className="text-3xl sm:text-[2.6rem] font-bold leading-tight mb-3 tracking-tight" style={{ fontFamily: 'Syne, sans-serif' }}>
              AI Agents that <span className="text-emerald-400">actually get work done</span>
            </h1>
            <p className="text-sm text-white/35 max-w-md mx-auto leading-relaxed" style={{ fontFamily: 'DM Sans, sans-serif' }}>
              Ask our AI assistant anything about our autonomous agents.
            </p>
          </div>
        </div>
      )}

      <div className={`w-full max-w-2xl transition-all duration-500 ${started ? 'fixed bottom-6 left-1/2 -translate-x-1/2 px-4' : ''}`}>
        <div className="glow-border">
          <div className="glow-border-inner">
            <div className="px-4 pt-4 pb-2">
              <textarea
                ref={textareaRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={onKey}
                placeholder="Ask about our AI agents..."
                rows={1}
                className="w-full bg-transparent text-[15px] text-white/90 placeholder-white/28 resize-none outline-none leading-relaxed"
                style={{ fontFamily: 'DM Sans, sans-serif', minHeight: 28, maxHeight: 160 }}
              />
            </div>
            <div className="flex items-center justify-between px-3 pb-3 pt-1">
              <button className="w-8 h-8 rounded-full flex items-center justify-center bg-white/5 border border-white/[0.08] text-white/40 hover:text-white/70 hover:bg-white/[0.09]">
                <Plus size={14} />
              </button>
              <div className="flex items-center gap-2">
                <button className="w-8 h-8 rounded-full flex items-center justify-center text-white/35 hover:text-white/65">
                  <Mic size={15} />
                </button>
                <button
                  onClick={() => send()}
                  disabled={!input.trim()}
                  className="w-8 h-8 rounded-full flex items-center justify-center transition-all disabled:opacity-30"
                  style={{
                    background: input.trim() ? 'rgba(52,211,153,0.9)' : 'rgba(255,255,255,0.07)',
                  }}
                >
                  <ArrowUp size={14} className={input.trim() ? 'text-white' : 'text-white/40'} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {!started && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-1.5 mt-4">
            {SUGGESTIONS.map((s, i) => (
              <button
                key={i}
                onClick={() => send(s)}
                className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-[13px] text-white/45 hover:text-white/75 hover:bg-white/[0.04] transition-all text-left"
                style={{ fontFamily: 'DM Sans, sans-serif' }}
              >
                <RotateCcw size={12} className="text-white/22" />
                {s}
              </button>
            ))}
          </motion.div>
        )}
      </div>

      {started && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={reset}
          className="fixed top-6 right-6 flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/[0.04] border border-white/[0.08] text-[11px] text-white/35 hover:text-white/65 hover:bg-white/[0.07] font-mono"
        >
          <RotateCcw size={11} /> New Chat
        </motion.button>
      )}
    </main>
  );
}