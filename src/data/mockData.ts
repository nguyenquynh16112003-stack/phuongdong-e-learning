import type {
  Role, Region, Department, User, Course, Chapter, Lesson, LessonDocument,
  Test, Question, Answer, TestResult, LearningProgress, Certificate,
  Badge, UserBadge, Notification, ActivityLog, RankingEntry
} from '@/types'

// ===================== ROLES =====================
export const ROLES: Role[] = [
  { id: 'role-1', name: 'Super Admin', slug: 'super_admin', level: 1 },
  { id: 'role-2', name: 'Giám đốc', slug: 'giam_doc', level: 2 },
  { id: 'role-3', name: 'Trưởng khu vực', slug: 'truong_khu_vuc', level: 3 },
  { id: 'role-4', name: 'Chuyên viên', slug: 'chuyen_vien', level: 4 },
]

// ===================== REGIONS =====================
export const REGIONS: Region[] = [
  { id: 'region-1', name: 'Khu vực Hà Nội', code: 'HN', isActive: true },
  { id: 'region-2', name: 'Khu vực TP.HCM', code: 'HCM', isActive: true },
  { id: 'region-3', name: 'Khu vực Miền Trung', code: 'MT', isActive: true },
]

// ===================== DEPARTMENTS =====================
export const DEPARTMENTS: Department[] = [
  { id: 'dept-1', name: 'Phòng Kinh doanh 1', regionId: 'region-1', regionName: 'Khu vực Hà Nội', isActive: true },
  { id: 'dept-2', name: 'Phòng Kinh doanh 2', regionId: 'region-1', regionName: 'Khu vực Hà Nội', isActive: true },
  { id: 'dept-3', name: 'Phòng Kinh doanh 3', regionId: 'region-2', regionName: 'Khu vực TP.HCM', isActive: true },
  { id: 'dept-4', name: 'Phòng Kinh doanh 4', regionId: 'region-2', regionName: 'Khu vực TP.HCM', isActive: true },
  { id: 'dept-5', name: 'Phòng Kinh doanh 5', regionId: 'region-3', regionName: 'Khu vực Miền Trung', isActive: true },
  { id: 'dept-6', name: 'Phòng Kinh doanh 6', regionId: 'region-3', regionName: 'Khu vực Miền Trung', isActive: true },
]

// ===================== USERS =====================
export const USERS: User[] = [
  {
    id: 'user-demo2',
    fullName: 'Quản trị viên Demo 2',
    cccd: '042303012179',
    email: 'demo2@phuongdong.vn',
    phone: '0909123457',
    avatarUrl: '',
    roleId: 'role-1', roleName: 'Super Admin', roleSlug: 'super_admin', roleLevel: 1,
    regionId: 'region-1', regionName: 'Khu vực Hà Nội',
    departmentId: 'dept-1', departmentName: 'Phòng Kinh doanh 1',
    department: 'Phòng Kinh doanh 1', branch: 'CN Hà Nội',
    isActive: true, mustChangePassword: false,
    xpPoints: 2000, streakDays: 14,
    lastLoginAt: new Date().toISOString(), lastLoginIp: '192.168.1.101',
    createdAt: '2024-01-15T00:00:00Z', updatedAt: '2024-06-01T00:00:00Z',
  },
  {
    id: 'user-demo',
    fullName: 'Quản trị viên Demo',
    cccd: '042303012178',
    email: 'demo@phuongdong.vn',
    phone: '0909123456',
    avatarUrl: '',
    roleId: 'role-1', roleName: 'Super Admin', roleSlug: 'super_admin', roleLevel: 1,
    regionId: 'region-1', regionName: 'Khu vực Hà Nội',
    departmentId: 'dept-1', departmentName: 'Phòng Kinh doanh 1',
    department: 'Phòng Kinh doanh 1', branch: 'CN Hà Nội',
    isActive: true, mustChangePassword: false,
    xpPoints: 1250, streakDays: 7,
    lastLoginAt: new Date().toISOString(), lastLoginIp: '192.168.1.100',
    createdAt: '2024-01-15T00:00:00Z', updatedAt: '2024-06-01T00:00:00Z',
  },
  {
    id: 'user-1',
    fullName: 'Nguyễn Văn Admin',
    cccd: '001099000001',
    email: 'admin@phuongdong.vn',
    phone: '0901234567',
    avatarUrl: '',
    roleId: 'role-1', roleName: 'Super Admin', roleSlug: 'super_admin', roleLevel: 1,
    regionId: 'region-1', regionName: 'Khu vực Hà Nội',
    departmentId: 'dept-1', departmentName: 'Phòng Kinh doanh 1',
    isActive: true, mustChangePassword: false,
    xpPoints: 9999, streakDays: 30,
    lastLoginAt: new Date().toISOString(), lastLoginIp: '192.168.1.1',
    createdAt: '2024-01-01T00:00:00Z', updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 'user-2',
    fullName: 'Trần Thị Giám Đốc',
    cccd: '001099000002',
    email: 'giamdoc@phuongdong.vn',
    phone: '0902345678',
    avatarUrl: '',
    roleId: 'role-2', roleName: 'Giám đốc', roleSlug: 'giam_doc', roleLevel: 2,
    regionId: 'region-2', regionName: 'Khu vực TP.HCM',
    departmentId: 'dept-3', departmentName: 'Phòng Kinh doanh 3',
    isActive: true, mustChangePassword: false,
    xpPoints: 5000, streakDays: 15,
    lastLoginAt: new Date(Date.now() - 86400000).toISOString(), lastLoginIp: '10.0.0.1',
    createdAt: '2024-01-05T00:00:00Z', updatedAt: '2024-01-05T00:00:00Z',
  },
  {
    id: 'user-3',
    fullName: 'Lê Văn Trưởng Khu',
    cccd: '001099000003',
    email: 'truongkhu@phuongdong.vn',
    phone: '0903456789',
    avatarUrl: '',
    roleId: 'role-3', roleName: 'Trưởng khu vực', roleSlug: 'truong_khu_vuc', roleLevel: 3,
    regionId: 'region-1', regionName: 'Khu vực Hà Nội',
    departmentId: 'dept-1', departmentName: 'Phòng Kinh doanh 1',
    isActive: true, mustChangePassword: false,
    xpPoints: 2500, streakDays: 10,
    lastLoginAt: new Date(Date.now() - 172800000).toISOString(), lastLoginIp: '192.168.1.5',
    createdAt: '2024-01-10T00:00:00Z', updatedAt: '2024-01-10T00:00:00Z',
  },
  {
    id: 'user-4',
    fullName: 'Phạm Thị Lan',
    cccd: '001099000004',
    email: 'ptlan@phuongdong.vn',
    phone: '0904567890',
    avatarUrl: '',
    roleId: 'role-4', roleName: 'Chuyên viên', roleSlug: 'chuyen_vien', roleLevel: 4,
    regionId: 'region-1', regionName: 'Khu vực Hà Nội',
    departmentId: 'dept-1', departmentName: 'Phòng Kinh doanh 1',
    managerId: 'user-3', managerName: 'Lê Văn Trưởng Khu',
    isActive: true, mustChangePassword: false,
    xpPoints: 1800, streakDays: 7,
    lastLoginAt: new Date(Date.now() - 3600000).toISOString(), lastLoginIp: '192.168.1.10',
    createdAt: '2024-02-01T00:00:00Z', updatedAt: '2024-02-01T00:00:00Z',
  },
  {
    id: 'user-5',
    fullName: 'Nguyễn Minh Tuấn',
    cccd: '001099000005',
    email: 'nmtuan@phuongdong.vn',
    phone: '0905678901',
    avatarUrl: '',
    roleId: 'role-4', roleName: 'Chuyên viên', roleSlug: 'chuyen_vien', roleLevel: 4,
    regionId: 'region-2', regionName: 'Khu vực TP.HCM',
    departmentId: 'dept-3', departmentName: 'Phòng Kinh doanh 3',
    isActive: true, mustChangePassword: false,
    xpPoints: 2200, streakDays: 12,
    lastLoginAt: new Date(Date.now() - 7200000).toISOString(), lastLoginIp: '10.0.0.15',
    createdAt: '2024-02-05T00:00:00Z', updatedAt: '2024-02-05T00:00:00Z',
  },
  {
    id: 'user-6',
    fullName: 'Hoàng Thị Mai',
    cccd: '001099000006',
    email: 'htmai@phuongdong.vn',
    phone: '0906789012',
    avatarUrl: '',
    roleId: 'role-4', roleName: 'Chuyên viên', roleSlug: 'chuyen_vien', roleLevel: 4,
    regionId: 'region-2', regionName: 'Khu vực TP.HCM',
    departmentId: 'dept-4', departmentName: 'Phòng Kinh doanh 4',
    isActive: true, mustChangePassword: false,
    xpPoints: 950, streakDays: 3,
    lastLoginAt: new Date(Date.now() - 259200000).toISOString(), lastLoginIp: '10.0.0.22',
    createdAt: '2024-03-01T00:00:00Z', updatedAt: '2024-03-01T00:00:00Z',
  },
  {
    id: 'user-7',
    fullName: 'Đỗ Văn Hùng',
    cccd: '001099000007',
    email: 'dvhung@phuongdong.vn',
    phone: '0907890123',
    avatarUrl: '',
    roleId: 'role-4', roleName: 'Chuyên viên', roleSlug: 'chuyen_vien', roleLevel: 4,
    regionId: 'region-3', regionName: 'Khu vực Miền Trung',
    departmentId: 'dept-5', departmentName: 'Phòng Kinh doanh 5',
    isActive: false, mustChangePassword: true,
    xpPoints: 300, streakDays: 0,
    lastLoginAt: new Date(Date.now() - 604800000).toISOString(), lastLoginIp: '172.16.0.5',
    createdAt: '2024-03-15T00:00:00Z', updatedAt: '2024-03-15T00:00:00Z',
  },
  {
    id: 'user-8',
    fullName: 'Vũ Thị Hoa',
    cccd: '001099000008',
    email: 'vthoa@phuongdong.vn',
    phone: '0908901234',
    avatarUrl: '',
    roleId: 'role-4', roleName: 'Chuyên viên', roleSlug: 'chuyen_vien', roleLevel: 4,
    regionId: 'region-1', regionName: 'Khu vực Hà Nội',
    departmentId: 'dept-2', departmentName: 'Phòng Kinh doanh 2',
    managerId: 'user-3', managerName: 'Lê Văn Trưởng Khu',
    isActive: true, mustChangePassword: false,
    xpPoints: 3100, streakDays: 21,
    lastLoginAt: new Date(Date.now() - 1800000).toISOString(), lastLoginIp: '192.168.1.20',
    createdAt: '2024-01-20T00:00:00Z', updatedAt: '2024-01-20T00:00:00Z',
  },
]

