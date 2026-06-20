import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDuration(seconds: number): string {
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = seconds % 60
  if (h > 0) return `${h}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`
  return `${m}:${String(s).padStart(2,'0')}`
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('vi-VN', {
    day: '2-digit', month: '2-digit', year: 'numeric'
  })
}

export function formatDateTime(dateStr: string): string {
  return new Date(dateStr).toLocaleString('vi-VN', {
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit'
  })
}

export function formatTimeAgo(dateStr: string): string {
  const now = new Date()
  const date = new Date(dateStr)
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMins / 60)
  const diffDays = Math.floor(diffHours / 24)

  if (diffMins < 1) return 'Vừa xong'
  if (diffMins < 60) return `${diffMins} phút trước`
  if (diffHours < 24) return `${diffHours} giờ trước`
  if (diffDays < 7) return `${diffDays} ngày trước`
  return formatDate(dateStr)
}

export function extractYoutubeId(url: string): string {
  if (!url) return ''
  // Already an ID (11 chars, no special chars)
  if (/^[a-zA-Z0-9_-]{11}$/.test(url)) return url
  // Various YouTube URL formats
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/v\/)([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/,
  ]
  for (const pattern of patterns) {
    const match = url.match(pattern)
    if (match) return match[1]
  }
  return url
}

export function getYoutubeThumbnail(videoId: string): string {
  return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
}

export function generateCertificateNumber(): string {
  const year = new Date().getFullYear()
  const random = Math.random().toString(36).substring(2, 8).toUpperCase()
  return `PD-${year}-${random}`
}

export function calculateProgress(completed: number, total: number): number {
  if (total === 0) return 0
  return Math.round((completed / total) * 100)
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map(n => n[0])
    .slice(-2)
    .join('')
    .toUpperCase()
}

export function getRoleName(slug: string): string {
  const map: Record<string, string> = {
    super_admin: 'Super Admin',
    giam_doc: 'Giám đốc',
    truong_khu_vuc: 'Trưởng khu vực',
    chuyen_vien: 'Chuyên viên',
  }
  return map[slug] || slug
}

export function getRoleColor(slug: string): string {
  const map: Record<string, string> = {
    super_admin: 'bg-purple-100 text-purple-700',
    giam_doc: 'bg-primary-100 text-primary-700',
    truong_khu_vuc: 'bg-tertiary-100 text-tertiary-700',
    chuyen_vien: 'bg-green-100 text-green-700',
  }
  return map[slug] || 'bg-gray-100 text-gray-700'
}

export function getStatusLabel(status: string): string {
  const map: Record<string, string> = {
    completed: 'Hoàn thành',
    in_progress: 'Đang học',
    failed_test: 'Chưa đạt bài test',
    locked: 'Chưa mở',
    available: 'Có thể học',
  }
  return map[status] || status
}

export function getStatusColor(status: string): string {
  const map: Record<string, string> = {
    completed: 'text-green-600',
    in_progress: 'text-tertiary-600',
    failed_test: 'text-red-600',
    locked: 'text-gray-400',
    available: 'text-secondary-600',
  }
  return map[status] || 'text-gray-600'
}

export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}
