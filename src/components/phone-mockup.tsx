import { CheckCircle2, Star, Store } from 'lucide-react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from './ui/separator';

const vendors = [
  { name: 'Amazon', price: 1199.99, originalPrice: 1499.00, isBest: true, delivery: 'Tomorrow' },
  { name: 'Best Buy', price: 1249.00, originalPrice: 1499.00, isBest: false, delivery: '2 days' },
  { name: 'Chroma', price: 1299.00, originalPrice: 1599.00, isBest: false, delivery: 'Tomorrow' },
  { name: 'Reliance Digital', price: 1349.00, originalPrice: 1599.00, isBest: false, delivery: '3-5 days' },
];

export default function PhoneMockup() {
  const laptopImage = PlaceHolderImages.find(p => p.id === 'product-laptop');

  return (
    <div className="relative mx-auto border-gray-800 bg-gray-800 border-[12px] rounded-[2.5rem] h-[640px] w-[320px] shadow-2xl scale-90">
      <div className="h-[42px] w-[4px] bg-gray-800 absolute -start-[14px] top-[100px] rounded-s-lg"></div>
      <div className="h-[42px] w-[4px] bg-gray-800 absolute -start-[14px] top-[160px] rounded-s-lg"></div>
      <div className="h-[64px] w-[4px] bg-gray-800 absolute -end-[14px] top-[145px] rounded-e-lg"></div>
      <div className="rounded-[2rem] overflow-hidden w-full h-full bg-white">
        <div className="flex flex-col h-full w-full bg-white text-gray-800 text-sm">
          <div className="p-4 bg-primary text-primary-foreground text-center font-bold text-sm flex items-center justify-center gap-2">
            <CheckCircle2 className="w-5 h-5" />
            <span>BEST DEAL FOUND! Guaranteed.</span>
          </div>
          <div className="flex-grow overflow-y-auto no-scrollbar">
            <div className="p-4">
              {laptopImage && (
                <div className="bg-gray-100 rounded-lg p-4">
                  <Image
                    src={laptopImage.imageUrl}
                    alt={laptopImage.description}
                    data-ai-hint={laptopImage.imageHint}
                    width={400}
                    height={300}
                    className="w-full h-auto object-contain aspect-video"
                  />
                </div>
              )}
              <div className="py-4">
                <h3 className="font-bold text-lg">ProBook X1, 16-inch, 32GB RAM</h3>
                <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span>4.8 (1,234 reviews)</span>
                </div>
              </div>
              
              <Separator className="my-2" />

              <div className="space-y-3 py-2">
                {vendors.map((vendor, index) => (
                  <Card key={index} className={vendor.isBest ? 'border-primary ring-2 ring-primary bg-green-50' : 'bg-gray-50'}>
                    <CardContent className="p-3 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-3">
                        <div className="bg-gray-200 p-2 rounded-full">
                          <Store className="w-5 h-5 text-gray-600"/>
                        </div>
                        <div>
                          <p className="font-semibold text-base">{vendor.name}</p>
                          <p className="text-xs text-gray-500">Delivery: {vendor.delivery}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-bold text-lg ${vendor.isBest ? 'text-primary' : ''}`}>${vendor.price.toFixed(2)}</p>
                        <p className="text-xs text-gray-500 line-through">${vendor.originalPrice.toFixed(2)}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
          <div className="p-4 border-t sticky bottom-0 bg-white/80 backdrop-blur-sm">
            <Button className="w-full h-12 bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-base">
                Go to Best Deal
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
