import * as React from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useCourseStore } from '@/stores/courseStore'
import { useProgressStore } from '@/stores/progressStore'
import { useTestStore } from '@/stores/testStore'
import { useAuthStore } from '@/stores/authStore'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { ChevronLeft, PlayCircle, Clock, BookOpen, Award, CheckCircle2, Lock, FileText, Star } from 'lucide-react'
import { ScrollArea } from '@/components/ui/scroll-area'

export function CourseDetailPage() {
  const { courseId } = useParams<{ courseId: string }>()
  const navigate = useNavigate()
  const { user } = useAuthStore()
  
  const { fetchCourseById, getChaptersByCourse, getLessonsByChapter, tests } = useCourseStore()
  const { getLessonsWithStatus, getProgressForCourse } = useProgressStore()
  const { getLatestResult } = useTestStore()

  const course = fetchCourseById(courseId || '')
  
  if (!course || !user) {
    return <div className="p-8 text-center">Khóa học không tồn tại</div>
  }

  const chapters = getChaptersByCourse(course.id)
  
  // Create a map of lessonId -> test status to determine if tests are passed
  const testResults: Record<string, boolean> = {}
  tests.filter(t => t.courseId === course.id).forEach(test => {
    const result = getLatestResult(test.id, user.id)
    if (test.lessonId) {
      testResults[test.lessonId] = result?.isPassed || false
    }
  })

  // Get all lessons for calculating overall progress
  const allLessons = chapters.flatMap(chap => getLessonsByChapter(chap.id))
  const courseProgress = getProgressForCourse(user.id, allLessons.map(l => l.id))
  
  // Find first available or in-progress lesson to "Continue" or "Start"
  let firstActionableLesson: import('@/types').LessonWithStatus | null = null;
  let hasFoundActionable = false;

  const chaptersWithLessons = chapters.map(chapter => {
    const lessons = getLessonsByChapter(chapter.id)
    const lessonsWithStatus = getLessonsWithStatus(user.id, lessons, testResults)
    
    // Logic for finding the resume point
    if (!hasFoundActionable) {
      const actionable = lessonsWithStatus.find(l => l.status === 'in_progress' || l.status === 'available')
      if (actionable) {
        firstActionableLesson = actionable
        hasFoundActionable = true
      }
    }

    return { ...chapter, lessons: lessonsWithStatus }
  })

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle2 className="h-5 w-5 text-green-500" />
      case 'in_progress': return <PlayCircle className="h-5 w-5 text-primary-500" />
      case 'available': return <PlayCircle className="h-5 w-5 text-muted-foreground group-hover:text-primary-500 transition-colors" />
      case 'locked': return <Lock className="h-5 w-5 text-muted-foreground/50" />
      default: return null
    }
  }

  return (
    <div className="space-y-6 animate-fade-in pb-8">
      {/* Back button & Breadcrumb */}
      <div>
        <Button variant="ghost" size="sm" className="mb-4 -ml-3 text-muted-foreground" onClick={() => navigate('/courses')}>
          <ChevronLeft className="h-4 w-4 mr-1" /> Quay lại danh sách
        </Button>
      </div>

      {/* Course Header Banner */}
      <div className="relative rounded-2xl overflow-hidden bg-card border shadow-sm">
        <div className="md:flex">
          {/* Thumbnail */}
          <div className="md:w-1/3 lg:w-2/5 relative h-48 md:h-auto bg-muted shrink-0">
            <img 
              src={course.thumbnailUrl || `https://source.unsplash.com/random/800x600/?${encodeURIComponent(course.category)}`} 
              alt={course.title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent md:hidden"></div>
            <div className="absolute bottom-4 left-4 md:hidden">
              <Badge variant="secondary" className="mb-2 bg-white/20 backdrop-blur-md border-white/10 text-white">{course.category}</Badge>
            </div>
          </div>
          
          {/* Info */}
          <div className="p-6 md:p-8 flex flex-col flex-1 justify-center">
            <div className="hidden md:flex items-center gap-2 mb-3">
              <Badge variant="outline" className="bg-muted/50">{course.category}</Badge>
              {course.pointsReward > 0 && (
                <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200 gap-1">
                  <Star className="h-3 w-3 fill-current" /> {course.pointsReward} XP
                </Badge>
              )}
            </div>
            
            <h1 className="text-2xl md:text-3xl font-heading font-bold mb-4">{course.title}</h1>
            <p className="text-muted-foreground mb-6 line-clamp-3">{course.description}</p>
            
            <div className="flex flex-wrap gap-6 text-sm text-muted-foreground mb-8">
              <div className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary-500" />
                <span className="font-medium text-foreground">{allLessons.length}</span> Bài học
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-secondary-500" />
                <span className="font-medium text-foreground">{Math.round(course.totalDurationSeconds / 3600)}</span> Giờ học
              </div>
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 text-yellow-500" />
                <span className="font-medium text-foreground">Chứng chỉ</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 items-center bg-muted/30 p-4 rounded-xl">
              <div className="flex-1 w-full">
                <div className="flex justify-between text-sm font-medium mb-2">
                  <span>Tiến độ học tập</span>
                  <span className={courseProgress.percentage === 100 ? 'text-green-600' : 'text-primary-600'}>
                    {courseProgress.percentage}%
                  </span>
                </div>
                <Progress 
                  value={courseProgress.percentage} 
                  className="h-2.5" 
                  indicatorClassName={courseProgress.percentage === 100 ? 'bg-green-500' : 'bg-primary-500'} 
                />
              </div>
              <div className="w-full sm:w-auto sm:pl-4 sm:border-l shrink-0">
                <Button 
                  size="lg" 
                  className="w-full shadow-primary whitespace-nowrap"
                  onClick={() => {
                    if (firstActionableLesson) {
                      navigate(`/courses/${course.id}/lessons/${firstActionableLesson.id}`)
                    }
                  }}
                  disabled={!firstActionableLesson}
                >
                  {courseProgress.percentage === 0 ? 'Bắt đầu học ngay' : 
                   courseProgress.percentage === 100 ? 'Học lại' : 'Tiếp tục học'}
                  <PlayCircle className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Course Content - Syllabus */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-heading font-bold">Nội dung khóa học</h2>
          
          <div className="space-y-4">
            {chaptersWithLessons.map((chapter) => (
              <Card key={chapter.id} className="overflow-hidden border shadow-sm">
                <div className="bg-muted/50 px-6 py-4 border-b">
                  <h3 className="font-semibold text-lg">{chapter.title}</h3>
                  {chapter.description && <p className="text-sm text-muted-foreground mt-1">{chapter.description}</p>}
                </div>
                <div className="divide-y">
                  {chapter.lessons.map((lesson, index) => {
                    const isLocked = lesson.status === 'locked'
                    const hasTest = tests.some(t => t.lessonId === lesson.id)
                    const isCompleted = lesson.status === 'completed'
                    
                    return (
                      <div key={lesson.id} className={`flex items-center p-4 transition-colors ${isLocked ? 'bg-muted/10 opacity-75' : 'hover:bg-muted/30 group'}`}>
                        <div className="mr-4 mt-0.5 shrink-0">
                          {getStatusIcon(lesson.status)}
                        </div>
                        <div className="flex-1 min-w-0 pr-4">
                          <div className="flex items-center gap-2">
                            <h4 className={`font-medium truncate ${isLocked ? 'text-muted-foreground' : 'text-foreground group-hover:text-primary-600 transition-colors'}`}>
                              Bài {index + 1}: {lesson.title}
                            </h4>
                            {hasTest && (
                              <Badge variant="outline" className="text-[10px] h-5 px-1.5 shrink-0 bg-blue-50/50 text-blue-700 border-blue-200">
                                Có bài Test
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                            <span className="flex items-center gap-1">
                              <PlayCircle className="h-3 w-3" /> {Math.round(lesson.durationSeconds / 60)} phút
                            </span>
                            {lesson.type !== 'video' && (
                              <span className="flex items-center gap-1">
                                <FileText className="h-3 w-3" /> Tài liệu
                              </span>
                            )}
                            {!isLocked && lesson.progress && lesson.progress.watchPercentage > 0 && !isCompleted && (
                              <span className="text-primary-600 font-medium">Đã xem {lesson.progress.watchPercentage}%</span>
                            )}
                          </div>
                        </div>
                        <div className="shrink-0">
                          <Button 
                            variant={isCompleted ? "outline" : isLocked ? "ghost" : "default"} 
                            size="sm" 
                            disabled={isLocked}
                            onClick={() => navigate(`/courses/${course.id}/lessons/${lesson.id}`)}
                            className={isCompleted ? "text-green-600 border-green-200 hover:bg-green-50" : ""}
                          >
                            {isCompleted ? 'Xem lại' : isLocked ? 'Đã khóa' : 'Học'}
                          </Button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold font-heading text-lg mb-4">Thông tin khóa học</h3>
              <div className="space-y-4 text-sm">
                <div className="flex justify-between border-b pb-2">
                  <span className="text-muted-foreground">Giảng viên</span>
                  <span className="font-medium">Ban Giám Đốc P.Đông</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-muted-foreground">Cấp độ</span>
                  <span className="font-medium">Mọi cấp độ</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-muted-foreground">Ngôn ngữ</span>
                  <span className="font-medium">Tiếng Việt</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-muted-foreground">Cập nhật lần cuối</span>
                  <span className="font-medium">{new Date(course.updatedAt).toLocaleDateString('vi-VN')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Yêu cầu thiết bị</span>
                  <span className="font-medium">PC, Mobile, Tablet</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-secondary-50 to-secondary-100/50 dark:from-secondary-900/20 dark:to-background border-secondary-200 dark:border-secondary-900/50">
            <CardContent className="p-6">
              <div className="w-12 h-12 rounded-full bg-secondary-100 dark:bg-secondary-900 flex items-center justify-center mb-4">
                <Award className="h-6 w-6 text-secondary-600 dark:text-secondary-400" />
              </div>
              <h3 className="font-semibold font-heading text-lg mb-2">Chứng nhận hoàn thành</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Hoàn thành 100% video và vượt qua tất cả các bài kiểm tra (tối thiểu 80% điểm) để nhận chứng chỉ chính thức từ Phương Đông.
              </p>
              <Button variant="outline" className="w-full bg-white dark:bg-background" disabled>
                Xem chứng chỉ mẫu
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
