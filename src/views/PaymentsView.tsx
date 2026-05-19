import React from 'react';
import { Card, Button, Input } from '../components/ui/core';
import { CreditCard, Smartphone, Link as LinkIcon, DollarSign, History, ShieldCheck, ExternalLink } from 'lucide-react';
import { cn, formatCurrency } from '../lib/utils';
import { toast } from 'sonner';

export const PaymentsView = () => {
  const handleAction = (label: string) => {
    toast.success(`${label} process started.`);
  };

  const handleWithdraw = () => {
    toast.error("Withdrawal requires 2FA verification. Check your mobile app.");
  };

  return (
    <div className="p-4 sm:p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Payments & Transfers</h2>
          <p className="text-slate-500 text-sm">Send payment links and track mobile money collections.</p>
        </div>
        <Button onClick={() => handleAction("Payment Link")} className="gap-2 w-full sm:w-auto">
          <LinkIcon size={16} /> Create Payment Link
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Wallet Balance */}
        <Card className="p-6 bg-slate-900 text-white flex flex-col justify-between h-[220px]">
          <div>
            <div className="flex justify-between items-start mb-4">
              <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center">
                <CreditCard size={18} className="text-slate-400" />
              </div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-slate-800 px-2 py-1 rounded">Zirzir Integrated</span>
            </div>
            <p className="text-slate-400 text-xs font-medium uppercase tracking-wider">Available Balance</p>
            <h3 className="text-3xl font-black mt-1">{formatCurrency(18240500)}</h3>
          </div>
          <div className="flex gap-2">
             <Button 
                onClick={handleWithdraw}
                variant="outline" 
                className="flex-1 bg-white/5 border-white/10 hover:bg-white/10 text-xs py-1.5 h-auto"
              >
                Withdraw
              </Button>
             <Button 
                onClick={() => handleAction("Top Up")}
                variant="outline" 
                className="flex-1 bg-white/5 border-white/10 hover:bg-white/10 text-xs py-1.5 h-auto"
              >
                Top Up
              </Button>
          </div>
        </Card>

        {/* Mobile Money Integration */}
        <Card className="p-6 flex flex-col justify-between h-[220px]">
          <div>
            <h4 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Smartphone size={18} className="text-green-600" /> Mobile Money Collection
            </h4>
            <div className="space-y-3">
               <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded bg-yellow-400 flex items-center justify-center text-[10px] font-black text-white">MTN</div>
                    <span className="text-xs font-bold text-slate-700">MTN MoMo</span>
                  </div>
                  <span className="text-[10px] text-green-600 font-bold bg-green-50 px-1.5 py-0.5 rounded">Active</span>
               </div>
               <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded bg-red-600 flex items-center justify-center text-[10px] font-black text-white">A</div>
                    <span className="text-xs font-bold text-slate-700">Airtel Money</span>
                  </div>
                  <span className="text-[10px] text-green-600 font-bold bg-green-50 px-1.5 py-0.5 rounded">Active</span>
               </div>
            </div>
          </div>
          <p className="text-[10px] text-slate-400 font-medium">Automatic settlement into internal wallet every 24h.</p>
        </Card>

        <Card className="p-6 bg-green-50 border-green-100 flex flex-col justify-center items-center text-center">
            <ShieldCheck size={40} className="text-green-600 mb-3" />
            <h4 className="text-sm font-bold text-green-900">Fraud Protection</h4>
            <p className="text-[11px] text-green-700 mt-1 max-w-[180px]">LeadFlow AI monitors transaction patterns to flag suspicious payment attempts.</p>
            <Button 
              onClick={() => handleAction("Logs Audit")}
              variant="ghost" 
              className="text-green-800 text-[10px] font-bold mt-4 uppercase tracking-wider"
            >
              Security Logs
            </Button>
        </Card>
      </div>

      <div className="space-y-4 pt-4 lg:pt-0">
        <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2 pl-1">
          <History size={18} className="text-slate-400" /> Recent Transactions
        </h3>
        <Card className="overflow-x-auto border-slate-200 no-scrollbar">
           <table className="w-full text-left border-collapse min-w-[600px]">
              <thead className="bg-slate-50 border-b border-slate-200">
                 <tr>
                    <th className="px-6 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Customer</th>
                    <th className="px-6 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Agent</th>
                    <th className="px-6 py-3 text-[10px] font-bold text-slate-500 uppercase tracking-wider text-right">Action</th>
                 </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 italic text-xs">
                 {[
                   { date: 'May 18, 14:22', name: 'James O.', amt: 1200000, status: 'success', agent: 'Musa' },
                   { date: 'May 18, 11:05', name: 'Aisha K.', amt: 450000, status: 'pending', agent: 'Sarah' },
                   { date: 'May 17, 18:40', name: 'Retailer XYZ', amt: 8400000, status: 'success', agent: 'Musa' },
                 ].map((t) => (
                   <tr key={t.date + t.name} className="hover:bg-slate-50 transition-colors cursor-pointer group not-italic">
                      <td className="px-6 py-4 text-slate-500 font-medium">{t.date}</td>
                      <td className="px-6 py-4 font-bold text-slate-900">{t.name}</td>
                      <td className="px-6 py-4 font-black">{formatCurrency(t.amt)}</td>
                      <td className="px-6 py-4">
                        <span className={cn(
                          "px-2 py-1 rounded text-[10px] font-bold uppercase",
                          t.status === 'success' ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                        )}>
                          {t.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-600">{t.agent}</td>
                      <td className="px-6 py-4 text-right">
                         <button onClick={() => toast.info(`Viewing receipt for ${t.name}`)} className="text-slate-400 group-hover:text-green-600"><ExternalLink size={14} /></button>
                      </td>
                   </tr>
                 ))}
              </tbody>
           </table>
        </Card>
      </div>
    </div>
  );
};