// Default demo user (chuyên viên)
export const DEMO_USER = USERS[3] // Phạm Thị Lan

// ===================== LESSONS =====================
const LESSON_DOCS_1: LessonDocument[] = [
  { id: 'doc-1', lessonId: 'lesson-1', title: 'Slide bài giảng - Tổng quan BĐS', type: 'slide', url: '#', orderIndex: 1 },
  { id: 'doc-2', lessonId: 'lesson-1', title: 'Tài liệu tham khảo thị trường', type: 'pdf', url: '#', orderIndex: 2 },
  { id: 'doc-3', lessonId: 'lesson-1', title: 'Checklist chuẩn bị cuộc gặp', type: 'checklist', url: '#', orderIndex: 3 },
]

const LESSON_DOCS_4: LessonDocument[] = [
  { id: 'doc-4', lessonId: 'lesson-4', title: 'Script tư vấn khách hàng', type: 'document', url: '#', orderIndex: 1 },
  { id: 'doc-5', lessonId: 'lesson-4', title: 'Form khảo sát nhu cầu KH', type: 'pdf', url: '#', orderIndex: 2 },
]

// ===================== COURSES =====================
export const COURSES: Course[] = [
  {
    id: 'course-1',
    title: 'Đào tạo Chuyên viên Kinh doanh Bất động sản',
    description: 'Chương trình đào tạo toàn diện dành cho chuyên viên kinh doanh bất động sản, từ kỹ năng cơ bản đến nâng cao. Bao gồm kiến thức về thị trường, kỹ năng bán hàng, tư vấn khách hàng và pháp lý BĐS.',
    thumbnailUrl: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
    orderIndex: 1,
    isPublished: true,
    createdBy: 'user-1',
    createdByName: 'Nguyễn Văn Admin',
    createdAt: '2024-01-15T00:00:00Z',
    updatedAt: '2024-06-01T00:00:00Z',
    chaptersCount: 4,
    lessonsCount: 12,
    totalDurationSeconds: 43200, // 12 hours
  },
  {
    id: 'course-2',
    title: 'Kỹ năng Chốt Sale Bất động sản Cao cấp',
    description: 'Nâng cao kỹ năng chốt sale và xây dựng mối quan hệ khách hàng lâu dài trong lĩnh vực bất động sản cao cấp.',
    thumbnailUrl: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
    orderIndex: 2,
    isPublished: true,
    createdBy: 'user-1',
    createdByName: 'Nguyễn Văn Admin',
    createdAt: '2024-03-01T00:00:00Z',
    updatedAt: '2024-06-01T00:00:00Z',
    chaptersCount: 3,
    lessonsCount: 9,
    totalDurationSeconds: 32400, // 9 hours
  },
]

export const CHAPTERS: Chapter[] = [
  { id: 'chap-1', courseId: 'course-1', title: 'Chương 1: Tổng quan về thị trường BĐS', description: 'Hiểu về thị trường bất động sản Việt Nam, các phân khúc và xu hướng', orderIndex: 1 },
  { id: 'chap-2', courseId: 'course-1', title: 'Chương 2: Kỹ năng tiếp cận khách hàng', description: 'Kỹ năng tìm kiếm, tiếp cận và xây dựng quan hệ với khách hàng tiềm năng', orderIndex: 2 },
  { id: 'chap-3', courseId: 'course-1', title: 'Chương 3: Quy trình tư vấn và chốt sale', description: 'Quy trình tư vấn chuyên nghiệp và kỹ thuật chốt hợp đồng hiệu quả', orderIndex: 3 },
  { id: 'chap-4', courseId: 'course-1', title: 'Chương 4: Pháp lý và hồ sơ bất động sản', description: 'Kiến thức pháp lý cơ bản và quy trình xử lý hồ sơ giao dịch BĐS', orderIndex: 4 },
  { id: 'chap-5', courseId: 'course-2', title: 'Chương 1: Tâm lý khách hàng cao cấp', description: 'Hiểu tâm lý và nhu cầu của phân khúc khách hàng cao cấp', orderIndex: 1 },
  { id: 'chap-6', courseId: 'course-2', title: 'Chương 2: Kỹ thuật đàm phán', description: 'Nghệ thuật đàm phán và thuyết phục trong BĐS cao cấp', orderIndex: 2 },
  { id: 'chap-7', courseId: 'course-2', title: 'Chương 3: Chăm sóc và giữ chân khách hàng', description: 'Xây dựng mối quan hệ lâu dài và tạo nguồn khách hàng giới thiệu', orderIndex: 3 },
]

