// Core entity types for Phuong Dong E-Learning LMS

// ===================== USERS & AUTH =====================
export type RoleSlug = 'super_admin' | 'giam_doc' | 'truong_khu_vuc' | 'chuyen_vien'

export interface Role {
  id: string
  name: string
  slug: RoleSlug
  level: number // 1=super_admin, 2=giam_doc, 3=truong_khu_vuc, 4=chuyen_vien
}

export interface Region {
  id: string
  name: string
  code: string
  isActive: boolean
}

export interface Department {
  id: string
  name: string
  regionId: string
  regionName: string
  isActive: boolean
}

export interface User {
  id: string
  fullName: string
  cccd: string // Căn cước công dân - used as username
  email: string
  phone: string
  avatarUrl: string
  roleId: string
  roleName: string
  roleSlug: RoleSlug
  roleLevel: number
  regionId: string
  regionName: string
  departmentId: string
  departmentName: string
  department: string // Added for UI compatibility
  branch: string // Added for UI compatibility
  managerId?: string
  managerName?: string
  isActive: boolean
  mustChangePassword: boolean
  xpPoints: number
  streakDays: number
  lastLoginAt: string
  lastLoginIp: string
  currentSessionId?: string
  createdAt: string
  updatedAt: string
}

// ===================== COURSES =====================
export interface Course {
  id: string
  title: string
  description: string
  thumbnailUrl: string
  orderIndex: number
  isPublished: boolean
  category: string // Added
  pointsReward: number // Added
  createdBy: string
  createdByName: string
  createdAt: string
  updatedAt: string
  chaptersCount: number
  lessonsCount: number
  totalDurationSeconds: number
  chapters?: Chapter[]
}

export interface Chapter {
  id: string
  courseId: string
  title: string
  description: string
  orderIndex: number
  lessons?: Lesson[]
}

export interface Lesson {
  id: string
  chapterId: string
  chapterTitle: string
  courseId: string
  title: string
  description: string
  content: string // Added
  type: 'video' | 'document' | 'quiz' // Added
  videoUrl: string // Added
  youtubeUrl: string
  youtubeVideoId: string
  thumbnailUrl: string
  instructorName: string
  durationSeconds: number
  orderIndex: number
  isPublished: boolean
  createdAt: string
  updatedAt: string
  documents?: LessonDocument[]
}

export interface LessonDocument {
  id: string
  lessonId: string
  title: string
  type: 'pdf' | 'slide' | 'document' | 'checklist' | 'link'
  url: string
  orderIndex: number
}

// ===================== TESTS =====================
export interface Test {
  id: string
  courseId: string // Added
  lessonId: string
  lessonTitle: string
  title: string
  description: string
  passingScore: number // percentage 0-100
  timeLimitMinutes: number
  durationMinutes: number
  questionsCount: number
  maxAttempts: number
  isActive: boolean
  orderIndex: number
  createdAt: string
  updatedAt: string
  questions?: Question[]
}

export interface Question {
  id: string
  testId: string
  content: string
  explanation: string
  orderIndex: number
  answers: Answer[]
}

export interface Answer {
  id: string
  questionId: string
  label: 'A' | 'B' | 'C' | 'D'
  content: string
  isCorrect: boolean
  orderIndex: number
}

export interface TestResult {
  id: string
  userId: string
  userName: string
  testId: string
  testTitle: string
  score: number // percentage 0-100
  correctCount: number
  totalQuestions: number
  isPassed: boolean
  timeSpentSeconds: number
  answersDetail: Record<string, string> // questionId -> answerId
  answers: Record<string, string> // Added
  attemptNumber: number
  completedAt: string
}

// ===================== LEARNING PROGRESS =====================
export interface LearningProgress {
  id: string
  userId: string
  lessonId: string
  watchPercentage: number // 0-100
  isCompleted: boolean
  completedAt?: string
  lastWatchedAt: string
  totalWatchTimeSeconds: number
  replayCount: number
}

export type LessonStatus = 'completed' | 'in_progress' | 'failed_test' | 'locked' | 'available'

export interface LessonWithStatus extends Lesson {
  status: LessonStatus
  progress?: LearningProgress
  testResult?: TestResult
}

