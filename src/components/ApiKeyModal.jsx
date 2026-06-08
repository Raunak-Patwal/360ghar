import { useState } from 'react';

export default function ApiKeyModal({ onSave, onClose, initialKey }) {
  const [key, setKey] = useState(initialKey || '');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!key.trim()) {
      setError('Please enter your API key');
      return;
    }
    setLoading(true);
    setError('');

    try {
      await onSave(key.trim());
    } catch (err) {
      setError(err.message || 'Invalid API key. Please check and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay apikey-modal" onClick={(e) => e.target === e.currentTarget && onClose?.()}>
      <div className="modal-content" role="dialog" aria-modal="true" aria-label="API Key Setup">
        <div className="apikey-body">
          <div className="apikey-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m21 2-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0 3 3L22 7l-3-3m-3.5 3.5L19 4" />
            </svg>
          </div>

          <h2 className="apikey-title">Connect to OpenRouter</h2>
          <p className="apikey-subtitle">
            Enter your free API key from{' '}
            <a href="https://openrouter.ai/keys" target="_blank" rel="noopener noreferrer">
              openrouter.ai
            </a>{' '}
            to enable AI-powered search. No credit card required.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="apikey-input-wrapper">
              <input
                id="apikey-input"
                type="password"
                className="apikey-input"
                placeholder="sk-or-v1-..."
                value={key}
                onChange={(e) => { setKey(e.target.value); setError(''); }}
                autoFocus
                autoComplete="off"
              />
            </div>

            {error && <div className="apikey-error" role="alert">{error}</div>}

            <button
              id="apikey-submit"
              type="submit"
              className="apikey-submit"
              disabled={loading || !key.trim()}
            >
              {loading ? 'Validating...' : 'Save & Continue'}
            </button>
          </form>

          {onClose && (
            <button className="apikey-skip" onClick={onClose}>
              Skip for now
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
