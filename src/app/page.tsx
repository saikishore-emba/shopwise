import AppHeader from '@/components/app-header';
import Hero from '@/components/hero';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground">
      <AppHeader />
      <main className="flex-1">
        <Hero />
      </main>
    </div>
  );
}
