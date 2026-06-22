import * as React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Award, Download, Share2, Search, Filter } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { useAuthStore } from '@/stores/authStore'
import { Dialog, DialogContent } from '@/components/ui/dialog'

export function CertificatesPage() {
  const { user } = useAuthStore()
  const [searchTerm, setSearchTerm] = React.useState('')
  const [selectedCert, setSelectedCert] = React.useState<any>(null)

  if (!user) return null

  // Mock data
  const certificates = [
    {
      id: 'cert-1',
      title: 'Kỹ Năng Bán Hàng Bất Động Sản Chuyên Nghiệp',
      issueDate: '2023-11-15',
      courseCategory: 'Kỹ năng mềm',
      grade: 'Xuất sắc',
      imageUrl: 'https://images.unsplash.com/photo-1589330694653-efa6475306e1?q=80&w=2000&auto=format&fit=crop',
    },
    {
      id: 'cert-2',
      title: 'Pháp Lý Bất Động Sản Căn Bản',
      issueDate: '2023-10-02',
      courseCategory: 'Kiến thức chuyên môn',
      grade: 'Giỏi',
      imageUrl: 'https://images.unsplash.com/photo-1555849898-f29e0434c9bb?q=80&w=2000&auto=format&fit=crop',
    },
    {
      id: 'cert-3',
      title: 'Digital Marketing Trong BĐS',
      issueDate: '2023-08-20',
      courseCategory: 'Marketing',
      grade: 'Khá',
      imageUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=2000&auto=format&fit=crop',
    }
  ]

  const filteredCerts = certificates.filter(c => 
    c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.courseCategory.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleDownload = (cert: any) => {
    alert(`Đang khởi tạo tải xuống chứng chỉ: ${cert.title}.pdf`);
  }

  const handleShare = (cert: any) => {
    alert(`Đã sao chép liên kết chứng chỉ "${cert.title}" để chia sẻ!`);
  }

  return (
    <div className="space-y-6 animate-fade-in pb-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold">Chứng nhận của tôi</h1>
          <p className="text-muted-foreground mt-1">Quản lý và chia sẻ các chứng nhận bạn đã đạt được</p>
        </div>
      </div>

      <Card className="p-4 bg-card/50 backdrop-blur border-none shadow-sm">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Tìm kiếm chứng nhận..." 
              className="pl-9 bg-background" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" className="shrink-0 bg-background">
            <Filter className="h-4 w-4 mr-2" /> Lọc
          </Button>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCerts.map((cert) => (
          <Card key={cert.id} className="overflow-hidden group hover:shadow-card-hover transition-all duration-300">
            <div className="relative h-48 bg-muted border-b overflow-hidden p-4 flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-900 to-primary-700 opacity-90"></div>
              
              {/* Fake Certificate Design */}
              <div className="relative z-10 bg-white/95 w-full h-full p-4 border-4 border-double border-primary-800 flex flex-col items-center justify-center text-center shadow-lg transform group-hover:scale-105 transition-transform duration-500">
                <Award className="h-6 w-6 text-yellow-500 mb-1" />
                <div className="text-[10px] font-bold text-primary-900 uppercase tracking-widest mb-1">Phương Đông</div>
                <div className="text-xs font-serif italic text-gray-800 leading-tight mb-2 font-semibold">Chứng nhận hoàn thành</div>
                <div className="text-xs font-bold text-primary-700 line-clamp-2 leading-tight">{cert.title}</div>
              </div>

              {/* Hover Actions */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 z-20">
                <Button size="icon" variant="secondary" className="rounded-full shadow-lg" title="Tải xuống" onClick={() => handleDownload(cert)}>
                  <Download className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="default" className="rounded-full shadow-lg" title="Chia sẻ" onClick={() => handleShare(cert)}>
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <CardContent className="p-5">
              <div className="flex justify-between items-start mb-2">
                <Badge variant="outline" className="bg-muted/50">{cert.courseCategory}</Badge>
                <span className="text-xs text-muted-foreground font-medium">
                  {new Date(cert.issueDate).toLocaleDateString('vi-VN')}
                </span>
              </div>
              
              <h3 className="font-bold text-lg mb-4 line-clamp-2" title={cert.title}>{cert.title}</h3>
              
              <div className="flex items-center justify-between border-t pt-4">
                <div className="text-sm">
                  <span className="text-muted-foreground">Xếp loại: </span>
                  <span className={`font-semibold ${
                    cert.grade === 'Xuất sắc' ? 'text-yellow-600' :
                    cert.grade === 'Giỏi' ? 'text-green-600' : 'text-blue-600'
                  }`}>{cert.grade}</span>
                </div>
                <Button variant="link" className="px-0 h-auto text-primary-600" onClick={() => setSelectedCert(cert)}>Xem chi tiết</Button>
              </div>
            </CardContent>
          </Card>
        ))}

        {filteredCerts.length === 0 && (
          <Card className="col-span-full overflow-hidden border-dashed bg-muted/20 flex flex-col items-center justify-center text-center p-8 min-h-[300px]">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
              <Award className="h-8 w-8 text-muted-foreground opacity-50" />
            </div>
            <h3 className="font-semibold text-lg mb-2 text-foreground">Không tìm thấy chứng nhận nào</h3>
            <p className="text-sm text-muted-foreground">Vui lòng thử tìm kiếm với từ khóa khác.</p>
          </Card>
        )}

        {/* Empty placeholder to encourage learning */}
        {filteredCerts.length > 0 && (
          <Card className="overflow-hidden border-dashed bg-muted/20 flex flex-col items-center justify-center text-center p-8 min-h-[300px]">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
              <Award className="h-8 w-8 text-muted-foreground opacity-50" />
            </div>
            <h3 className="font-semibold text-lg mb-2 text-foreground">Bạn muốn thêm chứng nhận?</h3>
            <p className="text-sm text-muted-foreground mb-6">Hoàn thành các khóa học mới để bổ sung vào bộ sưu tập của bạn.</p>
            <Button variant="outline">Khám phá khóa học</Button>
          </Card>
        )}
      </div>

      {/* Certificate Viewer Modal */}
      <Dialog open={!!selectedCert} onOpenChange={(open) => !open && setSelectedCert(null)}>
        <DialogContent className="max-w-xl sm:max-w-2xl bg-white text-gray-900 border-[10px] border-double border-primary-800 p-8 shadow-2xl relative">
          {selectedCert && (
            <div className="flex flex-col items-center justify-center text-center space-y-6 py-6 border-4 border-primary-700 p-6 bg-amber-50/10">
              <Award className="h-16 w-16 text-yellow-500 mb-2" />
              <div>
                <h2 className="text-3xl font-serif font-bold uppercase tracking-wider text-primary-900">BẢNG VÀNG DANH DỰ</h2>
                <p className="text-sm font-serif italic text-gray-500 mt-1">Hệ thống đào tạo nội bộ Phương Đông Land</p>
              </div>
              <div className="h-0.5 w-48 bg-primary-900/30"></div>
              <div className="space-y-3">
                <p className="text-sm font-serif italic text-gray-500">Chứng nhận đồng chí</p>
                <p className="text-2xl font-bold font-heading text-primary-850">{user.fullName}</p>
                <p className="text-sm text-gray-600 max-w-md mx-auto">
                  Đã hoàn thành xuất sắc khóa đào tạo chuyên môn:
                </p>
                <p className="text-xl font-bold text-gray-900 max-w-lg leading-snug mt-2 font-heading">
                  {selectedCert.title}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-12 w-full pt-8 text-sm">
                <div>
                  <p className="text-gray-500 font-serif italic">Ngày cấp chứng chỉ</p>
                  <p className="font-semibold">{new Date(selectedCert.issueDate).toLocaleDateString('vi-VN')}</p>
                </div>
                <div>
                  <p className="text-gray-500 font-serif italic">Xếp loại học tập</p>
                  <p className="font-semibold text-primary-750">{selectedCert.grade}</p>
                </div>
              </div>
              <div className="pt-8 w-full flex justify-between items-end">
                <div className="text-left text-xs text-gray-400 space-y-1">
                  <p>Mã số: PĐ-LMS-{selectedCert.id.toUpperCase()}</p>
                  <p>Xác thực bảo mật kỹ thuật số thành công</p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-gray-150 flex items-center justify-center border border-dashed border-gray-400 text-[10px] text-gray-400 font-mono">
                    [ QR Code ]
                  </div>
                  <span className="text-[10px] text-gray-400 mt-1">Quét để kiểm tra</span>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
