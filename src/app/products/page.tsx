import { FirestoreProductList } from "@/components/firestore-product-list";

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-6 text-center text-white">Recommended Products</h1>
        <p className="text-center text-slate-400 mb-8">
          Hand-picked items, updated in real-time.
        </p>
        <FirestoreProductList />
      </div>
    </div>
  );
}
