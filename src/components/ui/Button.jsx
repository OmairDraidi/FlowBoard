import { memo } from 'react';

/**
 * Universal Button component for FlowBoard
 * Supports primary, secondary, ghost, and danger variants.
 */
export const Button = memo(function Button({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  disabled = false,
  className = '',
  type = 'button',
  ...props
}) {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-200 rounded-lg active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100';
  
  const variants = {
    primary: 'bg-indigo-600 text-white hover:bg-indigo-500 shadow-lg shadow-indigo-500/20',
    secondary: 'bg-surface-bright text-slate-100 hover:bg-slate-700',
    ghost: 'bg-transparent text-slate-400 hover:text-slate-100 hover:bg-surface-bright',
    danger: 'bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white',
    outline: 'border border-slate-700 text-slate-300 hover:border-slate-500 hover:text-slate-100',
  };

  const sizes = {
    sm: 'px-2.5 py-1.5 text-xs gap-1.5',
    md: 'px-4 py-2 text-sm gap-2',
    lg: 'px-6 py-3 text-base gap-2.5',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {Icon && <Icon className={size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4'} />}
      {children}
    </button>
  );
});
