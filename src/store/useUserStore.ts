import { create } from 'zustand'
import { persist } from 'zustand/middleware';

interface IMovieStore {
  sessionId: string
  accountId: string
  isAuthenticated: boolean
  resetState: () => void
}

const useUserStore = create(
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

export default useUserStore