import React from 'react';
import PropTypes from 'prop-types';
import history, { previousFragment } from './History';
import { disableScrollAt, enableScroll } from '../util/UI';
import API from '../util/API';
import ProjectDetailSection from './ProjectDetailSection';
import NotFoundImage from '../static/images/public/not-found.jpg';
import { CircularSpinner } from './Loading';

class ProjectDetail extends React.Component {
  constructor(props) {
    super(props);

    const { match } = this.props;

    this.state = {
      projectID: match.params.id,
      isLoading: true,
      media: null,
      errorMessage: '',
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

    disableScrollAt(this.scrollY);

    this.getDetails();
  }

  componentWillUnmount() {
    setTimeout(() => {
      enableScroll();
    }, 100);
  }

  getDetails = () => {
    const { projectID } = this.state;

    this.api.endpoints.project
      .getOne(projectID)
      .then(res => {
        if (!res.ok) {
          this.setState({ isLoading: false });
          throw Error(res.message);
        }
        return res.json();
      })
      .then(json => {
        this.setState({ media: json, isLoading: false });
      })
      .catch(error => {
        this.setState({ isLoading: false, errorMessage: error.message });
      });
  };

  back = e => {
    e.stopPropagation();
    const previousURL = previousFragment();

    if (previousURL !== '') {
      history.goBack();
    } else {
      // User likely landed on project detail page
      history.push('/');
      history.push('/');
      history.goBack();
    }
  };

  render = () => {
    this.scrollY = disableScrollAt(this.scrollY);
    const { setEventError } = this.props;
    const { isLoading, media, errorMessage } = this.state;

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
            background: 'rgba(0, 0, 0, 0.7)',
            WebkitAnimation: 'fadeIn .2s',
            animation: 'fadeIn .2s',
            MozAnimation: 'fadeIn .2s',
          }}
        />
        <CircularSpinner />
        <div
          className="modal"
          style={{
            display: isLoading ? 'none' : 'block',
            position: 'absolute',
            background: '#fff',
            top: 25,
            maxWidth: '885px',
            zIndex: 2,
            left: 0,
            right: 0,
            width: '100%',
            margin: '0 auto',
          }}
        >
          {media &&
            !errorMessage &&
            media.map(m => (
              <ProjectDetailSection
                setEventError={setEventError}
                key={m.item}
                media={m}
              />
            ))}
          {errorMessage && <img src={NotFoundImage} alt={errorMessage} />}
        </div>
      </>
    );
  };
}

ProjectDetail.propTypes = {
  match: PropTypes.object,
  setEventError: PropTypes.func,
};

export default ProjectDetail;
