import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Badge, UserBadge, BadgeConditionType } from '@/types'
import { useUserStore } from '@/stores/userStore'
import { useAuthStore } from '@/stores/authStore'

const DEFAULT_BADGES: Badge[] = [
  {
    id: 'badge-1',
    name: 'Khởi đầu nan',
    description: 'Hoàn thành bài học đầu tiên',
    icon: '🚀',
    color: 'bg-blue-500',
    conditionType: 'first_lesson',
    conditionValue: 1,
  },
  {
    id: 'badge-2',
    name: 'Học bá',
    description: 'Đạt điểm tuyệt đối 100% trong bài kiểm tra',
    icon: '🏆',
    color: 'bg-yellow-500',
    conditionType: 'perfect_score',
    conditionValue: 1,
  },
  {
    id: 'badge-3',
    name: 'Chuyên cần',
    description: 'Chuỗi 7 ngày học tập liên tiếp',
    icon: '🔥',
    color: 'bg-orange-500',
    conditionType: 'streak_days',
    conditionValue: 7,
  }
]

interface GamificationState {
  badges: Badge[]
  userBadges: UserBadge[]
  
  getUserBadges: (userId: string) => UserBadge[]
  checkAndAwardBadges: (userId: string, actionType: BadgeConditionType, value?: number) => void
  addXP: (userId: string, amount: number) => void
}

export const useGamificationStore = create<GamificationState>()(
  persist(
    (set, get) => ({
      badges: DEFAULT_BADGES,
      userBadges: [],

      getUserBadges: (userId) => {
        return get().userBadges.filter(ub => ub.userId === userId)
      },

      checkAndAwardBadges: (userId, actionType, value) => {
        const { badges, userBadges } = get()
        const userEarnedBadgeIds = userBadges.filter(ub => ub.userId === userId).map(ub => ub.badgeId)
        
        // Find badges matching the condition that the user doesn't have yet
        const eligibleBadges = badges.filter(b => 
          b.conditionType === actionType && 
          !userEarnedBadgeIds.includes(b.id) &&
          (value === undefined || value >= b.conditionValue)
        )

        if (eligibleBadges.length > 0) {
          const newEarned: UserBadge[] = eligibleBadges.map(badge => ({
            id: `ub-${Date.now()}-${badge.id}`,
            userId,
            badgeId: badge.id,
            badge,
            earnedAt: new Date().toISOString()
          }))

          set(s => ({ userBadges: [...s.userBadges, ...newEarned] }))
          
          // Show some notification in a real app
          console.log(`User ${userId} earned badges:`, eligibleBadges.map(b => b.name))
        }
      },

      addXP: (userId, amount) => {
        if (amount <= 0) return
        
        // We update the userStore
        const userStore = useUserStore.getState()
        const targetUser = userStore.users.find(u => u.id === userId)
        
        if (targetUser) {
          userStore.updateUser(userId, { xpPoints: (targetUser.xpPoints || 0) + amount })
          
          // Update authStore if it's the current user
          const authStore = useAuthStore.getState()
          if (authStore.user?.id === userId) {
            authStore.updateUser({ xpPoints: (authStore.user.xpPoints || 0) + amount })
          }
        }
      }
    }),
    {
      name: 'phuong-dong-gamification'
    }
  )
)
