import * as React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { useCourseStore } from '@/stores/courseStore'
import { Search, Plus, Edit, Trash2, Clock, CheckCircle } from 'lucide-react'

export function AdminTestsPage() {
  const { tests } = useCourseStore()
  const [searchTerm, setSearchTerm] = React.useState('')

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
        <Button><Plus className="h-4 w-4 mr-2" /> Tạo bài kiểm tra</Button>
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
                    <div className="text-xs text-muted-foreground mt-0.5">Số câu hỏi: {(test as any).questionsCount || 0}</div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-sm line-clamp-1 max-w-[200px]">{test.lessonTitle}</div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex flex-col gap-1 text-xs">
                      <div className="flex items-center gap-1.5"><Clock className="h-3 w-3" /> {(test as any).durationMinutes || test.timeLimitMinutes} phút</div>
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
                      <Button variant="ghost" size="icon" title="Sửa bài thi">
                        <Edit className="h-4 w-4 text-primary-600" />
                      </Button>
                      <Button variant="ghost" size="icon" title="Xóa">
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
