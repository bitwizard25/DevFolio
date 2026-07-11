'use client'

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Mail, Video, MessageSquare, ExternalLink, Send } from 'lucide-react';

const EMAIL = 'rbhoyar729@gmail.com';

/** Renders message text with any email mention turned into a real mailto link */
function withMailtoLinks(text: string) {
  const parts = text.split(EMAIL);
  return parts.flatMap((part, i) =>
    i === 0
      ? [part]
      : [
          <a key={i} href={`mailto:${EMAIL}`} className="underline underline-offset-2 hover:text-white">
            {EMAIL}
          </a>,
          part,
        ],
  );
}

export default function ContactApp() {
  const [selectedId, setSelectedId] = useState<'profile' | 'socials' | 'message'>('profile');
  const [messages, setMessages] = useState<Array<{ sender: 'user' | 'raj'; text: string; time: string }>>([
    { sender: 'raj', text: `Hey! Thanks for visiting my Portfolio OS. Feel free to leave a message here, or email me directly at ${EMAIL}!`, time: 'Just now' },
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const replyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Guard against a state update after the window closes mid-reply
  useEffect(() => () => {
    if (replyTimer.current) clearTimeout(replyTimer.current);
  }, []);

  const contacts = [
    { id: 'profile', label: 'Raj Bhoyar', sub: 'Me', avatar: true },
    { id: 'socials', label: 'Social Networks', sub: 'GitHub, LinkedIn', icon: '🔗' },
    { id: 'message', label: 'Direct Message', sub: 'Messages.app', icon: '💬' },
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage = inputValue.trim();
    setMessages((prev) => [
      ...prev,
      { sender: 'user', text: userMessage, time: 'Just now' },
    ]);
    setInputValue('');

    // Trigger mock auto-reply
    replyTimer.current = setTimeout(() => {
      let reply = `Awesome! I've received your note in my sandbox. The best way to lock in a call is via email at ${EMAIL}. Speak soon!`;
      if (userMessage.toLowerCase().includes('job') || userMessage.toLowerCase().includes('hire')) {
        reply = `I'm always open to new backend & AI opportunities! Feel free to forward details/JD to ${EMAIL} and let's hop on a call.`;
      }
      setMessages((prev) => [
        ...prev,
        { sender: 'raj', text: reply, time: 'Just now' },
      ]);
    }, 1200);
  };

  return (
    <div className="flex h-full bg-[#1c1c28]/40 text-white font-sans select-none">
      {/* 1. Sidebar Contacts List */}
      <div className="w-52 bg-black/35 border-r border-white/10 p-3.5 space-y-4 shrink-0 hidden sm:block">
        <div className="space-y-1.5">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-2">Contacts</p>
          {contacts.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedId(c.id as any)}
              className={`w-full flex items-center gap-3 px-2 py-2 rounded-lg text-left transition-colors ${
                selectedId === c.id
                  ? 'bg-[#0A84FF]/20 border border-[#0A84FF]/30 text-white'
                  : 'border border-transparent text-slate-400 hover:text-white hover:bg-white/[0.02]'
              }`}
            >
              {c.avatar ? (
                <div className="relative w-8 h-8 rounded-full overflow-hidden border border-white/10 shrink-0">
                  <Image src="/Raj.jpg" alt="Raj Bhoyar" fill className="object-cover" />
                </div>
              ) : (
                <span className="text-xl w-8 h-8 flex items-center justify-center shrink-0 bg-white/5 rounded-full">
                  {c.icon}
                </span>
              )}
              <div className="min-w-0">
                <p className="text-xs font-semibold text-slate-200 truncate">{c.label}</p>
                <p className="text-[10px] text-slate-500 truncate">{c.sub}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* 2. Right Details / Messages Pane */}
      <div className="flex-1 flex flex-col min-w-0 h-full bg-black/10">
        {selectedId === 'profile' && (
          <div className="p-8 flex flex-col items-center max-w-lg mx-auto w-full space-y-6 text-center">
            {/* Header info */}
            <div className="space-y-3">
              <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-white/20 shadow-xl mx-auto">
                <Image src="/Raj.jpg" alt="Raj Bhoyar" fill className="object-cover" />
              </div>
              <div>
                <h2 className="text-xl font-bold tracking-tight">Raj Bhoyar</h2>
                <p className="text-xs text-[#0A84FF] font-medium mt-0.5">Founding Engineer @ Hapminds</p>
              </div>
            </div>

            {/* Quick Actions (macOS Contacts Style) */}
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => setSelectedId('message')}
                className="flex flex-col items-center gap-1 p-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors w-16"
              >
                <MessageSquare className="w-4 h-4 text-[#0A84FF]" />
                <span className="text-[9px] text-slate-400 font-medium">Message</span>
              </button>
              <a
                href="mailto:rbhoyar729@gmail.com"
                className="flex flex-col items-center gap-1 p-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors w-16"
              >
                <Mail className="w-4 h-4 text-[#0A84FF]" />
                <span className="text-[9px] text-slate-400 font-medium">Email</span>
              </a>
              <a
                href="https://linkedin.com/in/raj-bhoyar-b597b416a/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-1 p-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors w-16"
              >
                <Video className="w-4 h-4 text-slate-400" />
                <span className="text-[9px] text-slate-400 font-medium">Video</span>
              </a>
            </div>

            {/* Detailed fields */}
            <div className="w-full text-left bg-white/[0.02] border border-white/5 rounded-2xl p-4 space-y-3.5 text-xs font-light">
              <div className="grid grid-cols-[80px,1fr] py-1.5 border-b border-white/5">
                <span className="text-slate-500 font-medium">Email:</span>
                <a href="mailto:rbhoyar729@gmail.com" className="text-[#0A84FF] hover:underline font-mono">
                  rbhoyar729@gmail.com
                </a>
              </div>

              <div className="grid grid-cols-[80px,1fr] py-1.5 border-b border-white/5">
                <span className="text-slate-500 font-medium">Work:</span>
                <span className="text-slate-300">Founding Engineer, Hapminds</span>
              </div>

              <div className="grid grid-cols-[80px,1fr] py-1.5 border-b border-white/5">
                <span className="text-slate-500 font-medium">Address:</span>
                <span className="text-slate-300">Hyderabad, India</span>
              </div>

              <div className="grid grid-cols-[80px,1fr] py-1.5">
                <span className="text-slate-500 font-medium">Notes:</span>
                <p className="text-[11px] text-slate-400 leading-relaxed font-light">
                  Specializes in Node.js, Python, messaging queues (RabbitMQ), graph structures (Neo4j), and multi-agent systems. Actively looking for challenging backend and AI opportunities.
                </p>
              </div>
            </div>
          </div>
        )}

        {selectedId === 'socials' && (
          <div className="p-8 max-w-md mx-auto w-full space-y-6">
            <div>
              <h3 className="text-sm font-bold text-slate-200">Social Connections</h3>
              <p className="text-[10px] text-slate-400 mt-0.5">Direct external links to verification nodes</p>
            </div>

            <div className="flex flex-col gap-2.5">
              {[
                { label: 'GitHub Profile', val: 'github.com/bitwizard25', href: 'https://github.com/bitwizard25', color: 'border-slate-800' },
                { label: 'LinkedIn Network', val: 'linkedin.com/in/raj-bhoyar', href: 'https://linkedin.com/in/raj-bhoyar-b597b416a/', color: 'border-blue-900/50' },
                { label: 'Gmail Hub', val: 'rbhoyar729@gmail.com', href: 'mailto:rbhoyar729@gmail.com', color: 'border-red-950/30' },
              ].map((soc, idx) => (
                <a
                  key={idx}
                  href={soc.href}
                  target={soc.href.startsWith('mailto') ? undefined : '_blank'}
                  rel={soc.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                  className={`flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border ${soc.color} hover:bg-white/[0.04] hover:border-white/20 transition-all group`}
                >
                  <div>
                    <p className="text-xs font-semibold text-slate-200">{soc.label}</p>
                    <p className="text-[10px] text-slate-400 font-mono mt-0.5">{soc.val}</p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />
                </a>
              ))}
            </div>
          </div>
        )}

        {selectedId === 'message' && (
          <div className="flex flex-col h-full bg-[#121218]/45">
            {/* Messages Header */}
            <div className="h-11 bg-white/[0.02] border-b border-white/10 px-4 flex items-center gap-2 shrink-0">
              <div className="relative w-5 h-5 rounded-full overflow-hidden">
                <Image src="/Raj.jpg" alt="Raj Bhoyar" fill className="object-cover" />
              </div>
              <span className="text-xs font-semibold text-slate-200">To: Raj Bhoyar</span>
            </div>

            {/* Conversation Area */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 remove-scrollbar flex flex-col justify-end">
              <div className="space-y-3">
                {messages.map((m, idx) => (
                  <div
                    key={idx}
                    className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[70%] p-3 rounded-2xl text-xs leading-relaxed ${
                        m.sender === 'user'
                          ? 'bg-[#0A84FF] text-white rounded-br-none'
                          : 'bg-white/[0.08] text-slate-200 rounded-bl-none'
                      }`}
                    >
                      <p>{withMailtoLinks(m.text)}</p>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Input Bar */}
            <form onSubmit={handleSendMessage} className="p-3 border-t border-white/10 bg-white/[0.01] flex gap-2 shrink-0">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type an iMessage..."
                className="flex-1 h-9 bg-white/5 border border-white/10 rounded-full px-4 text-xs outline-none focus:bg-white/10 focus:border-white/20 text-white transition-all"
              />
              <a
                href={`mailto:${EMAIL}`}
                className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white border border-white/10 transition-colors shrink-0"
                aria-label="Email me directly"
                title="Email me directly"
              >
                <Mail className="w-3.5 h-3.5" />
              </a>
              <button
                type="submit"
                className="p-2.5 rounded-full bg-[#0A84FF] hover:bg-[#0070e3] text-white transition-colors"
                aria-label="Send message"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
