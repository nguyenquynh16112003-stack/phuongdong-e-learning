import * as React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useNotificationStore } from '@/stores/notificationStore'
import { useAuthStore } from '@/stores/authStore'
import { Bell, CheckCircle2, Info, AlertTriangle, Gift, Clock, CheckCheck } from 'lucide-react'

export function NotificationsPage() {
  const { user } = useAuthStore()
  const { notifications, markAsRead, markAllAsRead, getForUser } = useNotificationStore()

  if (!user) return null

  const userNotifs = getForUser(user.id)
  const unreadCount = userNotifs.filter(n => !n.isRead).length

  const getIcon = (type: string) => {
    switch (type) {
      case 'system': return <Info className="h-5 w-5 text-blue-500" />
      case 'course_assigned': return <CheckCircle2 className="h-5 w-5 text-green-500" />
      case 'test_reminder': return <Clock className="h-5 w-5 text-orange-500" />
      case 'achievement': return <Gift className="h-5 w-5 text-yellow-500" />
      default: return <Bell className="h-5 w-5 text-muted-foreground" />
    }
  }

  const getBgColor = (type: string, isRead: boolean) => {
    if (isRead) return 'bg-muted/30 border-transparent'
    switch (type) {
      case 'system': return 'bg-blue-50/50 border-blue-100 dark:bg-blue-900/10 dark:border-blue-900/30'
      case 'course_assigned': return 'bg-green-50/50 border-green-100 dark:bg-green-900/10 dark:border-green-900/30'
      case 'test_reminder': return 'bg-orange-50/50 border-orange-100 dark:bg-orange-900/10 dark:border-orange-900/30'
      case 'achievement': return 'bg-yellow-50/50 border-yellow-100 dark:bg-yellow-900/10 dark:border-yellow-900/30'
      default: return 'bg-muted/50 border-muted'
    }
  }

  const formatRelativeTime = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)
    
    if (diffInSeconds < 60) return 'Vừa xong'
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} phút trước`
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} giờ trước`
    if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)} ngày trước`
    return date.toLocaleDateString('vi-VN')
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in pb-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 border-b pb-4">
        <div>
          <h1 className="text-3xl font-heading font-bold flex items-center gap-3">
            Thông báo 
            {unreadCount > 0 && <Badge variant="destructive" className="rounded-full px-2">{unreadCount}</Badge>}
          </h1>
        </div>
        {unreadCount > 0 && (
          <Button variant="ghost" size="sm" onClick={() => markAllAsRead(user.id)} className="text-muted-foreground hover:text-primary-600">
            <CheckCheck className="h-4 w-4 mr-2" /> Đánh dấu tất cả đã đọc
          </Button>
        )}
      </div>

      <div className="space-y-4">
        {userNotifs.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            <Bell className="h-12 w-12 mx-auto mb-4 opacity-20" />
            <p>Bạn không có thông báo nào.</p>
          </div>
        ) : (
          userNotifs.map((notif) => (
            <Card 
              key={notif.id} 
              className={`overflow-hidden transition-all duration-200 cursor-pointer border ${getBgColor(notif.type, notif.isRead)} hover:shadow-md`}
              onClick={() => !notif.isRead && markAsRead(notif.id)}
            >
              <CardContent className="p-4 sm:p-5 flex gap-4">
                <div className={`mt-1 shrink-0 w-10 h-10 rounded-full flex items-center justify-center bg-background border shadow-sm ${!notif.isRead ? 'ring-2 ring-primary-500 ring-offset-2 ring-offset-background' : ''}`}>
                  {getIcon(notif.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-4 mb-1">
                    <h4 className={`font-semibold text-base truncate ${!notif.isRead ? 'text-foreground' : 'text-muted-foreground'}`}>
                      {notif.title}
                    </h4>
                    <span className="text-xs text-muted-foreground whitespace-nowrap shrink-0">
                      {formatRelativeTime(notif.createdAt)}
                    </span>
                  </div>
                  <p className={`text-sm line-clamp-2 ${!notif.isRead ? 'text-muted-foreground' : 'text-muted-foreground/70'}`}>
                    {notif.content}
                  </p>
                  
                  {notif.linkUrl && (
                    <Button variant="link" className="px-0 h-auto text-xs mt-2 text-primary-600">
                      Xem chi tiết
                    </Button>
                  )}
                </div>
                {!notif.isRead && (
                  <div className="shrink-0 flex items-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-primary-500"></div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
