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
        desc: 'Built a full-stack MERN e-commerce platform for a local boutique store with product management, inventory, authentication, order management, and secure Razorpay payments.',
        tags: ['ReactJS', 'NodeJS', 'ExpressJS', 'MongoDB'],
        image: '/portfolio_shree_project_lap.webp',
        accent: '#F7EE43',
        proUrl: "https://shreecreation.online/"
    },
    {
        title: 'AI Sentiment Analysis',
        role: 'AI/ML at Haronex Technology',
        year: '2025',
        desc: 'Built a Transformer-based NLP model to classify text into six emotions—joy, sadness, anger, fear, surprise, and love—with 93% test accuracy. Fine-tuned the model with Hugging Face Transformers for real-time emotion.',
        tags: ['ML/DL', 'Transformers', 'NLP', 'PyTorch', 'Hugging Face'],
        image: '/portfolio_AI_senti_project_lap.webp',
        accent: '#67e8f9',
        proUrl: "https://docs.google.com/document/d/1vQNLqpGdTWNjl4eC5Qm9X6zemmotcb5bduW_CJKOFcs/edit?usp=sharing"
    },
    {
        title: 'Industrax | Manufacturing Automation',
        role: 'Design & Development',
        year: '2025',
        desc: 'Built a MERN-based manufacturing management platform that helps small businesses manage products, inventory, orders, and business operations efficiently.',
        tags: ['ReactJS', 'NodeJS', 'ExpressJS', 'MongoDB'],
        image: '/portfolio_industrax_project_lap.webp',
        accent: '#FC56E6',
        proUrl: "https://industrax-nicesoftserv-v1.vercel.app/dashboard"
    },
    {
        title: 'CusSup-AI | AI Customer Support',
        role: 'Creator',
        year: '2026',
        desc: 'AI powered chatbot that helps businesses automate customer support and instantly answer customer queries using their website and business information.',
        tags: ['ReactJS', 'Gen AI', 'NodeJS', 'MongoDB', 'ExpressJS'],
        image: '/portfolio_CusSupAI_project_lap.webp',
        accent: '#46F743',
        proUrl: "https://customer-support-app-inky.vercel.app/"
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
                        <a
                            href={p.proUrl}
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
                        </a>
                    ))}
                </div>
            </div>
        </section>
    )
}