import React from 'react';
import PropTypes from 'prop-types';
import history, { previousFragment } from './History';
import { lockScroll, unlockScroll, getFileExtension } from '../util/UI';
import API from '../util/API';
import ProjectDetailImage from './ProjectDetailImage';

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
      .catch(err => {
        console.log('getDetails error', err);
      });
  };

  isVideo = filename => getFileExtension(filename) === 'mp4';

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
            maxWidth: 800,
            zIndex: 2,
            border: '2px solid #444',
            left: 0,
            right: 0,
            width: '100%',
            margin: '0 auto',
          }}
        >
          {media &&
            media.map(m => {
              if (this.isVideo(m.item)) {
                return 'its a video';
              }
              return <ProjectDetailImage key={m.item} media={m} />;
            })}
        </div>
      </div>
    );
  };
}

ProjectDetail.propTypes = {
  match: PropTypes.object,
};

export default ProjectDetail;