export const LESSONS: any = [
  // Course 1, Chapter 1
  {
    id: 'lesson-1', chapterId: 'chap-1', courseId: 'course-1', chapterTitle: 'Chương 1: Tổng quan về thị trường BĐS',
    title: 'Bài 1: Tổng quan thị trường bất động sản Việt Nam',
    description: 'Giới thiệu tổng quan về thị trường bất động sản Việt Nam, các phân khúc chính (nhà ở, thương mại, công nghiệp), xu hướng phát triển và cơ hội đầu tư.',
    youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', youtubeVideoId: 'dQw4w9WgXcQ',
    thumbnailUrl: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
    instructorName: 'Giám đốc Kinh doanh - Nguyễn Văn A', durationSeconds: 3600,
    orderIndex: 1, isPublished: true,
    createdAt: '2024-01-15T00:00:00Z', updatedAt: '2024-01-15T00:00:00Z',
    documents: LESSON_DOCS_1,
  },
  {
    id: 'lesson-2', chapterId: 'chap-1', courseId: 'course-1', chapterTitle: 'Chương 1: Tổng quan về thị trường BĐS',
    title: 'Bài 2: Các phân khúc bất động sản và đặc điểm',
    description: 'Phân tích chi tiết các phân khúc BĐS: căn hộ, nhà phố, biệt thự, đất nền. Đặc điểm, ưu nhược điểm và đối tượng khách hàng của từng phân khúc.',
    youtubeUrl: 'https://www.youtube.com/watch?v=9bZkp7q19f0', youtubeVideoId: '9bZkp7q19f0',
    thumbnailUrl: 'https://img.youtube.com/vi/9bZkp7q19f0/maxresdefault.jpg',
    instructorName: 'Giám đốc Kinh doanh - Nguyễn Văn A', durationSeconds: 2700,
    orderIndex: 2, isPublished: true,
    createdAt: '2024-01-16T00:00:00Z', updatedAt: '2024-01-16T00:00:00Z',
    documents: [],
  },
  {
    id: 'lesson-3', chapterId: 'chap-1', courseId: 'course-1', chapterTitle: 'Chương 1: Tổng quan về thị trường BĐS',
    title: 'Bài 3: Phân tích giá BĐS và yếu tố ảnh hưởng',
    description: 'Cách phân tích và định giá bất động sản, các yếu tố ảnh hưởng đến giá trị như vị trí, pháp lý, tiện ích, xu hướng thị trường.',
    youtubeUrl: 'https://www.youtube.com/watch?v=kJQP7kiw5Fk', youtubeVideoId: 'kJQP7kiw5Fk',
    thumbnailUrl: 'https://img.youtube.com/vi/kJQP7kiw5Fk/maxresdefault.jpg',
    instructorName: 'Chuyên gia BĐS - Trần Thị B', durationSeconds: 3300,
    orderIndex: 3, isPublished: true,
    createdAt: '2024-01-17T00:00:00Z', updatedAt: '2024-01-17T00:00:00Z',
    documents: [],
  },
  // Course 1, Chapter 2
  {
    id: 'lesson-4', chapterId: 'chap-2', courseId: 'course-1', chapterTitle: 'Chương 2: Kỹ năng tiếp cận khách hàng',
    title: 'Bài 4: Kỹ năng tìm kiếm và tiếp cận khách hàng tiềm năng',
    description: 'Các phương pháp tìm kiếm khách hàng tiềm năng, kỹ năng tiếp cận lần đầu, xây dựng ấn tượng đầu tiên chuyên nghiệp.',
    youtubeUrl: 'https://www.youtube.com/watch?v=fRh_vgS2dFE', youtubeVideoId: 'fRh_vgS2dFE',
    thumbnailUrl: 'https://img.youtube.com/vi/fRh_vgS2dFE/maxresdefault.jpg',
    instructorName: 'Trưởng phòng KD - Lê Văn C', durationSeconds: 3900,
    orderIndex: 1, isPublished: true,
    createdAt: '2024-01-18T00:00:00Z', updatedAt: '2024-01-18T00:00:00Z',
    documents: LESSON_DOCS_4,
  },
  {
    id: 'lesson-5', chapterId: 'chap-2', courseId: 'course-1', chapterTitle: 'Chương 2: Kỹ năng tiếp cận khách hàng',
    title: 'Bài 5: Xây dựng mối quan hệ và niềm tin với khách hàng',
    description: 'Kỹ thuật xây dựng và duy trì mối quan hệ bền vững với khách hàng, tạo dựng niềm tin và uy tín cá nhân.',
    youtubeUrl: 'https://www.youtube.com/watch?v=JGwWNGJdvx8', youtubeVideoId: 'JGwWNGJdvx8',
    thumbnailUrl: 'https://img.youtube.com/vi/JGwWNGJdvx8/maxresdefault.jpg',
    instructorName: 'Trưởng phòng KD - Lê Văn C', durationSeconds: 3000,
    orderIndex: 2, isPublished: true,
    createdAt: '2024-01-19T00:00:00Z', updatedAt: '2024-01-19T00:00:00Z',
    documents: [],
  },
  {
    id: 'lesson-6', chapterId: 'chap-2', courseId: 'course-1', chapterTitle: 'Chương 2: Kỹ năng tiếp cận khách hàng',
    title: 'Bài 6: Kỹ năng lắng nghe và xác định nhu cầu khách hàng',
    description: 'Nghệ thuật lắng nghe chủ động, đặt câu hỏi thông minh để khám phá nhu cầu thực sự và động lực mua BĐS của khách hàng.',
    youtubeUrl: 'https://www.youtube.com/watch?v=hT_nvWreIhg', youtubeVideoId: 'hT_nvWreIhg',
    thumbnailUrl: 'https://img.youtube.com/vi/hT_nvWreIhg/maxresdefault.jpg',
    instructorName: 'Chuyên gia tư vấn - Phạm Thị D', durationSeconds: 2800,
    orderIndex: 3, isPublished: true,
    createdAt: '2024-01-20T00:00:00Z', updatedAt: '2024-01-20T00:00:00Z',
    documents: [],
  },
  // Course 1, Chapter 3
  {
    id: 'lesson-7', chapterId: 'chap-3', courseId: 'course-1', chapterTitle: 'Chương 3: Quy trình tư vấn và chốt sale',
    title: 'Bài 7: Quy trình tư vấn chuyên nghiệp 7 bước',
    description: 'Quy trình tư vấn bán hàng 7 bước chuẩn của Phương Đông Group, từ tiếp đón đến chốt hợp đồng.',
    youtubeUrl: 'https://www.youtube.com/watch?v=OPf0YbXqDm0', youtubeVideoId: 'OPf0YbXqDm0',
    thumbnailUrl: 'https://img.youtube.com/vi/OPf0YbXqDm0/maxresdefault.jpg',
    instructorName: 'Giám đốc Kinh doanh - Nguyễn Văn A', durationSeconds: 4500,
    orderIndex: 1, isPublished: true,
    createdAt: '2024-01-21T00:00:00Z', updatedAt: '2024-01-21T00:00:00Z',
    documents: [],
  },
  {
    id: 'lesson-8', chapterId: 'chap-3', courseId: 'course-1', chapterTitle: 'Chương 3: Quy trình tư vấn và chốt sale',
    title: 'Bài 8: Kỹ thuật xử lý từ chối và phản đối',
    description: 'Cách nhận diện và xử lý các phản đối phổ biến của khách hàng một cách chuyên nghiệp và hiệu quả.',
    youtubeUrl: 'https://www.youtube.com/watch?v=RgKAFK5djSk', youtubeVideoId: 'RgKAFK5djSk',
    thumbnailUrl: 'https://img.youtube.com/vi/RgKAFK5djSk/maxresdefault.jpg',
    instructorName: 'Giám đốc Kinh doanh - Nguyễn Văn A', durationSeconds: 3600,
    orderIndex: 2, isPublished: true,
    createdAt: '2024-01-22T00:00:00Z', updatedAt: '2024-01-22T00:00:00Z',
    documents: [],
  },
  {
    id: 'lesson-9', chapterId: 'chap-3', courseId: 'course-1', chapterTitle: 'Chương 3: Quy trình tư vấn và chốt sale',
    title: 'Bài 9: Kỹ thuật chốt sale và ký hợp đồng',
    description: 'Các kỹ thuật chốt sale hiệu quả, cách tạo động lực ra quyết định và hướng dẫn ký kết hợp đồng.',
    youtubeUrl: 'https://www.youtube.com/watch?v=Y-Elr5K2Vuo', youtubeVideoId: 'Y-Elr5K2Vuo',
    thumbnailUrl: 'https://img.youtube.com/vi/Y-Elr5K2Vuo/maxresdefault.jpg',
    instructorName: 'Giám đốc Kinh doanh - Nguyễn Văn A', durationSeconds: 4200,
    orderIndex: 3, isPublished: true,
    createdAt: '2024-01-23T00:00:00Z', updatedAt: '2024-01-23T00:00:00Z',
    documents: [],
  },
  // Course 1, Chapter 4
  {
    id: 'lesson-10', chapterId: 'chap-4', courseId: 'course-1', chapterTitle: 'Chương 4: Pháp lý và hồ sơ bất động sản',
    title: 'Bài 10: Kiến thức pháp lý cơ bản trong giao dịch BĐS',
    description: 'Các văn bản pháp lý quan trọng, điều kiện giao dịch BĐS hợp lệ, quyền và nghĩa vụ các bên.',
    youtubeUrl: 'https://www.youtube.com/watch?v=pRpeEdMmmQ0', youtubeVideoId: 'pRpeEdMmmQ0',
    thumbnailUrl: 'https://img.youtube.com/vi/pRpeEdMmmQ0/maxresdefault.jpg',
    instructorName: 'Luật sư - Hoàng Văn E', durationSeconds: 5400,
    orderIndex: 1, isPublished: true,
    createdAt: '2024-01-24T00:00:00Z', updatedAt: '2024-01-24T00:00:00Z',
    documents: [],
  },
  {
    id: 'lesson-11', chapterId: 'chap-4', courseId: 'course-1', chapterTitle: 'Chương 4: Pháp lý và hồ sơ bất động sản',
    title: 'Bài 11: Hồ sơ và thủ tục pháp lý giao dịch',
    description: 'Hướng dẫn chi tiết về bộ hồ sơ pháp lý, quy trình công chứng, sang tên và các thủ tục hành chính liên quan.',
    youtubeUrl: 'https://www.youtube.com/watch?v=2vjPBrBU-TM', youtubeVideoId: '2vjPBrBU-TM',
    thumbnailUrl: 'https://img.youtube.com/vi/2vjPBrBU-TM/maxresdefault.jpg',
    instructorName: 'Luật sư - Hoàng Văn E', durationSeconds: 4800,
    orderIndex: 2, isPublished: true,
    createdAt: '2024-01-25T00:00:00Z', updatedAt: '2024-01-25T00:00:00Z',
    documents: [],
  },
  {
    id: 'lesson-12', chapterId: 'chap-4', courseId: 'course-1', chapterTitle: 'Chương 4: Pháp lý và hồ sơ bất động sản',
    title: 'Bài 12: Rủi ro pháp lý và cách phòng tránh',
    description: 'Nhận diện các rủi ro pháp lý phổ biến trong giao dịch BĐS và cách bảo vệ quyền lợi cho khách hàng và chính mình.',
    youtubeUrl: 'https://www.youtube.com/watch?v=M7lc1UVf-VE', youtubeVideoId: 'M7lc1UVf-VE',
    thumbnailUrl: 'https://img.youtube.com/vi/M7lc1UVf-VE/maxresdefault.jpg',
    instructorName: 'Luật sư - Hoàng Văn E', durationSeconds: 4200,
    orderIndex: 3, isPublished: true,
    createdAt: '2024-01-26T00:00:00Z', updatedAt: '2024-01-26T00:00:00Z',
    documents: [],
  },
]

