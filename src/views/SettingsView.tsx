import React from 'react';
import { Card, Button } from '../components/ui/core';
import { Mail, Shield, Smartphone, Bell, Layout, CreditCard, ChevronRight } from 'lucide-react';
import { toast } from 'sonner';

export const SettingsView = () => {
  const sections = [
    { title: 'Business Profile', desc: 'Manage your industry, name and branding.', icon: Layout },
    { title: 'WhatsApp Integration', desc: 'Sync your Meta Business number and API keys.', icon: Smartphone },
    { title: 'Team & Permissions', desc: 'Invite agents and assign dashboard roles.', icon: Shield },
    { title: 'Notification Rules', desc: 'Configure mobile push and internal alerts.', icon: Bell },
    { title: 'Billings & Plans', desc: 'Manage your SaaS subscription and limits.', icon: CreditCard },
  ];

  const handleSectionClick = (title: string) => {
    toast(`Configuration for ${title} will be available in the next release.`, {
      description: "We are currently finalizing the secure data vault."
    });
  };

  return (
    <div className="p-4 sm:p-8 max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight text-wrap">System Settings</h2>
        <p className="text-slate-500 text-sm">Configure your LeadFlow Africa Operating System.</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {sections.map((s) => (
          <Card 
            key={s.title} 
            onClick={() => handleSectionClick(s.title)}
            className="p-4 flex items-center gap-4 hover:border-slate-300 transition-colors cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 group-hover:bg-green-100 group-hover:text-green-600 transition-colors shrink-0">
               <s.icon size={20} />
            </div>
            <div className="flex-1 min-w-0">
               <h4 className="text-sm font-bold text-slate-900 truncate">{s.title}</h4>
               <p className="text-[11px] text-slate-500 line-clamp-1">{s.desc}</p>
            </div>
            <ChevronRight size={18} className="text-slate-300 shrink-0" />
          </Card>
        ))}
      </div>
    </div>
  );
};
