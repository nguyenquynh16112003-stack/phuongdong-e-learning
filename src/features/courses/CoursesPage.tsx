import * as React from 'react'
import { Link } from 'react-router-dom'
import { useCourseStore } from '@/stores/courseStore'
import { useProgressStore } from '@/stores/progressStore'
import { useAuthStore } from '@/stores/authStore'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Search, Filter, Clock, BookOpen, Star, PlayCircle } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export function CoursesPage() {
  const { courses, getChaptersByCourse, getLessonsByChapter } = useCourseStore()
  const { getProgressForCourse } = useProgressStore()
  const { user } = useAuthStore()
  const [searchTerm, setSearchTerm] = React.useState('')
  const [categoryFilter, setCategoryFilter] = React.useState('all')
  const [statusFilter, setStatusFilter] = React.useState('all')

  if (!user) return null

  // Process courses with progress and derive data
  const coursesWithData = courses.map(course => {
    const chapters = getChaptersByCourse(course.id)
    const lessons = chapters.flatMap(chap => getLessonsByChapter(chap.id))
    const progress = getProgressForCourse(user.id, lessons.map(l => l.id))
    
    return {
      ...course,
      lessonsCount: lessons.length,
      progress,
    }
  })

  // Filter courses
  const filteredCourses = coursesWithData.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          course.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === 'all' || course.category === categoryFilter
    
    let matchesStatus = true
    if (statusFilter === 'in_progress') matchesStatus = course.progress.percentage > 0 && course.progress.percentage < 100
    if (statusFilter === 'completed') matchesStatus = course.progress.percentage === 100
    if (statusFilter === 'not_started') matchesStatus = course.progress.percentage === 0

    return matchesSearch && matchesCategory && matchesStatus
  })

  // Unique categories
  const categories = ['all', ...Array.from(new Set(courses.map(c => c.category)))]

  return (
    <div className="space-y-6 animate-fade-in pb-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold">Khóa học của tôi</h1>
          <p className="text-muted-foreground mt-1">Khám phá và hoàn thành các khóa học để nâng cao kỹ năng</p>
        </div>
      </div>

      <Card className="p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Tìm kiếm khóa học..."
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-4">
            <div className="w-40 shrink-0">
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger>
                  <Filter className="h-4 w-4 mr-2 text-muted-foreground" />
                  <SelectValue placeholder="Danh mục" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(cat => (
                    <SelectItem key={cat} value={cat}>
                      {cat === 'all' ? 'Tất cả danh mục' : cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="w-40 shrink-0">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Trạng thái" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả trạng thái</SelectItem>
                  <SelectItem value="not_started">Chưa học</SelectItem>
                  <SelectItem value="in_progress">Đang học</SelectItem>
                  <SelectItem value="completed">Đã hoàn thành</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <Card key={course.id} className="overflow-hidden flex flex-col group hover:shadow-card-hover hover:border-primary-300 transition-all duration-300">
            <div className="relative h-48 bg-muted overflow-hidden">
              <img 
                src={course.thumbnailUrl || `https://source.unsplash.com/random/800x600/?${encodeURIComponent(course.category)}`} 
                alt={course.title} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
              />
              <div className="absolute top-2 right-2">
                <Badge variant={
                  course.progress.percentage === 100 ? 'success' : 
                  course.progress.percentage > 0 ? 'warning' : 'secondary'
                } className="shadow-sm">
                  {course.progress.percentage === 100 ? 'Đã hoàn thành' : 
                   course.progress.percentage > 0 ? 'Đang học' : 'Chưa bắt đầu'}
                </Badge>
              </div>
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Link to={`/courses/${course.id}`}>
                  <Button variant="default" size="lg" className="rounded-full shadow-xl">
                    {course.progress.percentage > 0 ? 'Tiếp tục học' : 'Bắt đầu học'}
                  </Button>
                </Link>
              </div>
            </div>
            
            <CardContent className="p-5 flex flex-col flex-1">
              <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground mb-2">
                <Badge variant="outline" className="text-xs bg-muted/50">{course.category}</Badge>
                {course.pointsReward > 0 && (
                  <span className="flex items-center text-yellow-600 dark:text-yellow-500">
                    <Star className="h-3 w-3 mr-1 fill-current" /> {course.pointsReward} XP
                  </span>
                )}
              </div>
              
              <h3 className="text-lg font-bold line-clamp-2 mb-2 group-hover:text-primary-600 transition-colors">
                <Link to={`/courses/${course.id}`}>{course.title}</Link>
              </h3>
              
              <p className="text-sm text-muted-foreground line-clamp-2 mb-4 flex-1">
                {course.description}
              </p>
              
              <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground mb-4">
                <div className="flex items-center gap-1.5 bg-muted/30 p-2 rounded-md">
                  <BookOpen className="h-4 w-4 text-primary-500" />
                  <span>{course.lessonsCount} Bài học</span>
                </div>
                <div className="flex items-center gap-1.5 bg-muted/30 p-2 rounded-md">
                  <Clock className="h-4 w-4 text-secondary-500" />
                  <span>{Math.round(course.totalDurationSeconds / 3600)} giờ</span>
                </div>
              </div>
              
              <div className="mt-auto space-y-2 pt-4 border-t">
                <div className="flex justify-between text-sm font-medium">
                  <span>Tiến độ</span>
                  <span className={course.progress.percentage === 100 ? 'text-green-600' : 'text-primary-600'}>
                    {course.progress.percentage}%
                  </span>
                </div>
                <Progress 
                  value={course.progress.percentage} 
                  className="h-2" 
                  indicatorClassName={course.progress.percentage === 100 ? 'bg-green-500' : 'bg-primary-500'} 
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCourses.length === 0 && (
        <div className="text-center py-20 bg-muted/30 rounded-xl border border-dashed">
          <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
          <h3 className="text-lg font-semibold text-foreground">Không tìm thấy khóa học nào</h3>
          <p className="text-muted-foreground">Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</p>
          <Button variant="outline" className="mt-4" onClick={() => { setSearchTerm(''); setCategoryFilter('all'); setStatusFilter('all'); }}>
            Xóa bộ lọc
          </Button>
        </div>
      )}
    </div>
  )
}
