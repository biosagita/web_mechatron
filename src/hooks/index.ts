/**
 * Custom React Hooks for Mechatron Website
 * 
 * This file exports all custom hooks used throughout the application.
 */

export { useContent } from '@/context/ContentContext';
export { useAuth } from '@/context/AuthContext';

// Re-export for convenience
export * from './useLocalStorage';
export * from './useMediaQuery';
