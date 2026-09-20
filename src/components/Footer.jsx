import './Footer.css'

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-inner">
                <p className="footer-brand">
                    <span className="navbar-logo-mark">◆</span> Zeel<span className="gradient-text">:</span>Patel
                </p>
                <p className="footer-copy">
                    © {new Date().getFullYear()} — Designed by Zeel Patel
                </p>
                <a href="#home" className="footer-top">Back to top ↑</a>
            </div>
        </footer>
    )
}