import { useEffect, useRef, useState } from 'react';

/**
 * Custom hook for Intersection Observer to trigger animations when elements enter viewport
 * @param {Object} options - Intersection Observer options
 * @param {number} options.threshold - Threshold for intersection (0-1)
 * @param {string} options.rootMargin - Root margin for intersection
 * @returns {Array} [ref, isIntersecting] - Ref to attach to element and intersection state
 */
export const useIntersectionObserver = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasIntersected, setHasIntersected] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          setHasIntersected(true);
        } else {
          // Optional: reset animation on scroll out
          // setIsIntersecting(false);
        }
      },
      {
        threshold: options.threshold || 0.1,
        rootMargin: options.rootMargin || '0px',
      }
    );

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [options.threshold, options.rootMargin]);

  return [elementRef, isIntersecting, hasIntersected];
};

