import React from 'react';
import PropTypes from 'prop-types';
import { ACTIVE_SCROLL_OFFSET } from '../util/UI';
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

    componentDidUpdate() {
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
        if (selectors !== undefined) {
          try {
            this.setState({
              hasInitialized: true,
            });
            this.domLoaded();
          } catch (err) {
            withScrollSpy.hasInitialized = false;
          }
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
      this.$nav = document.querySelector('nav ul');
      this.items = [];

      if (Array.isArray(selectors) === false) {
        selectors = [selectors];
      }

      selectors.forEach(selector => {
        const element = document.querySelector(`nav a[href='/#${selector}']`);
        this.items.push(element);
      });
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
      this.items.forEach(item => {
        item.removeEventListener(
          'click',
          this.onNavItemClick.bind(this),
          false,
        );
      });
    };

    onNavItemClick = () => {};

    updateLocationHash = href => {
      History.replace(href);
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
      // experimental
      // let percentage = 0;
      // if (this.getScrollOffset() !== 0) {
      //   percentage = scrolledDistance / this.container.clientHeight;
      // } else {
      //   percentage = this.getScrollOffset() / this.container.clientHeight;
      // }
      // percentage = this.getScrollOffset() / this.container.clientHeight;

      // this.$nav.scrollTop =
      //   percentage * (this.$nav.clientHeight - SCROLL_OFFSET * 3);

      // const activeNavSection = this.$nav.querySelector('.has-active');
      // if (!activeNavSection) return;

      // const navDistanceFromTop = activeNavSection.getBoundingClientRect().top;

      // const activeNavSectionAnchor = activeNavSection.querySelector('a');
      // if (!activeNavSectionAnchor) return;

      // const activeMainSectionID = activeNavSectionAnchor.getAttribute('href').replace('/#', '');
      // console.log(activeMainSectionID);

      // const activeMainSection = document.getElementById(activeMainSectionID);

      // const mainDistanceFromTop = activeMainSection.getBoundingClientRect().top;

      // if (mainDistanceFromTop <= navDistanceFromTop) {
      //   this.$nav.scrollTop = Math.abs(mainDistanceFromTop);
      // }

      // if .active resides in lower half of screen
      // scroll $nav so parent li of .active is 65px from top
      // ----
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
      return <OriginalComponent callback={this.initCallback} {...this.props} />;
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
