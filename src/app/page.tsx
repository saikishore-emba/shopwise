import AppHeader from '@/components/app-header';
import Hero from '@/components/hero';
import SocialProof from '@/components/social-proof';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground">
      <AppHeader />
      <main className="flex-1">
        <Hero />
        <SocialProof />
      </main>
    </div>
  );
}
