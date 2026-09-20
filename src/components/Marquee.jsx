import './Marquee.css'

export default function Marquee({ items = [], speed = 30, direction = 'left' }) {
    const row = [...items, ...items]
    return (
        <div className="marquee">
            <div
                className="marquee-track"
                style={{
                    animationDuration: `${speed}s`,
                    animationDirection: direction === 'right' ? 'reverse' : 'normal'
                }}
            >
                {row.map((item, i) => (
                    <span key={i} className="marquee-item">
                        {item}
                        <span className="marquee-dot">✦</span>
                    </span>
                ))}
            </div>
        </div>
    )
}