import * as React from 'react'
import { NavLink } from 'react-router-dom'
import { Home, BookOpen, BarChart2, Award, FileText, Bell, Users, Settings, Activity, FileSpreadsheet } from 'lucide-react'
import { useAuthStore } from '@/stores/authStore'
import { useThemeStore } from '@/stores/themeStore'
import { cn } from '@/lib/utils'

interface SidebarProps {
  className?: string
  isOpen?: boolean
}

export function Sidebar({ className, isOpen = true }: SidebarProps) {
  const { user, logout } = useAuthStore()
  const { theme, toggleTheme } = useThemeStore()

  if (!user) return null

  const isAdmin = user.roleLevel <= 2 // Super Admin & Giám đốc

  const mainLinks = [
    { to: '/dashboard', icon: Home, label: 'Trang chủ' },
    { to: '/courses', icon: BookOpen, label: 'Khóa học' },
    { to: '/progress', icon: BarChart2, label: 'Tiến độ' },
    { to: '/leaderboard', icon: Award, label: 'Xếp hạng' },
    { to: '/certificates', icon: FileText, label: 'Chứng nhận' },
    { to: '/notifications', icon: Bell, label: 'Thông báo' },
  ]

  const adminLinks = [
    { to: '/admin/courses', icon: BookOpen, label: 'QL Khóa học' },
    { to: '/admin/tests', icon: FileText, label: 'QL Bài test' },
    { to: '/admin/users', icon: Users, label: 'QL Người dùng' },
    { to: '/admin/reports', icon: FileSpreadsheet, label: 'Báo cáo' },
    { to: '/admin/logs', icon: Activity, label: 'Nhật ký' },
  ]

  return (
    <aside className={cn('flex flex-col h-screen border-r bg-card shadow-sidebar transition-all duration-300', isOpen ? 'w-64' : 'w-20', className)}>
      <div className="flex items-center h-16 px-4 border-b shrink-0">
        <div className="flex items-center gap-2 overflow-hidden">
          <div className="w-8 h-8 rounded bg-primary-500 flex items-center justify-center shrink-0">
            <span className="text-white font-bold text-xl leading-none">P</span>
          </div>
          {isOpen && <span className="font-heading font-bold text-lg whitespace-nowrap gradient-text">P.Đông LMS</span>}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto py-4 flex flex-col gap-6">
        <div className="px-3">
          <div className={cn('mb-2 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider', !isOpen && 'sr-only')}>Học tập</div>
          <nav className="flex flex-col gap-1">
            {mainLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                    isActive ? 'bg-primary-50 text-primary-600 dark:bg-primary-900/20 dark:text-primary-400' : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                    !isOpen && 'justify-center px-0'
                  )
                }
                title={!isOpen ? link.label : undefined}
              >
                <link.icon className="h-5 w-5 shrink-0" />
                {isOpen && <span>{link.label}</span>}
              </NavLink>
            ))}
          </nav>
        </div>

        {isAdmin && (
          <div className="px-3">
            <div className={cn('mb-2 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider', !isOpen && 'sr-only')}>Quản trị</div>
            <nav className="flex flex-col gap-1">
              {adminLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                      isActive ? 'bg-tertiary-50 text-tertiary-600 dark:bg-tertiary-900/20 dark:text-tertiary-400' : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                      !isOpen && 'justify-center px-0'
                    )
                  }
                  title={!isOpen ? link.label : undefined}
                >
                  <link.icon className="h-5 w-5 shrink-0" />
                  {isOpen && <span>{link.label}</span>}
                </NavLink>
              ))}
            </nav>
          </div>
        )}
      </div>

      <div className="p-4 border-t shrink-0 flex flex-col gap-2">
        <button
          onClick={toggleTheme}
          className={cn('flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors', !isOpen && 'justify-center px-0')}
          title={!isOpen ? 'Đổi giao diện' : undefined}
        >
          <Settings className="h-5 w-5 shrink-0" />
          {isOpen && <span>Đổi giao diện ({theme === 'dark' ? 'Sáng' : 'Tối'})</span>}
        </button>

        <div className={cn('flex items-center gap-3 mt-2', !isOpen && 'justify-center')}>
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center shrink-0">
            <span className="text-white font-semibold text-sm">{user.fullName.charAt(0)}</span>
          </div>
          {isOpen && (
            <div className="flex-1 overflow-hidden">
              <div className="text-sm font-semibold truncate">{user.fullName}</div>
              <div className="text-xs text-muted-foreground truncate">{user.roleName}</div>
            </div>
          )}
        </div>
      </div>
    </aside>
  )
}
