import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { buttonVariants } from './ui/button';
import { cn } from '@/lib/utils';

export default function AppHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <ShoppingCart className="h-6 w-6 text-primary" />
          <span className="font-bold inline-block">ShopWise</span>
        </Link>
        <nav className="flex-1 items-center justify-end hidden md:flex">
          <Link
            href="#"
            className={cn(
              buttonVariants({ variant: 'default' }),
              'bg-accent hover:bg-accent/90 text-accent-foreground'
            )}
          >
            Join the waitlist
          </Link>
        </nav>
      </div>
    </header>
  );
}
