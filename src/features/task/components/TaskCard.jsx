import { memo } from 'react';
import { formatDistanceToNow, isPast, isToday } from 'date-fns';
import { useShallow } from 'zustand/react/shallow';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { useBoardStore } from '@/store';
import { useModal } from '@/context/ModalContext';
import { TaskPriorityBadge } from './TaskPriorityBadge';
import { LabelBadge } from '@/features/label/components/LabelBadge';

/**
 * Task Card component.
 * Displays summary of task info (title, priority, labels, due date).
 * Click opens the TaskDetailModal.
 */
export const TaskCard = memo(function TaskCard({ taskId }) {
  const task = useBoardStore((s) => s.tasks[taskId]);
  const labels = useBoardStore(
    useShallow((s) => 
      task?.labelIds?.map(id => s.labels[id]).filter(Boolean) || []
    )
  );
  const { openTaskModal } = useModal();

  if (!task) return null;

  const isOverdue = task.dueDate && isPast(new Date(task.dueDate)) && !isToday(new Date(task.dueDate));

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      whileTap={{ scale: 0.98 }}
      onClick={() => openTaskModal(taskId)}
      className="group bg-surface-base border border-slate-700/50 hover:border-indigo-500/50 p-4 rounded-2xl shadow-sm hover:shadow-xl hover:shadow-indigo-500/10 cursor-pointer transition-colors h-full flex flex-col"
    >
      {/* Labels */}
      <div className="flex gap-2 mb-3 flex-wrap">
        {labels.slice(0, 3).map((label) => (
          <LabelBadge key={label.id} label={label} />
        ))}
        {labels.length > 3 && (
          <span className="text-[10px] text-slate-500 font-bold px-1.5 self-center">
            +{labels.length - 3}
          </span>
        )}
      </div>

      {/* Task Title */}
      <h3 className="text-sm font-semibold text-slate-100 group-hover:text-indigo-400 transition-colors mb-4 line-clamp-2 leading-relaxed">
        {task.title}
      </h3>

      {/* Footer: Priority & Due Date */}
      <div className="flex items-center justify-between mt-auto pt-3 border-t border-slate-700/30">
        <TaskPriorityBadge priority={task.priority} />
        
        {task.dueDate && (
          <div className={`flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-tight ${isOverdue ? 'text-rose-400' : 'text-slate-500'}`}>
            <span>📅</span>
            {isToday(new Date(task.dueDate)) 
              ? 'Today' 
              : formatDistanceToNow(new Date(task.dueDate), { addSuffix: true })}
          </div>
        )}
      </div>
    </motion.div>
  );
});
