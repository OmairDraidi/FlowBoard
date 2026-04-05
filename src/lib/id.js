import { nanoid } from 'nanoid';

/**
 * Generates a unique ID with a prefix.
 * @param {string} prefix - The prefix for the ID (e.g., 'board', 'column', 'task').
 * @returns {string} A unique ID string.
 */
export const generateId = (prefix) => {
  return `${prefix}-${nanoid()}`;
};
