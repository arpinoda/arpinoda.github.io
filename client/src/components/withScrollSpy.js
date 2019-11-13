import React from 'react';
import PropTypes from 'prop-types';
import { ACTIVE_SCROLL_OFFSET, HASH_PREFIX } from '../util/UI';
import History from './History';

// adapted from https://github.com/denislins/scrollmenu
const withScrollSpy = OriginalComponent => {
  class ScrollSpy extends React.Component {
    constructor(props) {
      super(props);
      this.props = props;
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
        const { selectors } = this.props;

        if (selectors.length !== 0) {
          this.domLoaded();
          this.setState({
            hasInitialized: true,
          });
        }
      }
    };

    domLoaded = () => {
      const { options, selectors } = this.props;

      this.initDefaultOptions();
      this.extendOptions(options);
      this.initNavItems(selectors);
      this.getSectionPositions();
      this.bindWindowEvents();
      this.bindNavItems();
      this.doInitialScroll();
    };

    initDefaultOptions = () => {
      this.options = {
        activeOffset: ACTIVE_SCROLL_OFFSET,
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

    initNavItems = selectors => {
      this.$nav = document.querySelector('nav');
      this.items = [];

      if (Array.isArray(selectors) === false) {
        selectors = [selectors];
      }

      selectors.forEach(selector => {
        const element = document.querySelector(`nav a[href='/#${selector}']`);
        this.items.push(element);
      });
    };

    doInitialScroll = () => {
      // NavLink will already match the url to side nav item and set active class
      const activeItem = this.items.find(item =>
        item.classList.contains('active'),
      );

      if (activeItem) {
        activeItem.classList.remove('active');
        this.onNavItemClick({ target: activeItem });
      }
    };

    getTargetOffset = item => {
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
      const { href } = e.target;
      const item = this.items.find(i => i.href === href);
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
      // if scrolled to the end of the page
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
        item.classList.remove('active');
      });
    };

    resetParentActiveNavItem = () => {
      this.$nav.querySelectorAll('.has-active').forEach(item => {
        item.classList.remove('has-active');
      });
    };

    changeActiveNavItem = item => {
      if (!item.classList.contains('active')) {
        this.resetActiveNavItem();
        item.classList.add('active');
        this.updateLocationHash(item.getAttribute('href'));
      }
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

    render() {
      return <OriginalComponent {...this.props} />;
    }
  }

  ScrollSpy.propTypes = {
    options: PropTypes.object,
    selectors: PropTypes.array,
    children: PropTypes.node,
  };

  return ScrollSpy;
};

withScrollSpy.PropTypes = {
  OriginalComponent: PropTypes.element,
};

export default withScrollSpy;
