import React, { useState, useEffect } from 'react';
import { Card, Button, Input } from '../components/ui/core';
import { Search, Send, User, Bot, Tag, MoreVertical, Phone, Star, Sparkles, MessageSquare, CreditCard, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn, formatCurrency } from '../lib/utils';
import { toast } from 'sonner';

const MOCK_CONVOS = [
  { id: '1', name: 'Musa Key', phone: '+256 700 123456', lastMsg: 'How much for the wholesale batch?', time: '2m', unread: 3, score: 85 },
  { id: '2', name: 'Sarah Mukasa', phone: '+254 711 987654', lastMsg: 'Sent the mobile money payment!', time: '15m', unread: 0, score: 92 },
  { id: '3', name: 'Unknown Client', phone: '+234 802 555 4444', lastMsg: 'Do you deliver to Lagos?', time: '1h', unread: 1, score: 45 },
];

const INITIAL_MESSAGES = [
  { id: '1', text: 'Hello, I saw your ad on Instagram.', type: 'customer', time: '10:00 AM' },
  { id: '2', text: 'Karibu! How can we help you today?', type: 'agent', time: '10:05 AM' },
  { id: '3', text: 'I am interested in the wholesale price for the organic Shea butter.', type: 'customer', time: '10:07 AM' },
  { id: '4', text: 'We have tiered pricing for bulk orders starting from 20kg. How much do you need?', type: 'agent', time: '10:10 AM' },
  { id: '5', text: 'I need about 50kg delivered to Kampala.', type: 'customer', time: '10:12 AM' },
];

