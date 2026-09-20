import { useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import Scene3D from './components/Scene3D'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Cursor from './components/Cursor'
import Loader from './components/Loader'
import Noise from './components/Noise'
import Marquee from './components/Marquee'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (loading) document.body.style.overflow = 'hidden'
    else {
      document.body.style.overflow = ''
      requestAnimationFrame(() => ScrollTrigger.refresh())
    }
  }, [loading])

  return (
    <>
      {loading && <Loader onDone={() => setLoading(false)} />}
      <Noise />
      <Cursor />
      <Navbar />
      <Scene3D />

      <main>
        <Hero />

        <Marquee
          items={[
            'Web Development',
            'Responsive Design',
            'WebGL & Three.js',
            'E-commerce Development',
            'AI/ML Automation'
          ]}
          speed={38}
        />

        <About />
        <Projects />
        <Contact />
      </main>

      <Footer />
    </>
  )
}