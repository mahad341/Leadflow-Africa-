import React from 'react';
import { 
  LayoutDashboard, 
  MessageSquare, 
  Users, 
  Zap, 
  CreditCard, 
  PieChart, 
  Settings,
  Menu,
  X,
  LogOut,
  Bot
} from 'lucide-react';
import { cn } from '../lib/utils';
import { Button } from './ui/core';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar = ({ activeTab, onTabChange, isOpen, onClose }: SidebarProps) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'inbox', label: 'Inbox', icon: MessageSquare },
    { id: 'leads', label: 'Leads Pipeline', icon: Users },
    { id: 'ai-panel', label: 'AI Insights', icon: Bot },
    { id: 'automations', label: 'Automations', icon: Zap },
    { id: 'payments', label: 'Payments', icon: CreditCard },
    { id: 'analytics', label: 'Analytics', icon: PieChart },
  ];

  const handleTabChange = (tabId: string) => {
    onTabChange(tabId);
    onClose();
  };

  return (
    <>
      {/* Mobile Overlay */}
      <div 
        className={cn(
          "fixed inset-0 bg-black/50 z-40 transition-opacity lg:hidden",
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        )}
        onClick={onClose}
      />

      <aside className={cn(
        "fixed inset-y-0 left-0 w-64 bg-[#0B0F19] z-50 transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 border-r border-gray-800 flex flex-col",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="p-6 mb-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-black text-white flex items-center gap-2">
              <div className="w-8 h-8 bg-[#25D366] rounded-lg flex items-center justify-center shadow-lg shadow-[#25d36644]">
                <Zap className="fill-white text-white" size={18} />
              </div>
              LeadFlow
            </h1>
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-2 ml-1">SME Operations</p>
          </div>
          <button onClick={onClose} className="lg:hidden text-gray-400 hover:text-white">
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 px-3 space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleTabChange(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 text-xs font-bold rounded-lg transition-all",
                activeTab === item.id 
                  ? "bg-white/10 text-white" 
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              )}
            >
              <item.icon size={18} />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-800">
          <button
            onClick={() => handleTabChange('settings')}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2.5 text-xs font-bold rounded-lg text-gray-400 hover:text-white hover:bg-white/5",
              activeTab === 'settings' && "bg-white/10 text-white"
            )}
          >
            <Settings size={18} />
            Settings
          </button>
          <button className="w-full flex items-center gap-3 px-3 py-2.5 text-xs font-bold rounded-lg text-red-400 hover:bg-red-500/10 mt-1">
            <LogOut size={18} />
            Sign Out
          </button>
        </div>
      </aside>
    </>
  );
};
