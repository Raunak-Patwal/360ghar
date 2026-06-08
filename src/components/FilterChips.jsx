export default function FilterChips({ filters }) {
  if (!filters) return null;

  const chips = [];

  if (filters.bhk?.length > 0) {
    filters.bhk.forEach(b => {
      chips.push({ label: 'Type', value: `${b}BHK` });
    });
  }

  if (filters.priceMax !== null || filters.priceMin !== null) {
    let priceStr = '';
    if (filters.priceMin !== null && filters.priceMax !== null) {
      priceStr = `₹${filters.priceMin}L – ₹${filters.priceMax}L`;
    } else if (filters.priceMax !== null) {
      priceStr = `Under ₹${filters.priceMax}L`;
    } else {
      priceStr = `Above ₹${filters.priceMin}L`;
    }
    chips.push({ label: 'Budget', value: priceStr });
  }

  if (filters.locations?.length > 0) {
    filters.locations.forEach(loc => {
      chips.push({ label: 'Location', value: loc });
    });
  }

  if (filters.amenities?.length > 0) {
    filters.amenities.forEach(a => {
      chips.push({ label: 'Amenity', value: a.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') });
    });
  }

  if (filters.preferences?.length > 0) {
    filters.preferences.forEach(p => {
      chips.push({ label: 'Preference', value: p.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') });
    });
  }

  if (filters.nearbyPlaceTypes?.length > 0) {
    filters.nearbyPlaceTypes.forEach(t => {
      chips.push({ label: 'Near', value: t.charAt(0).toUpperCase() + t.slice(1) });
    });
  }

  if (chips.length === 0) return null;

  return (
    <div className="filter-chips" aria-label="Active search filters">
      {chips.map((chip, i) => (
        <span key={`${chip.label}-${chip.value}-${i}`} className="filter-chip" style={{ animationDelay: `${i * 60}ms` }}>
          <span className="chip-label">{chip.label}:</span>
          {chip.value}
        </span>
      ))}
    </div>
  );
}