export const InboxView = () => {
  const [selectedConvo, setSelectedConvo] = useState(MOCK_CONVOS[0]);
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [msgInput, setMsgInput] = useState('');
  const [showAiSuggest, setShowAiSuggest] = useState(true);
  const [aiData, setAiData] = useState({ suggestion: '', leadScore: 85, isUrgent: false, sentiment: 'neutral' });
  const [loadingAi, setLoadingAi] = useState(false);
  const [mobileView, setMobileView] = useState<'list' | 'chat' | 'info'>('list');

  useEffect(() => {
    fetchAiSuggestion();
  }, [selectedConvo.id]);

  const handleSendMessage = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!msgInput.trim()) return;

    const newMsg = {
      id: Math.random().toString(),
      text: msgInput,
      type: 'agent' as const,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages([...messages, newMsg]);
    setMsgInput('');
    
    // Simulate AI summary update
    setTimeout(() => {
      toast.success("Message sent via WhatsApp Cloud API");
    }, 500);
  };

  const handleRequestPayment = () => {
    toast.promise(new Promise(res => setTimeout(res, 2000)), {
      loading: 'Generating Zirzir payment link...',
      success: (data) => {
        setMsgInput("Here is your payment link for GHS 1,250. You can pay with MTN or Airtel Money: https://zirzir.com/pay/LF-" + Math.floor(Math.random()*1000));
        return 'Link generated!';
      },
      error: 'Failed to generate link'
    });
  };

  const handleSelectConvo = (convo: typeof MOCK_CONVOS[0]) => {
    setSelectedConvo(convo);
    setMobileView('chat');
  };

  const fetchAiSuggestion = async () => {
    setLoadingAi(true);
    try {
      const res = await fetch('/api/ai/suggest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          messages: messages,
          context: { customerName: selectedConvo.name, pastScore: selectedConvo.score } 
        }),
      });
      const data = await res.json();
      setAiData(data);
      setShowAiSuggest(true);
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingAi(false);
    }
  };

  return (
    <div className="flex h-full animate-in slide-in-from-bottom-4 duration-500 overflow-hidden relative">
      {/* Search & List */}
      <div className={cn(
        "w-full lg:w-80 border-r border-gray-200 bg-white flex flex-col shrink-0 flex-1 lg:flex-none transition-all duration-300",
        mobileView !== 'list' && "hidden lg:flex"
      )}>
        <div className="p-4 border-b border-gray-100">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 text-gray-400" size={14} />
            <Input placeholder="Search messages..." className="pl-9 bg-gray-50 border-gray-200 text-xs h-9" />
          </div>
          <div className="flex gap-2 mt-4 text-[10px] font-bold uppercase tracking-widest overflow-x-auto no-scrollbar">
            <span className="px-2.5 py-1 bg-green-50 text-green-600 rounded-full border border-green-100 shrink-0">Open (12)</span>
            <span className="px-2.5 py-1 text-gray-400 shrink-0">Closed</span>
            <span className="px-2.5 py-1 text-gray-400 shrink-0">Unassigned</span>
          </div>
        </div>
        <div className="flex-1 overflow-auto">
          {MOCK_CONVOS.map((convo) => (
            <button
              key={convo.id}
              onClick={() => handleSelectConvo(convo)}
              className={cn(
                "w-full p-4 flex gap-3 text-left hover:bg-gray-50 transition-colors border-b border-gray-50",
                selectedConvo.id === convo.id && "bg-green-50/30 border-l-4 border-l-[#25D366]"
              )}
            >
              <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center shrink-0">
                <User size={18} className="text-gray-400" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-0.5">
                  <h4 className="text-sm font-bold text-gray-900 truncate">{convo.name}</h4>
                  <span className="text-[10px] text-gray-400 font-bold ml-2">{convo.time}</span>
                </div>
                <p className="text-xs text-gray-500 truncate mb-2">{convo.lastMsg}</p>
                <div className="flex items-center gap-1.5">
                  <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-[10px] font-bold uppercase">LEAD: {convo.score}</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Chat Window */}
      <div className={cn(
        "flex-1 flex flex-col bg-[#F3F4F6] relative transition-all duration-300",
        mobileView === 'list' && "hidden lg:flex",
        mobileView === 'info' && "hidden lg:flex"
      )}>
        {/* Chat Header */}
        <header className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-4 lg:px-6 shrink-0 z-10 shadow-sm">
          <div className="flex items-center gap-3 min-w-0">
            <button onClick={() => setMobileView('list')} className="lg:hidden p-1 text-gray-400 hover:text-gray-600">
               <X size={20} className="rotate-45" /> {/* Use as a back arrow or close */}
            </button>
            <div className="w-8 h-8 lg:w-9 lg:h-9 rounded-full bg-[#25D366] flex items-center justify-center text-white font-bold text-xs shrink-0">
              {selectedConvo.name.charAt(0)}
            </div>
            <div className="min-w-0">
              <h3 className="text-sm font-bold text-gray-900 truncate">{selectedConvo.name}</h3>
              <p className="text-[10px] text-green-500 font-bold flex items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-1 shrink-0" /> WhatsApp • Accra
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 lg:gap-4">
             <Button 
                variant="primary" 
                size="sm" 
                className="hidden sm:flex h-8 text-[10px] font-bold gap-2 px-3"
                onClick={handleRequestPayment}
             >
               <CreditCard size={14} /> Request Payment
             </Button>
             <div className="hidden lg:block h-6 w-px bg-gray-200" />
             <button onClick={() => setMobileView('info')} className="lg:hidden p-2 text-gray-400 hover:text-gray-600">
                <Sparkles size={18} />
             </button>
             <MoreVertical size={18} className="text-gray-400 cursor-pointer" />
          </div>
        </header>

        {/* Messages */}
        <div className="flex-1 overflow-auto p-4 lg:p-6 space-y-4">
          <div className="flex justify-center mb-6">
            <span className="px-3 py-1 bg-gray-200/50 text-[10px] text-gray-500 rounded uppercase font-bold tracking-widest">Today</span>
          </div>
          {messages.map((msg) => (
            <div 
              key={msg.id} 
              className={cn(
                "flex flex-col max-w-[85%] lg:max-w-[70%]",
                msg.type === 'agent' ? "ml-auto items-end" : "mr-auto items-start"
              )}
            >
              <div className={cn(
                "px-4 py-3 rounded-2xl text-sm shadow-sm border",
                msg.type === 'agent' 
                  ? "bg-[#DCF8C6] text-gray-800 rounded-tr-none border-[#C5E1A5]" 
                  : "bg-white text-gray-800 rounded-tl-none border-gray-200"
              )}>
                {msg.text}
              </div>
              <span className="text-[10px] text-gray-400 mt-1 font-bold">
                {msg.time} {msg.type === 'agent' && '• Read'}
              </span>
            </div>
          ))}
        </div>

        {/* AI Suggestions Bar */}
        <AnimatePresence>
          {showAiSuggest && aiData.suggestion && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="px-4 lg:px-6 py-3 bg-white border-t border-slate-100 flex items-center gap-4 overflow-hidden"
            >
              <div className="shrink-0 flex items-center gap-2 text-green-600">
                <Sparkles size={16} className={cn(loadingAi && "animate-spin")} />
                <span className="hidden sm:inline text-[11px] font-bold uppercase tracking-wider">AI:</span>
              </div>
              <div className="flex-1 flex gap-2 overflow-x-auto no-scrollbar py-1">
                <button 
                   onClick={() => setMsgInput(aiData.suggestion)}
                   className="whitespace-nowrap px-3 py-1.5 bg-green-50 text-green-700 text-xs font-medium rounded-full border border-green-200 hover:bg-green-100 transition-colors"
                >
                  {aiData.suggestion.substring(0, 30)}...
                </button>
                <button 
                   className="whitespace-nowrap px-3 py-1.5 bg-slate-50 text-slate-600 text-xs font-medium rounded-full border border-slate-200 hover:bg-slate-100 transition-colors"
                   onClick={fetchAiSuggestion}
                >
                  Regenerate
                </button>
              </div>
              <button onClick={() => setShowAiSuggest(false)} className="text-gray-400 hover:text-gray-600 p-1">
                <X size={14} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Input Bar */}
        <div className="p-4 lg:p-6 bg-white border-t border-slate-200">
          <form 
            onSubmit={handleSendMessage}
            className="flex items-center gap-3"
          >
            <div className="flex-1 relative">
              <Input 
                value={msgInput}
                onChange={(e) => setMsgInput(e.target.value)}
                placeholder="Type a message..." 
                className="bg-slate-50 border-none pr-10 text-sm h-10 lg:h-11"
              />
              <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                <Tag size={18} />
              </button>
            </div>
            <button type="submit" disabled={!msgInput.trim()} className="shrink-0 rounded-full w-10 h-10 lg:w-11 lg:h-11 bg-[#25D366] text-white flex items-center justify-center shadow-lg shadow-green-100 disabled:opacity-50 disabled:shadow-none transition-all active:scale-95">
              <Send size={18} />
            </button>
          </form>
        </div>
      </div>

      {/* Right Side Info Panel */}
      <div className={cn(
        "w-full lg:w-72 border-l border-gray-200 bg-white shrink-0 h-full overflow-auto flex flex-col transition-all duration-300",
        mobileView !== 'info' && "hidden lg:flex"
      )}>
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
           <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center">
             <Sparkles size={12} className="mr-1.5 text-purple-500" /> AI Lead Analysis
           </h3>
           <button onClick={() => setMobileView('chat')} className="lg:hidden text-gray-400 hover:text-gray-600">
              <X size={20} />
           </button>
        </div>

        <div className="flex-1 p-4 space-y-6">
          <div className="bg-purple-50 rounded-xl p-4 border border-purple-100">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-bold text-purple-700">Lead Score</span>
              <span className="text-lg font-black text-purple-900">{aiData.leadScore}/100</span>
            </div>
            <div className="w-full bg-purple-200 h-1.5 rounded-full overflow-hidden">
              <div className="h-full bg-purple-600" style={{ width: `${aiData.leadScore}%` }} />
            </div>
            <p className="text-[10px] text-purple-600 mt-2 font-medium leading-relaxed">
              {aiData.isUrgent ? 'URGENT: ' : ''} Sentiment is {aiData.sentiment}. {aiData.leadScore > 70 ? 'High buying intent detected.' : 'Nurturing required.'}
            </p>
          </div>

          <div>
            <h4 className="text-[10px] font-bold text-gray-400 uppercase mb-3 tracking-widest">AI Suggested Replies</h4>
            <div className="space-y-2">
              <div onClick={() => setMsgInput(aiData.suggestion)} className="p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-xs cursor-pointer hover:border-purple-300 hover:bg-white transition-all">
                "{aiData.suggestion.substring(0, 60)}..."
              </div>
              <div 
                onClick={handleRequestPayment}
                className="p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-xs cursor-pointer hover:border-purple-300 hover:bg-white transition-all flex items-center gap-2 text-purple-600 font-bold"
              >
                <CreditCard size={14} /> Send Zirzir Payment Link
              </div>
            </div>
          </div>

          <div>
             <h4 className="text-[10px] font-bold text-gray-400 uppercase mb-3 tracking-widest">Pipeline Status</h4>
             <div className="flex items-center gap-1">
                <div className="flex-1 h-8 bg-gray-100 rounded flex items-center justify-center text-[10px] font-bold text-gray-500">PROSPECT</div>
                <div className="flex-1 h-8 bg-blue-600 rounded flex items-center justify-center text-[10px] font-bold text-white shadow-sm shadow-blue-100">INTERESTED</div>
             </div>
          </div>

          <div>
             <h4 className="text-[10px] font-bold text-gray-400 uppercase mb-3 tracking-widest">Recent Transactions</h4>
             <div className="space-y-2">
                <div className="flex justify-between items-center text-[11px] font-medium">
                  <span className="text-gray-500">MTN MoMo (Jan 12)</span>
                  <span className="font-bold text-gray-900">GHS 450</span>
                </div>
                <div className="flex justify-between items-center text-[11px] font-medium">
                  <span className="text-gray-500">Zirzir (Dec 22)</span>
                  <span className="font-bold text-gray-900">GHS 1,200</span>
                </div>
             </div>
          </div>
        </div>

        <div className="p-4 border-t border-gray-100 bg-gray-50">
           <Button variant="secondary" className="w-full text-xs font-bold py-2 bg-gray-900 text-white hover:bg-black uppercase tracking-wider">View Full Profile</Button>
        </div>
      </div>
    </div>
  );
};
