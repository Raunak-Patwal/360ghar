import { motion, AnimatePresence } from 'framer-motion';

export default function CompareBar({ compareList, onRemove, onCompare, onClear }) {
  return (
    <AnimatePresence>
      {compareList.length > 0 && (
        <motion.div
          className="compare-bar-wrapper"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
        >
          <div className="compare-bar">
            <div className="compare-info">
              <span className="compare-count">
                {compareList.length}/2 Selected for Comparison
              </span>
              <div className="compare-items">
                {compareList.map(item => (
                  <div key={item.id} className="compare-item-mini">
                    <span className="compare-item-title">{item.bhk}BHK in Sector {item.sector}</span>
                    <button className="compare-item-remove" onClick={() => onRemove(item)} aria-label="Remove from comparison">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="compare-actions">
              <button className="compare-clear-btn" onClick={onClear}>Clear</button>
              <button 
                className="compare-start-btn" 
                disabled={compareList.length < 2}
                onClick={onCompare}
              >
                Compare Properties
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
