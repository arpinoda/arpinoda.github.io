import React from 'react';

const withMediaLoader = OriginalComponent => {
  class MediaOuter extends React.Component {
    constructor(props) {
      super(props);
      this.state = {};
    }

    render() {
      return <OriginalComponent />;
    }
  }

  return MediaOuter;
};

export default withMediaLoader;
