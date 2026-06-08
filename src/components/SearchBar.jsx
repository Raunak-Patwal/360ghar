import { useState, useRef, useEffect } from 'react';

const exampleQueries = [
  "2BHK in Sector 50 under 80 lakhs",
  "3BHK with pool and gym near school",
  "affordable flat with good sunlight",
  "luxury 4BHK penthouse with terrace",
];

export default function SearchBar({ onSearch, isLoading, disabled }) {
  const [query, setQuery] = useState('');
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef(null);
  const inputRef = useRef(null);

  // Initialize Speech Recognition
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.lang = 'en-IN';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setQuery(transcript);
        setListening(false);
        // Auto-submit after voice input
        setTimeout(() => onSearch(transcript), 300);
      };

      recognition.onerror = () => {
        setListening(false);
      };

      recognition.onend = () => {
        setListening(false);
      };

      recognitionRef.current = recognition;
    }
  }, [onSearch]);

  const handleVoiceToggle = () => {
    if (!recognitionRef.current) {
      alert('Voice input is not supported in this browser. Please use Chrome or Edge.');
      return;
    }

    if (listening) {
      recognitionRef.current.stop();
      setListening(false);
    } else {
      setListening(true);
      recognitionRef.current.start();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim() && !isLoading) {
      onSearch(query.trim());
    }
  };

  const handleExampleClick = (example) => {
    setQuery(example);
    onSearch(example);
  };

  return (
    <section className="hero">
      <h1 className="hero-title">Find Your Perfect Home</h1>
      <p className="hero-subtitle">
        Describe your dream property in plain language — our AI understands exactly what you're looking for.
      </p>

      <div className="search-container">
        <form onSubmit={handleSubmit} className="search-wrapper">
          <div className="search-icon" aria-hidden="true">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </div>

          <input
            ref={inputRef}
            id="search-input"
            type="text"
            className="search-input"
            placeholder="Try: 2BHK in Sector 50 under 80 lakhs, near a school..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            disabled={isLoading || disabled}
            aria-label="Search for properties"
          />

          <button
            type="button"
            className={`voice-btn ${listening ? 'listening' : ''}`}
            onClick={handleVoiceToggle}
            disabled={isLoading || disabled}
            title={listening ? 'Stop listening' : 'Search by voice'}
            aria-label={listening ? 'Stop voice input' : 'Start voice input'}
            id="voice-button"
          >
            {listening ? (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <rect x="4" y="4" width="16" height="16" rx="2" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
                <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                <line x1="12" x2="12" y1="19" y2="22" />
              </svg>
            )}
          </button>

          <button
            type="submit"
            className={`search-submit ${isLoading ? 'loading' : ''}`}
            disabled={!query.trim() || isLoading || disabled}
            id="search-button"
          >
            {isLoading ? (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12a9 9 0 1 1-6.219-8.56" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m22 2-7 20-4-9-9-4z" />
                <path d="M22 2 11 13" />
              </svg>
            )}
            <span>{isLoading ? 'Searching...' : 'Search'}</span>
          </button>
        </form>

        <div className="search-examples">
          {exampleQueries.map((example) => (
            <button
              key={example}
              className="search-example"
              onClick={() => handleExampleClick(example)}
              disabled={isLoading || disabled}
            >
              {example}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
