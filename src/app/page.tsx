import { Hero } from "@/components/Hero";
import { VehicleCategories } from "@/components/VehicleCategories";
import { CarbonFiberWheels } from "@/components/CarbonFiberWheels";
import { PopularProducts } from "@/components/PopularProducts";
import { Features } from "@/components/Features";
import { Newsletter } from "@/components/Newsletter";

export default function HomePage() {
  return (
    <>
      <Hero />
      <VehicleCategories />
      <CarbonFiberWheels />
      <PopularProducts />
      <Features />
      <Newsletter />
    </>
  );
}
