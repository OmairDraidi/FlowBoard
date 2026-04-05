import { memo } from 'react';

/**
 * Common Input component for FlowBoard
 * Includes focus states and basic styling for dark mode.
 */
export const Input = memo(function Input({
  value,
  onChange,
  placeholder,
  autoFocus = false,
  type = 'text',
  className = '',
  disabled = false,
  ...props
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      autoFocus={autoFocus}
      disabled={disabled}
      className={`
        w-full px-4 py-2 text-sm bg-surface-low border border-slate-700/50 
        text-slate-100 placeholder:text-slate-500 rounded-lg outline-none 
        focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 
        transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `}
      {...props}
    />
  );
});
