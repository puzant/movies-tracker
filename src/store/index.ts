import { create } from 'zustand'
import { persist } from 'zustand/middleware';

const useStore = create(
  persist(
    (set) => ({
      isAuthenticated: false,
      setAuthenticated: () => set((state) => ({ isAuthenticated: !state.isAuthenticated })),
    }),
    {
      name: 'auth-storage',
      getStorage: () => localStorage
    }
  )
)

export default useStore