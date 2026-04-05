import { memo } from 'react';
import { PRIORITY_CONFIG } from '@/lib/constants';

/**
 * Task Priority Badge component.
 * Small colored indicator for task priority levels.
 */
export const TaskPriorityBadge = memo(function TaskPriorityBadge({ priority }) {
  const config = PRIORITY_CONFIG[priority] || PRIORITY_CONFIG.none;

  return (
    <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full ${config.color} bg-opacity-10 border border-current border-opacity-20`}>
      <div className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
      <span className={`text-[10px] font-bold uppercase tracking-wider ${config.color.replace('bg-', 'text-')}`}>
        {config.label}
      </span>
    </div>
  );
});
