import React from 'react';
import { Card } from '../components/ui/core';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell, PieChart, Pie } from 'recharts';
import { formatCurrency } from '../lib/utils';
import { TrendingUp, Users, Target, Activity } from 'lucide-react';
import { toast } from 'sonner';

const REVENUE_BY_SOURCE = [
  { name: 'WhatsApp', value: 7500000, color: '#16a34a' },
  { name: 'Instagram', value: 2400000, color: '#9333ea' },
  { name: 'Facebook', value: 1200000, color: '#2563eb' },
  { name: 'Referrals', value: 800000, color: '#f59e0b' },
];

const LEADS_DATA = [
  { stage: 'New', count: 120 },
  { stage: 'Interested', count: 85 },
  { stage: 'Negotiation', count: 42 },
  { stage: 'Paid', count: 28 },
];

export const AnalyticsView = () => {
  const handlePeriodChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    toast.promise(new Promise(res => setTimeout(res, 800)), {
      loading: 'Recalculating metrics...',
      success: `Metrics updated for ${e.target.value}`,
      error: 'Failed to update metrics'
    });
  };

  return (
    <div className="p-4 sm:p-8 space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Performance Analytics</h2>
          <p className="text-slate-500 text-sm">Detailed breakdown of sales flows, agent performance and AI outcomes.</p>
        </div>
        <select 
          onChange={handlePeriodChange}
          className="text-xs bg-white border border-slate-200 rounded-lg p-2 font-bold text-slate-700 shadow-sm outline-hidden focus:ring-2 focus:ring-green-500/20"
        >
           <option>Last 30 Days</option>
           <option>Last Quarter</option>
           <option>Year to Date</option>
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:h-[400px]">
        <Card className="p-4 sm:p-6 flex flex-col min-h-[350px] lg:min-h-0">
          <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
            <TrendingUp size={18} className="text-green-600" /> Revenue by Channel
          </h3>
          <div className="flex-1 w-full flex flex-col sm:flex-row items-center gap-6">
            <div className="flex-1 w-full h-[200px] sm:h-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie 
                    data={REVENUE_BY_SOURCE} 
                    innerRadius={60} 
                    outerRadius={100} 
                    paddingAngle={5} 
                    dataKey="value"
                  >
                    {REVENUE_BY_SOURCE.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => formatCurrency(value as number)} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="w-full sm:w-48 space-y-3 shrink-0">
               {REVENUE_BY_SOURCE.map(s => (
                 <div key={s.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: s.color }} />
                      <span className="text-xs font-medium text-slate-600">{s.name}</span>
                    </div>
                    <span className="text-xs font-bold text-slate-900">{Math.round((s.value / 11900000) * 100)}%</span>
                 </div>
               ))}
            </div>
          </div>
        </Card>

        <Card className="p-4 sm:p-6 flex flex-col min-h-[300px] lg:min-h-0">
          <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
            <Target size={18} className="text-blue-600" /> Pipeline Drop-off
          </h3>
          <div className="flex-1 w-full h-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={LEADS_DATA} layout="vertical">
                <XAxis type="number" hide />
                <YAxis dataKey="stage" type="category" axisLine={false} tickLine={false} tick={{fontSize: 12, fontWeight: 600, fill: '#475569'}} width={100} />
                <Tooltip />
                <Bar dataKey="count" radius={[0, 4, 4, 0]}>
                   {LEADS_DATA.map((entry, index) => (
                     <Cell key={`cell-${index}`} fill={index === 3 ? '#16a34a' : '#94a3b8'} />
                   ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <Card className="p-6 bg-slate-50 border-none">
            <div className="flex items-center gap-3 mb-2">
               <Activity size={16} className="text-green-600" />
               <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">AI Accuracy</span>
            </div>
            <h4 className="text-2xl font-black text-slate-900">98.2%</h4>
            <p className="text-[10px] text-slate-500 mt-1 font-medium italic">Based on manual agent override rate.</p>
         </Card>
         <Card className="p-6 bg-slate-50 border-none">
            <div className="flex items-center gap-3 mb-2">
               <Users size={16} className="text-blue-600" />
               <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">LTV (Avg)</span>
            </div>
            <h4 className="text-2xl font-black text-slate-900">{formatCurrency(450500)}</h4>
            <p className="text-[10px] text-slate-500 mt-1 font-medium italic">Lifetime Value per customer.</p>
         </Card>
         <Card className="p-6 bg-slate-50 border-none">
            <div className="flex items-center gap-3 mb-2">
               <TrendingUp size={16} className="text-purple-600" />
               <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">ROI (AI)</span>
            </div>
            <h4 className="text-2xl font-black text-slate-900">12.4x</h4>
            <p className="text-[10px] text-slate-500 mt-1 font-medium italic">Revenue vs AI token cost ratio.</p>
         </Card>
      </div>
    </div>
  );
};
