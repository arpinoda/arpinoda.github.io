import { useState, useEffect, useRef } from 'react';

// Hover state hook
// Returns a tuple of [ref, hovered]
// - ref: A react ref that you need to assign to an element
// - hovered: A boolean, true if hovered and false otherwise

const useHover = () => {
  const [value, setValue] = useState(false);

  const ref = useRef(null);

  const handleMouseOver = () => setValue(true);
  const handleMouseOut = () => setValue(false);

  useEffect(() => {
    const node = ref.current;
    if (node) {
      node.addEventListener('mouseenter', handleMouseOver);
      node.addEventListener('mouseleave', handleMouseOut);

      return () => {
        node.removeEventListener('mouseenter', handleMouseOver);
        node.removeEventListener('mouseleave', handleMouseOut);
      };
    }

    return () => {};
  }, [ref.current]); // Recall only if ref changes

  return [ref, value];
};

export default useHover;
