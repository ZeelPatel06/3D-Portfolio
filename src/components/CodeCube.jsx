import { Suspense, useEffect, useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import CodeCubeScene from '../three/CodeCubeScene'
import './CodeCube.css'

export default function CodeCube({
    height = 480,
    className = '',
    interactive = true
}) {
    const wrapRef = useRef(null)
    const [visible, setVisible] = useState(false)
    const [reducedMotion, setReducedMotion] = useState(false)

    // Lazy-mount when scrolled into view (perf win)
    useEffect(() => {
        const el = wrapRef.current
        if (!el) return

        const io = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) setVisible(true)
            },
            { rootMargin: '200px' }
        )
        io.observe(el)
        return () => io.disconnect()
    }, [])

    useEffect(() => {
        const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
        setReducedMotion(mq.matches)
        const handler = (e) => setReducedMotion(e.matches)
        mq.addEventListener('change', handler)
        return () => mq.removeEventListener('change', handler)
    }, [])

    return (
        <div
            ref={wrapRef}
            className={`code-cube ${className}`}
            style={{ height }}
        >
            {/* Fallback / loading shimmer */}
            {!visible && <div className="code-cube__skeleton" />}

            {visible && !reducedMotion && (
                <Canvas
                    camera={{ position: [0, 0, 5.2], fov: 48 }}
                    dpr={[1, 1.75]}
                    gl={{ antialias: true, alpha: true }}
                    style={{ pointerEvents: interactive ? 'auto' : 'none' }}
                >
                    <Suspense fallback={null}>
                        <ambientLight intensity={0.35} />
                        <directionalLight position={[4, 5, 4]} intensity={0.6} />
                        <CodeCubeScene />
                    </Suspense>
                </Canvas>
            )}

            {visible && reducedMotion && (
                <div className="code-cube__static">
                    <span className="gradient-text">&lt;/&gt; code · ai · web</span>
                </div>
            )}
        </div>
    )
}