import Image from 'next/image';
import { Button } from '@/components/ui/button';
import PhoneMockup from '@/components/phone-mockup';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { buttonVariants } from './ui/button';

export default function Hero() {
  const heroBg = PlaceHolderImages.find((p) => p.id === 'hero-background');

  return (
    <section className="relative w-full h-[calc(100dvh-4rem)]">
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
      <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/70 to-background/10" />
      <div className="relative container h-full grid lg:grid-cols-2 items-center gap-12">
        <div className="space-y-6 text-left">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tighter text-foreground">
            Never Overpay Again.
          </h1>
          <p className="max-w-[500px] text-lg text-foreground/80 md:text-xl">
            ShopWise scans the web to find you the absolute best deal on any
            product, guaranteed. Save time, save money.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="#"
              className={cn(
                buttonVariants({ size: 'lg' }),
                'bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg'
              )}
            >
              Download for Free
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
        <div className="hidden lg:flex items-center justify-center -mr-16">
          <PhoneMockup />
        </div>
      </div>
    </section>
  );
}
