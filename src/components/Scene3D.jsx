import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import TorusKnot from '../three/TorusKnot'
import Particles from '../three/Particles'

export default function Scene3D() {
    return (
        <div
            style={{
                position: 'fixed',
                inset: 0,
                zIndex: 0,
                pointerEvents: 'none'
            }}
        >
            <Canvas
                camera={{ position: [0, 0, 5], fov: 75 }}
                dpr={[1, 2]}
                gl={{ antialias: true, alpha: true }}
            >
                <Suspense fallback={null}>
                    <ambientLight intensity={0.5} />
                    <pointLight position={[5, 5, 5]} intensity={90} color="#b794f6" />
                    <pointLight position={[-5, -3, 4]} intensity={70} color="#67e8f9" />
                    <TorusKnot />
                    <Particles count={1400} />
                </Suspense>
            </Canvas>
        </div>
    )
}