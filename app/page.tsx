import HeroSection from "@/components/ui/Herosection";
import AboutPreview from "@/components/ui/AboutPreview";
import SkillsSection from "@/components/ui/SkillsSection";
import ProjectsSection from "@/components/Project";
import ExperienceTimeline from "@/components/ui/ExperienceTimeline";
import StatsSection from "@/components/ui/StatsSection";
import ContactCTA from "@/components/ui/ContactCTA";

export default function Home() {
  return (
    <main className="remove-scrollbar">
      {/* Hero - The Opening Statement */}
      <HeroSection />

      {/* About Preview - Who I Am */}
      <AboutPreview />

      {/* Stats - Impact Numbers */}
      <StatsSection />

      {/* Skills - What I Do */}
      <SkillsSection />

      {/* Featured Projects - My Work */}
      <ProjectsSection />

      {/* Experience - My Journey */}
      <ExperienceTimeline />

      {/* Contact CTA - Let's Connect */}
      <ContactCTA />
    </main>
  );
}
