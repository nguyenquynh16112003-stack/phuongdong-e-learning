import * as React from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useAuthStore } from '@/stores/authStore'
import { Camera, Building2, Mail, Phone, Shield, CheckCircle2, AlertCircle } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'

export function ProfilePage() {
  const { user, updateUser, changePassword } = useAuthStore()

  const [email, setEmail] = React.useState(user?.email || '')
  const [phone, setPhone] = React.useState(user?.phone || '')
  const [profileSaved, setProfileSaved] = React.useState(false)

  const [currentPass, setCurrentPass] = React.useState('')
  const [newPass, setNewPass] = React.useState('')
  const [confirmPass, setConfirmPass] = React.useState('')
  const [passError, setPassError] = React.useState('')
  const [passSuccess, setPassSuccess] = React.useState(false)
  const [isChangingPass, setIsChangingPass] = React.useState(false)

  if (!user) return null

  const handleSaveProfile = () => {
    updateUser({ email, phone })
    setProfileSaved(true)
    setTimeout(() => setProfileSaved(false), 3000)
  }

  const handleChangePassword = async () => {
    setPassError('')
    setPassSuccess(false)

    if (!currentPass) {
      setPassError('Vui lòng nhập mật khẩu hiện tại')
      return
    }
    if (newPass.length < 6) {
      setPassError('Mật khẩu mới phải có ít nhất 6 ký tự')
      return
    }
    if (newPass !== confirmPass) {
      setPassError('Mật khẩu mới và xác nhận không khớp')
      return
    }

    setIsChangingPass(true)
    const ok = await changePassword(currentPass, newPass)
    setIsChangingPass(false)
    
    if (ok) {
      setPassSuccess(true)
      setCurrentPass('')
      setNewPass('')
      setConfirmPass('')
      setTimeout(() => setPassSuccess(false), 5000)
    } else {
      setPassError('Mật khẩu hiện tại không đúng')
    }
  }

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
                  <p className="text-xs text-muted-foreground mt-1">Lần đăng nhập cuối: {user.lastLoginAt ? new Date(user.lastLoginAt).toLocaleDateString('vi-VN') : new Date().toLocaleDateString('vi-VN')}</p>
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
                    <Input value={email} onChange={e => setEmail(e.target.value)} className="pl-9" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Số điện thoại</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input value={phone} onChange={e => setPhone(e.target.value)} className="pl-9" />
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

              <div className="flex items-center justify-between">
                {profileSaved && (
                  <div className="flex items-center gap-2 text-sm text-green-600 font-medium animate-fade-in">
                    <CheckCircle2 className="h-4 w-4" /> Đã lưu thành công!
                  </div>
                )}
                <div className="ml-auto">
                  <Button onClick={handleSaveProfile}>Lưu thay đổi</Button>
                </div>
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
                <Input type="password" value={currentPass} onChange={e => setCurrentPass(e.target.value)} placeholder="Nhập mật khẩu hiện tại..." />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Mật khẩu mới</Label>
                  <Input type="password" value={newPass} onChange={e => setNewPass(e.target.value)} placeholder="Nhập mật khẩu mới..." />
                </div>
                <div className="space-y-2">
                  <Label>Nhập lại mật khẩu mới</Label>
                  <Input type="password" value={confirmPass} onChange={e => setConfirmPass(e.target.value)} placeholder="Xác nhận mật khẩu mới..." />
                </div>
              </div>
              
              {passError && (
                <div className="flex items-center gap-2 text-sm text-red-600 font-medium p-3 bg-red-50 rounded-lg">
                  <AlertCircle className="h-4 w-4 shrink-0" /> {passError}
                </div>
              )}
              {passSuccess && (
                <div className="flex items-center gap-2 text-sm text-green-600 font-medium p-3 bg-green-50 rounded-lg">
                  <CheckCircle2 className="h-4 w-4 shrink-0" /> Đã cập nhật mật khẩu thành công!
                </div>
              )}

              <div className="flex justify-end mt-4">
                <Button variant="secondary" onClick={handleChangePassword} disabled={isChangingPass}>
                  {isChangingPass ? 'Đang xử lý...' : 'Cập nhật mật khẩu'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
