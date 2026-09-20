import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Projects.css'

gsap.registerPlugin(ScrollTrigger)

const projects = [
    {
        title: 'Shree Creation E-Commerce Platform',
        role: 'Design & Development',
        year: '2026',
        desc: 'Built a full-stack MERN e-commerce platform for a local boutique store with product management, inventory, authentication, and secure Razorpay payments.',
        tags: ['ReactJS', 'NodeJS', 'ExpressJS', 'MongoDB'],
        image: '/portfolio_shree_project_lap.webp',
        accent: '#b794f6'
    },
    {
        title: 'AI Sentiment Analysis',
        role: 'AI/ML at Haronex Technology',
        year: '2025',
        desc: 'Built a Transformer-based NLP model to classify text into six emotions—joy, sadness, anger, fear, surprise, and love—with 93% test accuracy. Fine-tuned the model using Hugging Face Transformers for accurate real-time emotion.',
        tags: ['ML/DL', 'Transformers', 'NLP', 'PyTorch', 'Hugging Face'],
        image: '/portfolio_AI_senti_project_lap.webp',
        accent: '#67e8f9'
    },
    {
        title: 'Industrax | Manufacturing Automation',
        role: 'Design & Development',
        year: '2025',
        desc: 'Built a MERN-based manufacturing management platform that helps small businesses manage products, inventory, orders, and business operations efficiently.',
        tags: ['ReactJS', 'NodeJS', 'ExpressJS', 'MongoDB'],
        image: '/portfolio_industrax_project_lap.webp',
        accent: '#f0abfc'
    },
    {
        title: 'Pulse Design System',
        role: 'Creator',
        year: '2023',
        desc: 'A component library with motion primitives and a live token playground.',
        tags: ['React', 'Motion'],
        image: '/portfolio_industrax_project_lap.webp',
        accent: '#a78bfa'
    }
]

export default function Projects() {
    const scope = useRef(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.project-card', {
                y: 90,
                opacity: 0,
                duration: 1,
                stagger: 0.12,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.projects-grid',
                    start: 'top 78%'
                }
            })
        }, scope)
        return () => ctx.revert()
    }, [])

    const onMove = (e) => {
        const card = e.currentTarget
        const rect = card.getBoundingClientRect()
        card.style.setProperty('--mx', `${e.clientX - rect.left}px`)
        card.style.setProperty('--my', `${e.clientY - rect.top}px`)
    }

    return (
        <section id="work" ref={scope} className="projects">
            <div className="projects-wrap">
                <div className="projects-header">
                    <p className="section-label"><span>02</span> — Selected Work</p>
                    <h2 className="projects-heading">
                        Projects that <span className="serif gradient-text">push</span> the web forward.
                    </h2>
                </div>

                <div className="projects-grid">
                    {projects.map((p, i) => (
                        <article
                            key={i}
                            className="project-card"
                            onMouseMove={onMove}
                            style={{ '--accent': p.accent }}
                        >
                            {/* Image header */}
                            <div className="project-image">
                                <img src={p.image} alt={p.title} loading="lazy" />
                                <span className="project-index">0{i + 1}</span>
                                <span className="project-year">{p.year}</span>
                            </div>

                            {/* Body */}
                            <div className="project-body">
                                <h3 className="project-title">{p.title}</h3>
                                <p className="project-desc">{p.desc}</p>

                                <div className="project-tags">
                                    {p.tags.map((t) => (
                                        <span key={t} className="project-tag">{t}</span>
                                    ))}
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="project-footer">
                                <span className="project-role">{p.role}</span>
                                <span className="project-arrow">↗</span>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    )
}