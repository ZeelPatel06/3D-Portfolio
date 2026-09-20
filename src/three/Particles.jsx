import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function Particles({ count = 1500 }) {
    const pointsRef = useRef()

    const positions = useMemo(() => {
        const arr = new Float32Array(count * 3)
        for (let i = 0; i < count * 3; i++) {
            arr[i] = (Math.random() - 0.5) * 40
        }
        return arr
    }, [count])

    useFrame((state) => {
        if (pointsRef.current) {
            pointsRef.current.rotation.y = state.clock.elapsedTime * 0.03
        }
    })

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={positions.length / 3}
                    array={positions}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                color="#22d3ee"
                size={0.035}
                sizeAttenuation
                transparent
                opacity={0.7}
            />
        </points>
    )
}