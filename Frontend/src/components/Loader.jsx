export default function Loader() {
    return (
        <div className="loader-row" role="status" aria-live="polite">
            <div className="loader-dots" aria-hidden>
                <span />
                <span />
                <span />
            </div>
            <span>Thinking…</span>
        </div>
    );
}
