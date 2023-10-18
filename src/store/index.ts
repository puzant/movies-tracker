import { create } from 'zustand'
import { persist } from 'zustand/middleware';

const useStore = create(
  persist(
    (set) => ({
      sessionId: '',
      accountId: '',
      isAuthenticated: false,
      resetState: () => set({ sessionId: '', accountId: '', isAuthenticated: false })
    }),
    {
      name: 'auth-storage',
      getStorage: () => localStorage
    }
  )
)

export default useStore