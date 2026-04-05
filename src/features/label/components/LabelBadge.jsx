import { memo } from 'react';

/**
 * Label Badge component.
 * Colored pill used to display labels on cards and in modals.
 */
export const LabelBadge = memo(function LabelBadge({ label, size = 'sm' }) {
  if (!label) return null;

  return (
    <div
      className={`
        inline-flex items-center justify-center rounded-full font-bold uppercase tracking-wider
        ${size === 'sm' ? 'px-1.5 py-0.5 text-[9px]' : 'px-3 py-1 text-[10px]'}
      `}
      style={{ 
        backgroundColor: `${label.color}20`, // 20% opacity
        color: label.color,
        border: `1px solid ${label.color}40` // 40% opacity border
      }}
    >
      {label.name}
    </div>
  );
});
