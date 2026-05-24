'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function AnalyticsPage() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Analytics</h1>
        <p className="text-muted-foreground">View your content performance metrics</p>
      </div>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle>Content Performance</CardTitle>
          <CardDescription>Track metrics across your content</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-muted-foreground">
            <p>Ingest analytics data using your API key to see metrics here.</p>
            <p className="text-xs mt-2">Example request:</p>
            <pre className="bg-background p-3 rounded-md mt-2 text-xs overflow-auto font-mono">
{`curl -X POST http://localhost:5000/api/v1/analytics/ingest \\
  -H "X-API-Key: your_api_key" \\
  -H "Content-Type: application/json" \\
  -d '{
    "contentId": "blog-001",
    "contentType": "blog",
    "title": "Getting Started",
    "url": "https://example.com/blog/getting-started",
    "metrics": {
      "views": 1000,
      "clicks": 50,
      "conversions": 10,
      "engagement": 75
    }
  }'`}
            </pre>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle>Top Performing Content</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">No data yet</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle>Engagement Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">No data yet</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
