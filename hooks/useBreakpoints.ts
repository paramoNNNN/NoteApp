import { useMediaQuery } from 'react-responsive';

export const useBreakpoints = () => {
  // TailwindCSS breakpoints
  const isSmall = useMediaQuery({ query: '(min-width: 640px)' });
  const isMedium = useMediaQuery({ query: '(min-width: 768px)' });
  const isLarge = useMediaQuery({ query: '(min-width: 1024px)' });
  const isXLarge = useMediaQuery({ query: '(min-width: 1280px)' });
  const is2XLarge = useMediaQuery({ query: '(min-width: 1536px)' });

  return { isSmall, isMedium, isLarge, isXLarge, is2XLarge };
};
