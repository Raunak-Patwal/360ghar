import { motion } from 'framer-motion';
import PropertyCard from './PropertyCard';
import SkeletonCard from './SkeletonCard';

export default function PropertyGrid({ properties, isLoading, hasSearched, onCardClick, onToggleCompare, compareList }) {
  if (isLoading) {
    return (
      <div className="results-section">
        <div className="app-container">
          <div className="property-grid">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <SkeletonCard key={i} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!hasSearched) return null;

  if (properties.length === 0) {
    return (
      <div className="results-section">
        <div className="app-container">
          <div className="property-grid">
            <div className="empty-state">
              <div className="empty-state-icon">🏠</div>
              <h2 className="empty-state-title">No properties found</h2>
              <p className="empty-state-text">
                Try adjusting your search — maybe a different sector, budget range, or fewer specific requirements.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  return (
    <div className="results-section">
      <div className="app-container">
        <div className="results-header">
          <p className="results-count">
            Found <strong>{properties.length}</strong> {properties.length === 1 ? 'property' : 'properties'} matching your search
          </p>
        </div>
        <motion.div 
          className="property-grid"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {properties.map(property => (
            <PropertyCard
              key={property.id}
              property={property}
              onClick={onCardClick}
              onToggleCompare={onToggleCompare}
              isCompared={compareList.some(p => p.id === property.id)}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
}
