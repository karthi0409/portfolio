import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Users, Mail, Globe, Smartphone, Monitor, ArrowUpRight } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from "recharts";

interface AnalyticsData {
  pageViews: {
    totalViews: number;
    uniqueVisitors: number;
    topPages: Array<{ page: string; views: number }>;
    recentViews: Array<{
      id: number;
      page: string;
      timestamp: string;
      country: string | null;
      device: string | null;
      browser: string | null;
    }>;
  };
  traffic: {
    totalViews: number;
    dailyViews: Array<{ date: string; views: number }>;
    topCountries: Array<{ country: string | null; views: number }>;
    topBrowsers: Array<{ browser: string | null; views: number }>;
    topDevices: Array<{ device: string | null; views: number }>;
  };
  contacts: {
    totalSubmissions: number;
    recentSubmissions: Array<{
      id: number;
      name: string;
      email: string;
      subject: string;
      timestamp: string;
    }>;
    dailySubmissions: Array<{ date: string; submissions: number }>;
  };
}

const COLORS = ['hsl(210, 100%, 60%)', 'hsl(197, 85%, 55%)', 'hsl(173, 80%, 50%)', 'hsl(43, 74%, 66%)', 'hsl(27, 87%, 67%)'];

export default function Analytics() {
  const { data: analytics, isLoading, error } = useQuery<AnalyticsData>({
    queryKey: ['/api/analytics/overview'],
    refetchInterval: 30000, // Refresh every 30 seconds
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-muted rounded w-1/4 mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-32 bg-muted rounded"></div>
              ))}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-96 bg-muted rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !analytics) {
    return (
      <div className="min-h-screen bg-background p-6 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center text-destructive">Error Loading Analytics</CardTitle>
            <CardDescription className="text-center">
              Failed to load analytics data. Please try refreshing the page.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button onClick={() => window.location.reload()}>
              Refresh Page
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold gradient-text">Portfolio Analytics</h1>
            <p className="text-muted-foreground mt-2">
              Track your portfolio's performance and visitor engagement
            </p>
          </div>
          <Badge variant="outline" className="text-sm">
            Live Data
          </Badge>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Views</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analytics.pageViews.totalViews.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">All time page views</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Unique Visitors</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analytics.pageViews.uniqueVisitors.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Unique sessions</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Contact Forms</CardTitle>
              <Mail className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analytics.contacts.totalSubmissions.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Total submissions</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Engagement Rate</CardTitle>
              <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {analytics.pageViews.uniqueVisitors > 0 
                  ? ((analytics.contacts.totalSubmissions / analytics.pageViews.uniqueVisitors) * 100).toFixed(1)
                  : '0.0'
                }%
              </div>
              <p className="text-xs text-muted-foreground">Contact conversion</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Daily Views Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Daily Views</CardTitle>
              <CardDescription>Page views over the last 7 days</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={analytics.traffic.dailyViews}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" tickFormatter={formatDate} />
                  <YAxis />
                  <Tooltip 
                    labelFormatter={(value) => formatDate(value as string)}
                    formatter={(value) => [value, 'Views']}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="views" 
                    stroke="hsl(210, 100%, 60%)" 
                    strokeWidth={2}
                    dot={{ fill: 'hsl(210, 100%, 60%)', strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Top Pages */}
          <Card>
            <CardHeader>
              <CardTitle>Top Pages</CardTitle>
              <CardDescription>Most visited sections</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={analytics.pageViews.topPages}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="page" />
                  <YAxis />
                  <Tooltip formatter={(value) => [value, 'Views']} />
                  <Bar dataKey="views" fill="hsl(210, 100%, 60%)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Device Types */}
          <Card>
            <CardHeader>
              <CardTitle>Device Types</CardTitle>
              <CardDescription>Visitor device breakdown</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={analytics.traffic.topDevices}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    dataKey="views"
                    nameKey="device"
                  >
                    {analytics.traffic.topDevices.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [value, 'Views']} />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-4 space-y-2">
                {analytics.traffic.topDevices.map((device, index) => (
                  <div key={device.device} className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    <span className="text-sm">{device.device || 'Unknown'}</span>
                    <span className="text-sm text-muted-foreground ml-auto">{device.views}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Top Browsers */}
          <Card>
            <CardHeader>
              <CardTitle>Browsers</CardTitle>
              <CardDescription>Most used browsers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analytics.traffic.topBrowsers.map((browser, index) => (
                  <div key={browser.browser} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">{browser.browser || 'Unknown'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-muted rounded-full h-2">
                        <div 
                          className="h-2 rounded-full bg-primary"
                          style={{ 
                            width: `${(browser.views / analytics.traffic.topBrowsers[0]?.views * 100) || 0}%` 
                          }}
                        />
                      </div>
                      <span className="text-sm text-muted-foreground w-8 text-right">{browser.views}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Top Countries */}
          <Card>
            <CardHeader>
              <CardTitle>Top Countries</CardTitle>
              <CardDescription>Visitor locations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analytics.traffic.topCountries.map((country) => (
                  <div key={country.country} className="flex items-center justify-between">
                    <span className="text-sm font-medium">{country.country || 'Unknown'}</span>
                    <span className="text-sm text-muted-foreground">{country.views} views</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Page Views</CardTitle>
              <CardDescription>Latest visitor activity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analytics.pageViews.recentViews.slice(0, 5).map((view) => (
                  <div key={view.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                    <div>
                      <div className="font-medium text-sm">{view.page}</div>
                      <div className="text-xs text-muted-foreground">
                        {view.country && `${view.country} • `}
                        {view.device && `${view.device} • `}
                        {view.browser}
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {new Date(view.timestamp).toLocaleTimeString()}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Contact Submissions</CardTitle>
              <CardDescription>Latest form submissions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analytics.contacts.recentSubmissions.slice(0, 5).map((submission) => (
                  <div key={submission.id} className="flex items-start justify-between py-2 border-b border-border last:border-0">
                    <div className="flex-1">
                      <div className="font-medium text-sm">{submission.name}</div>
                      <div className="text-xs text-muted-foreground">{submission.subject}</div>
                      <div className="text-xs text-muted-foreground">{submission.email}</div>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {new Date(submission.timestamp).toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}