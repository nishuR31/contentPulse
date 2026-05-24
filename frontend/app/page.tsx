'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="border-b border-border bg-card">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-xl font-bold">ContentPulse</div>
          <div className="flex gap-4">
            <Link href="/login">
              <Button variant="outline" size="sm">
                Sign In
              </Button>
            </Link>
            <Link href="/signup">
              <Button size="sm">Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 py-20 text-center space-y-6">
        <h1 className="text-5xl font-bold leading-tight text-balance">
          Content Analytics & AI Insights for Modern Teams
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Aggregate content metrics from blogs, emails, and landing pages. Get AI-powered recommendations to optimize
          performance.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/signup">
            <Button size="lg">Start Free Trial</Button>
          </Link>
          <Link href="#features">
            <Button variant="outline" size="lg">
              Learn More
            </Button>
          </Link>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="bg-card border-y border-border py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-balance">Why Choose ContentPulse?</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-background border-border">
              <CardHeader>
                <CardTitle className="text-lg">API-First</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Integrate seamlessly with your existing tech stack via our REST API</p>
              </CardContent>
            </Card>

            <Card className="bg-background border-border">
              <CardHeader>
                <CardTitle className="text-lg">AI Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Get intelligent recommendations powered by OpenAI for content optimization</p>
              </CardContent>
            </Card>

            <Card className="bg-background border-border">
              <CardHeader>
                <CardTitle className="text-lg">Real-Time Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Track performance metrics across all your content channels in one place</p>
              </CardContent>
            </Card>

            <Card className="bg-background border-border">
              <CardHeader>
                <CardTitle className="text-lg">Secure & Scalable</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Enterprise-grade security with rate limiting and API key management</p>
              </CardContent>
            </Card>

            <Card className="bg-background border-border">
              <CardHeader>
                <CardTitle className="text-lg">Usage Tracking</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Monitor API request usage and stay within your tier limits</p>
              </CardContent>
            </Card>

            <Card className="bg-background border-border">
              <CardHeader>
                <CardTitle className="text-lg">Dashboard</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Intuitive interface for managing keys, analytics, and settings</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-center mb-12 text-balance">Simple, Transparent Pricing</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle>Free</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-3xl font-bold">$0</div>
              <p className="text-muted-foreground">Per month</p>
              <ul className="space-y-2 text-sm">
                <li className="text-foreground">1,000 API requests</li>
                <li className="text-foreground">Basic analytics</li>
                <li className="text-muted-foreground">No AI insights</li>
              </ul>
              <Button variant="outline" className="w-full">
                Get Started
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-card border-border border-primary">
            <CardHeader>
              <CardTitle>Pro</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-3xl font-bold">$99</div>
              <p className="text-muted-foreground">Per month</p>
              <ul className="space-y-2 text-sm">
                <li className="text-foreground">50,000 API requests</li>
                <li className="text-foreground">Advanced analytics</li>
                <li className="text-foreground">AI insights</li>
              </ul>
              <Button className="w-full">Get Started</Button>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle>Enterprise</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-3xl font-bold">Custom</div>
              <p className="text-muted-foreground">Per month</p>
              <ul className="space-y-2 text-sm">
                <li className="text-foreground">Unlimited requests</li>
                <li className="text-foreground">All features</li>
                <li className="text-foreground">Priority support</li>
              </ul>
              <Button variant="outline" className="w-full">
                Contact Sales
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card mt-20">
        <div className="max-w-6xl mx-auto px-6 py-12 text-center text-muted-foreground">
          <p>&copy; 2024 ContentPulse. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
