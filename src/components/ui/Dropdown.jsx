import { useState, useRef, useEffect, memo } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Shared Dropdown component for FlowBoard
 * Uses a trigger element and renders a menu with action items.
 */
export const Dropdown = memo(function Dropdown({
  trigger,
  items = [],
  onSelect,
  align = 'left',
  className = '',
}) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const handleSelect = (item) => {
    if (item.onClick) {
      item.onClick();
    } else if (onSelect) {
      onSelect(item.value);
    }
    setIsOpen(false);
  };

  return (
    <div className={`relative inline-block ${className}`} ref={containerRef}>
      <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
        {trigger}
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -5 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -5 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className={`
              absolute z-40 mt-2 min-w-[160px] bg-surface-low border border-slate-700/50 
              rounded-xl shadow-2xl overflow-hidden py-1.5
              ${align === 'right' ? 'right-0' : 'left-0'}
            `}
          >
            {items.map((item, idx) => (
              <button
                key={item.id || idx}
                onClick={() => handleSelect(item)}
                className={`
                  w-full flex items-center px-4 py-2 text-sm text-left transition-colors
                  ${item.variant === 'danger' 
                    ? 'text-red-400 hover:bg-red-500/10' 
                    : 'text-slate-300 hover:text-slate-100 hover:bg-surface-bright'}
                `}
              >
                {item.icon && <item.icon className="w-4 h-4 mr-2" />}
                {item.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});
