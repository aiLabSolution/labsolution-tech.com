import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Partners from './components/Partners'
import Products from './components/Products'
import ProductBrochure from './components/ProductBrochure'
import Features from './components/Features'
import About from './components/About'
import Locations from './components/Locations'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      <a
        href="#main"
        className="absolute top-[-100%] left-4 z-[100] px-4 py-2 bg-cta text-white rounded-b-lg font-semibold transition-[top] duration-200 focus:top-0"
      >
        Skip to main content
      </a>

      <Navbar />

      <main id="main">
        <Hero />
        <Partners />
        <Products />
        <ProductBrochure />
        <Features />
        <About />
        <Locations />
        <Contact />
      </main>

      <Footer />
    </>
  )
}
