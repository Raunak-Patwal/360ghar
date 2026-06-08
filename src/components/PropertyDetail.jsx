import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { generateSummary } from '../services/openrouter';
import { formatPrice, formatArea } from '../services/filterEngine';
import TypewriterText from './TypewriterText';

export default function PropertyDetail({ property, originalQuery, apiKey, onClose }) {
  const [summary, setSummary] = useState('');
  const [summaryLoading, setSummaryLoading] = useState(false);
  const [summaryError, setSummaryError] = useState('');

  // Generate AI summary when the modal opens
  useEffect(() => {
    if (!property || !apiKey || !originalQuery) return;

    let cancelled = false;
    setSummaryLoading(true);
    setSummaryError('');
    setSummary('');

    generateSummary(property, originalQuery, apiKey)
      .then(text => {
        if (!cancelled) setSummary(text);
      })
      .catch(err => {
        if (!cancelled) setSummaryError(err.message || 'Failed to generate summary');
      })
      .finally(() => {
        if (!cancelled) setSummaryLoading(false);
      });

    return () => { cancelled = true; };
  }, [property, originalQuery, apiKey]);

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Prevent body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  if (!property) return null;

  return (
    <AnimatePresence>
      <div
        className="modal-overlay"
        onClick={(e) => e.target === e.currentTarget && onClose()}
        role="dialog"
        aria-modal="true"
        aria-label={`Property details: ${property.title}`}
        id="property-detail-modal"
      >
        <motion.div 
          className="modal-content"
          initial={{ y: 50, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 50, opacity: 0, scale: 0.95 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        >
          {/* Close button */}
        <button className="modal-close" onClick={onClose} aria-label="Close detail view" id="modal-close-btn">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </button>

        {/* Thumbnail */}
        <div className="modal-thumbnail">
          <div
            className="card-thumbnail-bg"
            style={{ background: property.thumbnailGradient, height: '100%' }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
          </div>
          <div className="modal-thumbnail-overlay" />
        </div>

        {/* Body */}
        <div className="modal-body">
          {/* Badges */}
          <div className="modal-badge-row">
            <span className="modal-badge bhk">{property.bhk}BHK</span>
            <span className="modal-badge area">{formatArea(property.area)}</span>
          </div>

          <div className="modal-price">{formatPrice(property.price)}</div>
          <h2 className="modal-title">{property.title}</h2>

          <div className="modal-location">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            {property.location}
          </div>

          {/* AI Summary */}
          <div className="ai-summary" id="ai-summary-section">
            <div className="ai-summary-header">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2 2 7l10 5 10-5-10-5Z" />
                <path d="m2 17 10 5 10-5" />
                <path d="m2 12 10 5 10-5" />
              </svg>
              AI Match Summary
            </div>

            {summaryLoading && (
              <div className="ai-summary-skeleton">
                <div className="skeleton-line long" />
                <div className="skeleton-line medium" />
                <div className="skeleton-line short" />
              </div>
            )}

            {summary && !summaryLoading && (
              <TypewriterText text={summary} className="ai-summary-text" speed={25} />
            )}

            {summaryError && !summaryLoading && (
              <p className="ai-summary-text" style={{ color: 'var(--text-tertiary)' }}>
                {summaryError}
              </p>
            )}

            {!apiKey && !summaryLoading && (
              <p className="ai-summary-text" style={{ color: 'var(--text-tertiary)' }}>
                Connect your OpenRouter API key to see a personalized AI summary.
              </p>
            )}
          </div>

          {/* Details Grid */}
          <div className="modal-details">
            <div className="detail-item">
              <div className="detail-label">Configuration</div>
              <div className="detail-value">{property.bhk}BHK</div>
            </div>
            <div className="detail-item">
              <div className="detail-label">Carpet Area</div>
              <div className="detail-value">{formatArea(property.area)}</div>
            </div>
            <div className="detail-item">
              <div className="detail-label">Price per sq ft</div>
              <div className="detail-value">₹{Math.round((property.price * 100000) / property.area).toLocaleString('en-IN')}</div>
            </div>
            <div className="detail-item">
              <div className="detail-label">Sector</div>
              <div className="detail-value">Sector {property.sector}</div>
            </div>
          </div>

          {/* Amenities */}
          {property.amenities.length > 0 && (
            <div className="modal-amenities">
              <h3 className="modal-amenities-title">Amenities</h3>
              <div className="amenity-tags">
                {property.amenities.map(a => (
                  <span key={a} className="amenity-tag">
                    {a.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Nearby Places */}
          {property.nearbyPlaces.length > 0 && (
            <div className="modal-amenities">
              <h3 className="modal-amenities-title">Nearby Places</h3>
              <div className="amenity-tags">
                {property.nearbyPlaces.map(np => (
                  <span key={np.name} className="amenity-tag">
                    {np.name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
    </AnimatePresence>
  );
}
