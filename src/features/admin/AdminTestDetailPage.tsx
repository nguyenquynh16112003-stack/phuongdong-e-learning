import * as React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useCourseStore } from '@/stores/courseStore'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { ChevronLeft, Plus, Edit, Trash2, CheckCircle2, AlertCircle } from 'lucide-react'
import type { Answer } from '@/types'

export function AdminTestDetailPage() {
  const { testId } = useParams<{ testId: string }>()
  const navigate = useNavigate()
  
  const { tests, getQuestionsByTest, createQuestion, updateQuestion, deleteQuestion } = useCourseStore()

  const testInfo = tests.find(t => t.id === testId)
  const questions = getQuestionsByTest(testId || '')

  // Dialog States
  const [isOpen, setIsOpen] = React.useState(false)
  const [isEdit, setIsEdit] = React.useState(false)
  const [editId, setEditId] = React.useState('')
  const [content, setContent] = React.useState('')
  const [explanation, setExplanation] = React.useState('')
  
  const [answers, setAnswers] = React.useState<Answer[]>([
    { id: '1', questionId: '', label: 'A', content: '', isCorrect: true, orderIndex: 1 },
    { id: '2', questionId: '', label: 'B', content: '', isCorrect: false, orderIndex: 2 },
    { id: '3', questionId: '', label: 'C', content: '', isCorrect: false, orderIndex: 3 },
    { id: '4', questionId: '', label: 'D', content: '', isCorrect: false, orderIndex: 4 },
  ])

  const [errorMsg, setErrorMsg] = React.useState('')

  if (!testInfo) {
    return (
      <div className="p-8 text-center animate-fade-in">
        <h2 className="text-xl font-bold mb-4">Bài kiểm tra không tồn tại</h2>
        <Button onClick={() => navigate('/admin/tests')}>Quay lại danh sách</Button>
      </div>
    )
  }

  const handleOpenAdd = () => {
    setIsEdit(false)
    setEditId('')
    setContent('')
    setExplanation('')
    setAnswers([
      { id: '1', questionId: '', label: 'A', content: '', isCorrect: true, orderIndex: 1 },
      { id: '2', questionId: '', label: 'B', content: '', isCorrect: false, orderIndex: 2 },
      { id: '3', questionId: '', label: 'C', content: '', isCorrect: false, orderIndex: 3 },
      { id: '4', questionId: '', label: 'D', content: '', isCorrect: false, orderIndex: 4 },
    ])
    setErrorMsg('')
    setIsOpen(true)
  }

  const handleOpenEdit = (q: any) => {
    setIsEdit(true)
    setEditId(q.id)
    setContent(q.content)
    setExplanation(q.explanation || '')
    
    // Ensure we have exactly 4 answers
    let qAnswers = q.answers ? [...q.answers] : []
    if (qAnswers.length < 4) {
      const labels: ('A'|'B'|'C'|'D')[] = ['A', 'B', 'C', 'D']
      for (let i = qAnswers.length; i < 4; i++) {
        qAnswers.push({
          id: `tmp-${i}`, questionId: q.id, label: labels[i], content: '', isCorrect: false, orderIndex: i + 1
        })
      }
    }
    setAnswers(qAnswers)
    setErrorMsg('')
    setIsOpen(true)
  }

  const handleAnswerChange = (index: number, val: string) => {
    const newAnswers = [...answers]
    newAnswers[index] = { ...newAnswers[index], content: val }
    setAnswers(newAnswers)
  }

  const handleCorrectChange = (label: string) => {
    const newAnswers = answers.map(a => ({ ...a, isCorrect: a.label === label }))
    setAnswers(newAnswers)
  }

  const handleSave = () => {
    setErrorMsg('')
    if (!content.trim()) {
      setErrorMsg('Vui lòng nhập nội dung câu hỏi')
      return
    }
    
    // Ensure all 4 answers have content
    const emptyAnswers = answers.filter(a => !a.content.trim())
    if (emptyAnswers.length > 0) {
      setErrorMsg('Vui lòng điền đủ 4 phương án')
      return
    }

    if (!testId) return

    if (isEdit && editId) {
      updateQuestion(editId, {
        content,
        explanation,
        answers: answers.map(a => ({ ...a, questionId: editId }))
      })
    } else {
      createQuestion({
        testId,
        content,
        explanation,
        orderIndex: questions.length + 1,
        answers: answers.map(a => ({ ...a }))
      })
    }
    setIsOpen(false)
  }

  return (
    <div className="space-y-6 animate-fade-in pb-20">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-card p-6 rounded-xl shadow-sm border">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={() => navigate('/admin/tests')} className="shrink-0">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div>
            <div className="flex items-center gap-2 mb-1">
              {testInfo.isActive ? (
                <Badge className="bg-green-100 text-green-700 hover:bg-green-200 border-none text-xs">Đang áp dụng</Badge>
              ) : (
                <Badge className="bg-muted text-muted-foreground border-none text-xs">Đã ẩn</Badge>
              )}
              <Badge variant="outline" className="text-xs">{testInfo.lessonTitle}</Badge>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold line-clamp-1">{testInfo.title}</h1>
          </div>
        </div>
        
        <Button onClick={handleOpenAdd}>
          <Plus className="h-4 w-4 mr-2" /> Thêm Câu hỏi
        </Button>
      </div>

      <div className="flex gap-4 mb-4">
        <Card className="px-4 py-3 flex-1 flex items-center justify-between shadow-sm">
          <span className="text-muted-foreground font-medium text-sm">Tổng số câu hỏi:</span>
          <span className="font-bold text-lg text-primary-600">{questions.length}</span>
        </Card>
      </div>

      {/* Questions List */}
      <div className="space-y-4">
        {questions.length === 0 ? (
          <Card className="border-dashed border-2 bg-muted/30">
            <CardContent className="flex flex-col items-center justify-center py-16 text-center">
              <h3 className="text-xl font-bold mb-2">Ngân hàng câu hỏi trống</h3>
              <p className="text-muted-foreground max-w-md mb-6">
                Bài kiểm tra này chưa có câu hỏi nào. Hãy thêm câu hỏi đầu tiên.
              </p>
              <Button onClick={handleOpenAdd} size="lg">
                <Plus className="h-5 w-5 mr-2" /> Tạo câu hỏi đầu tiên
              </Button>
            </CardContent>
          </Card>
        ) : (
          questions.map((q, idx) => (
            <Card key={q.id} className="p-5 shadow-sm relative group overflow-hidden">
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1">
                  <div className="font-bold text-lg mb-3">
                    <span className="text-primary-600 mr-2">Câu {idx + 1}:</span>
                    {q.content}
                  </div>
                  
                  <div className="grid sm:grid-cols-2 gap-3 mb-4 pl-4">
                    {q.answers.map((ans) => (
                      <div key={ans.label} className={`flex items-start gap-2 p-2 rounded-lg border ${ans.isCorrect ? 'bg-green-50 border-green-200 text-green-900' : 'bg-muted/30 border-transparent text-muted-foreground'}`}>
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${ans.isCorrect ? 'bg-green-500 text-white' : 'bg-muted-foreground/20'}`}>
                          {ans.label}
                        </div>
                        <span className={`text-sm ${ans.isCorrect ? 'font-medium' : ''}`}>{ans.content}</span>
                        {ans.isCorrect && <CheckCircle2 className="h-4 w-4 text-green-500 ml-auto shrink-0 mt-1" />}
                      </div>
                    ))}
                  </div>
                  
                  {q.explanation && (
                    <div className="bg-blue-50 text-blue-800 p-3 rounded-lg text-sm border border-blue-100">
                      <span className="font-semibold">Giải thích: </span>{q.explanation}
                    </div>
                  )}
                </div>
                
                <div className="flex flex-col gap-2 shrink-0">
                  <Button variant="outline" size="sm" onClick={() => handleOpenEdit(q)}>
                    <Edit className="h-4 w-4 mr-2" /> Sửa
                  </Button>
                  <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50" onClick={() => deleteQuestion(q.id)}>
                    <Trash2 className="h-4 w-4 mr-2" /> Xóa
                  </Button>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>

      {/* Dialog Add/Edit */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto custom-scrollbar">
          <DialogHeader>
            <DialogTitle>{isEdit ? 'Sửa câu hỏi' : 'Tạo câu hỏi mới'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-6 py-4">
            
            {errorMsg && (
              <div className="flex items-center gap-2 p-3 bg-red-50 text-red-600 text-sm font-medium rounded-lg">
                <AlertCircle className="h-4 w-4 shrink-0" />
                {errorMsg}
              </div>
            )}

            <div className="space-y-2">
              <Label className="text-base font-bold text-primary-700">1. Nội dung câu hỏi</Label>
              <Textarea 
                placeholder="Nhập nội dung câu hỏi..." 
                value={content} 
                onChange={(e) => setContent(e.target.value)}
                rows={3}
                className="text-base"
              />
            </div>

            <div className="space-y-3">
              <Label className="text-base font-bold text-primary-700">2. Các phương án & Đáp án đúng</Label>
              <RadioGroup 
                value={answers.find(a => a.isCorrect)?.label || 'A'} 
                onValueChange={handleCorrectChange}
                className="space-y-3"
              >
                {answers.map((ans, idx) => (
                  <div key={ans.label} className={`flex items-start gap-3 p-3 rounded-xl border-2 transition-colors ${ans.isCorrect ? 'border-green-500 bg-green-50' : 'border-muted hover:border-primary-200'}`}>
                    <div className="flex flex-col items-center gap-2 mt-2 shrink-0">
                      <RadioGroupItem value={ans.label} id={`opt-${ans.label}`} />
                      <Label htmlFor={`opt-${ans.label}`} className={`font-bold ${ans.isCorrect ? 'text-green-600' : 'text-muted-foreground'}`}>Đúng</Label>
                    </div>
                    <div className="flex-1 space-y-1">
                      <Label htmlFor={`opt-${ans.label}`} className="text-xs text-muted-foreground font-semibold">Phương án {ans.label}</Label>
                      <Textarea 
                        placeholder={`Nhập phương án ${ans.label}...`}
                        value={ans.content}
                        onChange={(e) => handleAnswerChange(idx, e.target.value)}
                        className={`min-h-[60px] resize-none ${ans.isCorrect ? 'bg-white border-green-200 focus-visible:ring-green-500' : ''}`}
                      />
                    </div>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label className="text-base font-bold text-primary-700">3. Giải thích đáp án (Tùy chọn)</Label>
              <Textarea 
                placeholder="Giải thích vì sao lại chọn đáp án này..." 
                value={explanation} 
                onChange={(e) => setExplanation(e.target.value)}
                rows={2}
              />
              <p className="text-xs text-muted-foreground">Phần giải thích này sẽ hiện ra sau khi học viên nộp bài.</p>
            </div>

          </div>
          <DialogFooter className="sticky bottom-0 bg-background pt-4 pb-2 border-t mt-4">
            <Button variant="outline" onClick={() => setIsOpen(false)}>Hủy</Button>
            <Button onClick={handleSave}>Lưu câu hỏi</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