// ===================== TESTS =====================
function makeAnswers(qId: string, a: string, b: string, c: string, d: string, correct: 'A'|'B'|'C'|'D'): Answer[] {
  return [
    { id: `${qId}-A`, questionId: qId, label: 'A', content: a, isCorrect: correct === 'A', orderIndex: 1 },
    { id: `${qId}-B`, questionId: qId, label: 'B', content: b, isCorrect: correct === 'B', orderIndex: 2 },
    { id: `${qId}-C`, questionId: qId, label: 'C', content: c, isCorrect: correct === 'C', orderIndex: 3 },
    { id: `${qId}-D`, questionId: qId, label: 'D', content: d, isCorrect: correct === 'D', orderIndex: 4 },
  ]
}

export const TESTS: any = [
  {
    id: 'test-1', lessonId: 'lesson-1', lessonTitle: 'Bài 1: Tổng quan thị trường BĐS Việt Nam',
    title: 'Kiểm tra: Tổng quan thị trường BĐS',
    description: 'Bài kiểm tra kiến thức về tổng quan thị trường bất động sản Việt Nam',
    passingScore: 70, timeLimitMinutes: 15, maxAttempts: 3, isActive: true, orderIndex: 1,
    createdAt: '2024-01-15T00:00:00Z', updatedAt: '2024-01-15T00:00:00Z',
    questions: [
      {
        id: 'q1-1', testId: 'test-1', orderIndex: 1,
        content: 'Theo bài học, phân khúc bất động sản nào đang có mức độ tăng trưởng cao nhất tại Việt Nam hiện nay?',
        explanation: 'Phân khúc căn hộ trung cấp đang dẫn đầu về tăng trưởng do nhu cầu nhà ở của tầng lớp trung lưu ngày càng tăng.',
        answers: makeAnswers('q1-1', 'Biệt thự nghỉ dưỡng', 'Căn hộ trung cấp', 'Bất động sản công nghiệp', 'Đất nền ngoại ô', 'B'),
      },
      {
        id: 'q1-2', testId: 'test-1', orderIndex: 2,
        content: 'Yếu tố nào dưới đây KHÔNG ảnh hưởng đến giá trị bất động sản?',
        explanation: 'Màu sắc nội thất không phải là yếu tố quyết định giá trị BĐS. Vị trí, pháp lý, tiện ích và thị trường mới là các yếu tố quan trọng.',
        answers: makeAnswers('q1-2', 'Vị trí địa lý', 'Màu sắc nội thất', 'Tình trạng pháp lý', 'Tiện ích xung quanh', 'B'),
      },
      {
        id: 'q1-3', testId: 'test-1', orderIndex: 3,
        content: 'Theo Giám đốc, bước đầu tiên khi tiếp cận khách hàng là gì?',
        explanation: 'Nghiên cứu và chuẩn bị thông tin trước khi gặp khách hàng là bước quan trọng nhất, giúp tạo ấn tượng chuyên nghiệp.',
        answers: makeAnswers('q1-3', 'Giới thiệu sản phẩm ngay', 'Nghiên cứu và chuẩn bị thông tin', 'Hỏi về ngân sách của khách', 'Đưa ra báo giá', 'B'),
      },
      {
        id: 'q1-4', testId: 'test-1', orderIndex: 4,
        content: 'Thị trường bất động sản Việt Nam được phân loại theo những tiêu chí nào?',
        explanation: 'BĐS được phân loại theo: loại hình (nhà ở, thương mại, công nghiệp), vị trí (đô thị, ven đô, nông thôn) và phân khúc giá.',
        answers: makeAnswers('q1-4', 'Chỉ theo loại hình sử dụng', 'Theo màu sắc và kiến trúc', 'Theo loại hình, vị trí và phân khúc giá', 'Theo diện tích xây dựng', 'C'),
      },
      {
        id: 'q1-5', testId: 'test-1', orderIndex: 5,
        content: 'Điều quan trọng nhất cần làm khi thị trường BĐS biến động mạnh là gì?',
        explanation: 'Cập nhật thông tin thị trường và tư vấn khách hàng đúng hướng là yếu tố quyết định giúp duy trì hiệu quả kinh doanh trong giai đoạn biến động.',
        answers: makeAnswers('q1-5', 'Ngừng bán hàng chờ thị trường ổn định', 'Giảm giá tất cả sản phẩm', 'Cập nhật thông tin và tư vấn khách hàng đúng hướng', 'Chuyển sang phân khúc khác', 'C'),
      },
    ],
  },
  {
    id: 'test-2', lessonId: 'lesson-4', lessonTitle: 'Bài 4: Kỹ năng tiếp cận khách hàng',
    title: 'Kiểm tra: Kỹ năng tiếp cận khách hàng',
    description: 'Đánh giá kiến thức về kỹ năng tìm kiếm và tiếp cận khách hàng tiềm năng',
    passingScore: 70, timeLimitMinutes: 15, maxAttempts: 3, isActive: true, orderIndex: 1,
    createdAt: '2024-01-18T00:00:00Z', updatedAt: '2024-01-18T00:00:00Z',
    questions: [
      {
        id: 'q2-1', testId: 'test-2', orderIndex: 1,
        content: 'Kênh tiếp cận khách hàng hiệu quả nhất trong thời đại số là gì?',
        explanation: 'Mạng xã hội (Facebook, Zalo, Instagram) kết hợp với giới thiệu từ khách hàng cũ là hai kênh hiệu quả nhất hiện nay.',
        answers: makeAnswers('q2-1', 'Chỉ gọi điện lạnh (cold call)', 'Mạng xã hội kết hợp giới thiệu', 'Phát tờ rơi tại chợ', 'Chờ khách hàng tự đến', 'B'),
      },
      {
        id: 'q2-2', testId: 'test-2', orderIndex: 2,
        content: 'Khi gặp khách hàng lần đầu, điều nào KHÔNG nên làm?',
        explanation: 'Ngay lập tức đưa ra báo giá mà không tìm hiểu nhu cầu khách hàng là sai lầm phổ biến, thể hiện sự thiếu chuyên nghiệp.',
        answers: makeAnswers('q2-2', 'Giới thiệu bản thân chuyên nghiệp', 'Ngay lập tức đưa ra báo giá', 'Hỏi thăm về nhu cầu', 'Lắng nghe kỳ vọng của khách', 'B'),
      },
      {
        id: 'q2-3', testId: 'test-2', orderIndex: 3,
        content: 'Trong 30 giây đầu tiên gặp khách hàng, điều quan trọng nhất cần tạo ra là gì?',
        explanation: 'Ấn tượng đầu tiên được tạo ra trong 30 giây đầu và quyết định phần lớn kết quả của cuộc gặp. Ngoại hình, nụ cười và lời chào hỏi chuyên nghiệp là chìa khóa.',
        answers: makeAnswers('q2-3', 'Báo giá cạnh tranh', 'Ấn tượng đầu tiên chuyên nghiệp', 'Hứa hẹn về chiết khấu', 'Danh sách sản phẩm', 'B'),
      },
      {
        id: 'q2-4', testId: 'test-2', orderIndex: 4,
        content: 'Phương pháp nào hiệu quả nhất để xây dựng danh sách khách hàng tiềm năng?',
        explanation: 'Kết hợp cả 3 phương pháp: marketing online, tham gia sự kiện ngành và nhờ khách hàng cũ giới thiệu cho hiệu quả tối đa.',
        answers: makeAnswers('q2-4', 'Chỉ dùng Facebook Ads', 'Kết hợp online, offline và giới thiệu', 'Chỉ tham gia hội chợ BĐS', 'Mua danh sách số điện thoại', 'B'),
      },
      {
        id: 'q2-5', testId: 'test-2', orderIndex: 5,
        content: 'Sau cuộc gặp đầu tiên với khách hàng, nên làm gì tiếp theo?',
        explanation: 'Ghi chép thông tin và theo dõi sát sao sau cuộc gặp đầu tiên giúp duy trì mối quan hệ và tăng tỷ lệ chốt sale.',
        answers: makeAnswers('q2-5', 'Chờ khách hàng liên hệ lại', 'Ghi chép thông tin và theo dõi kịp thời', 'Gọi điện mỗi ngày để nhắc nhở', 'Gửi nhiều tin nhắn quảng cáo', 'B'),
      },
    ],
  },
]

