import React, { useState } from 'react';
import { Card, Button, Input } from '../components/ui/core';
import { Plus, MoreHorizontal, User, DollarSign, ArrowRight, Star, X, Search } from 'lucide-react';
import { cn, formatCurrency } from '../lib/utils';
import { toast } from 'sonner';

const COLUMNS = [
  { id: 'new', label: 'New Lead', color: 'bg-blue-500' },
  { id: 'interested', label: 'Interested', color: 'bg-purple-500' },
  { id: 'negotiation', label: 'Negotiation', color: 'bg-orange-500' },
  { id: 'paid', label: 'Paid / Closed', color: 'bg-green-500' },
];

const INITIAL_MOCK_LEADS = [
  { id: '1', name: 'James O.', value: 1200000, stage: 'new', source: 'Instagram', score: 45 },
  { id: '2', name: 'Retailer XYZ', value: 4500000, stage: 'interested', source: 'WhatsApp', score: 88 },
  { id: '3', name: 'Mary Wanjiku', value: 850000, stage: 'negotiation', source: 'Referral', score: 72 },
  { id: '4', name: 'Bakery Ltd', value: 12500000, stage: 'paid', source: 'WhatsApp', score: 100 },
  { id: '5', name: 'Thomas T.', value: 300000, stage: 'new', source: 'Facebook', score: 20 },
];

