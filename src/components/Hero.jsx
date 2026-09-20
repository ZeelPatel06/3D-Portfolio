import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import CodeCube from './CodeCube'
import './Hero.css'

export default function Hero() {
    const scope = useRef(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })
            tl.from('.hero-eyebrow', { y: 30, opacity: 0, duration: 0.8 })
                .from('.hero-line span', {
                    y: '100%',
                    opacity: 0,
                    duration: 1,
                    stagger: 0.08
                }, '-=0.4')
                .from('.hero-sub', { y: 30, opacity: 0, duration: 0.8 }, '-=0.5')
                .from('.hero-cta > *', {
                    y: 20, opacity: 0, duration: 0.6, stagger: 0.1
                }, '-=0.4')
                .from('.hero-meta', { y: 20, opacity: 0, duration: 0.7 }, '-=0.3')
        }, scope)
        return () => ctx.revert()
    }, [])

    return (
        <section id="home" className="hero" ref={scope}>
            <div className="glow glow-1" />
            <div className="glow glow-2" />

            <div className="hero- hero-grid">
                <div className='hero-content'>
                    <p className="hero-eyebrow">
                        <span className="hero-dot" />
                        Available for Projects — 2026
                    </p>

                    <h1 className="hero-title">
                        <span className="hero-line"><span>Crafting</span></span>
                        <span className="hero-line"><span className="serif gradient-text">immersive</span></span>
                        <span className="hero-line"><span>digital worlds.</span></span>
                    </h1>

                    <p className="hero-sub subtitle">
                        Hii, I'm <strong>Zeel Patel</strong> — a creative developer building
                        interactive experiences at the intersection of design, motion
                        and 3D on the web.
                    </p>

                    <div className="hero-cta">
                        <a href="#work" className="btn btn-primary">
                            Explore Work <span>→</span>
                        </a>
                        <a href="#contact" className="btn btn-ghost">
                            Get in Touch
                        </a>
                    </div>

                    <div className="hero-meta">
                        <div>
                            <span className="hero-meta-label">Based in</span>
                            <span className="hero-meta-value">Gujarat, IN</span>
                        </div>
                        <div>
                            <span className="hero-meta-label">Focus</span>
                            <span className="hero-meta-value">Online Presence</span>
                        </div>
                        <div>
                            <span className="hero-meta-label">Since</span>
                            <span className="hero-meta-value">2023</span>
                        </div>
                    </div>
                </div>
                <CodeCube height={520} className="hero-cube" />
            </div>
        </section>
    )
}