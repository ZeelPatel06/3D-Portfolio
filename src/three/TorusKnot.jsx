import { useRef, useEffect, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { MeshDistortMaterial } from '@react-three/drei'

export default function TorusKnot() {
    const meshRef = useRef()
    const [isSmall, setIsSmall] = useState(false)

    // Track viewport width so the knot repositions responsively
    useEffect(() => {
        const check = () => setIsSmall(window.innerWidth < 900)
        check()
        window.addEventListener('resize', check)
        return () => window.removeEventListener('resize', check)
    }, [])

    useFrame((state) => {
        const t = state.clock.elapsedTime
        const mesh = meshRef.current
        if (!mesh) return

        mesh.rotation.x = t * 0.18
        mesh.rotation.y = t * 0.24

        const scrollY = window.scrollY

        // Target X: center on small screens, right side on desktop
        const targetX = isSmall ? 0 : 1.8
        mesh.position.x += (targetX - mesh.position.x) * 0.08

        // Gentle float + scroll drift
        mesh.position.y = Math.sin(t * 0.7) * 0.08 - scrollY * 0.0018

        // Slightly smaller on mobile so it stays inside the frame
        const baseScale = isSmall ? 0.75 : 1
        mesh.scale.setScalar(baseScale + scrollY * 0.0002)
    })

    return (
        <mesh ref={meshRef} position={[0, 0, 0]}>
            <torusKnotGeometry args={[1.15, 0.32, 240, 40]} />
            <MeshDistortMaterial
                color="#a78bfa"
                emissive="#6d28d9"
                emissiveIntensity={0.18}   /* was 0.55 — softer glow */
                metalness={0.85}
                roughness={0.25}           /* was 0.12 — less shiny */
                distort={0.18}             /* was 0.22 — subtler wobble */
                speed={1.1}
                transparent
                opacity={0.55}             /* global translucency */
                depthWrite={false}         /* clean blending with particles */
            />
        </mesh>
    )
}