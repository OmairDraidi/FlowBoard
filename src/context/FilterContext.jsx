import { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { useBoardStore } from '@/store';

const FilterContext = createContext(null);

/**
 * FilterProvider component.
 * Manages global filtering state for tasks (search, priority, labels).
 */
export function FilterProvider({ children }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [priorityFilters, setPriorityFilters] = useState([]);
  const [labelFilters, setLabelFilters] = useState([]);
  const activeBoardId = useBoardStore((s) => s.activeBoardId);

  const [prevBoardId, setPrevBoardId] = useState(activeBoardId);
  
  if (activeBoardId !== prevBoardId) {
    setPrevBoardId(activeBoardId);
    setSearchQuery('');
    setPriorityFilters([]);
    setLabelFilters([]);
  }

  const togglePriorityFilter = useCallback((priority) => {
    setPriorityFilters((prev) =>
      prev.includes(priority)
        ? prev.filter((p) => p !== priority)
        : [...prev, priority]
    );
  }, []);

  const toggleLabelFilter = useCallback((labelId) => {
    setLabelFilters((prev) =>
      prev.includes(labelId)
        ? prev.filter((id) => id !== labelId)
        : [...prev, labelId]
    );
  }, []);

  const clearFilters = useCallback(() => {
    setSearchQuery('');
    setPriorityFilters([]);
    setLabelFilters([]);
  }, []);

  const hasActiveFilters = useMemo(() => {
    return searchQuery.length > 0 || priorityFilters.length > 0 || labelFilters.length > 0;
  }, [searchQuery, priorityFilters, labelFilters]);

  const value = useMemo(() => ({
    searchQuery,
    setSearchQuery,
    priorityFilters,
    togglePriorityFilter,
    labelFilters,
    toggleLabelFilter,
    clearFilters,
    hasActiveFilters,
  }), [
    searchQuery,
    priorityFilters,
    togglePriorityFilter,
    labelFilters,
    toggleLabelFilter,
    clearFilters,
    hasActiveFilters
  ]);

  return (
    <FilterContext.Provider value={value}>
      {children}
    </FilterContext.Provider>
  );
}

/**
 * Custom hook to use the FilterContext.
 */
// eslint-disable-next-line react-refresh/only-export-components
export function useFilters() {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error('useFilters must be used within a FilterProvider');
  }
  return context;
}
