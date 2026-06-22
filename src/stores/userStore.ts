import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { User } from '@/types'
import { USERS } from '@/data/mockData'

interface UserManagementState {
  users: User[]
  isLoading: boolean
  createUser: (user: Omit<User, 'id' | 'createdAt' | 'updatedAt' | 'lastLoginAt' | 'lastLoginIp' | 'xpPoints' | 'streakDays'>) => User
  updateUser: (id: string, updates: Partial<User>) => void
  deleteUser: (id: string) => void
  lockUser: (id: string) => void
  unlockUser: (id: string) => void
  toggleUserStatus: (id: string) => void
  resetPassword: (id: string, newPassword: string) => void
  getUserById: (id: string) => User | undefined
  searchUsers: (query: string) => User[]
}

export const useUserStore = create<UserManagementState>()(
  persist(
    (set, get) => ({
      users: USERS,
      isLoading: false,

      createUser: (userData) => {
        const newUser: User = {
          ...userData,
          id: `user-${Date.now()}`,
          xpPoints: 0,
          streakDays: 0,
          lastLoginAt: '',
          lastLoginIp: '',
          mustChangePassword: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }
        set(s => ({ users: [...s.users, newUser] }))
        return newUser
      },

      updateUser: (id, updates) =>
        set(s => ({ users: s.users.map(u => u.id === id ? { ...u, ...updates, updatedAt: new Date().toISOString() } : u) })),

      deleteUser: (id) =>
        set(s => ({ users: s.users.filter(u => u.id !== id) })),

      lockUser: (id) =>
        set(s => ({ users: s.users.map(u => u.id === id ? { ...u, isActive: false } : u) })),

      unlockUser: (id) =>
        set(s => ({ users: s.users.map(u => u.id === id ? { ...u, isActive: true } : u) })),

      toggleUserStatus: (id) =>
        set(s => ({ users: s.users.map(u => u.id === id ? { ...u, isActive: !u.isActive } : u) })),

      resetPassword: (_id, _newPassword) => {
        // In real app, call Supabase Auth API
      },

      getUserById: (id) => get().users.find(u => u.id === id),

      searchUsers: (query) => {
        const q = query.toLowerCase()
        return get().users.filter(u =>
          u.fullName.toLowerCase().includes(q) ||
          u.cccd.includes(q) ||
          u.email.toLowerCase().includes(q)
        )
      },
    }),
    { name: 'phuong-dong-users' }
  )
)
