export default function Header({ apiKey, onSettingsClick }) {
  return (
    <header className="header">
      <div className="header-inner">
        <div className="logo">
          <div className="logo-icon">360</div>
          <div className="logo-text">
            360<span>ghar</span>
          </div>
        </div>

        <div className="header-actions">
          <button
            className="settings-btn"
            onClick={onSettingsClick}
            id="settings-button"
            aria-label="API Settings"
          >
            <span
              className={`key-status ${apiKey ? 'connected' : 'disconnected'}`}
              aria-label={apiKey ? 'API key configured' : 'API key not set'}
            />
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="3" />
              <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
            </svg>
            <span>API Key</span>
          </button>
        </div>
      </div>
    </header>
  );
}
