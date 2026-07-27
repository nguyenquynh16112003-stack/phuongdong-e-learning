import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Certificate } from '@/types'

interface CertificateState {
  certificates: Certificate[]
  
  getUserCertificates: (userId: string) => Certificate[]
  issueCertificate: (userId: string, userName: string, courseId: string, courseTitle: string) => Certificate | null
}

export const useCertificateStore = create<CertificateState>()(
  persist(
    (set, get) => ({
      certificates: [],

      getUserCertificates: (userId) => {
        return get().certificates.filter(c => c.userId === userId)
      },

      issueCertificate: (userId, userName, courseId, courseTitle) => {
        const existingCert = get().certificates.find(
          c => c.userId === userId && c.courseId === courseId
        )
        if (existingCert) return existingCert // Already issued

        const newId = `cert-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`
        const newCert: Certificate = {
          id: newId,
          userId,
          userName,
          courseId,
          courseTitle,
          certificateNumber: `PD-LMS-${newId.substring(newId.length - 8).toUpperCase()}`,
          qrCodeData: `https://lms.phuongdong.vn/verify/${newId}`,
          digitalSignature: `sig_${Date.now()}`,
          issuedAt: new Date().toISOString()
        }

        set(s => ({ certificates: [...s.certificates, newCert] }))
        return newCert
      }
    }),
    {
      name: 'phuong-dong-certificates'
    }
  )
)
