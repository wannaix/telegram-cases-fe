import { create } from "zustand";
import type { User } from "../types";
interface UserState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  updateBalance: (newBalance: number) => void;
}
export const useUserStore = create<UserState>((set) => ({
  user: null,
  isLoading: false,
  error: null,
  setUser: (user) => set({ user }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  updateBalance: (balance) =>
    set((state) => (state.user ? { user: { ...state.user, balance } } : {})),
}));
