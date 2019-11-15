import { useWindowDimensions } from './WindowDimensionsProvider';

/**
 * Reads the window's width from our dimension provider to determine which layout component
 * to render.
 * @param {number} breakpoint The width at which we will switch between mobile and desktop
 * @param {function} renderMobile Renders the mobile version of a component
 * @param {function} renderDesktop Renders the desktop version of a component
 */
const ResponsiveLayout = ({ breakpoint, renderMobile, renderDesktop }) => {
  const { width } = useWindowDimensions();
  return width > breakpoint ? renderDesktop() : renderMobile();
};

export default ResponsiveLayout;
