import * as React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { useCourseStore } from '@/stores/courseStore'
import { Search, Plus, Edit, Trash2, Clock, CheckCircle } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'

export function AdminTestsPage() {
  const { tests, lessons, createTest, updateTest, deleteTest } = useCourseStore()
  const [searchTerm, setSearchTerm] = React.useState('')

  // Dialog States
  const [isOpen, setIsOpen] = React.useState(false)
  const [isEdit, setIsEdit] = React.useState(false)
  const [editId, setEditId] = React.useState('')

  // Form States
  const [title, setTitle] = React.useState('')
  const [description, setDescription] = React.useState('')
  const [lessonId, setLessonId] = React.useState('')
  const [passingScore, setPassingScore] = React.useState(80)
  const [timeLimitMinutes, setTimeLimitMinutes] = React.useState(15)
  const [maxAttempts, setMaxAttempts] = React.useState(3)
  const [isActive, setIsActive] = React.useState(true)

  const handleOpenAdd = () => {
    setIsEdit(false)
    setEditId('')
    setTitle('')
    setDescription('')
    setLessonId(lessons[0]?.id || '')
    setPassingScore(80)
    setTimeLimitMinutes(15)
    setMaxAttempts(3)
    setIsActive(true)
    setIsOpen(true)
  }

  const handleOpenEdit = (test: any) => {
    setIsEdit(true)
    setEditId(test.id)
    setTitle(test.title)
    setDescription(test.description)
    setLessonId(test.lessonId)
    setPassingScore(test.passingScore)
    setTimeLimitMinutes(test.timeLimitMinutes || test.durationMinutes)
    setMaxAttempts(test.maxAttempts)
    setIsActive(test.isActive)
    setIsOpen(true)
  }

  const handleSave = () => {
    if (!title || !lessonId) return

    const selectedLesson = lessons.find(l => l.id === lessonId)
    const lessonTitle = selectedLesson ? selectedLesson.title : 'Chưa xác định'
    const courseId = selectedLesson ? selectedLesson.courseId : 'unknown'

    if (isEdit && editId) {
      updateTest(editId, {
        title,
        description,
        lessonId,
        lessonTitle,
        courseId,
        passingScore: Number(passingScore),
        timeLimitMinutes: Number(timeLimitMinutes),
        durationMinutes: Number(timeLimitMinutes),
        maxAttempts: Number(maxAttempts),
        isActive,
      })
    } else {
      createTest({
        title,
        description,
        lessonId,
        lessonTitle,
        courseId,
        passingScore: Number(passingScore),
        timeLimitMinutes: Number(timeLimitMinutes),
        durationMinutes: Number(timeLimitMinutes),
        maxAttempts: Number(maxAttempts),
        isActive,
        questionsCount: 5, // Mock questions count
        orderIndex: tests.length + 1,
      })
    }

    setIsOpen(false)
  }

  const filteredTests = tests.filter(t => 
    t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.lessonTitle.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6 animate-fade-in pb-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold">Quản lý Bài kiểm tra</h1>
          <p className="text-muted-foreground mt-1">Xây dựng ngân hàng câu hỏi và bài thi</p>
        </div>
        
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleOpenAdd}><Plus className="h-4 w-4 mr-2" /> Tạo bài kiểm tra</Button>
          </DialogTrigger>
          <DialogContent className="max-w-md sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>{isEdit ? 'Chỉnh sửa bài kiểm tra' : 'Tạo bài kiểm tra mới'}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Tiêu đề bài thi</Label>
                <Input placeholder="Nhập tiêu đề..." value={title} onChange={(e) => setTitle(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Mô tả ngắn</Label>
                <Textarea placeholder="Nhập hướng dẫn làm bài..." value={description} onChange={(e) => setDescription(e.target.value)} rows={2} />
              </div>
              <div className="space-y-2">
                <Label>Thuộc bài học</Label>
                <select 
                  value={lessonId} 
                  onChange={(e) => setLessonId(e.target.value)}
                  className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {lessons.map(lesson => (
                    <option key={lesson.id} value={lesson.id}>
                      {lesson.title} ({lesson.chapterTitle})
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Thời gian (phút)</Label>
                  <Input type="number" value={timeLimitMinutes} onChange={(e) => setTimeLimitMinutes(Number(e.target.value))} />
                </div>
                <div className="space-y-2">
                  <Label>Điểm sàn đạt (%)</Label>
                  <Input type="number" value={passingScore} onChange={(e) => setPassingScore(Number(e.target.value))} />
                </div>
                <div className="space-y-2">
                  <Label>Lượt thi tối đa</Label>
                  <Input type="number" value={maxAttempts} onChange={(e) => setMaxAttempts(Number(e.target.value))} />
                </div>
              </div>
              <div className="flex items-center gap-2 pt-2">
                <input 
                  type="checkbox" 
                  id="isActive" 
                  checked={isActive} 
                  onChange={(e) => setIsActive(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                />
                <Label htmlFor="isActive" className="cursor-pointer">Áp dụng bài kiểm tra này ngay</Label>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsOpen(false)}>Hủy</Button>
              <Button onClick={handleSave} disabled={!title || !lessonId}>Lưu</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-card p-4 rounded-xl shadow-sm border">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Tìm kiếm bài kiểm tra..." 
            className="pl-9 bg-background"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-muted/50 text-muted-foreground font-semibold">
              <tr>
                <th className="px-4 py-3">Tên bài kiểm tra</th>
                <th className="px-4 py-3">Thuộc bài học</th>
                <th className="px-4 py-3">Cấu hình</th>
                <th className="px-4 py-3">Trạng thái</th>
                <th className="px-4 py-3 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredTests.map(test => (
                <tr key={test.id} className="hover:bg-muted/20 transition-colors">
                  <td className="px-4 py-4">
                    <div className="font-semibold text-base">{test.title}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">Số câu hỏi: {test.questionsCount || 0}</div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-sm line-clamp-1 max-w-[200px]">{test.lessonTitle}</div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex flex-col gap-1 text-xs">
                      <div className="flex items-center gap-1.5"><Clock className="h-3 w-3" /> {test.timeLimitMinutes || test.durationMinutes} phút</div>
                      <div className="flex items-center gap-1.5 text-green-600"><CheckCircle className="h-3 w-3" /> {test.passingScore}% (Điểm đạt)</div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    {test.isActive ? (
                      <Badge className="bg-green-100 text-green-700 hover:bg-green-200 border-none">Đang áp dụng</Badge>
                    ) : (
                      <Badge className="bg-muted text-muted-foreground border-none">Đã ẩn</Badge>
                    )}
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="icon" onClick={() => handleOpenEdit(test)} title="Sửa bài thi">
                        <Edit className="h-4 w-4 text-primary-600" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => deleteTest(test.id)} title="Xóa">
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredTests.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-12 text-center text-muted-foreground">
                    Không tìm thấy bài kiểm tra nào
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
