export type VehicleBrand =
  | "BMW"
  | "Honda"
  | "Infiniti"
  | "Nissan"
  | "Subaru"
  | "Toyota";

export type ProductStatus = "in-stock" | "pre-order" | "sold-out";

export interface Product {
  slug: string;
  name: string;
  brand: VehicleBrand;
  fitment: string;
  priceCents: number;
  compareAtCents?: number;
  status: ProductStatus;
  imageGradient: string;
  description: string;
}
