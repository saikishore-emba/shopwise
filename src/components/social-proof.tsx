import { Star } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const testimonials = [
  {
    name: 'Sarah J.',
    role: ' avid online shopper',
    avatar: PlaceHolderImages.find((p) => p.id === 'avatar-1'),
    review:
      'ShopWise has been a game-changer for my online shopping. I\'ve saved hundreds of dollars by finding deals I would have never known about. It\'s a must-have for any savvy shopper!',
  },
  {
    name: 'Mike R.',
    role: 'tech enthusiast',
    avatar: PlaceHolderImages.find((p) => p.id === 'avatar-2'),
    review:
      "I was skeptical at first, but ShopWise is legit. The interface is clean, it's fast, and it consistently finds the best prices. I saved $150 on my new laptop effortlessly.",
  },
  {
    name: 'Jessica L.',
    role: 'budget-conscious parent',
    avatar: PlaceHolderImages.find((p) => p.id === 'avatar-3'),
    review:
      'As a mom, every dollar counts. ShopWise helps me find the best deals on everything from kids\' clothes to electronics. It\'s the first thing I check before buying anything online.',
  },
];

const companies = [
  { name: 'TechNova', logo: <svg className="w-full h-8 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 20"><text x="50" y="15" textAnchor="middle" fontWeight="bold" fontSize="16">TechNova</text></svg> },
  { name: 'Quantum', logo: <svg className="w-full h-8 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 20"><text x="50" y="15" textAnchor="middle" fontWeight="bold" fontSize="16">Quantum</text></svg> },
  { name: 'InnovateCo', logo: <svg className="w-full h-8 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 20"><text x="50" y="15" textAnchor="middle" fontWeight="bold" fontSize="16">InnovateCo</text></svg> },
  { name: 'Apex', logo: <svg className="w-full h-8 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 20"><text x="50" y="15" textAnchor="middle" fontWeight="bold" fontSize="16">Apex</text></svg> },
  { name: 'Synergy', logo: <svg className="w-full h-8 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 20"><text x="50" y="15" textAnchor="middle" fontWeight="bold" fontSize="16">Synergy</text></svg> },
  { name: 'Pinnacle', logo: <svg className="w-full h-8 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 20"><text x="50" y="15" textAnchor="middle" fontWeight="bold" fontSize="16">Pinnacle</text></svg> },
];

export default function SocialProof() {
  return (
    <section className="py-12 sm:py-24 bg-background">
      <div className="container">
        <div className="text-center">
          <h2 className="text-sm font-semibold tracking-wider text-primary uppercase">
            Trusted by millions
          </h2>
          <p className="mt-2 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Our users love ShopWise
          </p>
        </div>
        <div className="mt-12">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-6 lg:grid-cols-6 items-center">
            {companies.map((company) => (
              <div
                key={company.name}
                className="col-span-1 flex justify-center"
              >
                {company.logo}
              </div>
            ))}
          </div>
        </div>
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.name} className="flex flex-col justify-between">
              <CardContent className="p-6">
                <div className="flex items-center">
                  {testimonial.avatar && (
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={testimonial.avatar.imageUrl} alt={testimonial.avatar.description} data-ai-hint={testimonial.avatar.imageHint} />
                      <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  )}
                  <div className="ml-4">
                    <div className="text-base font-bold text-foreground">{testimonial.name}</div>
                    <div className="text-sm text-foreground/80">{testimonial.role}</div>
                  </div>
                </div>
                <div className="flex mt-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-accent fill-accent" />
                  ))}
                </div>
                <p className="mt-4 text-base text-foreground/90">{testimonial.review}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
