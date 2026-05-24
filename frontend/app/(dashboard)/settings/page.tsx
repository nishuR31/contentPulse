'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface ApiKey {
  id: string;
  name: string;
  prefix: string;
  isActive: boolean;
  lastUsedAt: string | null;
  createdAt: string;
}

export default function SettingsPage() {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [newKeyName, setNewKeyName] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [showNewKey, setShowNewKey] = useState<string | null>(null);

  useEffect(() => {
    fetchApiKeys();
  }, []);

  const fetchApiKeys = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/auth/api-keys', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      setApiKeys(data.apiKeys || []);
    } catch (error) {
      console.error('Error fetching API keys:', error);
    } finally {
      setFetching(false);
    }
  };

  const handleCreateKey = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKeyName.trim()) return;

    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/auth/api-keys', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name: newKeyName }),
      });

      const data = await response.json();
      if (response.ok) {
        setShowNewKey(data.key);
        setNewKeyName('');
        await fetchApiKeys();
      }
    } catch (error) {
      console.error('Error creating API key:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRevokeKey = async (keyId: string) => {
    if (!confirm('Are you sure? This action cannot be undone.')) return;

    try {
      const token = localStorage.getItem('token');
      await fetch(`/api/auth/api-keys/${keyId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      await fetchApiKeys();
    } catch (error) {
      console.error('Error revoking API key:', error);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">API Keys</h1>
        <p className="text-muted-foreground">Manage your API keys for authentication</p>
      </div>

      {showNewKey && (
        <Card className="bg-primary/10 border-primary">
          <CardHeader>
            <CardTitle className="text-primary">API Key Created!</CardTitle>
            <CardDescription>Save this key securely. You won&apos;t be able to see it again.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-background p-3 rounded-md font-mono text-sm break-all text-foreground">{showNewKey}</div>
            <Button
              onClick={() => {
                navigator.clipboard.writeText(showNewKey);
                alert('Copied to clipboard!');
              }}
            >
              Copy Key
            </Button>
          </CardContent>
        </Card>
      )}

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle>Create New API Key</CardTitle>
          <CardDescription>Generate a new API key for your application</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleCreateKey} className="flex gap-2">
            <Input
              placeholder="Key name (e.g., 'Production API')"
              value={newKeyName}
              onChange={(e) => setNewKeyName(e.target.value)}
              disabled={loading}
              className="bg-background border-border"
            />
            <Button type="submit" disabled={loading || !newKeyName.trim()}>
              {loading ? 'Creating...' : 'Create'}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle>Your API Keys</CardTitle>
          <CardDescription>Active API keys and their usage</CardDescription>
        </CardHeader>
        <CardContent>
          {fetching ? (
            <div className="text-muted-foreground">Loading...</div>
          ) : apiKeys.length === 0 ? (
            <div className="text-muted-foreground">No API keys yet. Create one above.</div>
          ) : (
            <div className="space-y-3">
              {apiKeys.map((key) => (
                <div key={key.id} className="flex items-center justify-between p-3 bg-background rounded-md border border-border">
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{key.name}</p>
                    <p className="text-xs text-muted-foreground font-mono">{key.prefix}...</p>
                    {key.lastUsedAt && (
                      <p className="text-xs text-muted-foreground mt-1">
                        Last used: {new Date(key.lastUsedAt).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs px-2 py-1 rounded ${key.isActive ? 'bg-green-500/20 text-green-600' : 'bg-red-500/20 text-red-600'}`}>
                      {key.isActive ? 'Active' : 'Revoked'}
                    </span>
                    {key.isActive && (
                      <Button variant="destructive" size="sm" onClick={() => handleRevokeKey(key.id)}>
                        Revoke
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
