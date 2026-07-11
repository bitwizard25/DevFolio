import type { Metadata } from 'next';
import HeroSection from "@/components/ui/Herosection";
import AboutPreview from "@/components/ui/AboutPreview";
import SkillsSection from "@/components/ui/SkillsSection";
import ProjectsSection from "@/components/Project";
import ExperienceTimeline from "@/components/ui/ExperienceTimeline";
import StatsSection from "@/components/ui/StatsSection";
import ContactCTA from "@/components/ui/ContactCTA";

export const metadata: Metadata = {
  title: "Raj Bhoyar | Full Stack Developer & AI Enthusiast (Classic Site)",
  description: "The classic scrolling portfolio — hero, about, projects, and contact in one page. Prefer an interactive desktop? Visit the homepage.",
};

export default function ClassicHome() {
  return (
    <div className="remove-scrollbar">
      {/* Hero - The Opening Statement */}
      <HeroSection />

      {/* About Preview - Who I Am */}
      <AboutPreview />

      {/* Stats - Impact Numbers */}
      <StatsSection />

      {/* Skills - What I Do */}
      <SkillsSection />

      {/* Featured Projects - My Work (capped preview, "View all" links to /projects) */}
      <ProjectsSection featured />

      {/* Experience - My Journey */}
      <ExperienceTimeline />

      {/* Contact CTA - Let's Connect */}
      <ContactCTA />
    </div>
  );
}
