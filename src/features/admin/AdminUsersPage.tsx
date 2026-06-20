import * as React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { useUserStore } from '@/stores/userStore'
import { Search, Plus, MoreHorizontal, ShieldAlert, CheckCircle2, XCircle } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'

export function AdminUsersPage() {
  const { users, toggleUserStatus } = useUserStore()
  const [searchTerm, setSearchTerm] = React.useState('')
  const [isAddOpen, setIsAddOpen] = React.useState(false)

  const filteredUsers = users.filter(u => 
    u.fullName.toLowerCase().includes(searchTerm.toLowerCase()) || 
    u.cccd.includes(searchTerm) ||
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getRoleBadge = (slug: string) => {
    switch (slug) {
      case 'super_admin': return <Badge className="bg-red-100 text-red-700 hover:bg-red-200 border-none">Admin</Badge>
      case 'giam_doc': return <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-200 border-none">Giám đốc</Badge>
      case 'truong_khu_vuc': return <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200 border-none">Trưởng KV</Badge>
      default: return <Badge variant="outline" className="text-muted-foreground">Chuyên viên</Badge>
    }
  }

  return (
    <div className="space-y-6 animate-fade-in pb-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold">Quản lý Người dùng</h1>
          <p className="text-muted-foreground mt-1">Quản lý tài khoản và phân quyền hệ thống</p>
        </div>
        
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger asChild>
            <Button><Plus className="h-4 w-4 mr-2" /> Thêm người dùng</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Thêm người dùng mới</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Họ và tên</Label>
                <Input placeholder="Nhập họ và tên..." />
              </div>
              <div className="space-y-2">
                <Label>CCCD / Mã nhân viên</Label>
                <Input placeholder="Dùng làm tên đăng nhập..." />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input type="email" placeholder="example@phuongdong.vn" />
                </div>
                <div className="space-y-2">
                  <Label>Phân quyền</Label>
                  <select className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                    <option value="chuyen_vien">Chuyên viên kinh doanh</option>
                    <option value="truong_khu_vuc">Trưởng khu vực</option>
                    <option value="giam_doc">Giám đốc</option>
                    <option value="super_admin">Quản trị viên</option>
                  </select>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddOpen(false)}>Hủy</Button>
              <Button onClick={() => setIsAddOpen(false)}>Lưu & Tạo tài khoản</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader className="pb-3 border-b">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <CardTitle className="text-lg flex items-center gap-2">
              Danh sách tài khoản ({filteredUsers.length})
            </CardTitle>
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Tìm theo tên, CCCD, email..." 
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-muted/50">
                <TableRow>
                  <TableHead className="w-[250px]">Người dùng</TableHead>
                  <TableHead>Vai trò</TableHead>
                  <TableHead>Chi nhánh / Phòng</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead>Đăng nhập cuối</TableHead>
                  <TableHead className="text-right">Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((u) => (
                  <TableRow key={u.id} className="hover:bg-muted/30">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center font-bold text-sm shrink-0">
                          {u.fullName.charAt(0)}
                        </div>
                        <div>
                          <div className="font-semibold text-sm">{u.fullName}</div>
                          <div className="text-xs text-muted-foreground">{u.cccd}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{getRoleBadge(u.roleSlug)}</TableCell>
                    <TableCell>
                      <div className="text-sm">{u.branch}</div>
                      <div className="text-xs text-muted-foreground">{u.department}</div>
                    </TableCell>
                    <TableCell>
                      {u.isActive ? (
                        <div className="flex items-center gap-1.5 text-green-600 text-sm font-medium">
                          <CheckCircle2 className="h-4 w-4" /> Hoạt động
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5 text-red-600 text-sm font-medium">
                          <XCircle className="h-4 w-4" /> Đã khóa
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {new Date(u.lastLoginAt).toLocaleDateString('vi-VN')}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" className="text-muted-foreground" title="Khóa/Mở khóa tài khoản" onClick={() => toggleUserStatus(u.id)}>
                        <ShieldAlert className={`h-4 w-4 ${!u.isActive ? 'text-green-500' : 'text-red-500'}`} />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-muted-foreground" title="Chi tiết">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                
                {filteredUsers.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="h-32 text-center text-muted-foreground">
                      Không tìm thấy người dùng nào phù hợp.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
