import Image from "next/image";

import { BackgroundBoxesDemo } from "@/components/Background";
import NavbarDemo from "@/components/Navbar";
import { HeroParallaxDemo } from "@/components/Hero";
import { AnimatedTooltipPreview } from "@/components/Members";

export default function Home() {
  return (
    <main>
      <NavbarDemo/>
      <BackgroundBoxesDemo>
      </BackgroundBoxesDemo>
      <HeroParallaxDemo/>
      <AnimatedTooltipPreview/>
    </main>
  );
}
