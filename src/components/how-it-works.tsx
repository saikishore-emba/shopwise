import { ScanLine, Search, BadgePercent } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

const steps = [
  {
    icon: <Search className="w-12 h-12 text-primary" />,
    title: '1. Find a Product',
    description:
      "Simply search for any product you want to buy. Paste a link or use our search bar to get started.",
  },
  {
    icon: <ScanLine className="w-12 h-12 text-primary" />,
    title: '2. We Scan for Deals',
    description:
      'ShopWise automatically scours thousands of online retailers to find every available price for your product.',
  },
  {
    icon: <BadgePercent className="w-12 h-12 text-primary" />,
    title: '3. Get the Best Price',
    description:
      'We present you with a clear list of prices, with the best deal highlighted. Never overpay again!',
  },
];

export default function HowItWorks() {
  return (
    <section className="py-12 sm:py-24 bg-muted/40">
      <div className="container">
        <div className="text-center">
          <h2 className="text-sm font-semibold tracking-wider text-primary uppercase">
            Easy as 1-2-3
          </h2>
          <p className="mt-2 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            How ShopWise Works
          </p>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground/80">
            Getting the best deal has never been simpler. Follow these three easy steps.
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
          {steps.map((step) => (
            <Card key={step.title} className="text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="flex items-center justify-center">
                <div className="bg-primary/10 p-4 rounded-full">
                  {step.icon}
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <CardTitle>{step.title}</CardTitle>
                <p className="text-foreground/80">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
