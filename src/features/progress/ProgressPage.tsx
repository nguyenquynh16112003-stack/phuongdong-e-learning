import * as React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { useAuthStore } from '@/stores/authStore'
import { Award, BookOpen, Clock, Target, TrendingUp, Calendar, Zap } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts'

export function ProgressPage() {
  const { user } = useAuthStore()

  if (!user) return null

  // Mock data for charts
  const learningHistory = [
    { name: 'T1', hours: 12, xp: 450 },
    { name: 'T2', hours: 15, xp: 600 },
    { name: 'T3', hours: 10, xp: 380 },
    { name: 'T4', hours: 22, xp: 850 },
    { name: 'T5', hours: 18, xp: 720 },
    { name: 'T6', hours: 25, xp: 950 },
  ]

  const skillsData = [
    { name: 'Kỹ năng bán hàng', value: 85 },
    { name: 'Kiến thức dự án', value: 92 },
    { name: 'Pháp lý BĐS', value: 78 },
    { name: 'Marketing', value: 65 },
    { name: 'Phong thủy', value: 45 },
  ]

  return (
    <div className="space-y-6 animate-fade-in pb-8">
      <div>
        <h1 className="text-3xl font-heading font-bold mb-2">Tiến độ học tập</h1>
        <p className="text-muted-foreground">Theo dõi hành trình phát triển kỹ năng của bạn</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-primary-500 to-primary-700 text-white border-none">
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                <Zap className="h-6 w-6 text-yellow-300" />
              </div>
            </div>
            <div className="text-sm font-medium text-primary-100 mb-1">Tổng XP tích lũy</div>
            <div className="text-3xl font-bold">{user.xpPoints.toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center mb-4">
              <Calendar className="h-6 w-6 text-orange-600" />
            </div>
            <div className="text-sm font-medium text-muted-foreground mb-1">Chuỗi ngày học liên tiếp</div>
            <div className="text-3xl font-bold">{user.streakDays} <span className="text-xl text-orange-500">🔥</span></div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
              <BookOpen className="h-6 w-6 text-green-600" />
            </div>
            <div className="text-sm font-medium text-muted-foreground mb-1">Khóa học đã hoàn thành</div>
            <div className="text-3xl font-bold">3 <span className="text-base font-normal text-muted-foreground">/ 5 đăng ký</span></div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
              <Clock className="h-6 w-6 text-blue-600" />
            </div>
            <div className="text-sm font-medium text-muted-foreground mb-1">Tổng thời gian học</div>
            <div className="text-3xl font-bold">45<span className="text-xl font-medium">h</span> 20<span className="text-xl font-medium">m</span></div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary-500" /> Biểu đồ học tập (6 tháng gần đây)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={learningHistory} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis yAxisId="left" axisLine={false} tickLine={false} />
                  <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Line yAxisId="left" type="monotone" dataKey="hours" name="Giờ học" stroke="#003566" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
                  <Line yAxisId="right" type="monotone" dataKey="xp" name="XP Đạt được" stroke="#FF6B00" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Target className="h-5 w-5 text-green-500" /> Phân tích kỹ năng
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {skillsData.map((skill) => (
                <div key={skill.name}>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium">{skill.name}</span>
                    <span className="text-muted-foreground">{skill.value}%</span>
                  </div>
                  <Progress 
                    value={skill.value} 
                    className="h-2"
                    indicatorClassName={
                      skill.value >= 90 ? 'bg-green-500' :
                      skill.value >= 70 ? 'bg-primary-500' :
                      skill.value >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                    }
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Award className="h-5 w-5 text-yellow-500" /> Huy hiệu đã đạt
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex flex-col items-center p-4 rounded-xl border bg-muted/20 text-center hover:bg-muted/50 transition-colors">
                <div className={`w-16 h-16 rounded-full mb-3 flex items-center justify-center ${
                  i === 1 ? 'bg-yellow-100 text-yellow-600' :
                  i === 2 ? 'bg-blue-100 text-blue-600' :
                  i === 3 ? 'bg-green-100 text-green-600' :
                  i === 4 ? 'bg-purple-100 text-purple-600' :
                  'bg-orange-100 text-orange-600'
                }`}>
                  <Award className="h-8 w-8" />
                </div>
                <h4 className="font-semibold text-sm mb-1 line-clamp-1">
                  {i === 1 ? 'Chiến thần sale' : 
                   i === 2 ? 'Con ong chăm chỉ' : 
                   i === 3 ? 'Bậc thầy dự án' : 
                   i === 4 ? 'Vua đàm phán' : 'Tân binh xuất sắc'}
                </h4>
                <p className="text-xs text-muted-foreground line-clamp-2">Hoàn thành xuất sắc nhiệm vụ</p>
              </div>
            ))}
            
            <div className="flex flex-col items-center p-4 rounded-xl border border-dashed text-center opacity-50 grayscale">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-3">
                <Award className="h-8 w-8 text-muted-foreground" />
              </div>
              <h4 className="font-semibold text-sm mb-1">Chuyên gia marketing</h4>
              <p className="text-xs">Cần thêm 500 XP khóa Marketing</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
