import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { formatPrice, formatArea } from '../services/filterEngine';

export default function CompareModal({ properties, onClose }) {
  // Prevent body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!properties || properties.length !== 2) return null;

  const [prop1, prop2] = properties;

  // Comparison logic to highlight winners
  const isWinner = (val1, val2, lowerIsBetter = false) => {
    if (val1 === val2) return false;
    if (lowerIsBetter) return val1 < val2;
    return val1 > val2;
  };

  const p1PriceWin = isWinner(prop1.price, prop2.price, true);
  const p2PriceWin = isWinner(prop2.price, prop1.price, true);

  const p1AreaWin = isWinner(prop1.area, prop2.area);
  const p2AreaWin = isWinner(prop2.area, prop1.area);

  // Get all unique amenities from both properties
  const allAmenities = [...new Set([...prop1.amenities, ...prop2.amenities])].sort();

  return (
    <AnimatePresence>
      <div className="modal-overlay compare-modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
        <motion.div 
          className="modal-content compare-modal-content"
          initial={{ y: 50, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 50, opacity: 0, scale: 0.95 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        >
          <button className="modal-close" onClick={onClose} aria-label="Close comparison">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>

          <div className="compare-header">
            <h2>Compare Properties</h2>
          </div>

          <div className="compare-grid">
            {/* Column 1: Labels (hidden on mobile, or just top labels) */}
            <div className="compare-col labels-col hidden-mobile">
              <div className="compare-cell header-cell"></div>
              <div className="compare-cell">Price</div>
              <div className="compare-cell">Area</div>
              <div className="compare-cell">Configuration</div>
              <div className="compare-cell">Location</div>
              <div className="compare-cell">Amenities</div>
            </div>

            {/* Column 2: Property 1 */}
            <div className="compare-col prop-col">
              <div className="compare-cell header-cell">
                <div className="compare-thumb" style={{ background: prop1.thumbnailGradient }}>
                  <span className="badge-bhk">{prop1.bhk}BHK</span>
                </div>
                <h3>{prop1.title}</h3>
              </div>
              <div className={`compare-cell ${p1PriceWin ? 'winner' : ''}`}>
                <span className="mobile-label">Price: </span>
                <strong>{formatPrice(prop1.price)}</strong>
                {p1PriceWin && <span className="win-badge">Lower</span>}
              </div>
              <div className={`compare-cell ${p1AreaWin ? 'winner' : ''}`}>
                <span className="mobile-label">Area: </span>
                {formatArea(prop1.area)}
                {p1AreaWin && <span className="win-badge">Larger</span>}
              </div>
              <div className="compare-cell">
                <span className="mobile-label">Config: </span>
                {prop1.bhk} Bedroom
              </div>
              <div className="compare-cell">
                <span className="mobile-label">Location: </span>
                {prop1.location}
              </div>
              <div className="compare-cell amenities-list">
                <span className="mobile-label">Amenities: </span>
                <ul>
                  {allAmenities.map(a => {
                    const hasIt = prop1.amenities.includes(a);
                    return (
                      <li key={a} className={hasIt ? 'has-amenity' : 'missing-amenity'}>
                        {hasIt ? '✓' : '✗'} {a.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>

            {/* Column 3: Property 2 */}
            <div className="compare-col prop-col">
              <div className="compare-cell header-cell">
                <div className="compare-thumb" style={{ background: prop2.thumbnailGradient }}>
                  <span className="badge-bhk">{prop2.bhk}BHK</span>
                </div>
                <h3>{prop2.title}</h3>
              </div>
              <div className={`compare-cell ${p2PriceWin ? 'winner' : ''}`}>
                <span className="mobile-label">Price: </span>
                <strong>{formatPrice(prop2.price)}</strong>
                {p2PriceWin && <span className="win-badge">Lower</span>}
              </div>
              <div className={`compare-cell ${p2AreaWin ? 'winner' : ''}`}>
                <span className="mobile-label">Area: </span>
                {formatArea(prop2.area)}
                {p2AreaWin && <span className="win-badge">Larger</span>}
              </div>
              <div className="compare-cell">
                <span className="mobile-label">Config: </span>
                {prop2.bhk} Bedroom
              </div>
              <div className="compare-cell">
                <span className="mobile-label">Location: </span>
                {prop2.location}
              </div>
              <div className="compare-cell amenities-list">
                <span className="mobile-label">Amenities: </span>
                <ul>
                  {allAmenities.map(a => {
                    const hasIt = prop2.amenities.includes(a);
                    return (
                      <li key={a} className={hasIt ? 'has-amenity' : 'missing-amenity'}>
                        {hasIt ? '✓' : '✗'} {a.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
            
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
