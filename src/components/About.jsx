import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './About.css'

gsap.registerPlugin(ScrollTrigger)

const stats = [
    { num: '2+', label: 'Years Building for the Web.' },
    { num: '3', label: 'Projects Delivered end-to-end' },
    { num: '100%', label: 'Client Satisfaction' },
    { num: '24h', label: 'Average Response Time' }
]

const skills = [
    'ReactJS', 'TypeScript', 'ThreeJS', 'R3F',
    'GSAP', 'WebGL', 'NodeJS', 'ExpressJS', 'AI/ML', 'SQL', 'MongoDB', 
    'Gen-AI', 'Redis'
]

export default function About() {
    const scope = useRef(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.about-reveal', {
                y: 60,
                opacity: 0,
                duration: 1,
                ease: 'power3.out',
                stagger: 0.08,
                scrollTrigger: { trigger: scope.current, start: 'top 75%' }
            })
            gsap.from('.stat', {
                y: 40,
                opacity: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: 'power3.out',
                scrollTrigger: { trigger: '.about-stats', start: 'top 85%' }
            })
        }, scope)
        return () => ctx.revert()
    }, [])

    return (
        <section id="about" ref={scope} className="about">
            <div className="about-wrap">
                <p className="section-label about-reveal">
                    <span>01</span> — About
                </p>

                <h2 className="about-heading about-reveal">
                    I design & build <br />
                    <span className="serif gradient-text">digital experiences</span>{' '}
                    that feel alive.
                </h2>

                <p className="subtitle about-reveal about-copy">
                    From concept to code, I obsess over the details — the easing of a
                    transition, the weight of a shadow, the rhythm of a layout. Every
                    interaction should feel considered, not accidental.
                </p>

                <div className="about-stats">
                    {stats.map((s) => (
                        <div key={s.label} className="stat">
                            <span className="stat-num gradient-text">{s.num}</span>
                            <span className="stat-label">{s.label}</span>
                        </div>
                    ))}
                </div>

                <div className="about-skills about-reveal">
                    <span className="about-skills-label">Toolkit</span>
                    <div className="about-skills-list">
                        {skills.map((s) => (
                            <span key={s} className="pill">{s}</span>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}