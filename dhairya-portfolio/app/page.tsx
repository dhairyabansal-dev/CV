import { About } from "@/components/sections/about";
import { BuildLog } from "@/components/sections/build-log";
import { Capabilities } from "@/components/sections/capabilities";
import { Contact } from "@/components/sections/contact";
import { Navigation } from "@/components/layout/navigation";
import { CurrentlyBuilding } from "@/components/sections/currently-building";
import { Education } from "@/components/sections/education";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/sections/hero";
import { Projects } from "@/components/sections/projects";
import { Reveal } from "@/components/ui/reveal";

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <Reveal>
          <Hero />
        </Reveal>
        <Reveal>
          <About />
        </Reveal>
        <Reveal>
          <Capabilities />
        </Reveal>
        <Reveal>
          <Projects />
        </Reveal>
        <Reveal>
          <CurrentlyBuilding />
        </Reveal>
        <Reveal>
          <Education />
        </Reveal>
        <Reveal>
          <BuildLog />
        </Reveal>
        <Reveal>
          <Contact />
        </Reveal>
      </main>
      <Footer />
    </>
  );
}
