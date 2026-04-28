import Footer from "@/components/blocks/footer";
import HomeHero from "@/components/blocks/home-hero";
import Metodologia from "@/components/blocks/metodologia";
import Stack from "@/components/blocks/stack";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  return (
    <div>
      <HomeHero />
      <Separator />
      <Stack />
      <Separator />
      <Metodologia />
      <Separator />
      <Footer />
    </div>
  );
}
