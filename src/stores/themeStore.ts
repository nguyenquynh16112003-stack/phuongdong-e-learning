import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface ThemeState {
  theme: 'light' | 'dark'
  toggleTheme: () => void
  setTheme: (theme: 'light' | 'dark') => void
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: 'light',
      toggleTheme: () => set(s => {
        const newTheme = s.theme === 'light' ? 'dark' : 'light'
        document.documentElement.classList.toggle('dark', newTheme === 'dark')
        return { theme: newTheme }
      }),
      setTheme: (theme) => {
        document.documentElement.classList.toggle('dark', theme === 'dark')
        set({ theme })
      },
    }),
    { name: 'phuong-dong-theme' }
  )
)
