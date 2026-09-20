import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { codeSnippets } from './CodeSnippet'

/**
 * Renders a single code snippet onto a 2D canvas and returns a THREE.CanvasTexture.
 */
function makeCodeTexture(snippet, size = 512) {
    const canvas = document.createElement('canvas')
    canvas.width = size
    canvas.height = size
    const ctx = canvas.getContext('2d')

    // Background — dark window
    ctx.fillStyle = '#0d0d14'
    ctx.fillRect(0, 0, size, size)

    // Top bar (macOS-style)
    const barHeight = 42
    ctx.fillStyle = '#15151f'
    ctx.fillRect(0, 0, size, barHeight)

    // Traffic light dots
    const dotColors = ['#ff5f57', '#febc2e', '#28c840']
    dotColors.forEach((c, i) => {
        ctx.beginPath()
        ctx.arc(24 + i * 22, barHeight / 2, 6.5, 0, Math.PI * 2)
        ctx.fillStyle = c
        ctx.fill()
    })

    // Filename
    ctx.fillStyle = '#8b88a8'
    ctx.font = '500 15px Inter, system-ui, sans-serif'
    ctx.textAlign = 'center'
    ctx.fillText(snippet.label, size / 2, barHeight / 2 + 5)

    // Line numbers + code
    const padding = 22
    const lineHeight = 26
    const fontSize = 15
    const codeStartY = barHeight + 30

    ctx.textAlign = 'left'

    snippet.lines.forEach((line, i) => {
        const y = codeStartY + i * lineHeight

        // Line number
        ctx.fillStyle = '#3a3a4d'
        ctx.font = `500 ${fontSize}px "JetBrains Mono", "Fira Code", monospace`
        ctx.fillText(String(i + 1).padStart(2, ' '), padding, y)

        // Simple syntax highlighting
        const tokens = tokenize(line)
        let x = padding + 40
        tokens.forEach(({ text, type }) => {
            ctx.fillStyle = colorFor(type)
            ctx.font = `400 ${fontSize}px "JetBrains Mono", "Fira Code", monospace`
            ctx.fillText(text, x, y)
            x += ctx.measureText(text).width
        })
    })

    // Bottom fade
    const grad = ctx.createLinearGradient(0, size - 60, 0, size)
    grad.addColorStop(0, 'rgba(13,13,20,0)')
    grad.addColorStop(1, 'rgba(13,13,20,1)')
    ctx.fillStyle = grad
    ctx.fillRect(0, size - 60, size, 60)

    const tex = new THREE.CanvasTexture(canvas)
    tex.anisotropy = 8
    tex.colorSpace = THREE.SRGBColorSpace
    return tex
}

/**
 * Ultra-simple tokenizer — split on whitespace and classify each word.
 * Good enough for visuals; not a real parser.
 */
function tokenize(line) {
    // Preserve whitespace so column alignment stays correct
    const parts = line.match(/(\s+|\S+)/g) || []
    return parts.map((p) => {
        if (/^\s+$/.test(p)) return { text: p, type: 'space' }
        if (/^(import|from|export|default|function|class|def|return|for|in|await|async|const|let|var|if|else|new|self)$/.test(p))
            return { text: p, type: 'keyword' }
        if (/^(torch|nn|useState|useEffect|fetch|print|docker|client|model|criterion|optimizer|loader|epoch)$/.test(p))
            return { text: p, type: 'builtin' }
        if (/^["'`].*["'`][,;]?$/.test(p)) return { text: p, type: 'string' }
        if (/^\d+([.,]\d+)?$/.test(p)) return { text: p, type: 'number' }
        if (/^[(){}\[\]:.,;=<>!+\-*/%&|]+$/.test(p)) return { text: p, type: 'punct' }
        return { text: p, type: 'ident' }
    })
}

function colorFor(type) {
    switch (type) {
        case 'keyword': return '#c792ea'
        case 'builtin': return '#82aaff'
        case 'string': return '#c3e88d'
        case 'number': return '#f78c6c'
        case 'punct': return '#7a7691'
        default: return '#e3e1f0'
    }
}

export default function CodeCubeScene() {
    const groupRef = useRef()
    const innerRef = useRef()

    // Build the six textures once
    const materials = useMemo(() => {
        return codeSnippets.map((s) => {
            const tex = makeCodeTexture(s)
            return new THREE.MeshStandardMaterial({
                map: tex,
                emissiveMap: tex,
                emissive: '#ffffff',
                emissiveIntensity: 0.35,
                roughness: 0.55,
                metalness: 0.1,
                transparent: false
            })
        })
    }, [])

    // Frame-accurate smooth rotation + cursor tilt
    useFrame((state) => {
        const g = groupRef.current
        const inner = innerRef.current
        if (!g || !inner) return

        const t = state.clock.elapsedTime

        // Idle spin
        inner.rotation.y += 0.0035
        inner.rotation.x = Math.sin(t * 0.35) * 0.12

        // Mouse tilt
        const { x, y } = state.pointer
        g.rotation.x += (y * 0.35 - g.rotation.x) * 0.05
        g.rotation.y += (x * 0.5 - g.rotation.y) * 0.05

        // Float
        g.position.y = Math.sin(t * 0.8) * 0.12
    })

    return (
        <group ref={groupRef}>
            {/* Inner rotating cube */}
            <group ref={innerRef}>
                <mesh>
                    <boxGeometry args={[2.2, 2.2, 2.2]} />
                    {materials.map((mat, i) => (
                        <primitive key={i} object={mat} attach={`material-${i}`} />
                    ))}
                </mesh>

                {/* Wireframe overlay for a techy look */}
                <mesh scale={1.001}>
                    <boxGeometry args={[2.2, 2.2, 2.2]} />
                    <meshBasicMaterial
                        color="#b794f6"
                        wireframe
                        transparent
                        opacity={0.12}
                    />
                </mesh>
            </group>

            {/* Soft glow behind the cube */}
            <pointLight position={[0, 0, 3]} intensity={8} color="#b794f6" distance={8} />
            <pointLight position={[0, 0, -3]} intensity={6} color="#67e8f9" distance={8} />
        </group>
    )
}