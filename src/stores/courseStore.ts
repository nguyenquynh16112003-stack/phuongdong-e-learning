import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Course, Chapter, Lesson, Test } from '@/types'
import { COURSES, CHAPTERS, LESSONS, TESTS } from '@/data/mockData'

interface CourseState {
  courses: Course[]
  chapters: Chapter[]
  lessons: Lesson[]
  tests: Test[]
  currentCourse: Course | null
  currentLesson: Lesson | null
  currentTest: Test | null
  isLoading: boolean

  fetchCourses: () => void
  fetchCourseById: (id: string) => Course | undefined
  fetchLessonById: (id: string) => Lesson | undefined
  fetchTestByLessonId: (lessonId: string) => Test | undefined
  getChaptersByCourse: (courseId: string) => Chapter[]
  getLessonsByChapter: (chapterId: string) => Lesson[]
  setCurrentCourse: (course: Course | null) => void
  setCurrentLesson: (lesson: Lesson | null) => void
  setCurrentTest: (test: Test | null) => void

  // Admin CRUD
  createCourse: (course: Omit<Course, 'id' | 'createdAt' | 'updatedAt' | 'chaptersCount' | 'lessonsCount' | 'totalDurationSeconds'>) => Course
  updateCourse: (id: string, updates: Partial<Course>) => void
  deleteCourse: (id: string) => void
  createChapter: (chapter: Omit<Chapter, 'id'>) => Chapter
  updateChapter: (id: string, updates: Partial<Chapter>) => void
  deleteChapter: (id: string) => void
  createLesson: (lesson: Omit<Lesson, 'id' | 'createdAt' | 'updatedAt'>) => Lesson
  updateLesson: (id: string, updates: Partial<Lesson>) => void
  deleteLesson: (id: string) => void
  createTest: (test: Omit<Test, 'id' | 'createdAt' | 'updatedAt'>) => Test
  updateTest: (id: string, updates: Partial<Test>) => void
  deleteTest: (id: string) => void
  togglePublishCourse: (id: string) => void
}

export const useCourseStore = create<CourseState>()(
  persist(
    (set, get) => ({
      courses: COURSES,
      chapters: CHAPTERS,
      lessons: LESSONS,
      tests: TESTS,
      currentCourse: null,
      currentLesson: null,
      currentTest: null,
      isLoading: false,

      fetchCourses: () => set({ courses: COURSES }),

      fetchCourseById: (id) => get().courses.find(c => c.id === id),

      fetchLessonById: (id) => get().lessons.find(l => l.id === id),

      fetchTestByLessonId: (lessonId) => get().tests.find(t => t.lessonId === lessonId),

      getChaptersByCourse: (courseId) =>
        get().chapters.filter(c => c.courseId === courseId).sort((a, b) => a.orderIndex - b.orderIndex),

      getLessonsByChapter: (chapterId) =>
        get().lessons.filter(l => l.chapterId === chapterId).sort((a, b) => a.orderIndex - b.orderIndex),

      setCurrentCourse: (course) => set({ currentCourse: course }),
      setCurrentLesson: (lesson) => set({ currentLesson: lesson }),
      setCurrentTest: (test) => set({ currentTest: test }),

      createCourse: (course) => {
        const newCourse: Course = {
          ...course, id: `course-${Date.now()}`,
          chaptersCount: 0, lessonsCount: 0, totalDurationSeconds: 0,
          createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
        }
        set(s => ({ courses: [...s.courses, newCourse] }))
        return newCourse
      },

      updateCourse: (id, updates) =>
        set(s => ({ courses: s.courses.map(c => c.id === id ? { ...c, ...updates, updatedAt: new Date().toISOString() } : c) })),

      deleteCourse: (id) =>
        set(s => ({ courses: s.courses.filter(c => c.id !== id) })),

      createChapter: (chapter) => {
        const newChapter: Chapter = { ...chapter, id: `chap-${Date.now()}` }
        set(s => ({ chapters: [...s.chapters, newChapter] }))
        return newChapter
      },

      updateChapter: (id, updates) =>
        set(s => ({ chapters: s.chapters.map(c => c.id === id ? { ...c, ...updates } : c) })),

      deleteChapter: (id) =>
        set(s => ({ chapters: s.chapters.filter(c => c.id !== id) })),

      createLesson: (lesson) => {
        const newLesson: Lesson = { ...lesson, id: `lesson-${Date.now()}`, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }
        set(s => ({ lessons: [...s.lessons, newLesson] }))
        return newLesson
      },

      updateLesson: (id, updates) =>
        set(s => ({ lessons: s.lessons.map(l => l.id === id ? { ...l, ...updates, updatedAt: new Date().toISOString() } : l) })),

      deleteLesson: (id) =>
        set(s => ({ lessons: s.lessons.filter(l => l.id !== id) })),

      createTest: (test) => {
        const newTest: Test = { ...test, id: `test-${Date.now()}`, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }
        set(s => ({ tests: [...s.tests, newTest] }))
        return newTest
      },

      updateTest: (id, updates) =>
        set(s => ({ tests: s.tests.map(t => t.id === id ? { ...t, ...updates, updatedAt: new Date().toISOString() } : t) })),

      deleteTest: (id) =>
        set(s => ({ tests: s.tests.filter(t => t.id !== id) })),

      togglePublishCourse: (id) =>
        set(s => ({ courses: s.courses.map(c => c.id === id ? { ...c, isPublished: !c.isPublished, updatedAt: new Date().toISOString() } : c) })),
    }),
    {
      name: 'phuong-dong-courses',
      partialize: (state) => ({
        courses: state.courses,
        chapters: state.chapters,
        lessons: state.lessons,
        tests: state.tests,
      })
    }
  )
)
