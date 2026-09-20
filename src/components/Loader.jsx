import { useEffect, useRef, useState } from 'react'
import './Loader.css'

export default function Loader({ onDone }) {
    const rootRef = useRef(null)
    const barRef = useRef(null)
    const textRef = useRef(null)
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        const root = rootRef.current
        const bar = barRef.current
        const text = textRef.current

        // --- Fallback 1: if refs missing for any reason, bail out immediately ---
        if (!root || !bar || !text) {
            onDone && onDone()
            return
        }

        // --- Fallback 2: hard safety net. After 3s, dismiss no matter what ---
        const failSafe = setTimeout(() => {
            console.warn('[Loader] failsafe triggered')
            onDone && onDone()
        }, 3000)

        // --- Animate progress bar with pure CSS via state (no GSAP needed) ---
        const raf = requestAnimationFrame(() => setProgress(100))

        // --- Try GSAP for the exit animation, but don't require it ---
        let tl = null
        try {
            // Dynamic import so a GSAP error can't kill the loader
            import('gsap').then(({ default: gsap }) => {
                if (!rootRef.current) return
                tl = gsap.timeline({
                    delay: 1.2,
                    onComplete: () => {
                        clearTimeout(failSafe)
                        onDone && onDone()
                    }
                })
                tl.to(text, { opacity: 0, duration: 0.3, ease: 'power2.out' })
                    .to(root, { yPercent: -100, duration: 0.8, ease: 'power3.inOut' }, '-=0.1')
            })
        } catch (e) {
            console.error('[Loader] GSAP failed, using fallback', e)
            setTimeout(() => onDone && onDone(), 1500)
        }

        return () => {
            clearTimeout(failSafe)
            cancelAnimationFrame(raf)
            tl && tl.kill()
        }
    }, [onDone])

    return (
        <div ref={rootRef} className="loader" style={styles.root}>
            <div style={styles.inner}>
                <span ref={textRef} style={styles.text}>
                    LOADING EXPERIENCE
                </span>

                <div style={styles.barTrack}>
                    <div
                        ref={barRef}
                        style={{
                            ...styles.barFill,
                            width: `${progress}%`
                        }}
                    />
                </div>

                <span style={styles.counter}>
                    {String(Math.round(progress)).padStart(2, '0')}
                </span>
            </div>
        </div>
    )
}

/* -------- Inline styles: these CANNOT fail to load -------- */
const styles = {
    root: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100vw',
        height: '100vh',
        background: '#08080c',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 2147483647, // max int — beats literally anything
        margin: 0,
        padding: 0,
        willChange: 'transform'
    },
    inner: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1.5rem',
        fontFamily: "'Inter', system-ui, sans-serif"
    },
    text: {
        fontSize: '0.8rem',
        fontWeight: 600,
        letterSpacing: '0.28em',
        textTransform: 'uppercase',
        color: '#b794f6',
        textShadow: '0 0 20px rgba(183,148,246,0.5)'
    },
    barTrack: {
        width: 260,
        maxWidth: '60vw',
        height: 2,
        background: 'rgba(255,255,255,0.08)',
        borderRadius: 2,
        overflow: 'hidden'
    },
    barFill: {
        height: '100%',
        background: 'linear-gradient(90deg, #b794f6, #67e8f9)',
        borderRadius: 2,
        transition: 'width 1.2s cubic-bezier(0.4, 0, 0.2, 1)'
    },
    counter: {
        fontSize: '0.7rem',
        fontWeight: 500,
        letterSpacing: '0.2em',
        color: 'rgba(245,243,255,0.4)',
        fontVariantNumeric: 'tabular-nums'
    }
}