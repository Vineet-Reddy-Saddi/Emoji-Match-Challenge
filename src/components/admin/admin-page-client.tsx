"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import Link from 'next/link';
import { Home } from 'lucide-react';

type AdminPageClientProps = {
  children: React.ReactNode;
};

export function AdminPageClient({ children }: AdminPageClientProps) {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // This is a simple client-side check. For real applications, use a proper authentication system.
    if (password === "Lucky@2008") {
      setIsAuthenticated(true);
    } else {
      toast({
        title: "Incorrect Password",
        description: "The password you entered is incorrect.",
        variant: "destructive",
      });
      setPassword("");
    }
  };

  if (isAuthenticated) {
    return (
      <div className="p-4 md:p-8">
        <div className="absolute top-4 left-4">
          <Button asChild variant="ghost">
            <Link href="/">
                <Home className="mr-2 h-4 w-4" />
                Back to Game
            </Link>
          </Button>
        </div>
        {children}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="absolute top-4 left-4">
          <Button asChild variant="ghost">
              <Link href="/">
                  <Home className="mr-2 h-4 w-4" />
                  Back to Game
              </Link>
          </Button>
      </div>
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Admin Access</CardTitle>
          <CardDescription>Enter the password to view the leaderboard.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="font-code"
              aria-label="Admin password"
            />
            <Button type="submit" className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
