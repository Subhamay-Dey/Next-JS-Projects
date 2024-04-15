import Image from "next/image";

import { BackgroundBoxesDemo } from "@/components/Background";
import NavbarDemo from "@/components/Navbar";
import { HeroParallaxDemo } from "@/components/Hero";
import Developers from "@/components/Developers";
import { GoogleGeminiEffectDemo } from "@/components/Lines";

export default function Home() {
  return (
    <main className="flex flex-col ">
      <NavbarDemo/>
      <BackgroundBoxesDemo>
      </BackgroundBoxesDemo>
      <HeroParallaxDemo/>
      <GoogleGeminiEffectDemo/>
      <Developers/>
    </main>
  );
}
