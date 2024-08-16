
import classNames from 'classnames';
import { twMerge } from 'tailwind-merge';

/**
 * Merges multiple class names into a single string.
 * 
 * @param classes - The class names to merge.
 * @returns The merged class names.
 */
export function cn(...classes: (string | undefined | null)[]): string {
  const filteredClasses = classes.filter(Boolean);
  
  return twMerge(classNames(...filteredClasses));
}
