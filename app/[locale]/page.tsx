import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import Stats from '@/components/sections/Stats';
import About from '@/components/sections/About';
import Catalogue from '@/components/sections/Catalogue';
import Reviews from '@/components/sections/Reviews';
import JoinUs from '@/components/sections/JoinUs';
import HireUs from '@/components/sections/HireUs';
import Support from '@/components/sections/Support';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <About />
        <Catalogue />
        <Reviews />
        <JoinUs />
        <HireUs />
        <Support />
      </main>
      <Footer />
    </>
  );
}
