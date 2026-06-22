import * as React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useCourseStore } from '@/stores/courseStore'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { ChevronLeft, Plus, Edit, Trash2, Video, FileText, ChevronDown, ChevronRight, GripVertical } from 'lucide-react'

export function AdminCourseDetailPage() {
  const { courseId } = useParams<{ courseId: string }>()
  const navigate = useNavigate()
  
  const { 
    fetchCourseById, 
    getChaptersByCourse, 
    getLessonsByChapter,
    createChapter,
    updateChapter,
    deleteChapter,
    createLesson,
    updateLesson,
    deleteLesson
  } = useCourseStore()

  const course = fetchCourseById(courseId || '')
  const chapters = getChaptersByCourse(courseId || '')

  const [expandedChapters, setExpandedChapters] = React.useState<Record<string, boolean>>({})

  // Chapter Dialog States
  const [isChapterOpen, setIsChapterOpen] = React.useState(false)
  const [isChapterEdit, setIsChapterEdit] = React.useState(false)
  const [editChapterId, setEditChapterId] = React.useState('')
  const [chapterTitle, setChapterTitle] = React.useState('')
  const [chapterDescription, setChapterDescription] = React.useState('')

  // Lesson Dialog States
  const [isLessonOpen, setIsLessonOpen] = React.useState(false)
  const [isLessonEdit, setIsLessonEdit] = React.useState(false)
  const [editLessonId, setEditLessonId] = React.useState('')
  const [lessonChapterId, setLessonChapterId] = React.useState('')
  const [lessonTitle, setLessonTitle] = React.useState('')
  const [lessonVideoUrl, setLessonVideoUrl] = React.useState('')
  const [lessonContent, setLessonContent] = React.useState('')
  const [lessonDurationMinutes, setLessonDurationMinutes] = React.useState(5)

  if (!course) {
    return (
      <div className="p-8 text-center animate-fade-in">
        <h2 className="text-xl font-bold mb-4">Khóa học không tồn tại</h2>
        <Button onClick={() => navigate('/admin/courses')}>Quay lại danh sách</Button>
      </div>
    )
  }

  const toggleChapter = (chapterId: string) => {
    setExpandedChapters(prev => ({ ...prev, [chapterId]: !prev[chapterId] }))
  }

  // Chapter Handlers
  const handleOpenAddChapter = () => {
    setIsChapterEdit(false)
    setEditChapterId('')
    setChapterTitle('')
    setChapterDescription('')
    setIsChapterOpen(true)
  }

  const handleOpenEditChapter = (chapter: any) => {
    setIsChapterEdit(true)
    setEditChapterId(chapter.id)
    setChapterTitle(chapter.title)
    setChapterDescription(chapter.description || '')
    setIsChapterOpen(true)
  }

  const handleSaveChapter = () => {
    if (!chapterTitle || !courseId) return

    if (isChapterEdit && editChapterId) {
      updateChapter(editChapterId, {
        title: chapterTitle,
        description: chapterDescription,
      })
    } else {
      createChapter({
        courseId,
        title: chapterTitle,
        description: chapterDescription,
        orderIndex: chapters.length + 1,
      })
    }
    setIsChapterOpen(false)
  }

  // Lesson Handlers
  const handleOpenAddLesson = (chapterId: string) => {
    setIsLessonEdit(false)
    setEditLessonId('')
    setLessonChapterId(chapterId)
    setLessonTitle('')
    setLessonVideoUrl('')
    setLessonContent('')
    setLessonDurationMinutes(5)
    setIsLessonOpen(true)
  }

  const handleOpenEditLesson = (lesson: any, chapterId: string) => {
    setIsLessonEdit(true)
    setEditLessonId(lesson.id)
    setLessonChapterId(chapterId)
    setLessonTitle(lesson.title)
    setLessonVideoUrl(lesson.videoUrl || lesson.youtubeUrl || '')
    setLessonContent(lesson.content || '')
    setLessonDurationMinutes(Math.round(lesson.durationSeconds / 60))
    setIsLessonOpen(true)
  }

  const handleSaveLesson = () => {
    if (!lessonTitle || !lessonChapterId || !courseId) return

    const chapter = chapters.find(c => c.id === lessonChapterId)
    const existingLessons = getLessonsByChapter(lessonChapterId)

    if (isLessonEdit && editLessonId) {
      updateLesson(editLessonId, {
        title: lessonTitle,
        videoUrl: lessonVideoUrl,
        youtubeUrl: lessonVideoUrl,
        content: lessonContent,
        durationSeconds: lessonDurationMinutes * 60,
      })
    } else {
      createLesson({
        courseId,
        chapterId: lessonChapterId,
        chapterTitle: chapter?.title || '',
        title: lessonTitle,
        description: '',
        content: lessonContent,
        type: 'video',
        videoUrl: lessonVideoUrl,
        youtubeUrl: lessonVideoUrl,
        youtubeVideoId: '',
        thumbnailUrl: '',
        instructorName: course.createdByName,
        durationSeconds: lessonDurationMinutes * 60,
        orderIndex: existingLessons.length + 1,
        isPublished: true,
      })
    }
    setIsLessonOpen(false)
    // Expand the chapter to show the new lesson
    setExpandedChapters(prev => ({ ...prev, [lessonChapterId]: true }))
  }

  return (
    <div className="space-y-6 animate-fade-in pb-20">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-card p-6 rounded-xl shadow-sm border">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={() => navigate('/admin/courses')} className="shrink-0">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <img src={course.thumbnailUrl} alt={course.title} className="w-20 h-14 object-cover rounded-md shadow-sm hidden sm:block" />
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="outline" className="text-xs">{course.category}</Badge>
              {course.isPublished ? (
                <Badge className="bg-green-100 text-green-700 hover:bg-green-200 border-none text-xs">Đã xuất bản</Badge>
              ) : (
                <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-200 border-none text-xs">Bản nháp</Badge>
              )}
            </div>
            <h1 className="text-xl sm:text-2xl font-bold line-clamp-1">{course.title}</h1>
          </div>
        </div>
        
        <Button onClick={handleOpenAddChapter}>
          <Plus className="h-4 w-4 mr-2" /> Thêm Chương mới
        </Button>
      </div>

      {/* Chapters & Lessons List */}
      <div className="space-y-4">
        {chapters.length === 0 ? (
          <Card className="border-dashed border-2 bg-muted/30">
            <CardContent className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-16 h-16 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mb-4">
                <FileText className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Khóa học chưa có nội dung</h3>
              <p className="text-muted-foreground max-w-md mb-6">
                Khóa học của bạn cần có ít nhất một chương và một bài học để học viên có thể theo dõi. Hãy bắt đầu bằng việc tạo chương đầu tiên.
              </p>
              <Button onClick={handleOpenAddChapter} size="lg">
                <Plus className="h-5 w-5 mr-2" /> Tạo chương đầu tiên
              </Button>
            </CardContent>
          </Card>
        ) : (
          chapters.map((chapter, index) => {
            const lessons = getLessonsByChapter(chapter.id)
            const isExpanded = expandedChapters[chapter.id] ?? true
            
            return (
              <Card key={chapter.id} className="overflow-hidden border shadow-sm">
                <div 
                  className="flex items-center justify-between p-4 bg-muted/40 hover:bg-muted/60 transition-colors cursor-pointer border-b"
                  onClick={() => toggleChapter(chapter.id)}
                >
                  <div className="flex items-center gap-3">
                    <Button variant="ghost" size="icon" className="h-6 w-6 shrink-0 pointer-events-none">
                      {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                    </Button>
                    <div className="font-semibold text-lg flex items-center gap-2">
                      <span className="text-primary-600">Chương {index + 1}:</span> {chapter.title}
                    </div>
                    <Badge variant="secondary" className="ml-2 font-normal text-xs">{lessons.length} bài học</Badge>
                  </div>
                  
                  <div className="flex items-center gap-1" onClick={e => e.stopPropagation()}>
                    <Button variant="ghost" size="sm" onClick={() => handleOpenAddLesson(chapter.id)} className="h-8 hidden sm:flex text-primary-600">
                      <Plus className="h-3 w-3 mr-1" /> Thêm bài
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleOpenEditChapter(chapter)} title="Sửa chương">
                      <Edit className="h-4 w-4 text-muted-foreground" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-red-600" onClick={() => deleteChapter(chapter.id)} title="Xóa chương">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {isExpanded && (
                  <div className="bg-card">
                    {lessons.length === 0 ? (
                      <div className="p-8 text-center text-muted-foreground border-b border-dashed">
                        Chương này chưa có bài học nào.
                        <div className="mt-4">
                          <Button variant="outline" size="sm" onClick={() => handleOpenAddLesson(chapter.id)}>
                            <Plus className="h-4 w-4 mr-2" /> Thêm bài học đầu tiên
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="divide-y">
                        {lessons.map((lesson, lIdx) => (
                          <div key={lesson.id} className="flex items-start sm:items-center justify-between p-4 hover:bg-muted/20 group">
                            <div className="flex items-start sm:items-center gap-4">
                              <GripVertical className="h-4 w-4 text-muted-foreground/30 hidden sm:block shrink-0" />
                              <div className="w-10 h-8 rounded bg-primary-50 text-primary-600 flex items-center justify-center shrink-0">
                                <Video className="h-4 w-4" />
                              </div>
                              <div>
                                <div className="font-medium text-sm sm:text-base mb-1">
                                  Bài {lIdx + 1}: {lesson.title}
                                </div>
                                <div className="text-xs text-muted-foreground flex gap-3">
                                  <span>Thời lượng: {Math.round(lesson.durationSeconds / 60)} phút</span>
                                  {lesson.videoUrl && <span className="text-blue-500 line-clamp-1 max-w-[200px]">Có Video</span>}
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-1 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleOpenEditLesson(lesson, chapter.id)}>
                                <Edit className="h-4 w-4 text-primary-600" />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-red-600" onClick={() => deleteLesson(lesson.id)}>
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                    {lessons.length > 0 && (
                       <div className="p-3 bg-muted/10 text-center sm:hidden border-t">
                          <Button variant="ghost" size="sm" onClick={() => handleOpenAddLesson(chapter.id)} className="w-full text-primary-600">
                            <Plus className="h-4 w-4 mr-2" /> Thêm bài học
                          </Button>
                       </div>
                    )}
                  </div>
                )}
              </Card>
            )
          })
        )}
      </div>

      {/* Dialog: Add/Edit Chapter */}
      <Dialog open={isChapterOpen} onOpenChange={setIsChapterOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{isChapterEdit ? 'Chỉnh sửa chương' : 'Thêm chương mới'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Tên chương</Label>
              <Input placeholder="Vd: Chương 1: Kiến thức tổng quan..." value={chapterTitle} onChange={e => setChapterTitle(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Mô tả ngắn (Không bắt buộc)</Label>
              <Textarea placeholder="Vd: Mục tiêu của chương này là..." value={chapterDescription} onChange={e => setChapterDescription(e.target.value)} rows={3} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsChapterOpen(false)}>Hủy</Button>
            <Button onClick={handleSaveChapter} disabled={!chapterTitle}>Lưu</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog: Add/Edit Lesson */}
      <Dialog open={isLessonOpen} onOpenChange={setIsLessonOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{isLessonEdit ? 'Chỉnh sửa bài học' : 'Thêm bài học mới'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4 max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar">
            <div className="space-y-2">
              <Label>Tên bài học</Label>
              <Input placeholder="Vd: Bài 1: Giới thiệu dự án..." value={lessonTitle} onChange={e => setLessonTitle(e.target.value)} />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Thuộc chương</Label>
                <select 
                  value={lessonChapterId} 
                  onChange={(e) => setLessonChapterId(e.target.value)}
                  className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                >
                  {chapters.map(c => (
                    <option key={c.id} value={c.id}>{c.title}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <Label>Thời lượng dự kiến (Phút)</Label>
                <Input type="number" min={1} value={lessonDurationMinutes} onChange={e => setLessonDurationMinutes(Number(e.target.value))} />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Link Video (URL/Youtube)</Label>
              <Input placeholder="https://..." value={lessonVideoUrl} onChange={e => setLessonVideoUrl(e.target.value)} />
              <p className="text-xs text-muted-foreground">Ví dụ: Link file mp4 hoặc link youtube.</p>
            </div>

            <div className="space-y-2">
              <Label>Nội dung văn bản / Tài liệu</Label>
              <Textarea 
                placeholder="Nhập nội dung bài học hoặc mô tả chi tiết..." 
                value={lessonContent} 
                onChange={e => setLessonContent(e.target.value)} 
                rows={6} 
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsLessonOpen(false)}>Hủy</Button>
            <Button onClick={handleSaveLesson} disabled={!lessonTitle || !lessonChapterId}>Lưu</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
