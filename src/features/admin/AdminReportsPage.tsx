import * as React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Users, BookOpen, GraduationCap, TrendingUp, Download, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

export function AdminReportsPage() {
  const stats = [
    { label: 'Tổng Học Viên', value: '1,248', icon: Users, color: 'text-blue-500', bg: 'bg-blue-100' },
    { label: 'Khóa Học Đang Mở', value: '24', icon: BookOpen, color: 'text-green-500', bg: 'bg-green-100' },
    { label: 'Lượt Hoàn Thành', value: '3,842', icon: GraduationCap, color: 'text-purple-500', bg: 'bg-purple-100' },
    { label: 'Điểm Trung Bình', value: '8.5', icon: TrendingUp, color: 'text-orange-500', bg: 'bg-orange-100' },
  ]

  const completionData = [
    { name: 'T1', percent: 65 },
    { name: 'T2', percent: 70 },
    { name: 'T3', percent: 82 },
    { name: 'T4', percent: 78 },
    { name: 'T5', percent: 85 },
    { name: 'T6', percent: 92 },
  ]

  const branchData = [
    { name: 'CN Hà Nội', value: 450 },
    { name: 'CN Sài Gòn', value: 520 },
    { name: 'CN Đà Nẵng', value: 180 },
    { name: 'CN Hải Phòng', value: 98 },
  ]
  const COLORS = ['#003566', '#FF6B00', '#00A8E8', '#22C55E']

  return (
    <div className="space-y-6 animate-fade-in pb-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold">Báo cáo & Thống kê</h1>
          <p className="text-muted-foreground mt-1">Tổng quan về tình hình học tập toàn công ty</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline"><Calendar className="h-4 w-4 mr-2" /> Tháng này</Button>
          <Button><Download className="h-4 w-4 mr-2" /> Xuất Excel</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <Card key={i} className="border-none shadow-sm bg-card/50 backdrop-blur">
            <CardContent className="p-6 flex items-center gap-4">
              <div className={`w-14 h-14 rounded-full flex items-center justify-center shrink-0 ${stat.bg}`}>
                <stat.icon className={`h-7 w-7 ${stat.color}`} />
              </div>
              <div>
                <div className="text-sm font-medium text-muted-foreground">{stat.label}</div>
                <div className="text-3xl font-bold font-heading">{stat.value}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Tỉ lệ hoàn thành khóa học (6 tháng)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={completionData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} tickFormatter={(val) => `${val}%`} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    formatter={(value) => [`${value}%`, 'Tỉ lệ hoàn thành']}
                  />
                  <Bar dataKey="percent" fill="#003566" radius={[4, 4, 0, 0]} maxBarSize={50} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Phân bổ học viên theo chi nhánh</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center">
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={branchData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {branchData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="w-full space-y-2 mt-4">
              {branchData.map((item, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index] }}></div>
                    <span className="font-medium">{item.name}</span>
                  </div>
                  <span className="font-bold">{item.value} học viên</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
