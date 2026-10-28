import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { CertificationCard } from "@/components/ui/certification-card";
import { portfolioData } from "@/lib/portfolio-data";

export function Certifications() {
  return (
    <section id="certifications" className="section">
      <Container>
        <SectionHeading
          eyebrow="Certifications & Recognition"
          title="Learning, applied skills, and competitive achievement."
          description="Professional job simulations, practical training, and national-level recognition."
        />
        <div className="mt-12 grid gap-4 lg:grid-cols-2">
          {portfolioData.certifications.map((certification, index) => (
            <CertificationCard
              key={certification.id}
              certification={certification}
              index={index}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
