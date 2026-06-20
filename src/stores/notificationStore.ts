import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Notification } from '@/types'
import { NOTIFICATIONS } from '@/data/mockData'

interface NotificationState {
  notifications: Notification[]
  unreadCount: number
  markAsRead: (id: string) => void
  markAllAsRead: (userId: string) => void
  addNotification: (notif: Omit<Notification, 'id'>) => void
  getForUser: (userId: string) => Notification[]
}

export const useNotificationStore = create<NotificationState>()(
  persist(
    (set, get) => ({
      notifications: NOTIFICATIONS,
      unreadCount: NOTIFICATIONS.filter(n => !n.isRead).length,

      markAsRead: (id) => set(s => ({
        notifications: s.notifications.map(n => n.id === id ? { ...n, isRead: true } : n),
        unreadCount: Math.max(0, s.unreadCount - 1),
      })),

      markAllAsRead: (userId) => set(s => ({
        notifications: s.notifications.map(n =>
          (n.recipientId === userId || n.targetType === 'all') ? { ...n, isRead: true } : n
        ),
        unreadCount: 0,
      })),

      addNotification: (notif) => {
        const newNotif: Notification = { ...notif, id: `notif-${Date.now()}` }
        set(s => ({
          notifications: [newNotif, ...s.notifications],
          unreadCount: s.unreadCount + 1,
        }))
      },

      getForUser: (userId) =>
        get().notifications.filter(n =>
          n.recipientId === userId || n.targetType === 'all' || n.targetType === 'region'
        ).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()),
    }),
    { name: 'phuong-dong-notifications' }
  )
)
