import { Hero } from "@/components/Hero";
import { VehicleCategories } from "@/components/VehicleCategories";
import { FeaturedProducts } from "@/components/FeaturedProducts";
import { Features } from "@/components/Features";
import { Newsletter } from "@/components/Newsletter";

export default function HomePage() {
  return (
    <>
      <Hero />
      <VehicleCategories />
      <FeaturedProducts />
      <Features />
      <Newsletter />
    </>
  );
}
