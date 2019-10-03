import React from 'react';
import PropTypes from 'prop-types';
import history, { previousFragment } from './History';
import { lockScroll, unlockScroll } from '../util/UI';

class ProjectDetail extends React.Component {
  constructor(props) {
    super(props);

    const { match } = this.props;

    this.state = {
      projectID: match.params.id,
      isLoading: true,
    };

    this.scrollY = null;
  }

  componentDidMount() {
    const { projectID } = this.state;

    console.log(`Fetching project: ${projectID}`);

    this.setState({
      isLoading: true,
    });

    lockScroll(this.scrollY);

    setTimeout(() => {
      this.setState({ isLoading: false });
    }, 1000);
  }

  back = e => {
    e.stopPropagation();
    const previousURL = previousFragment();

    if (previousURL !== '') {
      history.goBack();
      setTimeout(() => {
        unlockScroll();
      }, 100);
    } else {
      history.push('/');
      history.goBack();
      setTimeout(() => {
        history.goForward();
        unlockScroll();
      }, 100);
    }
  };

  render = () => {
    this.scrollY = lockScroll(this.scrollY);

    const { isLoading } = this.state;

    return (
      <div
        onClick={e => {
          this.back(e);
        }}
        role="presentation"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          zIndex: 1,
          background: 'rgba(0, 0, 0, 0.5)',
        }}
      >
        <div
          className="modal"
          style={{
            display: isLoading ? 'none' : 'block',
            position: 'absolute',
            background: '#fff',
            top: 25,
            left: '10%',
            right: '10%',
            bottom: '-10px',
            padding: 15,
            zIndex: 2,
            border: '2px solid #444',
          }}
        >
          <h1>
            Project
            {this.projectID}
          </h1>
          <button type="button" onClick={this.back}>
            Close
          </button>
        </div>
      </div>
    );
  };
}

ProjectDetail.propTypes = {
  match: PropTypes.object,
};

export default ProjectDetail;
