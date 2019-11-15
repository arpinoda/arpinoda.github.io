import React from 'react';
import PropTypes from 'prop-types';
import { HASH_PREFIX } from '../util/UI';
import History from './History';

// TODO: Refactor to use WindowDimensions context

/**
 * Scroll spy functionality for a React component. Applies an 'active' css class to a navigation
 * element whose corresponding body content is focused on screen. OriginalComponent must have
 * a "scrollIDs" property containing element ID's.
 * Adapted from https://github.com/denislins/scrollmenu
 * @param {Object} OriginalComponent A react component to apply ScrollSpy functionality
 */
const withScrollSpy = OriginalComponent => {
  class ScrollSpy extends React.Component {
    constructor(props) {
      super(props);

      // Class name applied to active anchor elements
      this.ACTIVE_CLASS_NAME = 'active';

      // Padding added to recognize a section as active when scrolling
      this.ACTIVE_SCROLL_OFFSET = 150;

      this.state = {
        hasInitialized: false,
      };
    }

    componentDidMount() {
      this.tryinit();
    }

    componentWillUnmount() {
      this.unbindWindowEvents();
      this.unbindNavItems();
    }

    tryinit = () => {
      const { hasInitialized } = this.state;
      if (!hasInitialized) {
        const { scrollIDs } = this.props;

        if (scrollIDs.length !== 0) {
          this.domLoaded();
          this.setState({
            hasInitialized: true,
          });
        }
      }
    };

    domLoaded = () => {
      const { options, scrollIDs } = this.props;

      this.initDefaultOptions();
      this.extendOptions(options);
      this.initNavItems(scrollIDs);
      this.getSectionPositions();
      this.bindWindowEvents();
      this.bindNavItems();
      this.doInitialScroll();
    };

    initDefaultOptions = () => {
      this.options = {
        activeOffset: this.ACTIVE_SCROLL_OFFSET,
        urlPathName: '/',
      };
    };

    extendOptions = options => {
      if (!options) return;

      Object.keys(this.options).forEach(o => {
        if (options[0]) {
          this.options[o] = options[o];
        }
      });
    };

    initNavItems = scrollIDs => {
      // Looks up element in DOM by selector and stores result in this.items array.
      this.$nav = document.querySelector('nav');
      this.items = [];

      if (Array.isArray(scrollIDs) === false) {
        scrollIDs = [scrollIDs];
      }

      scrollIDs.forEach(selector => {
        const element = document.querySelector(`nav a[href='/#${selector}']`);
        this.items.push(element);
      });
    };

    doInitialScroll = () => {
      // Upon intitialization (page load), scrolls to section specified by href
      const { href } = window.location;

      // Use href to lookup item from collection
      const item = this.items.find(i => i.href === href);

      if (item) {
        item.classList.remove(this.ACTIVE_CLASS_NAME);
        setTimeout(() => {
          this.onNavItemClick({ target: item }); // "scroll" by calling click handler
        }, 200);
      }
    };

    getTargetOffset = item => {
      // Looks element up in dom and returns its offset top property.
      let selector = item.getAttribute('href');

      if (selector.match(/^#?$/)) {
        return 0;
      }
      selector = selector.substring(2);

      return document.getElementById(selector).offsetTop;
    };

    bindWindowEvents = () => {
      window.addEventListener('scroll', this.onWindowUpdate, false);
      window.addEventListener('resize', this.onWindowUpdate, false);
    };

    unbindWindowEvents = () => {
      document.body.removeEventListener('scroll', this.onWindowUpdate);
      window.removeEventListener('resize', this.onWindowUpdate);
    };

    bindNavItems = () => {
      // Hooks into anchor onclick event
      this.items.forEach(item => {
        item.addEventListener('click', this.onNavItemClick);
      });
    };

    unbindNavItems = () => {
      if (!this.items) {
        return;
      }

      this.items.forEach(item => {
        item.removeEventListener(
          'click',
          this.onNavItemClick.bind(this),
          false,
        );
      });
    };

    onNavItemClick = e => {
      // Looks up item in collection, sets result active, scrolls to
      // corresponding section.
      const { href } = e.target;
      const item = this.items.find(i => i.href === href);

      if (!item) return;

      this.changeActiveNavItem(item);
      const id = item.hash.replace(HASH_PREFIX, '');
      const $bodyTarget = document.getElementById(id);
      $bodyTarget.scrollIntoView();
    };

    updateLocationHash = href => {
      History.replace(href);
      this.setNavScrollPosition(href);
    };

    setNavScrollPosition = href => {
      // Scrolls side navigation as body is scrolled.
      const $list = this.$nav.querySelector('ul');
      const itemDepth = href.split('/').length - 1;

      switch (itemDepth) {
        case 1:
          // do nothing
          break;
        case 2:
          href = href.substring(0, href.lastIndexOf('/'));
          break;
        case 3:
          href = href.substring(0, href.lastIndexOf('/'));
          break;
        default:
      }

      const $target = document.querySelector(`a[href='${href}']`);
      $list.scrollTo(0, $target.offsetTop - 50);
    };

    onWindowUpdate = () => {
      if (window.location.pathname === this.options.urlPathName) {
        this.getSectionPositions();
        this.updateActiveNavItem();
      }
    };

    getSectionPositions = () => {
      this.positions = this.items.map(
        item => this.getTargetOffset(item) - this.options.activeOffset,
      );
    };

    updateActiveNavItem = () => {
      // Fired as the page is scrolled. Identifies the item that should be active.
      const scrolledDistance = this.getScrollOffset() + window.innerHeight;

      if (scrolledDistance === document.body.clientHeight) {
        this.changeActiveNavItem(this.items[this.items.length - 1]);
      } else {
        const filtered = this.items.filter(
          (item, index) => this.positions[index] <= this.getScrollOffset(),
        );

        if (filtered.length > 0) {
          const item = filtered[filtered.length - 1];
          this.changeActiveNavItem(item);
          this.changeActiveParentItem(item);
        } else {
          this.resetActiveNavItem();
          this.resetParentActiveNavItem();
        }
      }
    };

    getScrollOffset = () => document.body.scrollTop || window.pageYOffset;

    resetActiveNavItem = () => {
      this.items.forEach(item => {
        item.classList.remove(this.ACTIVE_CLASS_NAME);
      });
    };

    changeActiveNavItem = item => {
      if (!item.classList.contains(this.ACTIVE_CLASS_NAME)) {
        this.resetActiveNavItem();
        item.classList.add(this.ACTIVE_CLASS_NAME);
        this.updateLocationHash(item.getAttribute('href'));
      }
    };

    // TODO : Extract this and implement via callback
    resetParentActiveNavItem = () => {
      this.$nav.querySelectorAll('.has-active').forEach(item => {
        item.classList.remove('has-active');
      });
    };

    changeActiveParentItem = item => {
      const parentItem = item.closest('.root-section');

      if (parentItem) {
        if (!parentItem.classList.contains('.has-active')) {
          this.resetParentActiveNavItem();
          parentItem.classList.add('has-active');
        }
      } else {
        this.resetParentActiveNavItem();
      }
    };
    // --- End

    render() {
      return <OriginalComponent {...this.props} />;
    }
  }

  ScrollSpy.propTypes = {
    options: PropTypes.object,
    scrollIDs: PropTypes.array,
    children: PropTypes.node,
  };

  return ScrollSpy;
};

withScrollSpy.PropTypes = {
  OriginalComponent: PropTypes.element,
};

export default withScrollSpy;
