import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Gallery from '@/components/Gallery';
import Schedule from '@/components/Schedule';
import News from '@/components/News';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="bg-white">
      <Navbar />
      <Hero />
      <Features />
      <Gallery />
      <Schedule />
      <News />
      <Footer />
    </main>
  );
}