// ===================== LEARNING PROGRESS =====================
export const LEARNING_PROGRESS: LearningProgress[] = [
  { id: 'prog-1', userId: 'user-4', lessonId: 'lesson-1', watchPercentage: 100, isCompleted: true, completedAt: '2024-06-01T10:00:00Z', lastWatchedAt: '2024-06-01T10:00:00Z', totalWatchTimeSeconds: 3600, replayCount: 0 },
  { id: 'prog-2', userId: 'user-4', lessonId: 'lesson-2', watchPercentage: 100, isCompleted: true, completedAt: '2024-06-02T10:00:00Z', lastWatchedAt: '2024-06-02T10:00:00Z', totalWatchTimeSeconds: 2700, replayCount: 1 },
  { id: 'prog-3', userId: 'user-4', lessonId: 'lesson-3', watchPercentage: 100, isCompleted: true, completedAt: '2024-06-03T10:00:00Z', lastWatchedAt: '2024-06-03T10:00:00Z', totalWatchTimeSeconds: 3300, replayCount: 0 },
  { id: 'prog-4', userId: 'user-4', lessonId: 'lesson-4', watchPercentage: 60, isCompleted: false, lastWatchedAt: '2024-06-04T10:00:00Z', totalWatchTimeSeconds: 2340, replayCount: 0 },
  { id: 'prog-5', userId: 'user-5', lessonId: 'lesson-1', watchPercentage: 100, isCompleted: true, completedAt: '2024-05-20T10:00:00Z', lastWatchedAt: '2024-05-20T10:00:00Z', totalWatchTimeSeconds: 3600, replayCount: 0 },
  { id: 'prog-6', userId: 'user-5', lessonId: 'lesson-2', watchPercentage: 100, isCompleted: true, completedAt: '2024-05-21T10:00:00Z', lastWatchedAt: '2024-05-21T10:00:00Z', totalWatchTimeSeconds: 2700, replayCount: 0 },
  { id: 'prog-7', userId: 'user-5', lessonId: 'lesson-3', watchPercentage: 100, isCompleted: true, completedAt: '2024-05-22T10:00:00Z', lastWatchedAt: '2024-05-22T10:00:00Z', totalWatchTimeSeconds: 3300, replayCount: 0 },
  { id: 'prog-8', userId: 'user-5', lessonId: 'lesson-4', watchPercentage: 100, isCompleted: true, completedAt: '2024-05-23T10:00:00Z', lastWatchedAt: '2024-05-23T10:00:00Z', totalWatchTimeSeconds: 3900, replayCount: 0 },
  { id: 'prog-9', userId: 'user-5', lessonId: 'lesson-5', watchPercentage: 100, isCompleted: true, completedAt: '2024-05-24T10:00:00Z', lastWatchedAt: '2024-05-24T10:00:00Z', totalWatchTimeSeconds: 3000, replayCount: 0 },
  { id: 'prog-10', userId: 'user-5', lessonId: 'lesson-6', watchPercentage: 100, isCompleted: true, completedAt: '2024-05-25T10:00:00Z', lastWatchedAt: '2024-05-25T10:00:00Z', totalWatchTimeSeconds: 2800, replayCount: 0 },
  { id: 'prog-11', userId: 'user-8', lessonId: 'lesson-1', watchPercentage: 100, isCompleted: true, completedAt: '2024-04-01T10:00:00Z', lastWatchedAt: '2024-04-01T10:00:00Z', totalWatchTimeSeconds: 3600, replayCount: 0 },
  { id: 'prog-12', userId: 'user-8', lessonId: 'lesson-2', watchPercentage: 100, isCompleted: true, completedAt: '2024-04-02T10:00:00Z', lastWatchedAt: '2024-04-02T10:00:00Z', totalWatchTimeSeconds: 2700, replayCount: 0 },
  { id: 'prog-13', userId: 'user-8', lessonId: 'lesson-3', watchPercentage: 100, isCompleted: true, completedAt: '2024-04-03T10:00:00Z', lastWatchedAt: '2024-04-03T10:00:00Z', totalWatchTimeSeconds: 3300, replayCount: 0 },
  { id: 'prog-14', userId: 'user-8', lessonId: 'lesson-4', watchPercentage: 100, isCompleted: true, completedAt: '2024-04-04T10:00:00Z', lastWatchedAt: '2024-04-04T10:00:00Z', totalWatchTimeSeconds: 3900, replayCount: 0 },
  { id: 'prog-15', userId: 'user-8', lessonId: 'lesson-5', watchPercentage: 100, isCompleted: true, completedAt: '2024-04-05T10:00:00Z', lastWatchedAt: '2024-04-05T10:00:00Z', totalWatchTimeSeconds: 3000, replayCount: 0 },
  { id: 'prog-16', userId: 'user-8', lessonId: 'lesson-6', watchPercentage: 100, isCompleted: true, completedAt: '2024-04-06T10:00:00Z', lastWatchedAt: '2024-04-06T10:00:00Z', totalWatchTimeSeconds: 2800, replayCount: 0 },
  { id: 'prog-17', userId: 'user-8', lessonId: 'lesson-7', watchPercentage: 100, isCompleted: true, completedAt: '2024-04-07T10:00:00Z', lastWatchedAt: '2024-04-07T10:00:00Z', totalWatchTimeSeconds: 4500, replayCount: 1 },
  { id: 'prog-18', userId: 'user-8', lessonId: 'lesson-8', watchPercentage: 100, isCompleted: true, completedAt: '2024-04-08T10:00:00Z', lastWatchedAt: '2024-04-08T10:00:00Z', totalWatchTimeSeconds: 3600, replayCount: 0 },
  { id: 'prog-19', userId: 'user-8', lessonId: 'lesson-9', watchPercentage: 100, isCompleted: true, completedAt: '2024-04-09T10:00:00Z', lastWatchedAt: '2024-04-09T10:00:00Z', totalWatchTimeSeconds: 4200, replayCount: 0 },
  { id: 'prog-20', userId: 'user-8', lessonId: 'lesson-10', watchPercentage: 100, isCompleted: true, completedAt: '2024-04-10T10:00:00Z', lastWatchedAt: '2024-04-10T10:00:00Z', totalWatchTimeSeconds: 5400, replayCount: 0 },
  { id: 'prog-21', userId: 'user-8', lessonId: 'lesson-11', watchPercentage: 100, isCompleted: true, completedAt: '2024-04-11T10:00:00Z', lastWatchedAt: '2024-04-11T10:00:00Z', totalWatchTimeSeconds: 4800, replayCount: 0 },
  { id: 'prog-22', userId: 'user-8', lessonId: 'lesson-12', watchPercentage: 100, isCompleted: true, completedAt: '2024-04-12T10:00:00Z', lastWatchedAt: '2024-04-12T10:00:00Z', totalWatchTimeSeconds: 4200, replayCount: 0 },
]

