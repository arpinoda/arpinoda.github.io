import React from 'react';
import PropTypes from 'prop-types';
import history, { previousFragment } from './History';
import { disableScrollAt, enableScroll, DESKTOP_BREAKPOINT } from '../util/UI';
import API from '../util/API';
import ProjectDetailSection from './ProjectDetailSection';
import NotFoundImage from '../static/images/public/not-found.jpg';
import { ClientError } from '../../../server/errors';
import ModalWindow from './ModalWindow';
import ResponsiveLayout from './ResponsiveLayout';

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
        const clientError = new ClientError(error);
        clientError.send();

        if (error.statusCode && error.statusCode === 401) {
          window.location.reload();
        }
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
    const { isLoading, media, errorMessage } = this.state;
    const desktopStyle = { top: '25px' };
    let content = null;

    if (media && !errorMessage) {
      content = media.map(m => <ProjectDetailSection key={m.item} media={m} />);
    } else if (errorMessage) {
      content = <img src={NotFoundImage} alt={errorMessage} />;
    }

    return (
      <ResponsiveLayout
        breakpoint={DESKTOP_BREAKPOINT}
        renderDesktop={() => (
          <ModalWindow
            style={desktopStyle}
            onCloseCallback={this.back}
            isLoading={isLoading}
          >
            {content}
          </ModalWindow>
        )}
        renderMobile={() => (
          <ModalWindow onCloseCallback={this.back} isLoading={isLoading}>
            {content}
          </ModalWindow>
        )}
      />
    );
  };
}

ProjectDetail.propTypes = {
  match: PropTypes.object,
};

export default ProjectDetail;
