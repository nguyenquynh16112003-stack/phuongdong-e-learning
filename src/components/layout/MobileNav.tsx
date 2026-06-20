import * as React from 'react'
import { NavLink } from 'react-router-dom'
import { Home, BookOpen, BarChart2, Award, User } from 'lucide-react'
import { cn } from '@/lib/utils'

export function MobileNav() {
  const links = [
    { to: '/dashboard', icon: Home, label: 'Trang chủ' },
    { to: '/courses', icon: BookOpen, label: 'Khóa học' },
    { to: '/progress', icon: BarChart2, label: 'Tiến độ' },
    { to: '/leaderboard', icon: Award, label: 'Xếp hạng' },
    { to: '/profile', icon: User, label: 'Tài khoản' },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 h-16 bg-card border-t shadow-[0_-4px_10px_rgba(0,0,0,0.05)] flex items-center justify-around px-2 lg:hidden">
      {links.map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          className={({ isActive }) =>
            cn(
              'flex flex-col items-center justify-center w-full h-full gap-1 transition-colors',
              isActive ? 'text-primary-500' : 'text-muted-foreground'
            )
          }
        >
          {({ isActive }) => (
            <>
              <div className={cn('relative p-1.5 rounded-full transition-all duration-300', isActive && 'bg-primary-50 dark:bg-primary-900/20')}>
                <link.icon className={cn('h-5 w-5', isActive && 'scale-110')} />
              </div>
              <span className={cn('text-[10px] font-medium transition-all duration-300', isActive && 'font-bold')}>{link.label}</span>
            </>
          )}
        </NavLink>
      ))}
    </nav>
  )
}
