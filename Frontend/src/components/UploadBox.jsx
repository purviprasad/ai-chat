/**
 * PDF upload UI for the RAG workflow.
 * Supports file picker + drag/drop, then delegates upload action to parent state.
 */
import { useState, useCallback } from "react";

export default function UploadBox({ onUpload, loading, error }) {
    const [file, setFile] = useState(null);
    const [dragActive, setDragActive] = useState(false);

    const pickFile = useCallback((f) => {
        // Guard against unsupported file types before enabling upload.
        if (f && f.type === "application/pdf") setFile(f);
    }, []);

    const onDrop = useCallback(
        (e) => {
            e.preventDefault();
            setDragActive(false);
            const f = e.dataTransfer.files?.[0];
            pickFile(f);
        },
        [pickFile]
    );

    return (
        <div className="upload-panel">
            <div>
                <h2 className="upload-title">Start with your PDF</h2>
                <p className="upload-hint">
                    Drag and drop a file here, or tap to browse. Only PDF is accepted; text is
                    extracted on the server.
                </p>
            </div>

            <div
                className="upload-zone"
                data-active={dragActive}
                onDragEnter={(e) => {
                    e.preventDefault();
                    setDragActive(true);
                }}
                onDragOver={(e) => {
                    e.preventDefault();
                    setDragActive(true);
                }}
                onDragLeave={() => setDragActive(false)}
                onDrop={onDrop}
            >
                <div className="upload-zone-icon" aria-hidden>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <polyline points="14 2 14 8 20 8" />
                        <line x1="12" y1="18" x2="12" y2="12" />
                        <line x1="9" y1="15" x2="15" y2="15" />
                    </svg>
                </div>
                <input
                    className="upload-file-input"
                    type="file"
                    accept="application/pdf"
                    onChange={(e) => pickFile(e.target.files?.[0])}
                    aria-label="Choose PDF file"
                />
                {file ? (
                    <p className="upload-file-name">{file.name}</p>
                ) : (
                    <p className="upload-hint" style={{ margin: 0 }}>
                        Drop PDF here or click anywhere in this box
                    </p>
                )}
            </div>

            {error ? <p className="alert">{error}</p> : null}

            <div className="upload-actions">
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => onUpload(file)}
                    disabled={loading || !file}
                >
                    {loading ? "Indexing…" : "Upload & index"}
                </button>
                {file ? (
                    <button type="button" className="btn btn-ghost" onClick={() => setFile(null)}>
                        Clear
                    </button>
                ) : null}
            </div>
        </div>
    );
}
