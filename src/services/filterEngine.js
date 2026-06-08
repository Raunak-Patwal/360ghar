/**
 * Filter Engine
 * Filters and ranks properties based on parsed query filters
 * Generates human-readable match reasons
 */

/**
 * Filter and rank properties based on parsed filters
 * @param {Array} properties - All mock properties
 * @param {Object} filters - Parsed filters from LLM
 * @returns {Array} Sorted array of properties with matchScore and matchReasons
 */
export function filterAndRankProperties(properties, filters) {
  if (!filters) return properties.map(p => ({ ...p, matchScore: 0, matchReasons: [] }));

  const results = properties.map(property => {
    let score = 0;
    const reasons = [];
    let excluded = false;

    // --- Hard Filters (exclude if they don't match) ---

    // BHK filter
    if (filters.bhk && filters.bhk.length > 0) {
      if (filters.bhk.includes(property.bhk)) {
        score += 25;
      } else {
        excluded = true;
      }
    }

    // Price range filter
    if (filters.priceMax !== null) {
      if (property.price <= filters.priceMax) {
        score += 20;
        // Bonus for being well within budget
        const ratio = property.price / filters.priceMax;
        if (ratio <= 0.85) {
          reasons.push(`Well within your budget at ₹${property.price}L`);
          score += 5;
        }
      } else {
        excluded = true;
      }
    }

    if (filters.priceMin !== null) {
      if (property.price >= filters.priceMin) {
        score += 5;
      } else {
        excluded = true;
      }
    }

    // Location filter
    if (filters.locations && filters.locations.length > 0) {
      const locationMatch = filters.locations.some(loc => {
        const locLower = loc.toLowerCase();
        const propLocationLower = property.location.toLowerCase();
        // Check sector number match
        const sectorMatch = locLower.match(/sector\s*(\d+)/);
        if (sectorMatch) {
          return property.sector === parseInt(sectorMatch[1]);
        }
        return propLocationLower.includes(locLower);
      });

      if (locationMatch) {
        score += 25;
        reasons.push(`Located in your preferred area`);
      } else {
        excluded = true;
      }
    }

    // --- Soft Scoring (adds points, doesn't exclude) ---

    // Amenity matches
    if (filters.amenities && filters.amenities.length > 0) {
      const matchedAmenities = filters.amenities.filter(a =>
        property.amenities.some(pa => pa.toLowerCase().includes(a.toLowerCase()))
      );
      if (matchedAmenities.length > 0) {
        score += matchedAmenities.length * 5;
        const amenityNames = matchedAmenities.slice(0, 2).map(a =>
          a.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
        );
        reasons.push(`Has ${amenityNames.join(' & ')}`);
      }
    }

    // Preference matches
    if (filters.preferences && filters.preferences.length > 0) {
      const matchedPrefs = filters.preferences.filter(pref =>
        property.preferences.some(pp => pp.toLowerCase().includes(pref.toLowerCase()))
      );
      if (matchedPrefs.length > 0) {
        score += matchedPrefs.length * 8;
        matchedPrefs.slice(0, 2).forEach(pref => {
          const prefDisplay = pref.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
          if (pref.toLowerCase().includes('sunlight')) {
            reasons.push('Great natural light');
          } else if (pref.toLowerCase().includes('vastu')) {
            reasons.push('Vastu compliant');
          } else if (pref.toLowerCase().includes('quiet')) {
            reasons.push('Peaceful neighborhood');
          } else if (pref.toLowerCase().includes('high floor')) {
            reasons.push('High floor with views');
          } else {
            reasons.push(prefDisplay);
          }
        });
      }
    }

    // Nearby places matching
    if (filters.nearbyPlaceTypes && filters.nearbyPlaceTypes.length > 0) {
      const matchedNearby = [];
      filters.nearbyPlaceTypes.forEach(type => {
        const found = property.nearbyPlaces.find(np =>
          np.type.toLowerCase().includes(type.toLowerCase())
        );
        if (found) {
          matchedNearby.push(found);
          score += 10;
        }
      });
      if (matchedNearby.length > 0) {
        const nearbyNames = matchedNearby.slice(0, 2).map(np => `Near ${np.name}`);
        reasons.push(...nearbyNames);
      }
    }

    return {
      ...property,
      matchScore: excluded ? -1 : score,
      matchReasons: reasons.length > 0 ? reasons : ['Matches your search criteria']
    };
  });

  // Filter out excluded properties and sort by score
  return results
    .filter(p => p.matchScore >= 0)
    .sort((a, b) => b.matchScore - a.matchScore);
}

/**
 * Format price for display
 * @param {number} priceInLakhs
 * @returns {string}
 */
export function formatPrice(priceInLakhs) {
  if (priceInLakhs >= 100) {
    const crores = priceInLakhs / 100;
    return `₹${crores % 1 === 0 ? crores : crores.toFixed(1)} Cr`;
  }
  return `₹${priceInLakhs} Lakhs`;
}

/**
 * Format area for display
 * @param {number} area
 * @returns {string}
 */
export function formatArea(area) {
  return `${area.toLocaleString('en-IN')} sq ft`;
}
