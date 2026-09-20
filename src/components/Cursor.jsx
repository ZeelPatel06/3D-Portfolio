import { useEffect, useRef } from 'react'
import './Cursor.css'

export default function Cursor() {
    const dotRef = useRef(null)
    const ringRef = useRef(null)

    useEffect(() => {
        const dot = dotRef.current
        const ring = ringRef.current

        let mx = window.innerWidth / 2
        let my = window.innerHeight / 2
        let rx = mx
        let ry = my
        let hovering = false
        let raf

        const onMove = (e) => {
            mx = e.clientX
            my = e.clientY
            dot.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%)`
        }

        const onOver = (e) => {
            const t = e.target
            const isInteractive =
                t.closest('a, button, .btn, [data-cursor="hover"]') !== null
            if (isInteractive !== hovering) {
                hovering = isInteractive
                ring.classList.toggle('cursor-ring--hover', hovering)
                dot.classList.toggle('cursor-dot--hover', hovering)
            }
        }

        const loop = () => {
            rx += (mx - rx) * 0.16
            ry += (my - ry) * 0.16
            ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`
            raf = requestAnimationFrame(loop)
        }

        window.addEventListener('mousemove', onMove)
        window.addEventListener('mouseover', onOver)
        loop()

        return () => {
            window.removeEventListener('mousemove', onMove)
            window.removeEventListener('mouseover', onOver)
            cancelAnimationFrame(raf)
        }
    }, [])

    return (
        <>
            <div ref={dotRef} className="cursor-dot" />
            <div ref={ringRef} className="cursor-ring" />
        </>
    )
}