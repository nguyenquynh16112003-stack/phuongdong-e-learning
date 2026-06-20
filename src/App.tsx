import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AppLayout } from '@/components/layout/AppLayout'
import { LoginPage } from '@/features/auth/LoginPage'
import { ChangePasswordPage } from '@/features/auth/ChangePasswordPage'
import { DashboardPage } from '@/features/dashboard/DashboardPage'
import { CoursesPage } from '@/features/courses/CoursesPage'
import { CourseDetailPage } from '@/features/courses/CourseDetailPage'
import { LessonPage } from '@/features/lessons/LessonPage'
import { TestPage } from '@/features/tests/TestPage'
import { ProgressPage } from '@/features/progress/ProgressPage'
import { LeaderboardPage } from '@/features/leaderboard/LeaderboardPage'
import { CertificatesPage } from '@/features/certificates/CertificatesPage'
import { NotificationsPage } from '@/features/notifications/NotificationsPage'
import { ProfilePage } from '@/features/profile/ProfilePage'
import { AdminCoursesPage } from '@/features/admin/AdminCoursesPage'
import { AdminTestsPage } from '@/features/admin/AdminTestsPage'
import { AdminUsersPage } from '@/features/admin/AdminUsersPage'
import { AdminReportsPage } from '@/features/admin/AdminReportsPage'
import { AdminLogsPage } from '@/features/admin/AdminLogsPage'

function App() {
  // Initialize theme from store or system preference
  const initTheme = () => {
    const isDark = document.documentElement.classList.contains('dark') || 
      (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
    if (isDark) {
      document.documentElement.classList.add('dark');
    }
  }
  initTheme();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/change-password" element={<ChangePasswordPage />} />
        
        <Route element={<AppLayout />}>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/courses/:courseId" element={<CourseDetailPage />} />
          <Route path="/courses/:courseId/lessons/:lessonId" element={<LessonPage />} />
          <Route path="/courses/:courseId/lessons/:lessonId/test" element={<TestPage />} />
          
          <Route path="/progress" element={<ProgressPage />} />
          <Route path="/leaderboard" element={<LeaderboardPage />} />
          <Route path="/certificates" element={<CertificatesPage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/profile" element={<ProfilePage />} />

          {/* Admin Routes */}
          <Route path="/admin/courses" element={<AdminCoursesPage />} />
          <Route path="/admin/tests" element={<AdminTestsPage />} />
          <Route path="/admin/users" element={<AdminUsersPage />} />
          <Route path="/admin/reports" element={<AdminReportsPage />} />
          <Route path="/admin/logs" element={<AdminLogsPage />} />
        </Route>
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