export const LeadsView = () => {
  const [leads, setLeads] = useState(INITIAL_MOCK_LEADS);
  const [showAddLead, setShowAddLead] = useState(false);
  const [filterText, setFilterText] = useState('');
  const [newLead, setNewLead] = useState({ name: '', value: '', stage: 'new', source: 'WhatsApp' });

  const handleAddLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLead.name || !newLead.value) return;

    const lead = {
      id: Math.random().toString(36).substr(2, 9),
      name: newLead.name,
      value: Number(newLead.value),
      stage: newLead.stage as any,
      source: newLead.source,
      score: Math.floor(Math.random() * 100),
    };

    setLeads([...leads, lead]);
    setNewLead({ name: '', value: '', stage: 'new', source: 'WhatsApp' });
    setShowAddLead(false);
    toast.success("New lead created successfully!");
  };

  const filteredLeads = leads.filter(l => 
    l.name.toLowerCase().includes(filterText.toLowerCase()) ||
    l.source.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <div className="p-4 sm:p-8 h-full flex flex-col space-y-6 animate-in fade-in duration-500 overflow-hidden relative">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shrink-0">
        <div>
          <h2 className="text-xl font-black text-gray-900 tracking-tight">Sales Pipeline</h2>
          <p className="text-gray-500 text-[10px] uppercase font-bold tracking-widest mt-1">Lead Management Hub</p>
        </div>
        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          <div className="hidden xs:flex -space-x-2 mr-2 lg:mr-4">
             {[1,2,3].map(i => (
               <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center text-[10px] font-bold text-gray-600 uppercase">
                 A{i}
               </div>
             ))}
             <div className="w-8 h-8 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-[10px] font-bold text-gray-400">
               +2
             </div>
          </div>
          <div className="relative flex-1 sm:flex-none">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
            <Input 
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
              placeholder="Search leads..." 
              className="pl-9 h-9 text-xs w-full sm:w-48 bg-white border-gray-200"
            />
          </div>
          <Button 
            onClick={() => setShowAddLead(true)}
            size="sm" 
            className="h-9 px-4 text-[11px] font-bold uppercase tracking-wider gap-2 flex-1 sm:flex-none whitespace-nowrap"
          >
            <Plus size={14} /> New Lead
          </Button>
        </div>
      </div>

      {showAddLead && (
        <div className="absolute inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-md p-6 animate-in zoom-in-95 duration-200">
             <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-black text-slate-900 tracking-tight">Create New Lead</h3>
                <button onClick={() => setShowAddLead(false)} className="text-slate-400 hover:text-slate-600"><X size={20} /></button>
             </div>
             <form onSubmit={handleAddLead} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Customer Name</label>
                  <Input 
                    required 
                    placeholder="e.g. Samuel Okello" 
                    value={newLead.name}
                    onChange={(e) => setNewLead({...newLead, name: e.target.value})}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Initial Deal Value (GHS)</label>
                  <Input 
                    required 
                    type="number" 
                    placeholder="2500" 
                    value={newLead.value}
                    onChange={(e) => setNewLead({...newLead, value: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Source</label>
                    <select 
                      className="w-full h-10 px-3 text-sm bg-slate-50 border border-slate-200 rounded-md outline-hidden focus:border-green-500"
                      value={newLead.source}
                      onChange={(e) => setNewLead({...newLead, source: e.target.value})}
                    >
                      <option>WhatsApp</option>
                      <option>Instagram</option>
                      <option>Facebook</option>
                      <option>Referral</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Initial Stage</label>
                    <select 
                      className="w-full h-10 px-3 text-sm bg-slate-50 border border-slate-200 rounded-md outline-hidden focus:border-green-500"
                      value={newLead.stage}
                      onChange={(e) => setNewLead({...newLead, stage: e.target.value})}
                    >
                      {COLUMNS.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
                    </select>
                  </div>
                </div>
                <div className="pt-4 flex gap-3">
                  <Button type="button" variant="outline" onClick={() => setShowAddLead(false)} className="flex-1">Cancel</Button>
                  <Button type="submit" className="flex-1 bg-[#25D366] hover:bg-[#128C7E]">Create Lead</Button>
                </div>
             </form>
          </Card>
        </div>
      )}

      <div className="flex-1 min-h-0 flex gap-4 sm:gap-6 overflow-x-auto pb-4 no-scrollbar">
        {COLUMNS.map((column) => (
          <div key={column.id} className="w-[280px] sm:w-80 shrink-0 flex flex-col h-full bg-gray-200/30 rounded-2xl p-3 border border-gray-200/50">
            <div className="flex items-center justify-between mb-4 px-2">
              <div className="flex items-center gap-2">
                <div className={cn("w-2 h-2 rounded-full", column.color)} />
                <h3 className="text-[10px] font-black text-gray-700 uppercase tracking-widest">{column.label}</h3>
                <span className="text-[9px] font-black text-gray-400 bg-white border border-gray-200 px-1.5 py-0.5 rounded-full">
                  {filteredLeads.filter(l => l.stage === column.id).length}
                </span>
              </div>
              <button onClick={() => setShowAddLead(true)} className="text-gray-400 hover:text-gray-600 transition-colors"><Plus size={14} /></button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-3 pr-1 no-scrollbar">
              {filteredLeads.filter(l => l.stage === column.id).map((lead) => (
                <Card key={lead.id} className="p-4 hover:shadow-md hover:border-[#25D366]/30 transition-all cursor-move group border-gray-200 shadow-sm">
                  <div className="flex justify-between items-start mb-3">
                     <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-gray-100 flex items-center justify-center text-[10px] font-bold text-gray-500 group-hover:bg-[#25D366]/10 group-hover:text-[#25D366] transition-colors">
                          {lead.name.charAt(0)}
                        </div>
                        <span className="text-[11px] font-bold text-gray-900 group-hover:text-[#25D366] transition-colors">{lead.name}</span>
                     </div>
                     <button className="text-gray-300 hover:text-gray-500"><MoreHorizontal size={14} /></button>
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1 font-sans">Estimated Value</p>
                    <p className="text-sm font-black text-gray-800 flex items-center gap-1.5">
                       {formatCurrency(lead.value)}
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                       <span className="text-[9px] bg-gray-100 text-gray-500 font-bold px-2 py-0.8 rounded-md uppercase tracking-tighter">
                         {lead.source}
                       </span>
                    </div>
                    <div className="flex items-center gap-1">
                       <Star size={10} className={cn("fill-current", lead.score > 70 ? "text-yellow-500" : "text-gray-300")} />
                       <span className={cn(
                          "text-[10px] font-black",
                          lead.score > 80 ? "text-green-600" : lead.score > 40 ? "text-orange-500" : "text-gray-400"
                       )}>
                         {lead.score}%
                       </span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
            
            <div className="mt-4 p-2 pt-4 border-t border-gray-200/50 flex justify-between items-center">
               <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Subtotal</span>
               <span className="text-xs font-black text-gray-700">
                  {formatCurrency(filteredLeads.filter(l => l.stage === column.id).reduce((acc, curr) => acc + curr.value, 0))}
               </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
