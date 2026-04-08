import { memo, useState } from 'react';
import { useBoardStore } from '@/store';
import { PRIORITIES, PRIORITY_CONFIG } from '@/lib/constants';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Dropdown } from '@/components/ui/Dropdown';
import { LabelPicker } from '@/features/label/components/LabelPicker';
import { Checklist } from '@/features/subtask/components/Checklist';
import { RichTextEditor } from '@/components/ui/RichTextEditor';

/**
 * Task Form component.
 * Allows editing task title, description, priority, labels, and due date.
 */
export const TaskForm = memo(function TaskForm({ taskId, onClose }) {
  const task = useBoardStore((s) => s.tasks[taskId]);
  const updateTask = useBoardStore((s) => s.updateTask);
  const deleteTask = useBoardStore((s) => s.deleteTask);
  
  // Local state for immediate typing feedback
  const [title, setTitle] = useState(task?.title || '');
  const [description, setDescription] = useState(task?.description || '');

  if (!task) return null;

  const handleUpdate = (changes) => {
    updateTask(taskId, changes);
  };

  const toggleLabel = (labelId) => {
     const newLabels = task.labelIds.includes(labelId)
        ? task.labelIds.filter(id => id !== labelId)
        : [...task.labelIds, labelId];
     handleUpdate({ labelIds: newLabels });
  };

  const priorityItems = Object.values(PRIORITIES).map(p => ({
    label: PRIORITY_CONFIG[p].label,
    icon: () => <div className={`w-2 h-2 rounded-full ${PRIORITY_CONFIG[p].dot}`} />,
    onClick: () => handleUpdate({ priority: p })
  }));

  return (
    <div className="flex flex-col gap-8 max-w-2xl mx-auto py-4">
      {/* Title Field */}
      <div className="flex flex-col gap-2">
         <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
           Task Title
         </h4>
         <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={() => handleUpdate({ title })}
            className="!text-xl !font-bold !bg-transparent !border-transparent hover:!border-slate-700/50 focus:!border-indigo-500 !px-0"
         />
      </div>

      {/* Main Grid: Priority & Due Date */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
         {/* Priority Dropdown */}
         <div className="flex flex-col gap-2">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
               Priority
            </h4>
            <Dropdown
              trigger={
                <button className="flex items-center gap-3 px-4 py-2.5 bg-surface-bright/30 border border-slate-700/50 rounded-xl text-slate-200 hover:bg-surface-bright/50 transition-all text-sm font-medium">
                   <div className={`w-2 h-2 rounded-full ${PRIORITY_CONFIG[task.priority].dot}`} />
                   {PRIORITY_CONFIG[task.priority].label}
                   <span className="ml-auto text-slate-500">▼</span>
                </button>
              }
              items={priorityItems}
            />
         </div>

         {/* Due Date Picker (Native Input Wrapper) */}
         <div className="flex flex-col gap-2">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
               Due Date
            </h4>
            <Input
              type="date"
              value={task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : ''}
              onChange={(e) => handleUpdate({ dueDate: e.target.value ? new Date(e.target.value).getTime() : null })}
              className="!bg-surface-bright/30 !border-slate-700/50 !text-slate-200 !px-4 !py-2.5 !rounded-xl"
            />
         </div>
      </div>

      <div className="flex flex-col gap-2">
         <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
           Description
         </h4>
         <RichTextEditor
            value={description}
            onChange={setDescription}
            onBlur={(html) => handleUpdate({ description: html })}
         />
      </div>

      {/* Checklist Integration */}
      <Checklist taskId={taskId} />

      {/* Label Picker Integration */}
      <LabelPicker 
        selectedLabelIds={task.labelIds} 
        onToggleLabel={toggleLabel} 
      />

      {/* Dangerous Actions */}
      <div className="pt-6 border-t border-slate-700/50 flex justify-between items-center">
         <Button 
           variant="danger" 
           size="sm" 
           onClick={() => {
             if (confirm('Are you sure you want to delete this task?')) {
               deleteTask(taskId);
               onClose();
             }
           }}
         >
           Delete Task
         </Button>
         <Button 
           variant="secondary" 
           size="sm" 
           onClick={onClose}
         >
           Close
         </Button>
      </div>
    </div>
  );
});
