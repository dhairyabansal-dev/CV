import { About } from "@/components/sections/about";
import { BuildLog } from "@/components/sections/build-log";
import { Capabilities } from "@/components/sections/capabilities";
import { Navigation } from "@/components/layout/navigation";
import { CurrentlyBuilding } from "@/components/sections/currently-building";
import { Education } from "@/components/sections/education";
import { Hero } from "@/components/sections/hero";
import { Projects } from "@/components/sections/projects";

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <About />
        <Capabilities />
        <Projects />
        <CurrentlyBuilding />
        <Education />
        <BuildLog />
      </main>
    </>
  );
}
