import React from 'react';
import PropTypes from 'prop-types';
import withErrorHandler from './withErrorHandler';
import history, { previousFragment } from './History';
import { lockScroll, unlockScroll } from '../util/UI';
import API from '../util/API';
import ProjectDetailSection from './ProjectDetailSection';
import { ClientError, ErrorTypes } from '../models/Logging';

class ProjectDetail extends React.Component {
  constructor(props) {
    super(props);

    const { match } = this.props;

    this.state = {
      projectID: match.params.id,
      isLoading: true,
      media: null,
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
    const { setEventError } = this.props;

    this.api.endpoints.project
      .getOne(projectID)
      .then(res => {
        if (!res.ok) {
          this.setState({ isLoading: false });
          throw Error(res.statusText);
        }
        return res.json();
      })
      .then(json => {
        this.setState({ media: json, isLoading: false });
      })
      .catch(error => {
        if (error.name === 'ClientError') {
          setEventError(error);
        } else {
          const clientError = new ClientError(
            ErrorTypes.JsonError,
            `project detail id: ${projectID}`,
            error.message,
          );
          setEventError(clientError);
        }
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

    const { isLoading, media } = this.state;

    return (
      <>
        <div
          onClick={e => {
            this.back(e);
          }}
          role="presentation"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            zIndex: 1,
            background: 'rgba(0, 0, 0, 0.5)',
          }}
        />
        <div
          className="modal"
          style={{
            display: isLoading ? 'none' : 'block',
            position: 'absolute',
            background: '#fff',
            top: 25,
            maxWidth: 750,
            zIndex: 2,
            border: '2px solid #444',
            left: 0,
            right: 0,
            width: '100%',
            margin: '0 auto',
          }}
        >
          {media &&
            media.map(m => <ProjectDetailSection key={m.item} media={m} />)}
        </div>
      </>
    );
  };
}

ProjectDetail.propTypes = {
  match: PropTypes.object,
  setEventError: PropTypes.func,
};

export default withErrorHandler(ProjectDetail, false);
