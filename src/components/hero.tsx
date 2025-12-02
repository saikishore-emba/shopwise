import Image from 'next/image';
import { Button } from '@/components/ui/button';
import PhoneMockup from '@/components/phone-mockup';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { buttonVariants } from './ui/button';

export default function Hero() {
  const heroBg = PlaceHolderImages.find((p) => p.id === 'hero-background');

  // Google Analytics event handler
  function handleWaitlistClick() {
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('event', 'join_waitlist_click', {
        event_category: 'engagement',
        event_label: 'Join Waitlist Button',
      });
    }
  }

  return (
    <section className="relative w-full min-h-[calc(100dvh-4rem)] py-12 md:py-0">
      {heroBg && (
        <Image
          src={heroBg.imageUrl}
          alt={heroBg.description}
          data-ai-hint={heroBg.imageHint}
          fill
          className="object-cover"
          priority
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-r from-background/10 via-background/70 to-background/90" />
      <div className="relative container h-full flex flex-col items-center justify-center gap-12">
        <div className="flex items-center justify-center">
          <PhoneMockup />
        </div>
        <div className="space-y-6 text-center w-full flex flex-col items-center justify-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tighter text-foreground">
              Welcome to ShopWise – Now with a new look!
            </h1>
          <p className="max-w-[500px] mx-auto lg:mx-0 text-lg text-foreground/80 md:text-xl">
            ShopWise helps to find you the absolute best price on product,
            guaranteed. Save time, save money.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Link
              href="#"
              className={cn(
                buttonVariants({ size: 'lg' }),
                'bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg'
              )}
              onClick={handleWaitlistClick}
            >
              Join the waitlist
            </Link>
            <Link
              href="#"
              className={cn(
                buttonVariants({ size: 'lg', variant: 'outline' }),
                'bg-background/50 backdrop-blur-sm'
              )}
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
