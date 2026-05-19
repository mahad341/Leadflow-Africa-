import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { DashboardView } from './views/DashboardView';
import { InboxView } from './views/InboxView';
import { LeadsView } from './views/LeadsView';
import { AnalyticsView } from './views/AnalyticsView';
import { AutomationsView } from './views/AutomationsView';
import { PaymentsView } from './views/PaymentsView';
import { SettingsView } from './views/SettingsView';
import { AISubpanel } from './views/AISubpanel';
import { AuthView } from './views/AuthView';
import { useAuthStore } from './store/authStore';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from './lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { UserProfile } from './types';
import { Menu, LogOut } from 'lucide-react';
import { Toaster, toast } from 'sonner';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user, setUser, organization, setOrganization, loading, setLoading } = useAuthStore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (fbUser) => {
      if (fbUser) {
        // Try to fetch profile
        const userDoc = await getDoc(doc(db, 'users', fbUser.uid));
        if (userDoc.exists()) {
          const profile = userDoc.data() as UserProfile;
          setUser(profile);
          
          // Fetch org
          const orgDoc = await getDoc(doc(db, 'organizations', profile.organizationId));
          if (orgDoc.exists()) {
            setOrganization({ id: orgDoc.id, ...orgDoc.data() } as any);
          }
        } else {
          // New user logic or mock session
          console.log("No profile found - Simulation Mode active");
          setUser({
             uid: fbUser.uid,
             email: fbUser.email || '',
             displayName: fbUser.displayName || 'Demo User',
             role: 'admin',
             organizationId: 'demo-org'
          });
          setOrganization({
            id: 'demo-org',
            name: 'Kash Flow Wholesale',
            industry: 'E-commerce',
            subscriptionPlan: 'pro',
            createdAt: new Date().toISOString()
          });
        }
      } else {
        setUser(null);
        setOrganization(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      toast.success("Successfully signed out");
    } catch (error) {
      toast.error("Failed to sign out");
    }
  };

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-slate-50 text-slate-500 animate-pulse">
        Initializing LeadFlow OS...
      </div>
    );
  }

  if (!user) {
    return <AuthView />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <DashboardView />;
      case 'inbox': return <InboxView />;
      case 'leads': return <LeadsView />;
      case 'ai-panel': return <AISubpanel />;
      case 'automations': return <AutomationsView />;
      case 'payments': return <PaymentsView />;
      case 'analytics': return <AnalyticsView />;
      case 'settings': return <SettingsView />;
      default: return <DashboardView />;
    }
  };

  return (
    <div className="flex h-screen bg-[#F3F4F6] overflow-hidden font-sans text-[#111827]">
      <Toaster position="top-right" richColors />
      <Sidebar 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
      />
      <main className="flex-1 flex flex-col min-w-0">
        <header className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-4 lg:px-6 shrink-0 shadow-sm relative z-30">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 -ml-2 text-gray-500 hover:text-gray-900"
            >
              <Menu size={20} />
            </button>
            <span className="text-sm font-black text-gray-900 capitalize tracking-tight whitespace-nowrap">{activeTab.replace('-', ' ')}</span>
            <div className="hidden sm:block h-4 w-px bg-gray-200" />
            <span className="hidden sm:block text-[11px] text-gray-400 font-bold uppercase tracking-wider truncate max-w-[150px]">{organization?.name}</span>
          </div>
          <div className="flex items-center gap-3 lg:gap-4">
            <div className="hidden xs:flex flex-col items-end">
              <span className="text-xs font-bold text-gray-900 truncate max-w-[100px]">{user.displayName}</span>
              <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{user.role}</span>
            </div>
            <button 
              onClick={handleLogout}
              className="w-8 h-8 lg:w-9 lg:h-9 rounded-full bg-green-50 text-green-700 flex items-center justify-center font-black text-xs border border-green-100 shrink-0 hover:bg-red-50 hover:text-red-600 hover:border-red-100 transition-all group"
            >
              <span className="group-hover:hidden">{user.displayName.charAt(0)}</span>
              <LogOut size={14} className="hidden group-hover:block" />
            </button>
          </div>
        </header>
        <div className="flex-1 overflow-auto bg-[#F3F4F6]">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}
