import * as React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { useCourseStore } from '@/stores/courseStore'
import { Search, Plus, Edit, Trash2, Eye, LayoutGrid, List } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export function AdminCoursesPage() {
  const { courses, togglePublishCourse } = useCourseStore()
  const [searchTerm, setSearchTerm] = React.useState('')
  const [viewMode, setViewMode] = React.useState<'grid' | 'list'>('list')
  const navigate = useNavigate()

  const filteredCourses = courses.filter(c => 
    c.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6 animate-fade-in pb-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold">Quản lý Khóa học</h1>
          <p className="text-muted-foreground mt-1">Biên soạn, chỉnh sửa nội dung đào tạo</p>
        </div>
        <Button><Plus className="h-4 w-4 mr-2" /> Tạo khóa học mới</Button>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-card p-4 rounded-xl shadow-sm border">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Tìm kiếm khóa học..." 
            className="pl-9 bg-background"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
          <Button 
            variant={viewMode === 'list' ? 'default' : 'outline'} 
            size="icon"
            onClick={() => setViewMode('list')}
          >
            <List className="h-4 w-4" />
          </Button>
          <Button 
            variant={viewMode === 'grid' ? 'default' : 'outline'} 
            size="icon"
            onClick={() => setViewMode('grid')}
          >
            <LayoutGrid className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {viewMode === 'list' ? (
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-muted/50 text-muted-foreground font-semibold">
                <tr>
                  <th className="px-4 py-3">Khóa học</th>
                  <th className="px-4 py-3">Danh mục</th>
                  <th className="px-4 py-3">Bài học</th>
                  <th className="px-4 py-3">Trạng thái</th>
                  <th className="px-4 py-3 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredCourses.map(course => (
                  <tr key={course.id} className="hover:bg-muted/20 transition-colors">
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-4">
                        <img src={course.thumbnailUrl} alt={course.title} className="w-16 h-12 object-cover rounded-md" />
                        <div>
                          <div className="font-semibold text-base line-clamp-1">{course.title}</div>
                          <div className="text-xs text-muted-foreground mt-0.5">Tạo bởi: {course.createdByName}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <Badge variant="outline">{course.category}</Badge>
                    </td>
                    <td className="px-4 py-4 font-medium text-center sm:text-left">
                      {course.lessonsCount} bài
                    </td>
                    <td className="px-4 py-4">
                      {course.isPublished ? (
                        <Badge className="bg-green-100 text-green-700 hover:bg-green-200 border-none">Đã xuất bản</Badge>
                      ) : (
                        <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-200 border-none">Bản nháp</Badge>
                      )}
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="icon" onClick={() => navigate(`/courses/${course.id}`)} title="Xem thử">
                          <Eye className="h-4 w-4 text-blue-600" />
                        </Button>
                        <Button variant="ghost" size="icon" title="Sửa nội dung">
                          <Edit className="h-4 w-4 text-primary-600" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => togglePublishCourse(course.id)} title={course.isPublished ? "Hủy xuất bản" : "Xuất bản"}>
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredCourses.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-4 py-12 text-center text-muted-foreground">
                      Không tìm thấy khóa học nào
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCourses.map(course => (
            <Card key={course.id} className="overflow-hidden group flex flex-col">
              <div className="relative aspect-video">
                <img src={course.thumbnailUrl} alt={course.title} className="w-full h-full object-cover" />
                <div className="absolute top-2 right-2">
                  {course.isPublished ? (
                    <Badge className="bg-green-500 hover:bg-green-600 border-none">Đã xuất bản</Badge>
                  ) : (
                    <Badge className="bg-yellow-500 hover:bg-yellow-600 border-none">Bản nháp</Badge>
                  )}
                </div>
              </div>
              <CardContent className="p-4 flex-1 flex flex-col">
                <h3 className="font-bold line-clamp-2 mb-2 text-lg">{course.title}</h3>
                <div className="text-sm text-muted-foreground mb-4">
                  {course.lessonsCount} bài học • {course.pointsReward} XP
                </div>
                <div className="mt-auto flex items-center justify-between border-t pt-4">
                  <span className="text-xs text-muted-foreground">Cập nhật: {new Date(course.updatedAt).toLocaleDateString('vi-VN')}</span>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8"><Edit className="h-4 w-4 text-primary-600" /></Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8"><Trash2 className="h-4 w-4 text-red-500" /></Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
