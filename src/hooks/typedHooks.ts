import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import type { RootState, AppDispatch } from '../app/store';

/**
 * --- Custom Typed Hooks for Redux ---
 *
 * This file is essential for a clean TypeScript + Redux setup.
 * By creating these custom hooks, we avoid having to manually type
 * `useDispatch` and `useSelector` every time we use them in a component.
 */

// Create a typed version of the `useDispatch` hook.
// This ensures that any actions you dispatch are known to TypeScript.
export const useAppDispatch: () => AppDispatch = useDispatch;

// Create a typed version of the `useSelector` hook.
// This gives you full autocompletion and type-checking for your global Redux state.
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;