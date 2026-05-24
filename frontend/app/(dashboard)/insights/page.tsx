'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface Insights {
  strengths: string[];
  improvements: string[];
  recommendations: string[];
  score: number;
  contentCount: number;
}

export default function InsightsPage() {
  const [insights, setInsights] = useState<Insights | null>(null);
  const [loading, setLoading] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [showApiKeyInput, setShowApiKeyInput] = useState(true);

  const fetchInsights = async () => {
    if (!apiKey.trim()) {
      alert('Please enter your API key');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/v1/insights', {
        headers: { 'X-API-Key': apiKey },
      });
      const data = await response.json();
      setInsights(data);
      setShowApiKeyInput(false);
    } catch (error) {
      console.error('Error fetching insights:', error);
      alert('Failed to fetch insights');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      fetchInsights();
    }
  };

  if (showApiKeyInput && !insights) {
    return (
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">AI Insights</h1>
          <p className="text-muted-foreground">Get AI-powered recommendations for your content</p>
        </div>

        <Card className="bg-card border-border max-w-md">
          <CardHeader>
            <CardTitle>Enter API Key</CardTitle>
            <CardDescription>Provide an API key to get insights</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <input
              type="password"
              placeholder="cp_..."
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={loading}
              className="w-full px-3 py-2 bg-background border border-border rounded-md text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <Button onClick={fetchInsights} disabled={loading} className="w-full">
              {loading ? 'Loading...' : 'Get Insights'}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!insights) {
    return (
      <div className="p-6">
        <div className="text-muted-foreground">Loading insights...</div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">AI Insights</h1>
          <p className="text-muted-foreground">{insights.contentCount} pieces of content analyzed</p>
        </div>
        <Button variant="outline" onClick={() => setShowApiKeyInput(true)}>
          Change API Key
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardDescription>Performance Score</CardDescription>
            <CardTitle className="text-3xl">{insights.score}/100</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="w-full bg-border rounded-full h-2">
              <div className="bg-primary h-2 rounded-full" style={{ width: `${insights.score}%` }} />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardDescription>Strengths</CardDescription>
            <CardTitle className="text-2xl">{insights.strengths.length}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-green-600">Areas performing well</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardDescription>Improvements</CardDescription>
            <CardTitle className="text-2xl">{insights.improvements.length}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-orange-600">Optimization opportunities</p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle>Strengths</CardTitle>
          <CardDescription>What&apos;s working well with your content</CardDescription>
        </CardHeader>
        <CardContent>
          {insights.strengths.length > 0 ? (
            <ul className="space-y-2">
              {insights.strengths.map((strength, i) => (
                <li key={i} className="flex items-start gap-3 text-foreground">
                  <span className="text-green-600 font-bold mt-0.5">✓</span>
                  <span>{strength}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted-foreground">No strengths identified yet</p>
          )}
        </CardContent>
      </Card>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle>Areas for Improvement</CardTitle>
          <CardDescription>Opportunities to optimize your content</CardDescription>
        </CardHeader>
        <CardContent>
          {insights.improvements.length > 0 ? (
            <ul className="space-y-2">
              {insights.improvements.map((improvement, i) => (
                <li key={i} className="flex items-start gap-3 text-foreground">
                  <span className="text-orange-600 font-bold mt-0.5">!</span>
                  <span>{improvement}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted-foreground">No improvements suggested</p>
          )}
        </CardContent>
      </Card>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle>Recommendations</CardTitle>
          <CardDescription>Strategic recommendations for growth</CardDescription>
        </CardHeader>
        <CardContent>
          {insights.recommendations.length > 0 ? (
            <ul className="space-y-2">
              {insights.recommendations.map((recommendation, i) => (
                <li key={i} className="flex items-start gap-3 text-foreground">
                  <span className="text-primary font-bold mt-0.5">→</span>
                  <span>{recommendation}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted-foreground">No recommendations at this time</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
