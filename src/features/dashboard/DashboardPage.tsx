import * as React from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { useAuthStore } from '@/stores/authStore'
import { BookOpen, Award, Clock, Target, PlayCircle, Trophy, TrendingUp } from 'lucide-react'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { useCourseStore } from '@/stores/courseStore'
import { useProgressStore } from '@/stores/progressStore'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

export function DashboardPage() {
  const { user } = useAuthStore()
  const { courses } = useCourseStore()
  // Mock data for the dashboard charts
  const performanceData = [
    { name: 'T2', score: 65 },
    { name: 'T3', score: 78 },
    { name: 'T4', score: 82 },
    { name: 'T5', score: 70 },
    { name: 'T6', score: 85 },
    { name: 'T7', score: 90 },
    { name: 'CN', score: 95 },
  ]

  if (!user) return null

  return (
    <div className="space-y-8 animate-fade-in pb-8">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary-600 to-primary-800 text-white p-8 sm:p-10 shadow-lg">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl sm:text-4xl font-heading font-bold mb-2">
              Xin chào, {user.fullName}! 👋
            </h1>
            <p className="text-primary-100 text-lg max-w-xl">
              Chào mừng trở lại Phương Đông E-Learning. Bạn đang có <span className="font-bold text-secondary-400">2 khóa học</span> chưa hoàn thành. Hãy tiếp tục ngay nhé!
            </p>
          </div>
          <div className="flex items-center gap-4 bg-black/20 backdrop-blur-md px-6 py-4 rounded-xl border border-white/10 shrink-0">
            <div className="text-center">
              <div className="text-3xl font-bold text-secondary-400">{user.xpPoints}</div>
              <div className="text-xs text-primary-200 uppercase tracking-wider font-semibold">Điểm XP</div>
            </div>
            <div className="w-px h-12 bg-white/20"></div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-400">{user.streakDays}🔥</div>
              <div className="text-xs text-primary-200 uppercase tracking-wider font-semibold">Ngày học liên tiếp</div>
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute right-0 top-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute left-0 bottom-0 w-48 h-48 bg-secondary-500 opacity-20 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2"></div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900/50 flex items-center justify-center text-primary-600 dark:text-primary-400 shrink-0">
              <BookOpen className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Khóa học đã tham gia</p>
              <h3 className="text-2xl font-bold">5</h3>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center text-green-600 dark:text-green-400 shrink-0">
              <Target className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Khóa học hoàn thành</p>
              <h3 className="text-2xl font-bold">3</h3>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-secondary-100 dark:bg-secondary-900/50 flex items-center justify-center text-secondary-600 dark:text-secondary-400 shrink-0">
              <Clock className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Giờ học tuần này</p>
              <h3 className="text-2xl font-bold">12h 30m</h3>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-yellow-100 dark:bg-yellow-900/50 flex items-center justify-center text-yellow-600 dark:text-yellow-400 shrink-0">
              <Award className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Chứng chỉ đạt được</p>
              <h3 className="text-2xl font-bold">2</h3>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Continue Learning */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-heading font-bold flex items-center gap-2">
              <PlayCircle className="text-primary-500 h-6 w-6" /> Tiếp tục học
            </h2>
            <Link to="/courses">
              <Button variant="ghost" size="sm" className="text-primary-600">Xem tất cả</Button>
            </Link>
          </div>
          
          <div className="grid sm:grid-cols-2 gap-4">
            {courses.slice(0, 2).map(course => (
              <Link key={course.id} to={`/courses/${course.id}`} className="flex flex-col">
                <Card className="group hover:border-primary-500 transition-colors overflow-hidden flex flex-col h-full">
                  <div className="h-32 bg-muted relative">
                    <img src={course.thumbnailUrl || 'https://images.unsplash.com/photo-1560518846-1ea118f396af?w=500&auto=format&fit=crop&q=60'} alt={course.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-transform">
                        <PlayCircle className="h-6 w-6 text-primary-600 ml-1" />
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-4 flex-1 flex flex-col">
                    <h3 className="font-semibold text-lg line-clamp-2 mb-2 group-hover:text-primary-600 transition-colors">{course.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-1">Bài 3: Kỹ năng đàm phán chốt sale</p>
                    <div className="mt-auto space-y-2">
                      <div className="flex justify-between text-xs font-medium">
                        <span>Tiến độ</span>
                        <span className="text-primary-600">45%</span>
                      </div>
                      <Progress value={45} className="h-2" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {/* Performance Chart */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <TrendingUp className="text-green-500 h-5 w-5" /> Hiệu suất học tập (Tuần)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} />
                    <YAxis axisLine={false} tickLine={false} />
                    <Tooltip cursor={{ fill: 'rgba(0,0,0,0.05)' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                    <Bar dataKey="score" fill="#003566" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          {/* Leaderboard snippet */}
          <Card>
            <CardHeader className="pb-4">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Trophy className="text-yellow-500 h-5 w-5" /> BXH Tuần này
                </CardTitle>
                <Link to="/leaderboard" className="text-xs text-primary-600 font-medium hover:underline">Chi tiết</Link>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {[1, 2, 3, 4, 5].map((rank) => (
                <div key={rank} className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                    rank === 1 ? 'bg-yellow-100 text-yellow-700 border border-yellow-200' :
                    rank === 2 ? 'bg-gray-100 text-gray-700 border border-gray-200' :
                    rank === 3 ? 'bg-orange-100 text-orange-700 border border-orange-200' :
                    'bg-muted text-muted-foreground'
                  }`}>
                    {rank}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium leading-none mb-1">
                      {rank === 4 ? user.fullName : `Nhân viên ${rank}`}
                      {rank === 4 && <span className="ml-2 text-[10px] bg-primary-100 text-primary-700 px-1.5 py-0.5 rounded">Bạn</span>}
                    </p>
                    <p className="text-xs text-muted-foreground">{1000 - rank * 50} XP</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recent Achievements */}
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">Thành tích gần đây</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4 p-3 rounded-xl border bg-muted/30">
                <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center shrink-0">
                  <Award className="h-6 w-6 text-yellow-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm">Chuyên gia chốt deal</h4>
                  <p className="text-xs text-muted-foreground">Hoàn thành khóa học Kỹ năng bán hàng</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-3 rounded-xl border bg-muted/30">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                  <BookOpen className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm">Ong chăm chỉ</h4>
                  <p className="text-xs text-muted-foreground">Học liên tục 7 ngày</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