// ===================== CERTIFICATES =====================
export interface Certificate {
  id: string
  userId: string
  userName: string
  courseId: string
  courseTitle: string
  certificateNumber: string
  qrCodeData: string
  digitalSignature: string
  issuedAt: string
}

// ===================== GAMIFICATION =====================
export type BadgeConditionType =
  | 'first_lesson'
  | 'lessons_completed'
  | 'tests_passed'
  | 'streak_days'
  | 'courses_completed'
  | 'perfect_score'
  | 'fast_learner'
  | 'top_learner'
  | 'all_badges'

export interface Badge {
  id: string
  name: string
  description: string
  icon: string // emoji or icon name
  color: string
  conditionType: BadgeConditionType
  conditionValue: number
}

export interface UserBadge {
  id: string
  userId: string
  badgeId: string
  badge: Badge
  earnedAt: string
}

export interface RankingEntry {
  userId: string
  userName: string
  avatarUrl: string
  regionName: string
  departmentName: string
  xpPoints: number
  lessonsCompleted: number
  testsPassed: number
  avgScore: number
  streakDays: number
  rank: number
}

// ===================== NOTIFICATIONS =====================
export type NotificationType = 'info' | 'warning' | 'success' | 'reminder'
export type NotificationTargetType = 'all' | 'region' | 'department' | 'manager' | 'individual'

export interface Notification {
  id: string
  senderId: string
  senderName: string
  recipientId?: string
  title: string
  content: string
  linkUrl?: string // Added
  type: NotificationType
  targetType: NotificationTargetType
  targetId?: string
  isRead: boolean
  createdAt: string
}

// ===================== ACTIVITY LOGS =====================
export type ActivityAction =
  | 'login'
  | 'logout'
  | 'watch_video'
  | 'complete_lesson'
  | 'submit_test'
  | 'pass_test'
  | 'fail_test'
  | 'earn_certificate'
  | 'earn_badge'
  | 'create_user'
  | 'update_user'
  | 'delete_user'
  | 'create_course'
  | 'send_notification'

export interface ActivityLog {
  id: string
  userId: string
  userName: string
  action: ActivityAction
  description: string
  ipAddress: string
  userAgent: string
  metadata: Record<string, unknown>
  createdAt: string
}

// ===================== DASHBOARD STATS =====================
export interface UserDashboardStats {
  overallProgress: number // percentage
  currentCourse?: Course
  activeLessonsCount: number
  completedLessonsCount: number
  totalLessonsCount: number
  avgScore: number
  streakDays: number
  xpPoints: number
  badgesCount: number
  certificatesCount: number
  rank?: number
  totalUsers?: number
}

export interface AdminDashboardStats {
  totalUsers: number
  totalCourses: number
  totalLessons: number
  totalTests: number
  totalViews: number
  totalTestAttempts: number
  completionRate: number
  avgScore: number
  activeUsers: number
  completedUsers: number
  notStartedUsers: number
}

export interface ChartDataPoint {
  date: string
  value: number
  label?: string
}

export interface RegionStats {
  regionName: string
  completionRate: number
  avgScore: number
  activeUsers: number
  totalUsers: number
}

// ===================== FORMS =====================
export interface LoginForm {
  cccd: string
  password: string
}

export interface CreateUserForm {
  fullName: string
  cccd: string
  password: string
  regionId: string
  departmentId: string
  roleId: string
  managerId?: string
  email?: string
  phone?: string
}

export interface CourseForm {
  title: string
  description: string
  thumbnailUrl: string
  isPublished: boolean
}

export interface ChapterForm {
  title: string
  description: string
  orderIndex: number
}

export interface LessonForm {
  title: string
  description: string
  youtubeUrl: string
  instructorName: string
  isPublished: boolean
}

export interface TestForm {
  title: string
  description: string
  passingScore: number
  timeLimitMinutes: number
  maxAttempts: number
  isActive: boolean
}

export interface QuestionForm {
  content: string
  explanation: string
  answerA: string
  answerB: string
  answerC: string
  answerD: string
  correctAnswer: 'A' | 'B' | 'C' | 'D'
}
