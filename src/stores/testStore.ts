import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { TestResult } from '@/types'
import { TEST_RESULTS } from '@/data/mockData'

interface TestState {
  testResults: TestResult[]
  submitTest: (result: Omit<TestResult, 'id'>) => TestResult
  getResultsForTest: (testId: string, userId: string) => TestResult[]
  getLatestResult: (testId: string, userId: string) => TestResult | undefined
  hasPassedTest: (lessonId: string, userId: string, testMap: Record<string, string>) => boolean
  getAttemptsLeft: (testId: string, userId: string, maxAttempts: number) => number
  getUserStats: (userId: string) => { avgScore: number; totalTests: number; passedTests: number }
}

export const useTestStore = create<TestState>()(
  persist(
    (set, get) => ({
      testResults: TEST_RESULTS,

      submitTest: (result) => {
        const newResult: TestResult = { ...result, id: `tr-${Date.now()}` }
        set(s => ({ testResults: [...s.testResults, newResult] }))
        return newResult
      },

      getResultsForTest: (testId, userId) =>
        get().testResults.filter(r => r.testId === testId && r.userId === userId).sort((a, b) =>
          new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime()
        ),

      getLatestResult: (testId, userId) =>
        get().getResultsForTest(testId, userId)[0],

      hasPassedTest: (lessonId, userId, testMap) => {
        const testId = testMap[lessonId]
        if (!testId) return true // no test for this lesson
        const results = get().getResultsForTest(testId, userId)
        return results.some(r => r.isPassed)
      },

      getAttemptsLeft: (testId, userId, maxAttempts) => {
        const attempts = get().testResults.filter(r => r.testId === testId && r.userId === userId).length
        return Math.max(0, maxAttempts - attempts)
      },

      getUserStats: (userId) => {
        const results = get().testResults.filter(r => r.userId === userId)
        const avgScore = results.length > 0 ? Math.round(results.reduce((sum, r) => sum + r.score, 0) / results.length) : 0
        const passedTests = results.filter(r => r.isPassed).length
        return { avgScore, totalTests: results.length, passedTests }
      },
    }),
    { name: 'phuong-dong-tests' }
  )
)
