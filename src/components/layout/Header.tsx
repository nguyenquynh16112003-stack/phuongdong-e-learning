import * as React from 'react'
import { Menu, Search, Bell, LogOut, User as UserIcon } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { useAuthStore } from '@/stores/authStore'
import { useNotificationStore } from '@/stores/notificationStore'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'

interface HeaderProps {
  onMenuClick: () => void
}

export function Header({ onMenuClick }: HeaderProps) {
  const { user, logout } = useAuthStore()
  const { unreadCount } = useNotificationStore()
  const location = useLocation()

  const getPageTitle = () => {
    const path = location.pathname
    if (path === '/dashboard') return 'Trang chủ'
    if (path.startsWith('/courses')) return 'Khóa học'
    if (path.startsWith('/progress')) return 'Tiến độ học tập'
    if (path.startsWith('/leaderboard')) return 'Bảng xếp hạng'
    if (path.startsWith('/certificates')) return 'Chứng nhận'
    if (path.startsWith('/notifications')) return 'Thông báo'
    if (path.startsWith('/admin/courses')) return 'Quản lý khóa học'
    if (path.startsWith('/admin/tests')) return 'Quản lý bài kiểm tra'
    if (path.startsWith('/admin/users')) return 'Quản lý người dùng'
    if (path.startsWith('/admin/reports')) return 'Báo cáo thống kê'
    if (path.startsWith('/admin/logs')) return 'Nhật ký hệ thống'
    if (path === '/profile') return 'Thông tin cá nhân'
    return 'Phương Đông E-Learning'
  }

  return (
    <header className="h-16 border-b bg-card shadow-header flex items-center justify-between px-4 lg:px-6 z-10">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={onMenuClick} className="lg:hidden">
          <Menu className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-heading font-semibold hidden sm:block">{getPageTitle()}</h1>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        <div className="relative hidden md:block w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Tìm kiếm..." className="pl-9 bg-muted/50 border-none h-9 rounded-full focus-visible:ring-1" />
        </div>

        <Button variant="ghost" size="icon" className="md:hidden">
          <Search className="h-5 w-5" />
        </Button>

        <Link to="/notifications">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <Badge variant="destructive" className="absolute top-1 right-1 px-1 min-w-4 h-4 flex items-center justify-center text-[10px] animate-pulse-ring">
                {unreadCount > 99 ? '99+' : unreadCount}
              </Badge>
            )}
          </Button>
        </Link>

        {user && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-9 w-9 rounded-full hover:bg-transparent">
                <Avatar className="h-9 w-9 border">
                  <AvatarImage src={user.avatarUrl} alt={user.fullName} />
                  <AvatarFallback>{user.fullName.charAt(0)}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{user.fullName}</p>
                  <p className="text-xs leading-none text-muted-foreground">{user.email || user.cccd}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/profile" className="cursor-pointer">
                  <UserIcon className="mr-2 h-4 w-4" />
                  <span>Hồ sơ cá nhân</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logout} className="text-destructive cursor-pointer">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Đăng xuất</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </header>
  )
}
