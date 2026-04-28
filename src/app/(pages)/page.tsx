import Footer from "@/components/blocks/footer";
import HomeHero from "@/components/blocks/home-hero";
import Metodologia from "@/components/blocks/metodologia";
import MetodologiaPlus from "@/components/blocks/metodologia-plus";
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
      <MetodologiaPlus />
      <Separator />
      <Footer />
    </div>
  );
}
