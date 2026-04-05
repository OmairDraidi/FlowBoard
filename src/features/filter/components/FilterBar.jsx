import { memo } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { useFilters } from '@/context/FilterContext';
import { useBoardStore } from '@/store';
import { selectActiveBoardLabels } from '@/store/index';
import { PRIORITIES, PRIORITY_CONFIG } from '@/lib/constants';

/**
 * FilterBar component.
 * Displays toggleable chips for priorities and labels.
 * Controls the board's visual task set.
 */
export const FilterBar = memo(function FilterBar() {
  const {
    priorityFilters,
    togglePriorityFilter,
    labelFilters,
    toggleLabelFilter,
    clearFilters,
    hasActiveFilters
  } = useFilters();

  const activeLabels = useBoardStore(
    useShallow((s) => selectActiveBoardLabels(s))
  );

  return (
    <div className="px-6 py-3 border-b border-slate-700/50 flex items-center gap-6 overflow-x-auto custom-scrollbar bg-surface-base">
      {/* Priority Filters */}
      <div className="flex items-center gap-2 border-r border-slate-700/50 pr-6 shrink-0">
        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mr-2">Priority:</span>
        {Object.values(PRIORITIES).map((p) => {
          const config = PRIORITY_CONFIG[p];
          const isSelected = priorityFilters.includes(p);
          return (
            <button
              key={p}
              onClick={() => togglePriorityFilter(p)}
              className={`
                px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all border
                ${isSelected 
                  ? 'bg-indigo-600/10 border-indigo-500/50 text-indigo-400' 
                  : 'text-slate-500 border-slate-700/50 hover:border-slate-500'}
              `}
            >
              {config.label}
            </button>
          );
        })}
      </div>

      {/* Label Filters */}
      <div className="flex items-center gap-2 flex-1 min-w-0">
        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mr-2 shrink-0">Labels:</span>
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          {activeLabels.map((label) => {
            const isSelected = labelFilters.includes(label.id);
            return (
              <button
                key={label.id}
                onClick={() => toggleLabelFilter(label.id)}
                className={`
                  px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all border shrink-0
                  ${isSelected 
                    ? 'text-slate-100' 
                    : 'text-slate-500 border-slate-700/50 hover:border-slate-500'}
                `}
                style={{
                  backgroundColor: isSelected ? label.color : 'transparent',
                  borderColor: isSelected ? label.color : undefined
                }}
              >
                {label.name}
              </button>
            );
          })}
          {activeLabels.length === 0 && (
            <span className="text-[10px] text-slate-600 font-medium italic">No labels on this board</span>
          )}
        </div>
      </div>

      {/* Action: Clear All */}
      {hasActiveFilters && (
        <button
          onClick={clearFilters}
          className="text-[10px] font-bold uppercase tracking-widest text-indigo-500 hover:text-indigo-400 underline underline-offset-4 transition-colors shrink-0"
        >
          Clear All Filters
        </button>
      )}
    </div>
  );
});
