import { motion } from 'framer-motion';
import { formatPrice, formatArea } from '../services/filterEngine';

export default function PropertyCard({ property, onClick, onToggleCompare, isCompared }) {
  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 300, damping: 24 } }
  };

  return (
    <motion.article
      variants={item}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className={`property-card ${isCompared ? 'compared' : ''}`}
      onClick={() => onClick(property)}
      id={`property-card-${property.id}`}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onClick(property); }}
      aria-label={`${property.bhk}BHK in ${property.location} at ${formatPrice(property.price)}`}
    >
      {/* Compare Checkbox */}
      <button 
        className={`card-compare-btn ${isCompared ? 'active' : ''}`}
        onClick={(e) => onToggleCompare(property, e)}
        aria-label={isCompared ? "Remove from comparison" : "Add to comparison"}
      >
        <div className="compare-checkbox">
          {isCompared && (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          )}
        </div>
        <span>{isCompared ? 'Added' : 'Compare'}</span>
      </button>

      {/* Thumbnail */}
      <div className="card-thumbnail">
        <div
          className="card-thumbnail-bg"
          style={{ background: property.thumbnailGradient }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
        </div>
        <div className="card-thumbnail-overlay" />

        {/* BHK Badge */}
        <span className="badge-bhk">{property.bhk}BHK</span>

        {/* 360° Badge */}
        <span className="badge-360">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
            <path d="M2 12h20" />
          </svg>
          360°
        </span>
      </div>

      {/* Body */}
      <div className="card-body">
        <div className="card-price">{formatPrice(property.price)}</div>
        <h3 className="card-title">{property.title}</h3>

        <div className="card-location">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          {property.location}
        </div>

        <div className="card-meta">
          <span className="card-meta-item">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 7v11a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7" />
              <path d="M21 7H3l3-4h12l3 4z" />
            </svg>
            {formatArea(property.area)}
          </span>
          <span className="card-meta-item">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 4v16" />
              <path d="M2 8h18a2 2 0 0 1 2 2v10" />
              <path d="M2 17h20" />
              <path d="M6 8v9" />
            </svg>
            {property.bhk} Bed
          </span>
        </div>

        {/* Match Reason Badge */}
        {property.matchReasons && property.matchReasons.length > 0 && (
          <div className="match-reason">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2 2 7l10 5 10-5-10-5Z" />
              <path d="m2 17 10 5 10-5" />
              <path d="m2 12 10 5 10-5" />
            </svg>
            <span>{property.matchReasons.slice(0, 3).join(' · ')}</span>
          </div>
        )}
      </div>
    </motion.article>
  );
}
