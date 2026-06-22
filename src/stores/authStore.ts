import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { User } from '@/types'
import { DEMO_PASSWORDS } from '@/data/mockData'
import { useUserStore } from '@/stores/userStore'

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
  login: (cccd: string, password: string) => Promise<{ success: boolean; mustChangePassword?: boolean }>
  logout: () => void
  changePassword: (currentPassword: string, newPassword: string) => Promise<boolean>
  updateUser: (updates: Partial<User>) => void
  clearError: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (cccd: string, password: string) => {
        set({ isLoading: true, error: null })
        // Simulate API call
        await new Promise(r => setTimeout(r, 800))

        const dynamicUsers = useUserStore.getState().users
        const user = dynamicUsers.find(u => u.cccd === cccd)
        const correctPassword = DEMO_PASSWORDS[cccd] || '123456'

        if (!user) {
          set({ isLoading: false, error: 'Tài khoản của bạn chưa được cấp quyền truy cập hoặc đã bị khóa. Vui lòng liên hệ Trợ lý hoặc Giám đốc để được hỗ trợ.' })
          return { success: false }
        }

        if (!user.isActive) {
          set({ isLoading: false, error: 'Tài khoản của bạn đã bị khóa. Vui lòng liên hệ Trợ lý hoặc Giám đốc để được hỗ trợ.' })
          return { success: false }
        }

        if (password !== correctPassword) {
          set({ isLoading: false, error: 'Mật khẩu không chính xác. Vui lòng kiểm tra lại.' })
          return { success: false }
        }

        const updatedUser = { ...user, lastLoginAt: new Date().toISOString() }
        set({ user: updatedUser, isAuthenticated: true, isLoading: false, error: null })
        // Update login timestamp in userStore as well
        useUserStore.getState().updateUser(user.id, { lastLoginAt: updatedUser.lastLoginAt })
        return { success: true, mustChangePassword: user.mustChangePassword }
      },

      logout: () => {
        set({ user: null, isAuthenticated: false, error: null })
      },

      changePassword: async (_currentPassword: string, _newPassword: string) => {
        await new Promise(r => setTimeout(r, 500))
        const { user } = get()
        if (user) {
          set({ user: { ...user, mustChangePassword: false } })
          DEMO_PASSWORDS[user.cccd] = _newPassword
          // Sync to userStore
          useUserStore.getState().updateUser(user.id, { mustChangePassword: false })
        }
        return true
      },

      updateUser: (updates: Partial<User>) => {
        const { user } = get()
        if (user) {
          const updatedUser = { ...user, ...updates }
          set({ user: updatedUser })
          // Sync to userStore
          useUserStore.getState().updateUser(user.id, updates)
        }
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: 'phuong-dong-auth',
      partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }),
    }
  )
)
