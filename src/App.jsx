import { useState, useCallback, useEffect } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import FilterChips from './components/FilterChips';
import FollowUpBanner from './components/FollowUpBanner';
import PropertyGrid from './components/PropertyGrid';
import PropertyDetail from './components/PropertyDetail';
import ApiKeyModal from './components/ApiKeyModal';
import CompareBar from './components/CompareBar';
import CompareModal from './components/CompareModal';
import properties from './data/properties';
import { parseQuery } from './services/openrouter';
import { filterAndRankProperties } from './services/filterEngine';

export default function App() {
  // State
  const [apiKey, setApiKey] = useState(() => import.meta.env.VITE_OPENROUTER_API_KEY || localStorage.getItem('openrouter_api_key') || '');
  const [showApiKeyModal, setShowApiKeyModal] = useState(false);
  const [query, setQuery] = useState('');
  const [parsedFilters, setParsedFilters] = useState(null);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [error, setError] = useState('');
  const [followUp, setFollowUp] = useState({ question: null, options: [] });
  
  // Compare State
  const [compareList, setCompareList] = useState([]);
  const [showCompare, setShowCompare] = useState(false);

  // Show API key modal on first visit if no key
  useEffect(() => {
    if (!apiKey && !import.meta.env.VITE_OPENROUTER_API_KEY) {
      setShowApiKeyModal(true);
    }
  }, []);

  // Save API key
  const handleSaveApiKey = async (key) => {
    localStorage.setItem('openrouter_api_key', key);
    setApiKey(key);
    setShowApiKeyModal(false);
  };

  // Clear error after timeout
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(''), 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  // Handle search
  const handleSearch = useCallback(async (searchQuery) => {
    if (!apiKey) {
      setShowApiKeyModal(true);
      return;
    }

    setQuery(searchQuery);
    setIsLoading(true);
    setError('');
    setFollowUp({ question: null, options: [] });
    setHasSearched(true);

    try {
      const filters = await parseQuery(searchQuery, apiKey);
      setParsedFilters(filters);

      // Check for follow-up question
      if (filters.followUpQuestion) {
        setFollowUp({
          question: filters.followUpQuestion,
          options: filters.followUpOptions || []
        });
      }

      // Filter and rank properties
      const ranked = filterAndRankProperties(properties, filters);
      setFilteredProperties(ranked);
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
      setFilteredProperties([]);
      setParsedFilters(null);
    } finally {
      setIsLoading(false);
    }
  }, [apiKey]);

  // Handle follow-up option click
  const handleFollowUpClick = useCallback((option) => {
    const refinedQuery = `${query}, ${option}`;
    handleSearch(refinedQuery);
  }, [query, handleSearch]);

  // Handle card click
  const handleCardClick = useCallback((property) => {
    setSelectedProperty(property);
  }, []);

  // Handle Compare
  const handleToggleCompare = useCallback((property, e) => {
    e.stopPropagation(); // Prevent opening modal
    setCompareList(prev => {
      const exists = prev.find(p => p.id === property.id);
      if (exists) return prev.filter(p => p.id !== property.id);
      if (prev.length >= 2) {
        setError('You can only compare 2 properties at a time.');
        return prev;
      }
      return [...prev, property];
    });
  }, []);

  // Close modal
  const handleCloseDetail = useCallback(() => {
    setSelectedProperty(null);
  }, []);

  return (
    <div className="app" id="app-root">
      <Header
        apiKey={apiKey}
        onSettingsClick={() => setShowApiKeyModal(true)}
      />

      <main>
        <div className="app-container">
          <SearchBar
            onSearch={handleSearch}
            isLoading={isLoading}
            disabled={false}
          />

          <FilterChips filters={parsedFilters} />

          <FollowUpBanner
            question={followUp.question}
            options={followUp.options}
            onOptionClick={handleFollowUpClick}
          />
        </div>

        <PropertyGrid
          properties={filteredProperties}
          isLoading={isLoading}
          hasSearched={hasSearched}
          onCardClick={handleCardClick}
          onToggleCompare={handleToggleCompare}
          compareList={compareList}
        />
      </main>

      <CompareBar 
        compareList={compareList}
        onRemove={(item) => setCompareList(prev => prev.filter(p => p.id !== item.id))}
        onClear={() => setCompareList([])}
        onCompare={() => setShowCompare(true)}
      />

      {showCompare && (
        <CompareModal 
          properties={compareList} 
          onClose={() => setShowCompare(false)} 
        />
      )}

      {/* Property Detail Modal */}
      {selectedProperty && (
        <PropertyDetail
          property={selectedProperty}
          originalQuery={query}
          apiKey={apiKey}
          onClose={handleCloseDetail}
        />
      )}

      {/* API Key Modal */}
      {showApiKeyModal && (
        <ApiKeyModal
          initialKey={apiKey}
          onSave={handleSaveApiKey}
          onClose={apiKey ? () => setShowApiKeyModal(false) : null}
        />
      )}

      {/* Error Toast */}
      {error && (
        <div className="error-toast" role="alert" id="error-toast">
          {error}
        </div>
      )}
    </div>
  );
}
