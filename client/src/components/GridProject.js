import React from 'react';
import PropTypes from 'prop-types';
import ResponsiveLayout from './ResponsiveLayout';
import GridProjectDesktop from './GridProjectDesktop';
import { LOADING_IMAGE } from '../util/UI';

/**
 * Represents one square tile on the Home screen
 */
const GridProject = ({ project }) => {
  const className = 'absolute left-0 top-0';

  return (
    <figure className="mr3 mb3 relative overflow-hidden">
      <img src={LOADING_IMAGE} alt="loading" className="loading col-12" />
      <ResponsiveLayout
        breakpoint={767}
        renderDesktop={() => (
          <GridProjectDesktop className={className} project={project} />
        )}
        renderMobile={() => (
          <GridProjectDesktop className={className} project={project} />
        )}
      />
    </figure>
  );
};

GridProject.propTypes = {
  project: PropTypes.object,
};

export default GridProject;

// class HomeGridProject extends React.Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       isHovering: false,
//       isVideoDownloaded: false,
//       isSnippetMinimized: false,
//     };
//   }

//   onMouseLeave = () => {
//     this.handleMouseHover(false);
//     setTimeout(() => {
//       this.setState({ isSnippetMinimized: false });
//     }, 500);
//   };

//   onMouseEnter = () => {
//     this.handleMouseHover(true);
//   };

//   handleMouseHover = val => {
//     this.setState({ isHovering: val });
//   };

//   videoDownloadCallback = () => {
//     this.setState({
//       isVideoDownloaded: true,
//     });
//   };

//   minimizeSnippet = val => {
//     this.setState({
//       isSnippetMinimized: val,
//     });
//   };

//   render = () => {
//     const { project } = this.props;
//     const { isHovering, isSnippetMinimized, isVideoDownloaded } = this.state;
//     const hasVideo = project.media.video !== undefined;
//     const mediaClassName = 'absolute left-0 top-0';
//     const { thumbnail } = project.media;

//     return (
//       <figure
//         className={`mr3 mb3 relative overflow-hidden ${isHovering ? 'active' : ''}`}
//         onMouseEnter={this.onMouseEnter}
//         onMouseLeave={this.onMouseLeave}
//       >
//         <img src={LOADING_IMAGE} alt="loading" className="loading col-12" />

//         {/* <NavLink
//           to={`/project/${project.projectID}`}
//           className="absolute top-0 left-0 bottom-0 right-0 z2"
//         /> */}

//         {hasVideo ? (
//           <HomeGridVideo
//             project={project}
//             isHovering={isHovering}
//             className={mediaClassName}
//             onMaxHover={this.minimizeSnippet}
//             onDownloadComplete={this.videoDownloadCallback}
//           />
//         ) : (
//           <ProjectImage
//             alt={project.title}
//             src={thumbnail}
//             className={mediaClassName}
//           />
//         )}

//         <HomeGridProjectSnippet
//           isHovering={isHovering}
//           isSnippetMinimized={isSnippetMinimized}
//           project={project}
//         />
//       </figure>
//     );
//   };
// }

// HomeGridProject.propTypes = {
//   project: PropTypes.object.isRequired,
// };

// export default HomeGridProject;