// ===================== TEST RESULTS =====================
export const TEST_RESULTS: any = [
  { id: 'tr-1', userId: 'user-4', userName: 'Phạm Thị Lan', testId: 'test-1', testTitle: 'Kiểm tra: Tổng quan thị trường BĐS', score: 80, correctCount: 4, totalQuestions: 5, isPassed: true, timeSpentSeconds: 540, answersDetail: { 'q1-1': 'q1-1-B', 'q1-2': 'q1-2-B', 'q1-3': 'q1-3-B', 'q1-4': 'q1-4-C', 'q1-5': 'q1-5-A' }, attemptNumber: 1, completedAt: '2024-06-01T10:30:00Z' },
  { id: 'tr-2', userId: 'user-5', userName: 'Nguyễn Minh Tuấn', testId: 'test-1', testTitle: 'Kiểm tra: Tổng quan thị trường BĐS', score: 100, correctCount: 5, totalQuestions: 5, isPassed: true, timeSpentSeconds: 420, answersDetail: { 'q1-1': 'q1-1-B', 'q1-2': 'q1-2-B', 'q1-3': 'q1-3-B', 'q1-4': 'q1-4-C', 'q1-5': 'q1-5-C' }, attemptNumber: 1, completedAt: '2024-05-20T10:30:00Z' },
  { id: 'tr-3', userId: 'user-5', userName: 'Nguyễn Minh Tuấn', testId: 'test-2', testTitle: 'Kiểm tra: Kỹ năng tiếp cận khách hàng', score: 80, correctCount: 4, totalQuestions: 5, isPassed: true, timeSpentSeconds: 480, answersDetail: { 'q2-1': 'q2-1-B', 'q2-2': 'q2-2-B', 'q2-3': 'q2-3-B', 'q2-4': 'q2-4-B', 'q2-5': 'q2-5-A' }, attemptNumber: 1, completedAt: '2024-05-23T10:30:00Z' },
  { id: 'tr-4', userId: 'user-8', userName: 'Vũ Thị Hoa', testId: 'test-1', testTitle: 'Kiểm tra: Tổng quan thị trường BĐS', score: 100, correctCount: 5, totalQuestions: 5, isPassed: true, timeSpentSeconds: 380, answersDetail: { 'q1-1': 'q1-1-B', 'q1-2': 'q1-2-B', 'q1-3': 'q1-3-B', 'q1-4': 'q1-4-C', 'q1-5': 'q1-5-C' }, attemptNumber: 1, completedAt: '2024-04-01T10:30:00Z' },
  { id: 'tr-5', userId: 'user-8', userName: 'Vũ Thị Hoa', testId: 'test-2', testTitle: 'Kiểm tra: Kỹ năng tiếp cận khách hàng', score: 100, correctCount: 5, totalQuestions: 5, isPassed: true, timeSpentSeconds: 350, answersDetail: { 'q2-1': 'q2-1-B', 'q2-2': 'q2-2-B', 'q2-3': 'q2-3-B', 'q2-4': 'q2-4-B', 'q2-5': 'q2-5-B' }, attemptNumber: 1, completedAt: '2024-04-04T10:30:00Z' },
]

