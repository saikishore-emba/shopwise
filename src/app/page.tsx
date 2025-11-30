import AppHeader from '@/components/app-header';
import Hero from '@/components/hero';
import HowItWorks from '@/components/how-it-works';
import SocialProof from '@/components/social-proof';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground">
      <AppHeader />
      <main className="flex-1">
        <Hero />
        <HowItWorks />
        <SocialProof />
      </main>
    </div>
  );
}
