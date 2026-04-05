export const PRIORITIES = {
  NONE: 'none',
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  URGENT: 'urgent',
};

export const PRIORITY_CONFIG = {
  [PRIORITIES.NONE]: { label: 'None', color: 'bg-slate-500', dot: 'bg-slate-400' },
  [PRIORITIES.LOW]: { label: 'Low', color: 'bg-blue-500', dot: 'bg-blue-400' },
  [PRIORITIES.MEDIUM]: { label: 'Medium', color: 'bg-yellow-500', dot: 'bg-yellow-400' },
  [PRIORITIES.HIGH]: { label: 'High', color: 'bg-orange-500', dot: 'bg-orange-400' },
  [PRIORITIES.URGENT]: { label: 'Urgent', color: 'bg-red-500', dot: 'bg-red-400' },
};

export const DEFAULT_COLUMNS = [
  { title: 'Backlog', color: '#6366f1' }, // Indigo
  { title: 'In Progress', color: '#f59e0b' }, // Amber
  { title: 'In Review', color: '#8b5cf6' }, // Purple
  { title: 'Done', color: '#22c55e' }, // Green
];

export const THEME_COLORS = {
  SURFACE: '#131319',
  SURFACE_LOW: '#1b1b21',
  SURFACE_LOWER: '#111116',
  SURFACE_BRIGHT: '#393840',
  PRIMARY: '#c0c1ff',
  TEXT_PRIMARY: '#f1f5f9',
  TEXT_MUTED: '#64748b',
};
