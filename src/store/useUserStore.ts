import { create } from 'zustand'
import { persist } from 'zustand/middleware';

interface IUser {
  sessionId: string
  accountId: string
  username: string
  isAuthenticated: boolean
  accentColor: string
  setAccentColor: (prarm: string) => void
  resetState: () => void
}

const useUserStore = create(
  persist<IUser>(
    (set) => ({
      accentColor: '#0177d2', // default color
      sessionId: '',
      accountId: '',
      isAuthenticated: false,
      username: '',
      setAccentColor: (color: string) => set({accentColor: color}),
      resetState: () => set({ sessionId: '', accountId: '', isAuthenticated: false })
    }),
    {
      name: 'auth-storage',
      getStorage: () => localStorage
    }
  )
)

export default useUserStore