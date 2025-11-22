import React, { useEffect, useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { 
  getTrackingEvents, 
  getTrackingStats, 
  clearAllTrackingData, 
  exportTrackingData,
  TrackingEvent
} from "@/lib/tracking-storage";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';
import { Download, Trash2, RefreshCw, Shield, MapPin, MousePointer, Eye } from 'lucide-react';
import { toast } from "sonner";

const Admin = () => {
  const [events, setEvents] = useState<TrackingEvent[]>([]);
  const [stats, setStats] = useState({
    totalEvents: 0,
    pageViews: 0,
    clicks: 0,
    uniqueVisitors: 0
  });
  const [chartData, setChartData] = useState<any[]>([]);

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const auth = sessionStorage.getItem('admin_auth');
    if (auth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'Admin' && password === 'Dh1206@@') {
      setIsAuthenticated(true);
      sessionStorage.setItem('admin_auth', 'true');
      toast.success("Đăng nhập thành công");
    } else {
      toast.error("Sai tên đăng nhập hoặc mật khẩu");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('admin_auth');
    toast.success("Đã đăng xuất");
  };

  const loadData = () => {
    const currentEvents = getTrackingEvents();
    const currentStats = getTrackingStats();
    
    // Calculate unique visitors based on IP (simple approximation)
    const uniqueIPs = new Set(currentEvents.map(e => e.ip).filter(Boolean));
    
    setEvents(currentEvents);
    setStats({
      ...currentStats,
      uniqueVisitors: uniqueIPs.size
    });
    
    // Process data for chart (Events per hour)
    const hourMap = new Map();
    currentEvents.forEach(event => {
      const date = new Date(event.timestamp);
      const key = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      hourMap.set(key, (hourMap.get(key) || 0) + 1);
    });
    
    // Take last 10 data points for cleaner chart
    const data = Array.from(hourMap.entries())
      .map(([time, count]) => ({ time, count }))
      .slice(-20);
      
    setChartData(data);
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadData();
      // Auto refresh every 30 seconds
      const interval = setInterval(loadData, 30000);
      return () => clearInterval(interval);
    }
  }, [isAuthenticated]);

  const handleClearData = () => {
    if (confirm('Bạn có chắc chắn muốn xóa toàn bộ dữ liệu tracking không?')) {
      clearAllTrackingData();
      loadData();
      toast.success("Đã xóa dữ liệu thành công");
    }
  };

  const handleExport = () => {
    const dataStr = exportTrackingData();
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `tracking-data-${new Date().toISOString()}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    toast.success("Đã xuất dữ liệu thành công");
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50/50 p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Admin Login</CardTitle>
            <CardDescription className="text-center">
              Vui lòng đăng nhập để truy cập dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Nhập username"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Nhập password"
                />
              </div>
              <Button type="submit" className="w-full">
                Đăng nhập
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/50 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Admin Dashboard</h1>
            <p className="text-muted-foreground mt-1">Theo dõi hoạt động người dùng và thống kê click</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={loadData}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Làm mới
            </Button>
            <Button variant="outline" onClick={handleExport}>
              <Download className="mr-2 h-4 w-4" />
              Xuất dữ liệu
            </Button>
            <Button variant="destructive" onClick={handleClearData}>
              <Trash2 className="mr-2 h-4 w-4" />
              Xóa dữ liệu
            </Button>
            <Button variant="ghost" onClick={handleLogout}>
              Đăng xuất
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tổng sự kiện</CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalEvents}</div>
              <p className="text-xs text-muted-foreground">
                Tất cả hoạt động được ghi lại
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Lượt xem trang</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.pageViews}</div>
              <p className="text-xs text-muted-foreground">
                Số lần trang được tải
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Lượt Click</CardTitle>
              <MousePointer className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.clicks}</div>
              <p className="text-xs text-muted-foreground">
                Tương tác click của người dùng
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Khách truy cập</CardTitle>
              <MapPin className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{(stats as any).uniqueVisitors || 0}</div>
              <p className="text-xs text-muted-foreground">
                Dựa trên IP duy nhất
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Hoạt động theo thời gian</CardTitle>
            <CardDescription>Số lượng sự kiện được ghi nhận gần đây</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis 
                    dataKey="time" 
                    stroke="#888888" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false} 
                  />
                  <YAxis 
                    stroke="#888888" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false} 
                    tickFormatter={(value) => `${value}`} 
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'white', borderRadius: '8px', border: '1px solid #e2e8f0' }}
                    cursor={{ fill: 'transparent' }}
                  />
                  <Legend />
                  <Bar 
                    dataKey="count" 
                    name="Số sự kiện" 
                    fill="currentColor" 
                    radius={[4, 4, 0, 0]} 
                    className="fill-primary" 
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Data Table */}
        <Card>
          <CardHeader>
            <CardTitle>Nhật ký chi tiết</CardTitle>
            <CardDescription>Danh sách các sự kiện tracking mới nhất</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Thời gian</TableHead>
                    <TableHead>Loại</TableHead>
                    <TableHead>URL</TableHead>
                    <TableHead>IP</TableHead>
                    <TableHead>Vị trí</TableHead>
                    <TableHead>Tọa độ (GPS)</TableHead>
                    <TableHead>Thiết bị</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {events.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                        Chưa có dữ liệu nào được ghi nhận
                      </TableCell>
                    </TableRow>
                  ) : (
                    events.slice().reverse().slice(0, 50).map((event, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium whitespace-nowrap">
                          {new Date(event.timestamp).toLocaleString('vi-VN')}
                        </TableCell>
                        <TableCell>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            event.type === 'page_view' 
                              ? 'bg-blue-100 text-blue-800' 
                              : 'bg-green-100 text-green-800'
                          }`}>
                            {event.type}
                          </span>
                        </TableCell>
                        <TableCell className="max-w-[150px] truncate" title={event.url}>
                          {event.url.replace(window.location.origin, '')}
                        </TableCell>
                        <TableCell className="font-mono text-xs">
                          {event.ip || 'N/A'}
                        </TableCell>
                        <TableCell>
                          {(event.city || event.country) ? (
                            <div className="flex flex-col text-xs">
                              <span className="font-medium">{event.city}</span>
                              <span className="text-muted-foreground">{event.country}</span>
                            </div>
                          ) : (
                            <span className="text-muted-foreground text-xs">N/A</span>
                          )}
                        </TableCell>
                        <TableCell>
                          {(event.latitude && event.longitude) ? (
                            <div className="flex flex-col text-xs">
                              <a 
                                href={`https://www.google.com/maps?q=${event.latitude},${event.longitude}`} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline flex items-center gap-1"
                              >
                                {event.latitude.toFixed(5)}, {event.longitude.toFixed(5)}
                                <MapPin className="h-3 w-3" />
                              </a>
                              <span className="text-muted-foreground text-[10px]">
                                Độ chính xác: {event.accuracy ? `~${Math.round(event.accuracy)}m` : 'N/A'}
                              </span>
                            </div>
                          ) : (
                            <span className="text-muted-foreground text-xs">N/A</span>
                          )}
                        </TableCell>
                        <TableCell className="max-w-[150px] truncate text-xs text-muted-foreground" title={event.userAgent}>
                          {event.userAgent}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Admin;
