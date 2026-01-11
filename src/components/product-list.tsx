import React from 'react';
import products from '../data/products.json';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type Product = {
  asin: string;
  title: string;
  image: string;
  price: string;
  url: string;
};

export function ProductList() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {(products as Product[]).map((product) => (
        <Card key={product.asin} className="flex flex-col">
          <CardHeader>
            <CardTitle className="text-lg line-clamp-2">{product.title}</CardTitle>
          </CardHeader>
          <CardContent className="flex-grow">
            <div className="aspect-square relative mb-4">
              <img 
                src={product.image} 
                alt={product.title}
                className="object-contain w-full h-full"
              />
            </div>
            <p className="text-2xl font-bold text-primary">{product.price}</p>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <a href={product.url} target="_blank" rel="noopener noreferrer">
                View on Amazon
              </a>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
