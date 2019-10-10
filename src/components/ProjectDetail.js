import React from 'react';
import PropTypes from 'prop-types';
import history, { previousFragment } from './History';
import { lockScroll, unlockScroll } from '../util/UI';
import API from '../util/API';

class ProjectDetail extends React.Component {
  constructor(props) {
    super(props);

    const { match } = this.props;

    this.state = {
      projectID: match.params.id,
      isLoading: true,
    };

    this.scrollY = null;

    this.api = new API({
      url: process.env.API_PATH,
    });

    this.api.createEntities([{ name: 'project' }]);
  }

  componentDidMount() {
    this.setState({
      isLoading: true,
    });

    lockScroll(this.scrollY);

    this.getDetails();
  }

  getDetails = () => {
    const { projectID } = this.state;

    this.api.endpoints.project
      .getOne(projectID)
      .then(res => {
        if (!res.ok) {
          throw Error(res.statusText);
        }
        return res.json();
      })
      .then(json => {
        console.log(json);
      })
      .catch(err => {
        console.log('getDetails error', err);
      });
  };

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
