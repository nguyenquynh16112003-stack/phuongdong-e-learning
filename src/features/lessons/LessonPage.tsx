import * as React from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useCourseStore } from '@/stores/courseStore'
import { useProgressStore } from '@/stores/progressStore'
import { useTestStore } from '@/stores/testStore'
import { useAuthStore } from '@/stores/authStore'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ChevronLeft, ChevronRight, PlayCircle, CheckCircle2, Lock, FileText, AlertCircle } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { ScrollArea } from '@/components/ui/scroll-area'

export function LessonPage() {
  const { courseId, lessonId } = useParams<{ courseId: string, lessonId: string }>()
  const navigate = useNavigate()
  const { user } = useAuthStore()
  
  const { fetchCourseById, getChaptersByCourse, getLessonsByChapter, tests } = useCourseStore()
  const { getLessonsWithStatus, updateWatchProgress, markLessonComplete } = useProgressStore()
  const { getLatestResult } = useTestStore()

  const [activeTab, setActiveTab] = React.useState('video')
  const videoRef = React.useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = React.useState(false)

  const course = fetchCourseById(courseId || '')
  
  if (!course || !user) {
    return <div className="p-8 text-center">Khóa học không tồn tại</div>
  }

  const chapters = getChaptersByCourse(course.id)
  
  // Create test results map
  const testResults: Record<string, boolean> = {}
  tests.filter(t => t.courseId === course.id).forEach(test => {
    const result = getLatestResult(test.id, user.id)
    if (test.lessonId) {
      testResults[test.lessonId] = result?.isPassed || false
    }
  })

  // Get all lessons flat list for navigation
  const allLessonsWithStatus = chapters.flatMap(chapter => {
    const lessons = getLessonsByChapter(chapter.id)
    return getLessonsWithStatus(user.id, lessons, testResults)
  })

  const currentLessonIndex = allLessonsWithStatus.findIndex(l => l.id === lessonId)
  const lesson = allLessonsWithStatus[currentLessonIndex]
  const prevLesson = currentLessonIndex > 0 ? allLessonsWithStatus[currentLessonIndex - 1] : null
  const nextLesson = currentLessonIndex < allLessonsWithStatus.length - 1 ? allLessonsWithStatus[currentLessonIndex + 1] : null

  const hasTest = tests.some(t => t.lessonId === lesson?.id)
  const testInfo = tests.find(t => t.lessonId === lesson?.id)
  const isTestPassed = testResults[lesson?.id || ''] || false

  // Handle video progress
  const handleTimeUpdate = () => {
    if (videoRef.current && lesson) {
      const { currentTime, duration } = videoRef.current
      if (duration > 0) {
        const percentage = Math.round((currentTime / duration) * 100)
        
        // Only update store occasionally to avoid too many renders/writes
        // In a real app, you might debounce this
        if (percentage % 5 === 0 || percentage > 95) {
           updateWatchProgress(user.id, lesson.id, percentage)
           
           // Auto mark complete if video is near end and no test is required
           if (percentage > 95 && !hasTest && lesson.status !== 'completed') {
             markLessonComplete(user.id, lesson.id)
           }
        }
      }
    }
  }

  const handleVideoEnded = () => {
    if (lesson) {
      updateWatchProgress(user.id, lesson.id, 100)
      if (!hasTest) {
        markLessonComplete(user.id, lesson.id)
      }
    }
  }

  if (!lesson) {
    return <div className="p-8 text-center">Bài học không tồn tại</div>
  }

  if (lesson.status === 'locked') {
    return (
      <div className="max-w-3xl mx-auto mt-12 p-8 text-center border rounded-xl shadow-sm bg-card">
        <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
          <Lock className="h-10 w-10 text-muted-foreground" />
        </div>
        <h2 className="text-2xl font-bold mb-4">Bài học bị khóa</h2>
        <p className="text-muted-foreground mb-8">
          Bạn cần hoàn thành bài học trước đó {prevLesson?.title ? `("${prevLesson.title}")` : ''} 
          và vượt qua bài kiểm tra (nếu có) để mở khóa bài học này.
        </p>
        <Button onClick={() => navigate(`/courses/${course.id}`)}>
          Quay lại khóa học
        </Button>
      </div>
    )
  }

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-4rem-2rem)] gap-6 animate-fade-in">
      {/* Main Content Area - Left */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto pr-2 custom-scrollbar">
        {/* Navigation Top */}
        <div className="flex items-center justify-between mb-4">
          <Button variant="ghost" size="sm" onClick={() => navigate(`/courses/${course.id}`)} className="text-muted-foreground -ml-3">
            <ChevronLeft className="h-4 w-4 mr-1" /> Về khóa học
          </Button>
          <div className="text-sm font-medium text-muted-foreground truncate max-w-[200px] sm:max-w-xs">
            {course.title}
          </div>
        </div>

        {/* Video Player Area */}
        <div className="bg-black aspect-video rounded-xl overflow-hidden shadow-lg relative flex items-center justify-center mb-6">
          <video
            ref={videoRef}
            src={lesson.videoUrl || "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"}
            className="w-full h-full object-contain"
            controls
            onTimeUpdate={handleTimeUpdate}
            onEnded={handleVideoEnded}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            poster={course.thumbnailUrl || undefined}
          >
            Trình duyệt của bạn không hỗ trợ thẻ video.
          </video>
          {!isPlaying && lesson.progress?.watchPercentage === 0 && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center pointer-events-none">
              <div className="w-20 h-20 rounded-full bg-primary-500/80 backdrop-blur-sm flex items-center justify-center">
                <PlayCircle className="w-10 h-10 text-white ml-1" />
              </div>
            </div>
          )}
        </div>

        {/* Lesson Info */}
        <div className="mb-8">
          <h1 className="text-2xl font-heading font-bold mb-2">{lesson.title}</h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1"><PlayCircle className="h-4 w-4" /> {lesson.durationMinutes} phút</span>
            {lesson.progress && (
              <span className="text-primary-600 font-medium">Đã xem {lesson.progress.watchPercentage}%</span>
            )}
            {lesson.status === 'completed' && (
              <span className="flex items-center gap-1 text-green-600 font-medium bg-green-50 px-2 py-0.5 rounded-full">
                <CheckCircle2 className="h-4 w-4" /> Hoàn thành
              </span>
            )}
          </div>
        </div>

        {/* Action required banner */}
        {lesson.progress?.watchPercentage >= 95 && hasTest && !isTestPassed && (
          <Alert variant="warning" className="mb-8 bg-yellow-50 border-yellow-200">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Bạn đã xem xong video!</AlertTitle>
            <AlertDescription className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-2">
              <span>Để hoàn thành bài học này, bạn cần vượt qua bài kiểm tra để đánh giá mức độ hiểu bài.</span>
              <Button onClick={() => navigate(`/courses/${course.id}/lessons/${lesson.id}/test`)} size="sm" className="whitespace-nowrap">
                Làm bài kiểm tra ngay
              </Button>
            </AlertDescription>
          </Alert>
        )}

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent mb-6">
            <TabsTrigger value="video" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary-500 data-[state=active]:shadow-none data-[state=active]:bg-transparent py-3 px-4">
              Tổng quan
            </TabsTrigger>
            <TabsTrigger value="material" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary-500 data-[state=active]:shadow-none data-[state=active]:bg-transparent py-3 px-4">
              Tài liệu đính kèm
            </TabsTrigger>
            {hasTest && (
              <TabsTrigger value="test" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary-500 data-[state=active]:shadow-none data-[state=active]:bg-transparent py-3 px-4 flex items-center gap-2">
                Bài kiểm tra {isTestPassed && <CheckCircle2 className="h-4 w-4 text-green-500" />}
              </TabsTrigger>
            )}
          </TabsList>
          
          <TabsContent value="video" className="mt-0">
            <div className="prose prose-sm dark:prose-invert max-w-none">
              <p>{lesson.content || 'Nội dung bài học đang được cập nhật. Vui lòng xem video phía trên để nắm bắt kiến thức.'}</p>
            </div>
          </TabsContent>
          
          <TabsContent value="material" className="mt-0 space-y-4">
            <p className="text-sm text-muted-foreground mb-4">Các tài liệu dưới đây giúp bạn ôn tập và thực hành tốt hơn.</p>
            
            {[1, 2].map(i => (
              <div key={i} className="flex items-center justify-between p-4 border rounded-xl hover:bg-muted/30 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center shrink-0">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-medium text-sm text-foreground">Tài liệu tham khảo {i}.pdf</h4>
                    <p className="text-xs text-muted-foreground">1.2 MB</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">Tải xuống</Button>
              </div>
            ))}
          </TabsContent>

          {hasTest && testInfo && (
            <TabsContent value="test" className="mt-0">
              <Card>
                <CardContent className="p-6 text-center space-y-4">
                  <div className="w-16 h-16 bg-primary-50 rounded-full flex items-center justify-center mx-auto text-primary-600 mb-2">
                    <FileText className="h-8 w-8" />
                  </div>
                  <h3 className="text-lg font-bold">{testInfo.title}</h3>
                  <p className="text-muted-foreground text-sm max-w-md mx-auto">
                    Bài kiểm tra gồm {testInfo.questionsCount} câu hỏi, thời gian {testInfo.durationMinutes} phút. 
                    Bạn cần đạt {testInfo.passingScore}% để vượt qua.
                  </p>
                  
                  {isTestPassed ? (
                    <div className="pt-4 space-y-4">
                      <div className="inline-flex items-center gap-2 text-green-600 bg-green-50 px-4 py-2 rounded-lg font-medium">
                        <CheckCircle2 className="h-5 w-5" /> Bạn đã thi đạt bài test này
                      </div>
                      <div>
                        <Button variant="outline" onClick={() => navigate(`/courses/${course.id}/lessons/${lesson.id}/test`)}>
                          Làm lại bài kiểm tra
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="pt-4">
                      <Button 
                        size="lg" 
                        onClick={() => navigate(`/courses/${course.id}/lessons/${lesson.id}/test`)}
                        disabled={lesson.progress?.watchPercentage < 95 && !isTestPassed}
                      >
                        {lesson.progress?.watchPercentage < 95 ? 'Xem video để mở khóa bài Test' : 'Bắt đầu làm bài'}
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          )}
        </Tabs>
      </div>

      {/* Playlist Sidebar - Right */}
      <div className="hidden lg:flex w-80 shrink-0 flex-col border rounded-xl overflow-hidden bg-card shadow-sm h-full">
        <div className="p-4 border-b bg-muted/30">
          <h3 className="font-semibold text-lg">Danh sách bài học</h3>
          <div className="mt-2 text-sm text-muted-foreground flex items-center gap-2">
            <Progress value={(() => {
               const completed = allLessonsWithStatus.filter(l => l.status === 'completed').length;
               return Math.round((completed / allLessonsWithStatus.length) * 100);
            })()} className="h-2 flex-1" />
            <span className="shrink-0">{allLessonsWithStatus.filter(l => l.status === 'completed').length}/{allLessonsWithStatus.length}</span>
          </div>
        </div>
        
        <ScrollArea className="flex-1">
          <div className="p-2 space-y-1">
            {allLessonsWithStatus.map((l, index) => {
              const isActive = l.id === lesson.id
              const isLocked = l.status === 'locked'
              const isCompleted = l.status === 'completed'
              
              return (
                <div 
                  key={l.id}
                  onClick={() => {
                    if (!isLocked) navigate(`/courses/${course.id}/lessons/${l.id}`)
                  }}
                  className={`
                    p-3 rounded-lg flex items-start gap-3 transition-colors text-sm
                    ${isActive ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800' : 'hover:bg-muted/50 border border-transparent'}
                    ${isLocked ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}
                  `}
                >
                  <div className="mt-0.5 shrink-0">
                    {isCompleted ? <CheckCircle2 className="h-4 w-4 text-green-500" /> :
                     isActive ? <PlayCircle className="h-4 w-4 text-primary-500" /> :
                     isLocked ? <Lock className="h-4 w-4 text-muted-foreground/50" /> :
                     <PlayCircle className="h-4 w-4 text-muted-foreground" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`font-medium line-clamp-2 ${isActive ? 'text-primary-700 dark:text-primary-400' : ''}`}>
                      {index + 1}. {l.title}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {l.durationMinutes} phút
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </ScrollArea>
      </div>

      {/* Mobile Navigation bottom bar (replaces Sidebar on small screens) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 p-4 bg-background border-t shadow-lg flex justify-between z-10 pb-20">
        <Button 
          variant="outline" 
          disabled={!prevLesson}
          onClick={() => prevLesson && navigate(`/courses/${course.id}/lessons/${prevLesson.id}`)}
        >
          <ChevronLeft className="mr-2 h-4 w-4" /> Bài trước
        </Button>
        <Button 
          disabled={!nextLesson || (nextLesson.status === 'locked')}
          onClick={() => nextLesson && navigate(`/courses/${course.id}/lessons/${nextLesson.id}`)}
        >
          Bài tiếp <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
