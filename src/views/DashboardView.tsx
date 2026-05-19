import React from 'react';
import { Card, Button } from '../components/ui/core';
import { TrendingUp, Users, MessageSquare, CreditCard, ArrowUpRight, ArrowDownRight, Clock } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { formatCurrency, cn } from '../lib/utils';
import { toast } from 'sonner';

const data = [
  { name: 'Mon', revenue: 4000 },
  { name: 'Tue', revenue: 3000 },
  { name: 'Wed', revenue: 2000 },
  { name: 'Thu', revenue: 2780 },
  { name: 'Fri', revenue: 1890 },
  { name: 'Sat', revenue: 2390 },
  { name: 'Sun', revenue: 3490 },
];

export const DashboardView = () => {
  const stats = [
    { label: 'Total Leads', value: '428', icon: Users, change: '+12.5%', positive: true },
    { label: 'Conversion Rate', value: '24.2%', icon: TrendingUp, change: '-2.4%', positive: false },
    { label: 'Active Conversations', value: '18', icon: MessageSquare, change: '+5', positive: true },
    { label: 'Revenue (MTN/Airtel)', value: formatCurrency(2450000), icon: CreditCard, change: '+18.2%', positive: true },
  ];

  const handleDownload = () => {
    toast.promise(new Promise(res => setTimeout(res, 1500)), {
      loading: 'Generating PDF report...',
      success: 'Report downloaded successfully',
      error: 'Failed to download report'
    });
  };

  const handleBroadcast = () => {
    toast.info("Broadcast modal coming soon. Select target audience first.");
  };

  return (
    <div className="p-4 sm:p-6 space-y-6 animate-in fade-in duration-500 bg-[#F3F4F6]">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h2 className="text-xl font-black text-gray-900 tracking-tight">Karibu Back!</h2>
          <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mt-1">Daily Overview</p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto overflow-x-auto no-scrollbar">
          <Button 
            onClick={handleDownload}
            variant="outline" 
            size="sm" 
            className="h-8 text-[10px] uppercase font-bold tracking-wider whitespace-nowrap"
          >
            Download Report
          </Button>
          <Button 
            onClick={handleBroadcast}
            size="sm" 
            className="h-8 text-[10px] uppercase font-bold tracking-wider whitespace-nowrap"
          >
            Broadcast Message
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="p-4 border-gray-200">
            <div className="flex justify-between items-start mb-3">
              <div className="w-9 h-9 rounded-xl bg-[#25D366]/10 text-[#25D366] flex items-center justify-center">
                <stat.icon size={18} />
              </div>
              <div className={cn(
                "flex items-center text-[9px] font-black px-1.5 py-0.5 rounded uppercase tracking-tighter",
                stat.positive ? "text-green-600 bg-green-50" : "text-red-500 bg-red-50"
              )}>
                {stat.positive ? <ArrowUpRight size={10} className="mr-0.5" /> : <ArrowDownRight size={10} className="mr-0.5" />}
                {stat.change}
              </div>
            </div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{stat.label}</p>
            <h3 className="text-xl font-black text-gray-900 mt-1">{stat.value}</h3>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 p-4 sm:p-6 border-gray-200 h-[350px] sm:h-[400px]">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-sm font-bold text-gray-900 tracking-tight flex items-center gap-2">
               <TrendingUp size={16} className="text-[#25D366]" /> Revenue Performance
            </h3>
            <div className="flex gap-2">
               <div className="hidden sm:flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-[#25D366]" />
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Growth</span>
               </div>
            </div>
          </div>
          <div className="h-56 sm:h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#25D366" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#25D366" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" fontSize={10} fontWeight={600} axisLine={false} tickLine={false} tick={{fill: '#94a3b8'}} />
                <YAxis fontSize={10} fontWeight={600} axisLine={false} tickLine={false} tick={{fill: '#94a3b8'}} tickFormatter={(v) => `$${v/1000}k`} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', fontSize: '11px', fontWeight: 600 }}
                  formatter={(value) => formatCurrency(value as number)}
                />
                <Area type="monotone" dataKey="revenue" stroke="#25D366" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6 border-gray-200">
           <div className="flex items-center justify-between mb-6">
             <h3 className="text-sm font-bold text-gray-900 tracking-tight flex items-center gap-2">
                <Clock size={16} className="text-blue-500" /> Recent AI Insights
             </h3>
           </div>
           <div className="space-y-4">
              {[
                { title: 'Response Time', val: '-12%', desc: 'Wait time decreased since AI replies activated.', color: 'text-green-600' },
                { title: 'Lead Scoring', val: '92%', desc: 'Accuracy of automated lead qualification.', color: 'text-blue-600' },
                { title: 'Conversion', val: '+5.4%', desc: 'Rise in payment link click-through rates.', color: 'text-purple-600' },
              ].map(i => (
                <div key={i.title} className="p-3 rounded-xl bg-gray-50 border border-gray-100 group hover:border-[#25D366]/30 transition-all">
                   <div className="flex justify-between items-start mb-1">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{i.title}</span>
                      <span className={cn("text-xs font-black", i.color)}>{i.val}</span>
                   </div>
                   <p className="text-[10px] text-gray-500 font-medium leading-relaxed font-sans">{i.desc}</p>
                </div>
              ))}
           </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="p-6">
          <h3 className="font-bold text-slate-800 mb-4">Urgent Leads (AI Detected)</h3>
          <div className="space-y-4">
             {[
               { name: 'John Doe', text: 'I need terms for 500 units by EOD.', time: '5m' },
               { name: 'Aisha K.', text: 'Payment failed, please help ASAP.', time: '12m' }
             ].map((l) => (
               <div key={l.name} className="flex gap-4 items-center p-3 rounded-lg bg-orange-50 border border-orange-100">
                 <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold text-xs shrink-0">
                    {l.name.charAt(0)}
                 </div>
                 <div className="flex-1 min-w-0">
                   <p className="text-xs font-bold text-orange-900">{l.name} <span className="font-normal text-orange-700 ml-2">({l.time} ago)</span></p>
                   <p className="text-[11px] text-orange-800 truncate leading-relaxed">"{l.text}"</p>
                 </div>
                 <Button variant="ghost" size="sm" className="text-orange-900 hover:bg-orange-200">Reply</Button>
               </div>
             ))}
          </div>
        </Card>
      </div>
    </div>
  );
};
