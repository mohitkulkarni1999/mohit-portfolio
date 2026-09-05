import { SettingsProvider, useSettings } from '../../context/SettingsContext';
import useFetch from '../../hooks/useFetch';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Stats from './components/Stats';
import Skills from './components/Skills';
import Services from './components/Services';
import Projects from './components/Projects';
import Tools from './components/Tools';
import Experience from './components/Experience';
import Education from './components/Education';
import Certifications from './components/Certifications';
import Achievements from './components/Achievements';
import Testimonials from './components/Testimonials';
import Blog from './components/Blog';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import BlueprintBackground from '../../components/BlueprintBackground';

const SECTION_MAP = {
  about: About,
  stats: Stats,
  skills: Skills,
  services: Services,
  projects: Projects,
  tools: Tools,
  experience: Experience,
  education: Education,
  certifications: Certifications,
  achievements: Achievements,
  testimonials: Testimonials,
  blog: Blog,
  contact: Contact,
};

function PortfolioContent() {
  const { settings, ready } = useSettings();
  const { data: profile } = useFetch('/profile');

  const visibility = {
    about: !!settings.show_about,
    stats: !!settings.show_stats,
    skills: !!settings.show_skills,
    services: !!settings.show_services,
    projects: !!settings.show_projects,
    tools: !!settings.show_tools,
    experience: !!settings.show_experience,
    education: !!settings.show_education,
    certifications: !!settings.show_certifications,
    achievements: !!settings.show_achievements,
    testimonials: !!settings.show_testimonials,
    blog: !!settings.show_blog,
    contact: !!settings.show_contact,
  };

  const orderedSections = Object.keys(SECTION_MAP).filter(
    (key) => settings[`order_${key}`] !== undefined && settings[`order_${key}`] !== null
  ).sort((a, b) => settings[`order_${a}`] - settings[`order_${b}`]);

  const visibleSections = Object.keys(SECTION_MAP).filter((key) => visibility[key]);

  document.title = settings.site_title || 'Portfolio';

  return (
    <div className="min-h-screen bg-surface-950 relative">
      <BlueprintBackground fixed variant="hero" />
      <Navbar profile={profile} settings={settings} />
      <Hero profile={profile} settings={settings} />
      <main>
        {orderedSections.length === visibleSections.length
          ? orderedSections.map((key) => {
              const Cmp = SECTION_MAP[key];
              return visibility[key] ? <Cmp key={key} profile={profile} settings={settings} /> : null;
            })
          : visibleSections.map((key) => {
              const Cmp = SECTION_MAP[key];
              return <Cmp key={key} profile={profile} settings={settings} />;
            })}
      </main>
      <Footer profile={profile} />
      <BackToTop />
    </div>
  );
}

export default function Portfolio() {
  return (
    <SettingsProvider>
      <PortfolioContent />
    </SettingsProvider>
  );
}
