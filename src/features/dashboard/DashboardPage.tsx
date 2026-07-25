import * as React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useAuthStore } from '@/stores/authStore'
import { BookOpen, Award, Clock, Target, PlayCircle, Trophy, TrendingUp } from 'lucide-react'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { useCourseStore } from '@/stores/courseStore'
import { useProgressStore } from '@/stores/progressStore'
import { useTestStore } from '@/stores/testStore'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { useUserStore } from '@/stores/userStore'

export function DashboardPage() {
  const { user } = useAuthStore()
  const { courses, getChaptersByCourse, getLessonsByChapter } = useCourseStore()
  const { getProgressForCourse, progress } = useProgressStore()
  const { getUserStats } = useTestStore()
  const { users } = useUserStore()

  if (!user) return null

  // Calculate real stats from store data
  const publishedCourses = courses.filter(c => c.isPublished)
  
  const coursesWithProgress = publishedCourses.map(course => {
    const chapters = getChaptersByCourse(course.id)
    const lessons = chapters.flatMap(chap => getLessonsByChapter(chap.id))
    const prog = getProgressForCourse(user.id, lessons.map(l => l.id))
    const totalMinutes = lessons.reduce((sum, l) => sum + Math.round(l.durationSeconds / 60), 0)
    return { ...course, lessonsCount: lessons.length, progress: prog, totalMinutes }
  })

  const enrolledCourses = coursesWithProgress.filter(c => c.lessonsCount > 0)
  const completedCourses = enrolledCourses.filter(c => c.progress.percentage === 100)
  const inProgressCourses = enrolledCourses.filter(c => c.progress.percentage > 0 && c.progress.percentage < 100)
  
  // Calculate total study time from progress records
  const userProgressEntries = Object.values(progress).filter(p => p.userId === user.id)
  const totalWatchSeconds = userProgressEntries.reduce((sum, p) => sum + (p.totalWatchTimeSeconds || 0), 0)
  const totalHours = Math.floor(totalWatchSeconds / 3600)
  const totalMinutesRemainder = Math.floor((totalWatchSeconds % 3600) / 60)

  const testStats = getUserStats(user.id)

  // Build leaderboard from real users
  const leaderboard = users
    .filter(u => u.isActive)
    .sort((a, b) => b.xpPoints - a.xpPoints)
    .slice(0, 5)

  // Weekly performance mock (would need real date-based data)
  const performanceData = [
    { name: 'T2', score: Math.floor(Math.random() * 30) + 60 },
    { name: 'T3', score: Math.floor(Math.random() * 30) + 60 },
    { name: 'T4', score: Math.floor(Math.random() * 30) + 60 },
    { name: 'T5', score: Math.floor(Math.random() * 30) + 60 },
    { name: 'T6', score: Math.floor(Math.random() * 30) + 60 },
    { name: 'T7', score: Math.floor(Math.random() * 30) + 60 },
    { name: 'CN', score: Math.floor(Math.random() * 30) + 60 },
  ]

  // Memoize to prevent re-random on re-render
  const [chartData] = React.useState(performanceData)

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
              Chào mừng trở lại Phương Đông E-Learning.
              {inProgressCourses.length > 0 ? (
                <> Bạn đang có <span className="font-bold text-secondary-400">{inProgressCourses.length} khóa học</span> chưa hoàn thành. Hãy tiếp tục ngay nhé!</>
              ) : enrolledCourses.length === 0 ? (
                <> Hãy bắt đầu khám phá các khóa học để nâng cao kỹ năng!</>
              ) : (
                <> Tuyệt vời! Bạn đã hoàn thành tất cả khóa học hiện có. 🎉</>
              )}
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
              <h3 className="text-2xl font-bold">{enrolledCourses.length}</h3>
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
              <h3 className="text-2xl font-bold">{completedCourses.length}</h3>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-secondary-100 dark:bg-secondary-900/50 flex items-center justify-center text-secondary-600 dark:text-secondary-400 shrink-0">
              <Clock className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Tổng giờ học</p>
              <h3 className="text-2xl font-bold">{totalHours}h {totalMinutesRemainder}m</h3>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-yellow-100 dark:bg-yellow-900/50 flex items-center justify-center text-yellow-600 dark:text-yellow-400 shrink-0">
              <Award className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Bài thi đã qua</p>
              <h3 className="text-2xl font-bold">{testStats.passedTests}</h3>
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
          
          {inProgressCourses.length === 0 && enrolledCourses.length === 0 ? (
            <Card className="border-dashed border-2">
              <CardContent className="py-12 text-center">
                <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-semibold mb-2">Chưa có khóa học nào</h3>
                <p className="text-muted-foreground mb-4">Hãy bắt đầu bằng việc chọn một khóa học để học</p>
                <Link to="/courses"><Button>Khám phá khóa học</Button></Link>
              </CardContent>
            </Card>
          ) : (
            <div className="grid sm:grid-cols-2 gap-4">
              {(inProgressCourses.length > 0 ? inProgressCourses : enrolledCourses).slice(0, 2).map(course => (
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
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-1">
                        {course.lessonsCount} bài học • {course.totalMinutes} phút
                      </p>
                      <div className="mt-auto space-y-2">
                        <div className="flex justify-between text-xs font-medium">
                          <span>Tiến độ</span>
                          <span className={course.progress.percentage === 100 ? 'text-green-600' : 'text-primary-600'}>{course.progress.percentage}%</span>
                        </div>
                        <Progress value={course.progress.percentage} className="h-2" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}

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
                  <BarChart data={chartData}>
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
              {leaderboard.map((u, idx) => {
                const rank = idx + 1
                const isCurrentUser = u.id === user.id
                return (
                  <div key={u.id} className="flex items-center gap-3">
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
                        {u.fullName}
                        {isCurrentUser && <span className="ml-2 text-[10px] bg-primary-100 text-primary-700 px-1.5 py-0.5 rounded">Bạn</span>}
                      </p>
                      <p className="text-xs text-muted-foreground">{u.xpPoints} XP</p>
                    </div>
                  </div>
                )
              })}
            </CardContent>
          </Card>

          {/* Recent Achievements */}
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">Thành tích gần đây</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {completedCourses.length > 0 ? (
                completedCourses.slice(0, 2).map(course => (
                  <div key={course.id} className="flex items-center gap-4 p-3 rounded-xl border bg-muted/30">
                    <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center shrink-0">
                      <Award className="h-6 w-6 text-yellow-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm line-clamp-1">Hoàn thành khóa học</h4>
                      <p className="text-xs text-muted-foreground line-clamp-1">{course.title}</p>
                    </div>
                  </div>
                ))
              ) : (
                <>
                  <div className="flex items-center gap-4 p-3 rounded-xl border bg-muted/30">
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                      <BookOpen className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm">Khám phá</h4>
                      <p className="text-xs text-muted-foreground">Hoàn thành khóa học đầu tiên để mở khóa thành tích!</p>
                    </div>
                  </div>
                </>
              )}
              {testStats.passedTests > 0 && (
                <div className="flex items-center gap-4 p-3 rounded-xl border bg-muted/30">
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                    <Target className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">Thợ săn điểm</h4>
                    <p className="text-xs text-muted-foreground">Đã vượt qua {testStats.passedTests} bài kiểm tra</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
