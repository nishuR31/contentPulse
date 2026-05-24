'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface UserPlan {
  plan: string;
  limit: number;
  currentUsage: number;
  remaining: number;
  price: string | number;
}

export default function DashboardPage() {
  const [plan, setPlan] = useState<UserPlan | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlan = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('/api/usage/plan', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        setPlan(data);
      } catch (error) {
        console.error('Error fetching plan:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlan();
  }, []);

  if (loading) {
    return <div className="p-6 text-muted-foreground">Loading...</div>;
  }

  if (!plan) {
    return <div className="p-6 text-destructive">Error loading plan information</div>;
  }

  const usagePercentage = (plan.currentUsage / plan.limit) * 100;

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back!</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardDescription>Current Plan</CardDescription>
            <CardTitle className="text-2xl capitalize">{plan.plan}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Monthly billing</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardDescription>API Requests</CardDescription>
            <CardTitle className="text-2xl">{plan.currentUsage.toLocaleString()}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">of {plan.limit.toLocaleString()} this month</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardDescription>Remaining</CardDescription>
            <CardTitle className="text-2xl">{plan.remaining.toLocaleString()}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="w-full bg-border rounded-full h-2">
              <div
                className="bg-primary h-2 rounded-full transition-all"
                style={{ width: `${Math.min(usagePercentage, 100)}%` }}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle>Getting Started</CardTitle>
          <CardDescription>Quick steps to start using ContentPulse</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h3 className="font-semibold text-foreground">1. Create an API Key</h3>
            <p className="text-sm text-muted-foreground">Go to Settings to generate your first API key</p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold text-foreground">2. Ingest Analytics Data</h3>
            <p className="text-sm text-muted-foreground">Send your content metrics to the /api/v1/analytics/ingest endpoint</p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold text-foreground">3. View Insights</h3>
            <p className="text-sm text-muted-foreground">Check your analytics and get AI-powered recommendations</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
