import { memo } from 'react';

/**
 * EmptyState component for placeholders
 * Displays an icon, title, description, and an optional action.
 */
export const EmptyState = memo(function EmptyState({
  icon: Icon,
  title,
  description,
  action: Action,
}) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center bg-surface-low/30 border-2 border-dashed border-slate-800 rounded-3xl">
      <div className="p-4 bg-surface-bright/50 rounded-2xl mb-6 text-indigo-400">
        {Icon ? <Icon className="w-10 h-10" /> : '📂'}
      </div>
      <h3 className="text-xl font-semibold text-slate-100 mb-2">{title}</h3>
      <p className="text-sm text-slate-400 max-w-xs mx-auto mb-8 leading-relaxed">
        {description}
      </p>
      {Action && (
        <div className="mt-4">
          {Action}
        </div>
      )}
    </div>
  );
});
