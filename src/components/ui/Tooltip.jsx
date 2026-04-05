import { useState, memo, useRef } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Simple Tooltip component for FlowBoard
 * Wraps any element and shows content on hover.
 */
export const Tooltip = memo(function Tooltip({
  content,
  children,
  position = 'top',
  delay = 0.3,
}) {
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef(null);

  const handleMouseEnter = () => {
    timeoutRef.current = setTimeout(() => setIsVisible(true), delay * 1000);
  };

  const handleMouseLeave = () => {
    clearTimeout(timeoutRef.current);
    setIsVisible(false);
  };

  const positionStyles = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.1 }}
            className={`
              absolute z-50 whitespace-nowrap px-3 py-1.5 text-xs bg-slate-900 
              text-slate-100 rounded-md shadow-lg pointer-events-none
              ${positionStyles[position]}
            `}
          >
            {content}
            {/* Arrow */}
            <div className={`
              absolute w-2 h-2 bg-slate-900 transform rotate-45
              ${position === 'top' ? 'top-full left-1/2 -translate-x-1/2 -translate-y-1/2' : ''}
              ${position === 'bottom' ? 'bottom-full left-1/2 -translate-x-1/2 translate-y-1/2' : ''}
              ${position === 'left' ? 'left-full top-1/2 -translate-y-1/2 -translate-x-1/2' : ''}
              ${position === 'right' ? 'right-full top-1/2 -translate-y-1/2 translate-x-1/2' : ''}
            `} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});
