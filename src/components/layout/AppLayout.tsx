import * as React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { useAuthStore } from '@/stores/authStore'
import { Sidebar } from './Sidebar'
import { Header } from './Header'
import { MobileNav } from './MobileNav'
import { Sheet, SheetContent } from '@/components/ui/sheet'
import { useMediaQuery } from '@/hooks/useMediaQuery'

export function AppLayout() {
  const { user, isAuthenticated } = useAuthStore()
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)

  // React to screen size changes
  React.useEffect(() => {
    if (!isDesktop) {
      setIsSidebarOpen(false)
    } else {
      setIsSidebarOpen(true)
      setIsMobileMenuOpen(false)
    }
  }, [isDesktop])

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />
  }

  if (user.mustChangePassword) {
    return <Navigate to="/change-password" replace />
  }

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Desktop Sidebar */}
      {isDesktop && (
        <Sidebar isOpen={isSidebarOpen} />
      )}

      {/* Mobile Sidebar via Sheet */}
      {!isDesktop && (
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetContent side="left" className="p-0 w-64">
            <Sidebar isOpen={true} className="border-none shadow-none w-full" />
          </SheetContent>
        </Sheet>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-full">
        <Header onMenuClick={() => isDesktop ? setIsSidebarOpen(!isSidebarOpen) : setIsMobileMenuOpen(true)} />
        
        <main className="flex-1 overflow-y-auto overflow-x-hidden p-4 lg:p-8 pb-20 lg:pb-8">
          <div className="mx-auto max-w-7xl h-full animate-fade-in">
            <Outlet />
          </div>
        </main>

        <MobileNav />
      </div>
    </div>
  )
}
