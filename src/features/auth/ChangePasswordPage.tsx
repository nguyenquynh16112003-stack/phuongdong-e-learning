import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/stores/authStore'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { AlertCircle, CheckCircle2, Building2 } from 'lucide-react'

export function ChangePasswordPage() {
  const [currentPassword, setCurrentPassword] = React.useState('')
  const [newPassword, setNewPassword] = React.useState('')
  const [confirmPassword, setConfirmPassword] = React.useState('')
  const [error, setError] = React.useState('')
  const [isLoading, setIsLoading] = React.useState(false)
  
  const { user, changePassword } = useAuthStore()
  const navigate = useNavigate()

  // Password requirements
  const hasMinLength = newPassword.length >= 8
  const hasUpperCase = /[A-Z]/.test(newPassword)
  const hasNumber = /[0-9]/.test(newPassword)
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(newPassword)
  const isMatch = newPassword === confirmPassword && newPassword !== ''

  const isValid = hasMinLength && hasUpperCase && hasNumber && hasSpecialChar && isMatch

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!isValid) {
      setError('Vui lòng đảm bảo mật khẩu đáp ứng đủ các yêu cầu bảo mật.')
      return
    }

    setIsLoading(true)
    try {
      const success = await changePassword(currentPassword, newPassword)
      if (success) {
        navigate('/dashboard')
      } else {
        setError('Mật khẩu hiện tại không chính xác.')
      }
    } catch (err) {
      setError('Có lỗi xảy ra. Vui lòng thử lại.')
    } finally {
      setIsLoading(false)
    }
  }

  const RequirementItem = ({ met, text }: { met: boolean, text: string }) => (
    <div className={`flex items-center gap-2 text-sm ${met ? 'text-green-600 dark:text-green-500' : 'text-muted-foreground'}`}>
      <CheckCircle2 className={`h-4 w-4 ${met ? 'opacity-100' : 'opacity-30'}`} />
      <span>{text}</span>
    </div>
  )

  if (!user) {
    navigate('/login')
    return null
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-background">
      <div className="w-full max-w-md animate-fade-in">
        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-primary-600 flex items-center justify-center shadow-lg">
            <Building2 className="h-10 w-10 text-white" />
          </div>
        </div>

        <Card className="border-0 shadow-2xl">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold">Đổi mật khẩu bắt buộc</CardTitle>
            <CardDescription>
              Đây là lần đăng nhập đầu tiên của bạn. Vui lòng đổi mật khẩu để bảo mật tài khoản.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-6">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current">Mật khẩu hiện tại</Label>
                <Input
                  id="current"
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="new">Mật khẩu mới</Label>
                <Input
                  id="new"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirm">Nhập lại mật khẩu mới</Label>
                <Input
                  id="confirm"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>

              <div className="bg-muted/50 p-4 rounded-lg space-y-2 mt-6">
                <p className="text-sm font-semibold mb-2">Yêu cầu mật khẩu:</p>
                <RequirementItem met={hasMinLength} text="Ít nhất 8 ký tự" />
                <RequirementItem met={hasUpperCase} text="Có ít nhất 1 chữ hoa" />
                <RequirementItem met={hasNumber} text="Có ít nhất 1 chữ số" />
                <RequirementItem met={hasSpecialChar} text="Có ít nhất 1 ký tự đặc biệt" />
                <RequirementItem met={isMatch} text="Mật khẩu nhập lại khớp" />
              </div>

              <Button
                type="submit"
                className="w-full mt-6"
                disabled={isLoading || !isValid || !currentPassword}
              >
                {isLoading ? 'Đang cập nhật...' : 'Cập nhật mật khẩu'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
