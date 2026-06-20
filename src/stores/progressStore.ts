import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { LearningProgress, LessonStatus, LessonWithStatus } from '@/types'
import { LEARNING_PROGRESS } from '@/data/mockData'

interface ProgressState {
  progress: Record<string, LearningProgress> // key: `${userId}-${lessonId}`
  isLoading: boolean

  loadProgress: (userId: string) => void
  updateWatchProgress: (userId: string, lessonId: string, watchPercentage: number) => void
  markLessonComplete: (userId: string, lessonId: string) => void
  getLessonProgress: (userId: string, lessonId: string) => LearningProgress | undefined
  getProgressForCourse: (userId: string, lessonIds: string[]) => { completed: number; total: number; percentage: number }
  getOverallProgress: (userId: string, allLessonIds: string[]) => number
  getLessonStatus: (userId: string, lessonId: string, prevLessonId: string | null, prevLessonTestPassed: boolean) => LessonStatus
  getLessonsWithStatus: (userId: string, lessons: import('@/types').Lesson[], testResults: Record<string, boolean>) => LessonWithStatus[]
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      progress: LEARNING_PROGRESS.reduce((acc, p) => {
        acc[`${p.userId}-${p.lessonId}`] = p
        return acc
      }, {} as Record<string, LearningProgress>),
      isLoading: false,

      loadProgress: (userId: string) => {
        // In real app, fetch from Supabase
        const userProgress = LEARNING_PROGRESS.filter(p => p.userId === userId)
        const progressMap = userProgress.reduce((acc, p) => {
          acc[`${p.userId}-${p.lessonId}`] = p
          return acc
        }, {} as Record<string, LearningProgress>)
        set(s => ({ progress: { ...s.progress, ...progressMap } }))
      },

      updateWatchProgress: (userId, lessonId, watchPercentage) => {
        const key = `${userId}-${lessonId}`
        set(s => {
          const existing = s.progress[key]
          const now = new Date().toISOString()
          return {
            progress: {
              ...s.progress,
              [key]: {
                id: existing?.id || `prog-${Date.now()}`,
                userId, lessonId, watchPercentage,
                isCompleted: existing?.isCompleted || watchPercentage >= 95,
                completedAt: watchPercentage >= 95 && !existing?.isCompleted ? now : existing?.completedAt,
                lastWatchedAt: now,
                totalWatchTimeSeconds: (existing?.totalWatchTimeSeconds || 0) + 10,
                replayCount: existing?.replayCount || 0,
              }
            }
          }
        })
      },

      markLessonComplete: (userId, lessonId) => {
        const key = `${userId}-${lessonId}`
        set(s => ({
          progress: {
            ...s.progress,
            [key]: {
              ...s.progress[key],
              isCompleted: true,
              watchPercentage: 100,
              completedAt: new Date().toISOString(),
            }
          }
        }))
      },

      getLessonProgress: (userId, lessonId) => {
        return get().progress[`${userId}-${lessonId}`]
      },

      getProgressForCourse: (userId, lessonIds) => {
        const { progress } = get()
        const completed = lessonIds.filter(id => progress[`${userId}-${id}`]?.isCompleted).length
        return { completed, total: lessonIds.length, percentage: lessonIds.length > 0 ? Math.round((completed / lessonIds.length) * 100) : 0 }
      },

      getOverallProgress: (userId, allLessonIds) => {
        const { progress } = get()
        const completed = allLessonIds.filter(id => progress[`${userId}-${id}`]?.isCompleted).length
        return allLessonIds.length > 0 ? Math.round((completed / allLessonIds.length) * 100) : 0
      },

      getLessonStatus: (userId, lessonId, prevLessonId, prevLessonTestPassed) => {
        const { progress } = get()
        const p = progress[`${userId}-${lessonId}`]

        if (p?.isCompleted) return 'completed'
        if (prevLessonId === null) {
          // First lesson - always available
          if (p?.watchPercentage && p.watchPercentage > 0) return 'in_progress'
          return 'available'
        }
        // Prev lesson must be completed AND test must be passed
        if (!prevLessonTestPassed) return 'locked'
        if (p?.watchPercentage && p.watchPercentage > 0) return 'in_progress'
        return 'available'
      },

      getLessonsWithStatus: (userId, lessons, testResults) => {
        const { progress } = get()
        return lessons.map((lesson, index) => {
          const prevLesson = index > 0 ? lessons[index - 1] : null
          const prevPassed = prevLesson ? (testResults[prevLesson.id] ?? true) : true // if no test, consider passed
          const prevCompleted = prevLesson ? progress[`${userId}-${prevLesson.id}`]?.isCompleted : true

          let status: LessonStatus = 'locked'
          const p = progress[`${userId}-${lesson.id}`]

          if (p?.isCompleted) {
            status = 'completed'
          } else if (index === 0 || (prevCompleted && prevPassed)) {
            if (p && p.watchPercentage > 0) status = 'in_progress'
            else status = 'available'
          } else if (prevCompleted && !prevPassed) {
            status = 'locked' // failed test blocks progression
          }

          return { ...lesson, status, progress: p }
        })
      },
    }),
    {
      name: 'phuong-dong-progress',
    }
  )
)
