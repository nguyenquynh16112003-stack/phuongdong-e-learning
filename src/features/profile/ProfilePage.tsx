import * as React from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useAuthStore } from '@/stores/authStore'
import { Camera, Building2, Mail, Phone, MapPin, Shield } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'

export function ProfilePage() {
  const { user } = useAuthStore()

  if (!user) return null

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in pb-8">
      <h1 className="text-3xl font-heading font-bold mb-6">Hồ sơ cá nhân</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column - Avatar & Quick Info */}
        <div className="space-y-6">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="relative w-32 h-32 mx-auto mb-4">
                <Avatar className="w-full h-full border-4 border-white shadow-xl">
                  <AvatarImage src={user.avatarUrl} />
                  <AvatarFallback className="text-4xl bg-gradient-to-br from-primary-400 to-primary-600 text-white font-bold">
                    {user.fullName.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <Button size="icon" className="absolute bottom-0 right-0 rounded-full w-10 h-10 shadow-lg" variant="secondary">
                  <Camera className="h-5 w-5" />
                </Button>
              </div>
              
              <h2 className="text-xl font-bold font-heading mb-1">{user.fullName}</h2>
              <p className="text-sm text-muted-foreground mb-4">{user.roleName}</p>
              
              <div className="flex items-center justify-center gap-2 text-sm font-medium">
                <Badge variant="outline" className="bg-primary-50 text-primary-700 border-primary-200">
                  {user.department}
                </Badge>
                <Badge variant="outline" className="bg-secondary-50 text-secondary-700 border-secondary-200">
                  {user.branch}
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Trạng thái tài khoản</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                  <Shield className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium leading-none">Hoạt động bình thường</p>
                  <p className="text-xs text-muted-foreground mt-1">Lần đăng nhập cuối: {new Date().toLocaleDateString('vi-VN')}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Form */}
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Thông tin liên hệ</CardTitle>
              <CardDescription>Quản lý thông tin cá nhân và cách liên lạc với bạn</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Họ và tên</Label>
                  <Input value={user.fullName} disabled className="bg-muted/50" />
                </div>
                <div className="space-y-2">
                  <Label>Số CCCD / Mã NV</Label>
                  <Input value={user.cccd} disabled className="bg-muted/50" />
                </div>
              </div>
              
              <Separator />
              
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input defaultValue={user.email} className="pl-9" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Số điện thoại</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input defaultValue={user.phone} className="pl-9" />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Chi nhánh đang làm việc</Label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input value={`${user.branch} - ${user.department}`} disabled className="pl-9 bg-muted/50" />
                </div>
              </div>

              <div className="flex justify-end">
                <Button>Lưu thay đổi</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Đổi mật khẩu</CardTitle>
              <CardDescription>Cập nhật mật khẩu để bảo vệ tài khoản của bạn</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Mật khẩu hiện tại</Label>
                <Input type="password" />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Mật khẩu mới</Label>
                  <Input type="password" />
                </div>
                <div className="space-y-2">
                  <Label>Nhập lại mật khẩu mới</Label>
                  <Input type="password" />
                </div>
              </div>
              <div className="flex justify-end mt-4">
                <Button variant="secondary">Cập nhật mật khẩu</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
