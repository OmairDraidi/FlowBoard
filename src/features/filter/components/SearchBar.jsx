import { useState, useEffect, memo } from 'react';
import { useFilters } from '@/context/FilterContext';
import { Input } from '@/components/ui/Input';

/**
 * SearchBar component.
 * Debounced search input to filter tasks globally.
 */
export const SearchBar = memo(function SearchBar() {
  const { searchQuery, setSearchQuery } = useFilters();
  const [localValue, setLocalValue] = useState(searchQuery);

  // Update local value if context changes (e.g., reset)
  useEffect(() => {
    setLocalValue(searchQuery);
  }, [searchQuery]);

  // Debounce logic
  useEffect(() => {
    const handler = setTimeout(() => {
      setSearchQuery(localValue);
    }, 200);

    return () => clearTimeout(handler);
  }, [localValue, setSearchQuery]);

  return (
    <div className="relative w-full max-w-sm">
      <Input
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        placeholder="Search tasks..."
        className="!bg-surface-bright/20 !border-slate-700/50 hover:!border-slate-600 focus:!border-indigo-500/50 !pl-10 !rounded-full !h-10 !text-sm"
      />
      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none">
        🔍
      </span>
      {localValue && (
         <button 
           onClick={() => setLocalValue('')}
           className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
         >
           ×
         </button>
      )}
    </div>
  );
});
