import { formatDistanceToNow, format } from 'date-fns';

/**
 * Formats a date to a relative string (e.g., "3 days ago").
 * @param {number|Date} date - The date to format.
 * @returns {string} The relative date string.
 */
export const formatRelativeDate = (date) => {
  if (!date) return '';
  return formatDistanceToNow(new Date(date), { addSuffix: true });
};

/**
 * Formats a date to a standard short string (e.g., "Jan 20").
 * @param {number|Date} date - The date to format.
 * @returns {string} The formatted date string.
 */
export const formatShortDate = (date) => {
  if (!date) return '';
  return format(new Date(date), 'MMM d');
};

/**
 * Checks if a date is overdue.
 * @param {number|Date} date - The date to check.
 * @returns {boolean} True if the date is in the past.
 */
export const isOverdue = (date) => {
  if (!date) return false;
  return new Date(date) < new Date();
};
