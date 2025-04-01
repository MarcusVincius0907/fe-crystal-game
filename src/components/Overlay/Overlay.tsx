import './Overlay.css'

export function Overlay({ children }) {
    return (
        <div className="overlay">
            <div className="overlay__inner">
                <div className="overlay__content">
                    {children}
                </div>
            </div>
        </div>
    )
}