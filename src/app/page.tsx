import { Navbar, Hero, Features, Gallery, Courses, Testimonials, PartnerSchools, News, Footer } from '@/components/landing';

export default function Home() {
  return (
    <main className="bg-white">
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
