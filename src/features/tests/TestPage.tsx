import * as React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useCourseStore } from '@/stores/courseStore'
import { useTestStore } from '@/stores/testStore'
import { useProgressStore } from '@/stores/progressStore'
import { useAuthStore } from '@/stores/authStore'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { AlertCircle, CheckCircle2, Clock, XCircle, ChevronRight, RefreshCcw } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

export function TestPage() {
  const { courseId, lessonId } = useParams<{ courseId: string, lessonId: string }>()
  const navigate = useNavigate()
  const { user } = useAuthStore()
  
  const { fetchCourseById, tests, fetchLessonById } = useCourseStore()
  const { submitTest, getLatestResult } = useTestStore()
  const { markLessonComplete } = useProgressStore()

  const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState(0)
  const [answers, setAnswers] = React.useState<Record<string, string>>({})
  const [timeLeft, setTimeLeft] = React.useState(0)
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [testResult, setTestResult] = React.useState<any>(null)

  const course = fetchCourseById(courseId || '')
  const lesson = fetchLessonById(lessonId || '')
  const testInfo = tests.find(t => t.lessonId === lessonId)
  
  // Dummy questions since we don't have them in types yet
  const questions = React.useMemo(() => [
    { id: 'q1', text: 'Khách hàng có nhu cầu mua đầu tư, yếu tố nào quan trọng nhất?', options: [
      { id: 'o1', text: 'Tiện ích nội khu' },
      { id: 'o2', text: 'Thiết kế căn hộ' },
      { id: 'o3', text: 'Tiềm năng tăng giá và dòng tiền' },
      { id: 'o4', text: 'Hướng phong thủy' },
    ], correctOptionId: 'o3' },
    { id: 'q2', text: 'Chính sách bán hàng dự án A, mức chiết khấu thanh toán sớm là bao nhiêu?', options: [
      { id: 'o1', text: '5%' },
      { id: 'o2', text: '7%' },
      { id: 'o3', text: '10%' },
      { id: 'o4', text: '12%' },
    ], correctOptionId: 'o3' },
    { id: 'q3', text: 'Kỹ năng nào KHÔNG thuộc quy trình xử lý từ chối?', options: [
      { id: 'o1', text: 'Lắng nghe đồng cảm' },
      { id: 'o2', text: 'Cô lập vấn đề' },
      { id: 'o3', text: 'Tranh luận để chứng minh khách sai' },
      { id: 'o4', text: 'Đưa ra giải pháp' },
    ], correctOptionId: 'o3' },
  ], [])

  // Timer logic
  React.useEffect(() => {
    if (testInfo && !testResult && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timer)
            handleAutoSubmit()
            return 0
          }
          return prev - 1
        })
      }, 1000)
      return () => clearInterval(timer)
    }
  }, [testInfo, testResult, timeLeft])

  // Initial load
  React.useEffect(() => {
    if (testInfo) {
      setTimeLeft(testInfo.durationMinutes * 60)
    }
  }, [testInfo])

  if (!course || !lesson || !testInfo || !user) {
    return <div className="p-8 text-center">Không tìm thấy bài kiểm tra</div>
  }

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
    const s = seconds % 60
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
  }

  const handleAnswerChange = (questionId: string, optionId: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: optionId }))
  }

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1)
    }
  }

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1)
    }
  }

  const handleAutoSubmit = () => {
    handleSubmit()
  }

  const handleSubmit = async () => {
    if (isSubmitting) return
    setIsSubmitting(true)
    
    // Calculate score
    let correctCount = 0
    questions.forEach(q => {
      if (answers[q.id] === q.correctOptionId) {
        correctCount++
      }
    })
    
    const score = Math.round((correctCount / questions.length) * 100)
    const isPassed = score >= testInfo.passingScore

    // Save result
    const result = submitTest({
      testId: testInfo.id,
      userId: user.id,
      score,
      isPassed,
      completedAt: new Date().toISOString(),
      answers,
    })

    if (isPassed) {
      markLessonComplete(user.id, lessonId || '')
    }

    setTestResult(result)
    setIsSubmitting(false)
  }

  const isAllAnswered = Object.keys(answers).length === questions.length

  // Render Result View
  if (testResult) {
    return (
      <div className="max-w-2xl mx-auto mt-8 animate-fade-in pb-12">
        <Card className="border-0 shadow-lg text-center overflow-hidden">
          <div className={`h-3 ${testResult.isPassed ? 'bg-green-500' : 'bg-red-500'}`}></div>
          <CardHeader className="pt-8">
            <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 ${
              testResult.isPassed ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
            }`}>
              {testResult.isPassed ? <CheckCircle2 className="w-12 h-12" /> : <XCircle className="w-12 h-12" />}
            </div>
            <CardTitle className="text-3xl font-bold font-heading">
              {testResult.isPassed ? 'Chúc mừng!' : 'Chưa đạt yêu cầu'}
            </CardTitle>
            <p className="text-muted-foreground mt-2">
              Bạn đã hoàn thành bài kiểm tra: {testInfo.title}
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex justify-center gap-8 py-6 bg-muted/30 rounded-xl">
              <div>
                <div className="text-sm text-muted-foreground mb-1">Điểm số</div>
                <div className={`text-4xl font-bold ${testResult.isPassed ? 'text-green-600' : 'text-red-600'}`}>
                  {testResult.score}%
                </div>
              </div>
              <div className="w-px bg-border"></div>
              <div>
                <div className="text-sm text-muted-foreground mb-1">Điểm đạt</div>
                <div className="text-4xl font-bold text-muted-foreground">
                  {testInfo.passingScore}%
                </div>
              </div>
            </div>

            {testResult.isPassed ? (
              <Alert variant="success" className="text-left bg-green-50 border-green-200">
                <CheckCircle2 className="h-4 w-4" />
                <AlertTitle>Tuyệt vời!</AlertTitle>
                <AlertDescription>
                  Bạn đã nắm vững kiến thức của bài học này và được cộng điểm XP. Hãy tiếp tục phát huy nhé!
                </AlertDescription>
              </Alert>
            ) : (
              <Alert variant="destructive" className="text-left">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Cần cố gắng thêm</AlertTitle>
                <AlertDescription>
                  Điểm của bạn chưa đạt mức yêu cầu tối thiểu. Vui lòng xem lại bài giảng và làm lại bài kiểm tra.
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
          <CardFooter className="flex-col sm:flex-row gap-3 justify-center pb-8">
            {!testResult.isPassed && (
              <Button onClick={() => window.location.reload()} variant="outline" className="w-full sm:w-auto">
                <RefreshCcw className="mr-2 h-4 w-4" /> Làm lại bài kiểm tra
              </Button>
            )}
            <Button 
              onClick={() => navigate(`/courses/${course.id}`)}
              className={`w-full sm:w-auto ${testResult.isPassed ? 'bg-green-600 hover:bg-green-700 text-white' : ''}`}
            >
              Quay lại khóa học <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  const currentQuestion = questions[currentQuestionIndex]

  // Render Taking Test View
  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fade-in pb-20">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{testInfo.title}</h1>
          <p className="text-muted-foreground">{lesson.title}</p>
        </div>
        <div className={`flex items-center gap-2 px-4 py-2 rounded-lg font-mono font-medium text-lg ${
          timeLeft < 60 ? 'bg-red-100 text-red-600 animate-pulse' : 'bg-muted text-foreground'
        }`}>
          <Clock className="w-5 h-5" />
          {formatTime(timeLeft)}
        </div>
      </div>

      <div className="flex gap-2 flex-wrap">
        {questions.map((q, idx) => (
          <button
            key={q.id}
            onClick={() => setCurrentQuestionIndex(idx)}
            className={`w-10 h-10 rounded-md text-sm font-medium transition-colors
              ${currentQuestionIndex === idx ? 'ring-2 ring-primary-500 ring-offset-2 bg-primary-100 text-primary-700' : 
                answers[q.id] ? 'bg-primary-500 text-white' : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }
            `}
          >
            {idx + 1}
          </button>
        ))}
      </div>

      <Card className="min-h-[400px] flex flex-col">
        <CardHeader>
          <CardTitle className="text-lg">Câu hỏi {currentQuestionIndex + 1} / {questions.length}</CardTitle>
        </CardHeader>
        <CardContent className="flex-1">
          <p className="text-lg font-medium mb-6">{currentQuestion.text}</p>
          
          <RadioGroup 
            value={answers[currentQuestion.id] || ''} 
            onValueChange={(val) => handleAnswerChange(currentQuestion.id, val)}
            className="space-y-3"
          >
            {currentQuestion.options.map((option) => (
              <div 
                key={option.id} 
                className={`flex items-center space-x-3 space-y-0 p-4 border rounded-xl cursor-pointer transition-colors
                  ${answers[currentQuestion.id] === option.id ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20' : 'hover:bg-muted/50'}
                `}
                onClick={() => handleAnswerChange(currentQuestion.id, option.id)}
              >
                <RadioGroupItem value={option.id} id={option.id} />
                <Label htmlFor={option.id} className="flex-1 cursor-pointer font-normal text-base leading-relaxed">
                  {option.text}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
        <CardFooter className="flex justify-between border-t p-6 bg-muted/10">
          <Button variant="outline" onClick={handlePrev} disabled={currentQuestionIndex === 0}>
            Câu trước
          </Button>
          
          {currentQuestionIndex < questions.length - 1 ? (
            <Button onClick={handleNext}>
              Câu tiếp theo
            </Button>
          ) : (
            <Button 
              onClick={handleSubmit} 
              disabled={!isAllAnswered || isSubmitting}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              {isSubmitting ? 'Đang nộp...' : 'Nộp bài'}
            </Button>
          )}
        </CardFooter>
      </Card>
      
      {!isAllAnswered && currentQuestionIndex === questions.length - 1 && (
        <Alert variant="warning">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Chú ý</AlertTitle>
          <AlertDescription>
            Bạn vẫn còn câu hỏi chưa trả lời. Hãy kiểm tra lại trước khi nộp bài.
          </AlertDescription>
        </Alert>
      )}
    </div>
  )
}
