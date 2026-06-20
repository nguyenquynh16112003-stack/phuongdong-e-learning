import * as React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Search, Activity, LogIn, PlayCircle, CheckCircle2, ShieldAlert } from 'lucide-react'

export function AdminLogsPage() {
  const [searchTerm, setSearchTerm] = React.useState('')

  // Mock logs
  const logs = Array.from({ length: 15 }).map((_, i) => {
    const actions = [
      { type: 'login', label: 'Đăng nhập', icon: LogIn, color: 'text-blue-500' },
      { type: 'watch', label: 'Xem video', icon: PlayCircle, color: 'text-purple-500' },
      { type: 'complete', label: 'Hoàn thành bài', icon: CheckCircle2, color: 'text-green-500' },
      { type: 'alert', label: 'Cảnh báo bảo mật', icon: ShieldAlert, color: 'text-red-500' }
    ]
    const action = actions[i % 4]
    const date = new Date()
    date.setMinutes(date.getMinutes() - (i * 15))
    
    return {
      id: `log-${i}`,
      user: `Nhân viên ${Math.floor(Math.random() * 10) + 1}`,
      actionType: action.type,
      actionLabel: action.label,
      icon: action.icon,
      color: action.color,
      details: i % 4 === 0 ? 'IP: 113.190.23.45' : 
               i % 4 === 1 ? 'Bài 1: Tổng quan dự án' :
               i % 4 === 2 ? 'Đạt 90/100 điểm' : 'Sai mật khẩu quá 5 lần',
      time: date.toLocaleString('vi-VN')
    }
  })

  const filteredLogs = logs.filter(l => 
    l.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.actionLabel.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6 animate-fade-in pb-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold">Nhật ký Hệ thống</h1>
          <p className="text-muted-foreground mt-1">Lịch sử hoạt động của người dùng trên nền tảng</p>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-3 border-b">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <CardTitle className="text-lg flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary-500" /> Luồng sự kiện
            </CardTitle>
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Tìm kiếm log..." 
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y">
            {filteredLogs.map(log => (
              <div key={log.id} className="p-4 flex items-start gap-4 hover:bg-muted/30 transition-colors">
                <div className={`mt-1 p-2 rounded-full bg-muted ${log.color}`}>
                  <log.icon className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-1">
                    <div className="font-semibold text-sm">
                      <span className="text-primary-700 dark:text-primary-400">{log.user}</span>
                    </div>
                    <span className="text-xs text-muted-foreground whitespace-nowrap ml-4">{log.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Badge variant="outline" className="text-[10px] uppercase font-bold tracking-wider">{log.actionLabel}</Badge>
                    <span className="text-muted-foreground">{log.details}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
