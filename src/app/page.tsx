import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Gallery from '@/components/Gallery';
import Courses from '@/components/Courses';
import Testimonials from '@/components/Testimonials';
import PartnerSchools from '@/components/PartnerSchools';
import News from '@/components/News';
import Footer from '@/components/Footer';

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
