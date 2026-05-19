import { create } from 'zustand';
import { UserProfile, Organization } from '../types';

interface AuthState {
  user: UserProfile | null;
  organization: Organization | null;
  loading: boolean;
  setUser: (user: UserProfile | null) => void;
  setOrganization: (org: Organization | null) => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  organization: null,
  loading: true,
  setUser: (user) => set({ user }),
  setOrganization: (organization) => set({ organization }),
  setLoading: (loading) => set({ loading }),
}));
