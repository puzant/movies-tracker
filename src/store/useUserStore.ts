import { create } from 'zustand'
import { persist } from 'zustand/middleware';

interface IUser {
  sessionId: string
  accountId: string
  username: string
  isAuthenticated: boolean
  resetState: () => void
}

const useUserStore = create(
  persist<IUser>(
    (set) => ({
      sessionId: '',
      accountId: '',
      isAuthenticated: false,
      username: '',
      resetState: () => set({ sessionId: '', accountId: '', isAuthenticated: false })
    }),
    {
      name: 'auth-storage',
      getStorage: () => localStorage
    }
  )
)

export default useUserStore