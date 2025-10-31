export interface Product {
  id: number;
  name: string;
  brand: string;
  category: string;
  price: number;
  stock: number;
  rating: number;
  numReviews: number;
  description: string;
  technicalSpecs: {
    material: string;
    dimensions: string;
    weight: string;
    color: string;
  };
  features: string[];
  images: string[];
}