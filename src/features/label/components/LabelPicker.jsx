import { memo } from 'react';
import { useBoardStore } from '@/store';
import { selectActiveBoardLabels } from '@/store/index';
import { useShallow } from 'zustand/react/shallow';

/**
 * Label Picker component.
 * Allows toggling labels on a task from the active board's label set.
 */
export const LabelPicker = memo(function LabelPicker({ selectedLabelIds, onToggleLabel }) {
  const allLabels = useBoardStore(
    useShallow((s) => selectActiveBoardLabels(s))
  );

  return (
    <div className="flex flex-col gap-3">
      <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
        Labels
      </h4>
      <div className="flex flex-wrap gap-2">
        {allLabels.map((label) => {
          const isSelected = selectedLabelIds.includes(label.id);
          return (
            <button
              key={label.id}
              onClick={() => onToggleLabel(label.id)}
              className={`
                px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all border
                ${isSelected 
                  ? 'text-slate-100 shadow-sm' 
                  : 'text-slate-500 border-slate-700/50 hover:border-slate-500/50'}
              `}
              style={{
                backgroundColor: isSelected ? label.color : 'transparent',
                borderColor: isSelected ? label.color : undefined,
                boxShadow: isSelected ? `0 4px 12px ${label.color}40` : undefined
              }}
            >
              {label.name}
            </button>
          );
        })}
        
        {allLabels.length === 0 && (
          <p className="text-xs text-slate-500 italic">
            No labels created for this board yet.
          </p>
        )}
      </div>
    </div>
  );
});
