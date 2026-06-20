import * as React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useAuthStore } from '@/stores/authStore'
import { Trophy, Medal, Star, TrendingUp } from 'lucide-react'

export function LeaderboardPage() {
  const { user } = useAuthStore()
  
  if (!user) return null

  // Mock data
  const weeklyLeaderboard = Array.from({ length: 20 }).map((_, i) => ({
    id: `user-${i}`,
    name: i === 7 ? user.fullName : `Chuyên viên kinh doanh ${i + 1}`,
    avatar: i === 7 ? user.avatarUrl : undefined,
    branch: ['CN Sài Gòn', 'CN Hà Nội', 'CN Đà Nẵng'][i % 3],
    xp: 2500 - (i * 85),
    isCurrentUser: i === 7,
    trend: i % 3 === 0 ? 'up' : i % 3 === 1 ? 'down' : 'same',
  }))

  const getRankStyle = (rank: number) => {
    switch(rank) {
      case 1: return 'bg-yellow-100 text-yellow-700 border-yellow-300'
      case 2: return 'bg-gray-200 text-gray-700 border-gray-300'
      case 3: return 'bg-orange-100 text-orange-700 border-orange-300'
      default: return 'bg-transparent text-muted-foreground border-transparent'
    }
  }

  const TopThree = ({ data }: { data: typeof weeklyLeaderboard }) => (
    <div className="flex justify-center items-end gap-2 sm:gap-6 mb-12 h-64">
      {/* 2nd Place */}
      <div className="flex flex-col items-center animate-slide-in-bottom" style={{ animationDelay: '100ms' }}>
        <div className="relative mb-2">
          <Avatar className="h-16 w-16 border-4 border-gray-300 shadow-lg">
            <AvatarImage src={data[1].avatar} />
            <AvatarFallback>{data[1].name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="absolute -bottom-2 -right-2 bg-gray-200 w-8 h-8 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
            <Medal className="h-4 w-4 text-gray-600" />
          </div>
        </div>
        <div className="text-center w-24">
          <div className="text-sm font-bold truncate">{data[1].name}</div>
          <div className="text-xs text-muted-foreground">{data[1].xp} XP</div>
        </div>
        <div className="w-20 sm:w-24 h-24 bg-gradient-to-t from-gray-200 to-gray-100 rounded-t-lg mt-4 border-t-4 border-gray-300 flex justify-center pt-4 shadow-inner">
          <span className="text-2xl font-bold text-gray-400">2</span>
        </div>
      </div>

      {/* 1st Place */}
      <div className="flex flex-col items-center animate-slide-in-bottom z-10">
        <div className="relative mb-2">
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-yellow-500">
            <Trophy className="h-8 w-8 drop-shadow-md" />
          </div>
          <Avatar className="h-20 w-20 border-4 border-yellow-400 shadow-xl">
            <AvatarImage src={data[0].avatar} />
            <AvatarFallback>{data[0].name.charAt(0)}</AvatarFallback>
          </Avatar>
        </div>
        <div className="text-center w-28">
          <div className="text-base font-bold truncate text-yellow-600 dark:text-yellow-500">{data[0].name}</div>
          <div className="text-sm font-medium text-yellow-600/80 dark:text-yellow-500/80">{data[0].xp} XP</div>
        </div>
        <div className="w-24 sm:w-28 h-32 bg-gradient-to-t from-yellow-200 to-yellow-100 rounded-t-lg mt-4 border-t-4 border-yellow-400 flex justify-center pt-4 shadow-inner">
          <span className="text-3xl font-bold text-yellow-500">1</span>
        </div>
      </div>

      {/* 3rd Place */}
      <div className="flex flex-col items-center animate-slide-in-bottom" style={{ animationDelay: '200ms' }}>
        <div className="relative mb-2">
          <Avatar className="h-16 w-16 border-4 border-orange-300 shadow-lg">
            <AvatarImage src={data[2].avatar} />
            <AvatarFallback>{data[2].name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="absolute -bottom-2 -right-2 bg-orange-200 w-8 h-8 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
            <Medal className="h-4 w-4 text-orange-600" />
          </div>
        </div>
        <div className="text-center w-24">
          <div className="text-sm font-bold truncate">{data[2].name}</div>
          <div className="text-xs text-muted-foreground">{data[2].xp} XP</div>
        </div>
        <div className="w-20 sm:w-24 h-20 bg-gradient-to-t from-orange-200 to-orange-100 rounded-t-lg mt-4 border-t-4 border-orange-300 flex justify-center pt-4 shadow-inner">
          <span className="text-2xl font-bold text-orange-400">3</span>
        </div>
      </div>
    </div>
  )

  return (
    <div className="space-y-6 animate-fade-in pb-8 max-w-5xl mx-auto">
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-heading font-bold mb-2">Bảng Xếp Hạng</h1>
        <p className="text-muted-foreground">Vinh danh những cá nhân xuất sắc nhất trong học tập</p>
      </div>

      <Tabs defaultValue="weekly" className="w-full">
        <div className="flex justify-center mb-8">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="weekly">Tuần này</TabsTrigger>
            <TabsTrigger value="monthly">Tháng này</TabsTrigger>
            <TabsTrigger value="allTime">Tất cả</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="weekly" className="space-y-8">
          <TopThree data={weeklyLeaderboard} />

          <Card className="overflow-hidden border-none shadow-card-hover bg-card/50 backdrop-blur">
            <div className="p-0">
              <div className="grid grid-cols-12 gap-4 px-6 py-3 border-b bg-muted/50 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                <div className="col-span-2 sm:col-span-1 text-center">Hạng</div>
                <div className="col-span-7 sm:col-span-5">Chuyên viên</div>
                <div className="col-span-3 hidden sm:block text-center">Chi nhánh</div>
                <div className="col-span-3 text-right">Điểm XP</div>
              </div>
              
              <div className="divide-y">
                {weeklyLeaderboard.slice(3).map((row, idx) => {
                  const rank = idx + 4;
                  return (
                    <div 
                      key={row.id} 
                      className={`grid grid-cols-12 gap-4 px-6 py-4 items-center transition-colors hover:bg-muted/30 ${
                        row.isCurrentUser ? 'bg-primary-50 dark:bg-primary-900/10 hover:bg-primary-50 dark:hover:bg-primary-900/20' : ''
                      }`}
                    >
                      <div className="col-span-2 sm:col-span-1 flex justify-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                          row.isCurrentUser ? 'bg-primary-500 text-white shadow-md' : 'text-muted-foreground font-medium'
                        }`}>
                          {rank}
                        </div>
                      </div>
                      <div className="col-span-7 sm:col-span-5 flex items-center gap-3 min-w-0">
                        <Avatar className="h-10 w-10 shrink-0 border">
                          <AvatarFallback className={row.isCurrentUser ? 'bg-primary-100 text-primary-700' : ''}>
                            {row.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="min-w-0">
                          <p className={`font-semibold text-sm truncate ${row.isCurrentUser ? 'text-primary-700 dark:text-primary-400' : ''}`}>
                            {row.name}
                          </p>
                          <div className="flex sm:hidden text-xs text-muted-foreground truncate">
                            {row.branch}
                          </div>
                        </div>
                        {row.isCurrentUser && (
                          <span className="hidden sm:inline-flex ml-2 px-2 py-0.5 rounded text-[10px] font-bold bg-primary-100 text-primary-700 uppercase">
                            Bạn
                          </span>
                        )}
                      </div>
                      <div className="col-span-3 hidden sm:flex text-sm text-muted-foreground justify-center">
                        <span className="bg-muted px-2 py-1 rounded-md text-xs">{row.branch}</span>
                      </div>
                      <div className="col-span-3 flex items-center justify-end gap-2 text-right">
                        <span className="font-bold text-sm sm:text-base">{row.xp.toLocaleString()}</span>
                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 hidden sm:block" />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </Card>
        </TabsContent>
        <TabsContent value="monthly">
          <div className="text-center py-12 text-muted-foreground">
            <TrendingUp className="h-12 w-12 mx-auto mb-4 opacity-20" />
            <p>Dữ liệu xếp hạng tháng đang được cập nhật</p>
          </div>
        </TabsContent>
        <TabsContent value="allTime">
          <div className="text-center py-12 text-muted-foreground">
            <Trophy className="h-12 w-12 mx-auto mb-4 opacity-20" />
            <p>Dữ liệu xếp hạng tổng đang được cập nhật</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
