import { memo } from 'react';
import { motion } from 'framer-motion';

/**
 * Visual progress bar for a checklist.
 * Shows completed vs total and a percentage-based fill.
 */
export const ChecklistProgress = memo(function ChecklistProgress({ completed, total, percentage }) {
  if (total === 0) return null;

  const isComplete = percentage === 100;

  return (
    <div className="space-y-2 mb-6">
      <div className="flex justify-between items-center text-xs font-medium">
        <span className="text-slate-400 uppercase tracking-wider">Checklist</span>
        <span className={isComplete ? 'text-green-400' : 'text-slate-300'}>
          {isComplete ? 'All done! ✅' : `${completed} of ${total} completed (${percentage}%)`}
        </span>
      </div>

      <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className={`h-full rounded-full ${
            isComplete
              ? 'bg-gradient-to-r from-green-500 to-emerald-400'
              : 'bg-gradient-to-r from-indigo-500 to-indigo-400'
          }`}
        />
      </div>
    </div>
  );
});