// ===================== CERTIFICATES =====================
export const CERTIFICATES: Certificate[] = [
  {
    id: 'cert-1', userId: 'user-8', userName: 'Vũ Thị Hoa',
    courseId: 'course-1', courseTitle: 'Đào tạo Chuyên viên Kinh doanh Bất động sản',
    certificateNumber: 'PD-2024-VTH001',
    qrCodeData: 'https://elearning.phuongdong.vn/cert/PD-2024-VTH001',
    digitalSignature: 'SIG-2024-ABC123',
    issuedAt: '2024-04-15T00:00:00Z',
  },
]

// ===================== BADGES =====================
export const BADGES: Badge[] = [
  { id: 'badge-1', name: 'Khởi đầu tốt', description: 'Hoàn thành bài học đầu tiên', icon: '🌟', color: '#FF6B00', conditionType: 'first_lesson', conditionValue: 1 },
  { id: 'badge-2', name: 'Siêng năng', description: 'Hoàn thành 5 bài học', icon: '📚', color: '#003566', conditionType: 'lessons_completed', conditionValue: 5 },
  { id: 'badge-3', name: 'Học giả', description: 'Hoàn thành 10 bài học', icon: '🎓', color: '#00A8E8', conditionType: 'lessons_completed', conditionValue: 10 },
  { id: 'badge-4', name: 'Chuyên gia', description: 'Hoàn thành tất cả bài học', icon: '👑', color: '#FFD700', conditionType: 'lessons_completed', conditionValue: 12 },
  { id: 'badge-5', name: 'Kiên trì', description: 'Học liên tục 7 ngày', icon: '🔥', color: '#FF4500', conditionType: 'streak_days', conditionValue: 7 },
  { id: 'badge-6', name: 'Xuất sắc', description: 'Đạt 100 điểm trong bài kiểm tra', icon: '💯', color: '#4CAF50', conditionType: 'perfect_score', conditionValue: 100 },
  { id: 'badge-7', name: 'Tốc độ', description: 'Hoàn thành bài học trong thời gian kỷ lục', icon: '⚡', color: '#9C27B0', conditionType: 'fast_learner', conditionValue: 1 },
  { id: 'badge-8', name: 'Người dẫn đầu', description: 'Đứng Top 3 bảng xếp hạng', icon: '🏆', color: '#FF8C00', conditionType: 'top_learner', conditionValue: 3 },
  { id: 'badge-9', name: 'Vượt thử thách', description: 'Hoàn thành 5 bài kiểm tra', icon: '🛡️', color: '#2196F3', conditionType: 'tests_passed', conditionValue: 5 },
  { id: 'badge-10', name: 'Hoàn thiện', description: 'Hoàn thành khóa học đầu tiên', icon: '🎯', color: '#E91E63', conditionType: 'courses_completed', conditionValue: 1 },
]

export const USER_BADGES: UserBadge[] = [
  { id: 'ub-1', userId: 'user-4', badgeId: 'badge-1', badge: BADGES[0], earnedAt: '2024-06-01T10:00:00Z' },
  { id: 'ub-2', userId: 'user-4', badgeId: 'badge-2', badge: BADGES[1], earnedAt: '2024-06-03T10:00:00Z' },
  { id: 'ub-3', userId: 'user-5', badgeId: 'badge-1', badge: BADGES[0], earnedAt: '2024-05-20T10:00:00Z' },
  { id: 'ub-4', userId: 'user-5', badgeId: 'badge-2', badge: BADGES[1], earnedAt: '2024-05-22T10:00:00Z' },
  { id: 'ub-5', userId: 'user-5', badgeId: 'badge-3', badge: BADGES[2], earnedAt: '2024-05-24T10:00:00Z' },
  { id: 'ub-6', userId: 'user-5', badgeId: 'badge-5', badge: BADGES[4], earnedAt: '2024-05-26T10:00:00Z' },
  { id: 'ub-7', userId: 'user-8', badgeId: 'badge-1', badge: BADGES[0], earnedAt: '2024-04-01T10:00:00Z' },
  { id: 'ub-8', userId: 'user-8', badgeId: 'badge-2', badge: BADGES[1], earnedAt: '2024-04-05T10:00:00Z' },
  { id: 'ub-9', userId: 'user-8', badgeId: 'badge-3', badge: BADGES[2], earnedAt: '2024-04-08T10:00:00Z' },
  { id: 'ub-10', userId: 'user-8', badgeId: 'badge-4', badge: BADGES[3], earnedAt: '2024-04-12T10:00:00Z' },
  { id: 'ub-11', userId: 'user-8', badgeId: 'badge-5', badge: BADGES[4], earnedAt: '2024-04-15T10:00:00Z' },
  { id: 'ub-12', userId: 'user-8', badgeId: 'badge-6', badge: BADGES[5], earnedAt: '2024-04-01T10:30:00Z' },
  { id: 'ub-13', userId: 'user-8', badgeId: 'badge-9', badge: BADGES[8], earnedAt: '2024-04-05T10:30:00Z' },
  { id: 'ub-14', userId: 'user-8', badgeId: 'badge-10', badge: BADGES[9], earnedAt: '2024-04-15T00:00:00Z' },
]

