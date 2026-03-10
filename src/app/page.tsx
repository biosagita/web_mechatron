import { Navbar, Hero, Features, Gallery, Courses, Testimonials, PartnerSchools, News, Footer } from '@/components/landing';
import EventPopup from '@/components/shared/EventPopup';

export default function Home() {
  return (
    <main className="bg-white">
      <EventPopup />
      <Navbar />
      <Hero />
      <Features />
      <Courses />
      <Testimonials />
      <PartnerSchools />
      <Gallery />
      <News />
      <Footer />
    </main>
  );
}
