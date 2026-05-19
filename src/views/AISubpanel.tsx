import React, { useState } from 'react';
import { Card, Button } from '../components/ui/core';
import { Sparkles, Brain, Target, Zap, ChevronRight, MessageSquare, ListChecks, ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';
import { toast } from 'sonner';

export const AISubpanel = () => {
  const [loading, setLoading] = useState(false);

  const handleAction = (title: string) => {
    toast.success(`Action initiated: ${title}`);
  };

  const handleAudit = () => {
    toast.promise(new Promise(res => setTimeout(res, 2000)), {
      loading: 'Analyzing historical data patterns...',
      success: 'Audit report generated! Check your email.',
      error: 'Failed to generate audit'
    });
  };

  const insights = [
    {
      title: "Conversion Boost Opportunity",
      desc: "WhatsApp response time is 12% slower on Saturdays. Automating Saturday initial greetings could increase lead retention by 15%.",
      type: "strategy",
      impact: "High"
    },
    {
      title: "Dormant Lead Outreach",
      desc: "Found 12 leads in 'Interested' stage with no contact for 3 days. Generate follow-up sequence?",
      type: "action",
      impact: "Medium"
    },
    {
      title: "Stock Sentiment Alert",
      desc: "Customers are mentioning 'Shea Butter delivery' as a recurring pain point in Kampala. Consider local hub storage.",
      type: "market",
      impact: "Critical"
    }
  ];

  return (
    <div className="p-4 sm:p-8 max-w-4xl mx-auto space-y-8 animate-in slide-in-from-right-8 duration-500">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-green-500 to-green-700 flex items-center justify-center text-white shadow-lg shadow-green-200 shrink-0">
          <Brain size={20} className="sm:w-6 sm:h-6" />
        </div>
        <div className="min-w-0">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight truncate">AI Strategy Hub</h2>
          <p className="text-slate-500 text-[11px] sm:text-sm font-medium">Advanced sales orchestration & lead intelligence.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6 bg-green-900 text-white border-none shadow-xl shadow-green-100 overflow-hidden relative">
          <Sparkles className="absolute top-[-10px] right-[-10px] opacity-10 w-32 h-32 rotate-12" />
          <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
            <Zap size={18} className="fill-current" /> Auto-Pilot Active
          </h3>
          <p className="text-green-100 text-xs leading-relaxed mb-6 opacity-80">
            Currently monitoring all WhatsApp traffic. AI is scoring leads and suggesting replies in the unified inbox.
          </p>
          <div className="space-y-4">
             <div className="flex justify-between text-xs border-b border-green-800 pb-2">
                <span className="text-green-300">Tokens Optimized</span>
                <span className="font-bold">84%</span>
             </div>
             <div className="flex justify-between text-xs border-b border-green-800 pb-2">
                <span className="text-green-300">Accuracy Rate</span>
                <span className="font-bold">92.4%</span>
             </div>
          </div>
          <Button 
            onClick={() => toast.info("Model refinement requires more training data (min 500 conversations).")}
            variant="outline" 
            className="w-full mt-6 bg-white/10 border-white/20 text-white hover:bg-white/20 h-9 text-xs"
          >
            Refine AI Models
          </Button>
        </Card>

        <Card className="p-6">
          <h3 className="text-slate-900 font-bold mb-4 flex items-center gap-2">
            <Target size={18} className="text-green-600" /> Lead Scoring Logic
          </h3>
          <div className="space-y-3">
             {[
               { rule: 'Expresses Price Intolerance', effect: '-20pts', type: 'neg' },
               { rule: 'Mentions Bulk/Wholesale', effect: '+35pts', type: 'pos' },
               { rule: 'Requests Delivery Quote', effect: '+15pts', type: 'pos' },
               { rule: 'Repeated Unread Msg', effect: '-10pts', type: 'neg' },
             ].map(r => (
               <div key={r.rule} className="flex justify-between items-center text-xs p-2 rounded-lg bg-slate-50">
                 <span className="text-slate-600 font-medium">{r.rule}</span>
                 <span className={cn("font-bold", r.type === 'pos' ? "text-green-600" : "text-red-500")}>{r.effect}</span>
               </div>
             ))}
          </div>
        </Card>
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest pl-1">Strategic Insights</h3>
        {insights.map((insight, idx) => (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            key={insight.title}
          >
            <Card 
              onClick={() => handleAction(insight.title)}
              className="p-4 sm:p-5 flex gap-3 sm:gap-5 items-start hover:border-green-300 transition-colors cursor-pointer group"
            >
              <div className={cn(
                "w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center shrink-0",
                insight.type === 'strategy' ? "bg-blue-50 text-blue-600" : insight.type === 'action' ? "bg-orange-50 text-orange-600" : "bg-purple-50 text-purple-600"
              )}>
                 {insight.type === 'strategy' ? <ListChecks size={18} /> : insight.type === 'action' ? <Zap size={18} /> : <MessageSquare size={18} />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 sm:gap-3 mb-1">
                  <h4 className="font-bold text-sm sm:text-base text-slate-900 group-hover:text-green-700 transition-colors truncate">{insight.title}</h4>
                  <span className={cn(
                    "text-[8px] sm:text-[9px] font-black uppercase px-1.5 py-0.5 rounded shrink-0",
                    insight.impact === 'High' ? "bg-red-100 text-red-600" : insight.impact === 'Critical' ? "bg-orange-100 text-orange-600" : "bg-slate-100 text-slate-500"
                  )}>
                    {insight.impact}
                  </span>
                </div>
                <p className="text-[11px] sm:text-xs text-slate-500 leading-relaxed font-medium line-clamp-2">{insight.desc}</p>
              </div>
              <button className="self-center p-1 sm:p-2 rounded-full hover:bg-slate-50 text-slate-300 group-hover:text-green-600">
                <ChevronRight size={18} />
              </button>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="pt-8">
        <Card className="p-8 border-dashed border-2 flex flex-col items-center text-center bg-slate-50/50">
           <div className="w-14 h-14 rounded-full bg-slate-200/50 flex items-center justify-center mb-4">
              <Brain size={28} className="text-slate-400" />
           </div>
           <h3 className="font-bold text-slate-900 mb-2">Request Custom Analysis</h3>
           <p className="text-xs text-slate-500 max-w-sm mb-6">Ask LeadFlow AI to analyze a specific period, agent, or product category for hidden growth patterns.</p>
           <Button onClick={handleAudit} variant="outline" className="gap-2">
              Generate Custom Audit <ArrowUpRight size={14} />
           </Button>
        </Card>
      </div>
    </div>
  );
};
