import { About } from "@/components/sections/about";
import { Capabilities } from "@/components/sections/capabilities";
import { Navigation } from "@/components/layout/navigation";
import { Hero } from "@/components/sections/hero";

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <About />
        <Capabilities />
      </main>
    </>
  );
}
