import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/stores/authStore'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { AlertCircle, Eye, EyeOff, Building2 } from 'lucide-react'
import { Checkbox } from '@/components/ui/checkbox'

export function LoginPage() {
  const [cccd, setCccd] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [showPassword, setShowPassword] = React.useState(false)
  const [rememberMe, setRememberMe] = React.useState(false)
  const { login, isLoading, error, clearError } = useAuthStore()
  const navigate = useNavigate()

  React.useEffect(() => {
    clearError()
  }, [clearError])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!cccd || !password) return
    
    const { success, mustChangePassword } = await login(cccd, password)
    
    if (success) {
      if (mustChangePassword) {
        navigate('/change-password')
      } else {
        navigate('/dashboard')
      }
    }
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-background">
      {/* Left side - Branding/Illustration */}
      <div className="hidden md:flex md:w-1/2 bg-primary-600 relative overflow-hidden flex-col justify-center items-center p-12 text-white">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-primary-900/80 to-transparent"></div>
        
        <div className="relative z-10 w-full max-w-md animate-slide-in-left">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center shadow-2xl shadow-primary-900/50">
              <Building2 className="h-10 w-10 text-primary-600" />
            </div>
            <div>
              <h1 className="text-3xl font-heading font-bold">Phương Đông</h1>
              <p className="text-primary-200 font-medium tracking-wide">E-LEARNING SYSTEM</p>
            </div>
          </div>
          
          <h2 className="text-4xl font-heading font-bold mb-6 leading-tight">
            Nền tảng đào tạo <br/>
            <span className="text-secondary-400">chuyên nghiệp</span> dành cho <br/>
            Chuyên viên Kinh doanh
          </h2>
          
          <p className="text-primary-100 text-lg mb-12 max-w-sm">
            Nâng cao năng lực, phát triển kỹ năng và theo dõi tiến trình học tập của bạn mọi lúc, mọi nơi.
          </p>
          
          <div className="flex gap-4">
            <div className="bg-primary-500/50 backdrop-blur-sm p-4 rounded-xl border border-primary-400/30 flex-1">
              <div className="text-2xl font-bold text-white mb-1">10+</div>
              <div className="text-sm text-primary-200">Khóa học chuyên sâu</div>
            </div>
            <div className="bg-primary-500/50 backdrop-blur-sm p-4 rounded-xl border border-primary-400/30 flex-1">
              <div className="text-2xl font-bold text-white mb-1">200+</div>
              <div className="text-sm text-primary-200">Giờ học video</div>
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-20 right-20 w-64 h-64 bg-secondary-500 rounded-full mix-blend-multiply filter blur-[80px] opacity-40 animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-tertiary-500 rounded-full mix-blend-multiply filter blur-[100px] opacity-40"></div>
      </div>

      {/* Right side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-12 relative">
        <div className="w-full max-w-md animate-fade-in">
          {/* Mobile logo */}
          <div className="md:hidden flex flex-col items-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-primary-600 flex items-center justify-center shadow-lg mb-4">
              <Building2 className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-2xl font-heading font-bold text-primary-600">Phương Đông E-Learning</h1>
          </div>

          <div className="text-center mb-8 md:text-left">
            <h2 className="text-3xl font-heading font-bold text-foreground mb-2">Đăng nhập</h2>
            <p className="text-muted-foreground">Vui lòng sử dụng CCCD để truy cập hệ thống</p>
          </div>

          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="cccd">Số CCCD / Tên đăng nhập</Label>
              <Input
                id="cccd"
                placeholder="Nhập số CCCD của bạn"
                value={cccd}
                onChange={(e) => setCccd(e.target.value)}
                required
                autoComplete="username"
                className="h-12"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Mật khẩu</Label>
                <a href="#" className="text-sm font-medium text-primary-600 hover:text-primary-500 hover:underline">
                  Quên mật khẩu?
                </a>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Nhập mật khẩu"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  className="h-12 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox 
                id="remember" 
                checked={rememberMe} 
                onCheckedChange={(c) => setRememberMe(c as boolean)} 
              />
              <Label htmlFor="remember" className="text-sm font-normal cursor-pointer">
                Ghi nhớ đăng nhập
              </Label>
            </div>

            <Button
              type="submit"
              className="w-full h-12 text-lg font-semibold mt-6 bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 shadow-primary"
              disabled={isLoading || !cccd || !password}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white"></div>
                  <span>Đang đăng nhập...</span>
                </div>
              ) : (
                'Đăng nhập'
              )}
            </Button>
          </form>

          <div className="mt-8 text-center text-sm text-muted-foreground">
            Hệ thống đào tạo nội bộ. Không có tài khoản? <br className="sm:hidden" />
            <span className="text-foreground font-medium">Vui lòng liên hệ Admin.</span>
          </div>
        </div>
      </div>
    </div>
  )
}
