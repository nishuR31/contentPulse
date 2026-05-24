'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export function Header() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/login');
  };

  return (
    <header className="border-b border-border bg-card">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold text-foreground">ContentPulse</h1>
        </div>
        <Button variant="outline" onClick={handleLogout} size="sm">
          Logout
        </Button>
      </div>
    </header>
  );
}
