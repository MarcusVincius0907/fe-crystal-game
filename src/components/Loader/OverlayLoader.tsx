import './OverlayLoader.css'

export function OverlayLoader() {
    return (
        <div className="overlay">
            <div className="overlay__inner">
                <div className="overlay__content"><span className="spinner"></span></div>
            </div>
        </div>
    )
}