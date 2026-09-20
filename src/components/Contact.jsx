import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Contact.css'

gsap.registerPlugin(ScrollTrigger)

export default function Contact() {
    const scope = useRef(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.contact-reveal', {
                y: 60,
                opacity: 0,
                duration: 1,
                stagger: 0.1,
                ease: 'power3.out',
                scrollTrigger: { trigger: scope.current, start: 'top 75%' }
            })
        }, scope)
        return () => ctx.revert()
    }, [])

    return (
        <section id="contact" ref={scope} className="contact">
            <div className="glow glow-1" />
            <div className="contact-wrap">
                <p className="section-label contact-reveal">
                    <span>03</span> — Contact
                </p>

                <h2 className="contact-heading contact-reveal">
                    Let's create <br />
                    <span className="serif gradient-text">something remarkable</span>.
                </h2>

                <p className="subtitle contact-reveal contact-sub">
                    Currently open for freelance projects and creative collaborations.
                    If you have an idea worth building — let's talk.
                </p>

                <div className="contact-actions contact-reveal">
                    <a href="mailto:zeelnp06@gmail.com" className="btn btn-primary">
                        zeelnp06@gmail.com <span>→</span>
                    </a>
                    <a href="https://wa.me/919876543210?text=Hi%20Your%20Name%2C%20I%20saw%20your%20portfolio%20and%20I%27d%20like%20to%20discuss%20a%20project." target='_blank' className="btn btn-ghost">Book a call</a>
                </div>

                <div className="contact-socials contact-reveal">
                        <a href="https://www.instagram.com/zeelu_ncpatel?stkn=MWVqYnl2ZzVkcTk5Mg%3D%3D" target='_blank' className="contact-social">Instagram ↗</a>
                        <a href="https://www.linkedin.com/in/zeelpateldev06" target='_blank' className="contact-social">LinkedIn ↗</a>
                        <a href="https://github.com/ZeelPatel06" target='_blank' className="contact-social">Github ↗</a>
                        <a href="https://wa.me/919876543210?text=Hi%20Your%20Name%2C%20I%20saw%20your%20portfolio%20and%20I%27d%20like%20to%20discuss%20a%20project." target='_blank' className="contact-social">WhatsApp ↗</a>
                </div>
            </div>
        </section>
    )
}