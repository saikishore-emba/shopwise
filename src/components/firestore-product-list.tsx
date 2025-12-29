"use client";

import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface StorePrice {
  name: string;
  price: string;
  url?: string;
  type: 'online' | 'offline';
  updatedAt?: string;
}

interface Product {
  asin: string;
  title: string;
  image: string;
  updatedAt: string;
  // Legacy fields (optional, for backward compatibility if needed)
  price?: string;
  url?: string;
  flipkartPrice?: string;
  flipkartUrl?: string;
  offlinePrice?: string;
  offlineStore?: string;
  // New structured field
  stores?: Record<string, StorePrice>;
}

export function FirestoreProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const q = query(collection(db, "products"), orderBy("updatedAt", "desc"));
        const querySnapshot = await getDocs(q);
        const productsMap = new Map<string, Product>();
        
        querySnapshot.forEach((doc) => {
          const data = doc.data() as Product;
          const productWithId = { ...data, asin: data.asin || doc.id };

          // Normalize data: Convert legacy fields to new 'stores' structure if missing
          if (!productWithId.stores) {
             productWithId.stores = {};
          }
          
          // Migrate legacy Amazon
          if (productWithId.price && !productWithId.stores.amazon) {
             productWithId.stores.amazon = { name: 'Amazon', price: productWithId.price, url: productWithId.url, type: 'online' };
          }
          // Migrate legacy Flipkart
          if (productWithId.flipkartPrice && !productWithId.stores.flipkart) {
             productWithId.stores.flipkart = { name: 'Flipkart', price: productWithId.flipkartPrice, url: productWithId.flipkartUrl, type: 'online' };
          }
          // Migrate legacy Offline
          if (productWithId.offlinePrice && productWithId.offlineStore) {
             const key = productWithId.offlineStore.toLowerCase().replace(/[^a-z0-9]/g, '_');
             if (!productWithId.stores[key]) {
                productWithId.stores[key] = { name: productWithId.offlineStore, price: productWithId.offlinePrice, type: 'offline' };
             }
          }

          // Grouping Logic
          if (productsMap.has(productWithId.asin)) {
             const existing = productsMap.get(productWithId.asin)!;
             productsMap.set(productWithId.asin, mergeProducts(existing, productWithId));
             return;
          }

          const cleanTitle = productWithId.title 
            ? productWithId.title.toLowerCase().replace(/[^a-z0-9]/g, '').substring(0, 15) 
            : null;

          if (cleanTitle) {
              let foundMatch = false;
              for (const [key, existing] of productsMap.entries()) {
                  const existingCleanTitle = existing.title 
                    ? existing.title.toLowerCase().replace(/[^a-z0-9]/g, '').substring(0, 15) 
                    : null;
                  
                  if (existingCleanTitle === cleanTitle) {
                      productsMap.set(key, mergeProducts(existing, productWithId));
                      foundMatch = true;
                      break;
                  }
              }
              if (foundMatch) return;
          }

          if (productWithId.title || productWithId.image || (productWithId.stores && Object.keys(productWithId.stores).length > 0)) {
             productsMap.set(productWithId.asin, productWithId);
          }
        });
        
        setProducts(Array.from(productsMap.values()));
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products. Make sure Firestore is set up and rules allow reading.");
      } finally {
        setLoading(false);
      }
    }

    function mergeProducts(p1: Product, p2: Product): Product {
        // Deep merge stores
        const mergedStores = { ...p1.stores, ...p2.stores };
        
        return {
            ...p1,
            ...p2,
            image: p1.image || p2.image,
            title: p1.title || p2.title,
            stores: mergedStores
        };
    }

    fetchProducts();
  }, []);

  if (loading) return <div className="text-slate-400 text-center py-10">Loading products...</div>;
  if (error) return <div className="text-red-400 text-center py-10">{error}</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <Card key={product.asin} className="flex flex-col bg-slate-900 border-slate-800 overflow-hidden hover:border-slate-700 transition-colors">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-bold text-white line-clamp-2 leading-tight">{product.title}</CardTitle>
          </CardHeader>
          <CardContent className="flex-grow pt-2">
            <div className="aspect-square relative mb-4 bg-white/5 rounded-lg p-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src={product.image} 
                alt={product.title}
                className="object-contain w-full h-full mix-blend-normal"
              />
            </div>
            
            <div className="space-y-2">
                {product.stores && Object.values(product.stores).map((store, idx) => (
                    <div key={idx} className={`flex justify-between items-center p-3 rounded-lg border ${
                        store.name === 'Amazon' ? 'bg-slate-800 border-slate-700' : 
                        store.name === 'Flipkart' ? 'bg-blue-950/30 border-blue-900/50' : 
                        'bg-emerald-950/30 border-emerald-900/50'
                    }`}>
                        <div className="flex flex-col">
                            <span className={`font-semibold text-sm ${
                                store.name === 'Flipkart' ? 'text-blue-400' : 
                                store.name === 'Amazon' ? 'text-slate-200' : 'text-emerald-400'
                            }`}>
                                {store.name}
                            </span>
                            {store.type === 'offline' && <span className="text-[10px] uppercase text-slate-500 font-medium tracking-wider">Offline</span>}
                        </div>
                        <span className={`font-bold ${
                             store.name === 'Flipkart' ? 'text-blue-400' : 
                             store.name === 'Amazon' ? 'text-white' : 'text-emerald-400'
                        }`}>{store.price}</span>
                    </div>
                ))}
            </div>

          </CardContent>
          <CardFooter className="flex flex-col gap-2 pt-0">
            {product.stores && Object.values(product.stores)
                .filter(s => s.type === 'online' && s.url)
                .map((store, idx) => (
                <Button key={idx} asChild variant={store.name === 'Amazon' ? 'default' : 'outline'} className={`w-full ${
                    store.name === 'Amazon' ? 'bg-white text-black hover:bg-slate-200' :
                    store.name === 'Flipkart' ? 'border-blue-500/50 text-blue-400 hover:bg-blue-950/50 hover:text-blue-300' : ''
                }`}>
                  <a href={store.url} target="_blank" rel="noopener noreferrer">
                    Buy on {store.name}
                  </a>
                </Button>
            ))}
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