// ===================== NOTIFICATIONS =====================
export const NOTIFICATIONS: Notification[] = [
  { id: 'notif-1', senderId: 'user-1', senderName: 'Nguyễn Văn Admin', title: 'Chào mừng đến với Phương Đông E-Learning!', content: 'Bạn đã được cấp quyền truy cập vào hệ thống đào tạo. Hãy bắt đầu hành trình học tập ngay hôm nay!', type: 'success', targetType: 'all', isRead: false, createdAt: '2024-06-19T09:00:00Z' },
  { id: 'notif-2', senderId: 'user-2', senderName: 'Trần Thị Giám Đốc', title: 'Video bài học mới đã được cập nhật', content: 'Chương 4: Pháp lý và hồ sơ bất động sản vừa được thêm 3 video mới. Hãy xem ngay!', type: 'info', targetType: 'all', isRead: false, createdAt: '2024-06-18T14:30:00Z' },
  { id: 'notif-3', senderId: 'user-1', senderName: 'Hệ thống', title: 'Nhắc nhở: Bạn chưa học trong 3 ngày', content: 'Đừng để chuỗi ngày học bị đứt! Hãy dành 30 phút học ngay hôm nay để duy trì thành tích.', type: 'reminder', targetType: 'individual', recipientId: 'user-4', isRead: true, createdAt: '2024-06-17T08:00:00Z' },
  { id: 'notif-4', senderId: 'user-2', senderName: 'Trần Thị Giám Đốc', title: 'Thông báo về kỳ đánh giá định kỳ', content: 'Kỳ đánh giá năng lực tháng 6 sẽ diễn ra vào ngày 25/06. Hãy hoàn thành chương trình học trước ngày đó.', type: 'warning', targetType: 'region', targetId: 'region-1', isRead: true, createdAt: '2024-06-15T10:00:00Z' },
  { id: 'notif-5', senderId: 'user-1', senderName: 'Hệ thống', title: '🏆 Chúc mừng! Bạn đã đạt huy hiệu mới', content: 'Bạn vừa nhận được huy hiệu "Siêng năng" sau khi hoàn thành 5 bài học. Tiếp tục cố gắng!', type: 'success', targetType: 'individual', recipientId: 'user-4', isRead: false, createdAt: '2024-06-03T11:00:00Z' },
]

// ===================== ACTIVITY LOGS =====================
export const ACTIVITY_LOGS: ActivityLog[] = [
  { id: 'log-1', userId: 'user-4', userName: 'Phạm Thị Lan', action: 'login', description: 'Đăng nhập vào hệ thống', ipAddress: '192.168.1.10', userAgent: 'Chrome/120', metadata: {}, createdAt: '2024-06-20T08:00:00Z' },
  { id: 'log-2', userId: 'user-4', userName: 'Phạm Thị Lan', action: 'watch_video', description: 'Xem video: Bài 4 - Kỹ năng tiếp cận khách hàng', ipAddress: '192.168.1.10', userAgent: 'Chrome/120', metadata: { lessonId: 'lesson-4', watchPercent: 60 }, createdAt: '2024-06-20T08:15:00Z' },
  { id: 'log-3', userId: 'user-5', userName: 'Nguyễn Minh Tuấn', action: 'login', description: 'Đăng nhập vào hệ thống', ipAddress: '10.0.0.15', userAgent: 'Firefox/121', metadata: {}, createdAt: '2024-06-20T07:30:00Z' },
  { id: 'log-4', userId: 'user-5', userName: 'Nguyễn Minh Tuấn', action: 'pass_test', description: 'Đạt bài kiểm tra: Kỹ năng tiếp cận khách hàng (80 điểm)', ipAddress: '10.0.0.15', userAgent: 'Firefox/121', metadata: { testId: 'test-2', score: 80 }, createdAt: '2024-06-20T07:45:00Z' },
  { id: 'log-5', userId: 'user-8', userName: 'Vũ Thị Hoa', action: 'earn_certificate', description: 'Nhận chứng nhận: Đào tạo Chuyên viên Kinh doanh Bất động sản', ipAddress: '192.168.1.20', userAgent: 'Chrome/120', metadata: { courseId: 'course-1', certId: 'cert-1' }, createdAt: '2024-04-15T00:00:00Z' },
  { id: 'log-6', userId: 'user-1', userName: 'Nguyễn Văn Admin', action: 'create_user', description: 'Tạo tài khoản mới: Hoàng Thị Mai', ipAddress: '192.168.1.1', userAgent: 'Chrome/120', metadata: { newUserId: 'user-6' }, createdAt: '2024-03-01T09:00:00Z' },
]

// ===================== RANKING =====================
export const RANKING: RankingEntry[] = [
  { userId: 'user-8', userName: 'Vũ Thị Hoa', avatarUrl: '', regionName: 'Khu vực Hà Nội', departmentName: 'Phòng Kinh doanh 2', xpPoints: 3100, lessonsCompleted: 12, testsPassed: 2, avgScore: 100, streakDays: 21, rank: 1 },
  { userId: 'user-5', userName: 'Nguyễn Minh Tuấn', avatarUrl: '', regionName: 'Khu vực TP.HCM', departmentName: 'Phòng Kinh doanh 3', xpPoints: 2200, lessonsCompleted: 6, testsPassed: 2, avgScore: 90, streakDays: 12, rank: 2 },
  { userId: 'user-3', userName: 'Lê Văn Trưởng Khu', avatarUrl: '', regionName: 'Khu vực Hà Nội', departmentName: 'Phòng Kinh doanh 1', xpPoints: 2500, lessonsCompleted: 5, testsPassed: 1, avgScore: 85, streakDays: 10, rank: 3 },
  { userId: 'user-4', userName: 'Phạm Thị Lan', avatarUrl: '', regionName: 'Khu vực Hà Nội', departmentName: 'Phòng Kinh doanh 1', xpPoints: 1800, lessonsCompleted: 3, testsPassed: 1, avgScore: 80, streakDays: 7, rank: 4 },
  { userId: 'user-6', userName: 'Hoàng Thị Mai', avatarUrl: '', regionName: 'Khu vực TP.HCM', departmentName: 'Phòng Kinh doanh 4', xpPoints: 950, lessonsCompleted: 2, testsPassed: 0, avgScore: 65, streakDays: 3, rank: 5 },
  { userId: 'user-7', userName: 'Đỗ Văn Hùng', avatarUrl: '', regionName: 'Khu vực Miền Trung', departmentName: 'Phòng Kinh doanh 5', xpPoints: 300, lessonsCompleted: 1, testsPassed: 0, avgScore: 60, streakDays: 0, rank: 6 },
]

// ===================== DAILY CHART DATA =====================
export const DAILY_PROGRESS_DATA = [
  { date: '14/06', value: 3, label: '3 bài học' },
  { date: '15/06', value: 2, label: '2 bài học' },
  { date: '16/06', value: 4, label: '4 bài học' },
  { date: '17/06', value: 0, label: '0 bài học' },
  { date: '18/06', value: 1, label: '1 bài học' },
  { date: '19/06', value: 3, label: '3 bài học' },
  { date: '20/06', value: 2, label: '2 bài học' },
]

export const WEEKLY_PROGRESS_DATA = [
  { date: 'Tuần 1', value: 8, label: '8 bài học' },
  { date: 'Tuần 2', value: 12, label: '12 bài học' },
  { date: 'Tuần 3', value: 6, label: '6 bài học' },
  { date: 'Tuần 4', value: 15, label: '15 bài học' },
]

export const MONTHLY_PROGRESS_DATA = [
  { date: 'T1/2024', value: 45, label: '45 bài học' },
  { date: 'T2/2024', value: 62, label: '62 bài học' },
  { date: 'T3/2024', value: 38, label: '38 bài học' },
  { date: 'T4/2024', value: 71, label: '71 bài học' },
  { date: 'T5/2024', value: 58, label: '58 bài học' },
  { date: 'T6/2024', value: 43, label: '43 bài học' },
]

// Password for all demo users: Phuongdong@2024
export const DEMO_PASSWORDS: Record<string, string> = {
  '001099000001': 'Phuongdong@2024',
  '001099000002': 'Phuongdong@2024',
  '001099000003': 'Phuongdong@2024',
  '001099000004': 'Phuongdong@2024',
  '001099000005': 'Phuongdong@2024',
  '001099000006': 'Phuongdong@2024',
  '001099000007': 'Phuongdong@2024',
  '001099000008': 'Phuongdong@2024',
  '042303012178': '123456',
  '042303012179': '123456',
}
