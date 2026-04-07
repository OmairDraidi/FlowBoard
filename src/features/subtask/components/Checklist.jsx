import { useState, memo, useCallback } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { useBoardStore, selectSubtasksByTask, selectTaskProgress } from '@/store';
import { ChecklistItem } from './ChecklistItem';
import { ChecklistProgress } from './ChecklistProgress';
import { Input } from '@/components/ui/Input';

/**
 * Main Checklist feature component.
 * Manages the state and logic for a task's subtasks.
 */
export const Checklist = memo(function Checklist({ taskId }) {
  const [newTitle, setNewTitle] = useState('');

  const subtasks = useBoardStore(useShallow((s) => selectSubtasksByTask(s, taskId)));
  const progress = useBoardStore(useShallow((s) => selectTaskProgress(s, taskId)));
  
  const { addSubtask, updateSubtask, deleteSubtask, toggleSubtask } = useBoardStore(
    useShallow((s) => ({
      addSubtask: s.addSubtask,
      updateSubtask: s.updateSubtask,
      deleteSubtask: s.deleteSubtask,
      toggleSubtask: s.toggleSubtask,
    }))
  );

  const handleAddSubtask = useCallback(
    (e) => {
      e?.preventDefault();
      if (newTitle.trim()) {
        addSubtask(taskId, newTitle.trim());
        setNewTitle('');
      }
    },
    [taskId, newTitle, addSubtask]
  );

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleAddSubtask();
  };

  return (
    <div className="mt-8">
      <ChecklistProgress 
        completed={progress.completed} 
        total={progress.total} 
        percentage={progress.percentage} 
      />

      <div className="space-y-1 mb-4">
        {subtasks.map((subtask) => (
          <ChecklistItem
            key={subtask.id}
            subtask={subtask}
            onToggle={toggleSubtask}
            onUpdate={updateSubtask}
            onDelete={deleteSubtask}
          />
        ))}
      </div>

      <div className="pl-1">
        <Input
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Add a checklist item..."
          className="!bg-transparent !border-dashed !border-slate-800 hover:!border-slate-700 focus:!border-indigo-500/50 !text-sm"
        />
      </div>
    </div>
  );
});
