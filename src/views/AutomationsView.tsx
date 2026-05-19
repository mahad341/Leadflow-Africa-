import React, { useState } from 'react';
import { Card, Button } from '../components/ui/core';
import { Zap, Play, Clock, MessageSquare, CreditCard, ChevronRight, Plus } from 'lucide-react';
import { cn } from '../lib/utils';
import { toast } from 'sonner';

export const AutomationsView = () => {
  const [automations, setAutomations] = useState([
    { name: 'Initial Greeting', trigger: 'New Incoming Message', action: 'Send Welcome message', active: true, icon: MessageSquare },
    { name: 'Dormant Lead Followup', trigger: 'No reply > 24h', action: 'Send AI-gen followup', active: true, icon: Clock },
    { name: 'Payment Reminder', trigger: 'Link created + 1h', action: 'Send MoMo reminder', active: false, icon: CreditCard },
    { name: 'VIP Lead Alert', trigger: 'Lead Score > 90', action: 'Notify Admin via WhatsApp', active: true, icon: Zap },
  ]);

  const toggleAutomation = (name: string) => {
    setAutomations(prev => prev.map(a => 
      a.name === name ? { ...a, active: !a.active } : a
    ));
    const auto = automations.find(a => a.name === name);
    if (auto) {
      toast.success(`${name} is now ${!auto.active ? 'Active' : 'Paused'}`);
    }
  };

  const handleCreate = () => {
    toast.info("Automation builder is an enterprise feature. Please contact support.");
  };

  return (
    <div className="p-4 sm:p-8 max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Automation Engine</h2>
          <p className="text-slate-500 text-sm">Rules that run your business while you sleep.</p>
        </div>
        <Button onClick={handleCreate} className="gap-2 w-full sm:w-auto"><Plus size={16} /> Create Automation</Button>
      </div>

      <div className="space-y-4">
        {automations.map((a) => (
          <Card key={a.name} className="p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 group hover:border-green-300 transition-colors">
            <div className={cn(
              "w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-sm transition-all",
              a.active ? "bg-green-100 text-green-600" : "bg-slate-100 text-slate-400"
            )}>
              <a.icon size={24} />
            </div>
            <div className="flex-1 min-w-0">
               <div className="flex items-center gap-3 mb-1">
                 <h4 className="font-bold text-slate-900">{a.name}</h4>
                 <span className={cn(
                   "text-[9px] font-black uppercase px-1.5 py-0.5 rounded transition-colors",
                   a.active ? "bg-green-500 text-white" : "bg-slate-200 text-slate-500"
                 )}>
                   {a.active ? 'Active' : 'Paused'}
                 </span>
               </div>
               <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs font-medium">
                  <div className="flex items-center gap-1.5 text-slate-400">
                    <Play size={10} className="fill-current" />
                    <span>Trigger: <span className="text-slate-700">{a.trigger}</span></span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-400">
                    <ChevronRight size={10} />
                    <span>Action: <span className="text-slate-700">{a.action}</span></span>
                  </div>
               </div>
            </div>
            <div className="flex gap-2 w-full sm:w-auto pt-2 sm:pt-0">
               <Button 
                onClick={() => toggleAutomation(a.name)}
                variant="outline" 
                size="sm" 
                className={cn(
                  "flex-1 sm:flex-none text-[10px] font-bold uppercase tracking-wider",
                  a.active ? "text-slate-500" : "text-green-600 border-green-200 bg-green-50"
                )}
               >
                 {a.active ? 'Pause' : 'Activate'}
               </Button>
               <Button variant="ghost" size="sm" className="hidden sm:flex text-[10px] font-bold text-slate-400 uppercase tracking-wider">Edit</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
