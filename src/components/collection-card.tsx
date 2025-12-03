import Image from 'next/image';
import { Button } from './ui/button';

interface CollectionCardProps {
  image: string;
  title: string;
  description: string;
  link?: string;
}

export function CollectionCard({ image, title, description, link }: CollectionCardProps) {
  return (
    <div className="flex flex-col md:flex-row items-center gap-6 bg-white rounded-lg shadow-lg overflow-hidden">
      <Image src={image} alt={title} width={400} height={300} className="object-cover w-full md:w-2/3 h-64" />
      <div className="p-6 flex-1">
        <h2 className="text-2xl font-bold mb-2">{title}</h2>
        <p className="text-gray-700 mb-4">{description}</p>
        {link && <Button as="a" href={link}>Shop Collection</Button>}
      </div>
    </div>
  );
}
