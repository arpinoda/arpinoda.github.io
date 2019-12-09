// import React from 'react';
// import PropTypes from 'prop-types';

// import VideoSpinner from './VideoSpinner';

// const GridProjectDesktop = (props) => {
//   const [hoverRef, hovered] = useHover(false);
//   const [isBuffering, setIsBuffering] = useState(false);
//   const [forceHide, setForceHide] = useState(false);
//   const videoRef = useRef();

//   let component = null;

//   const isVideo = project.media.video !== undefined;
//   const HIDE_VIDEO_SNIPPET_SECONDS = 4;

//   useEffect(() => {
//     if (hovered && isVideo) {
//       let value = 0;
//       const interval = setInterval(() => {
//         value += 1;

//         if (value === HIDE_VIDEO_SNIPPET_SECONDS) {
//           setForceHide(true);
//         }
//       }, 1000);
//       return () => {
//         clearInterval(interval);
//       };
//     }
//     return () => {
//       setForceHide(false);
//       setIsBuffering(false);
//     };
//   }, [hovered]);

//   function togglePlayPause() {
//     if (hovered) {
//       videoRef.current.play().catch(err => alert(err));
//     } else {
//       videoRef.current.pause();
//       videoRef.current.currentTime = 0;
//     }
//   }

//   if (videoRef.current) {
//     togglePlayPause();
//   }

//   if (isVideo) {
//     component = (
//       <>
//         <ProjectVideo
//           ref={videoRef}
//           className={className}
//           project={project}
//           setIsBuffering={setIsBuffering}
//           isPlaying={hovered}
//         />
//         <VideoSpinner isHovering={hovered} isBuffering={isBuffering} />
//       </>
//     );
//   } else {
//     component = (
//       <ProjectImage
//         alt={project.title}
//         src={project.media.thumbnail}
//         className={className}
//       />
//     );
//   }

//   return (
//     <div ref={hoverRef}>
//       {component}
//       <GridProjectSnippet
//         isVisible={hovered}
//         forceHide={forceHide}
//         project={project}
//       />
//       <NavLink
//         to={`/project/${project.projectID}`}
//         className="absolute top-0 left-0 bottom-0 right-0 z2"
//       />
//     </div>
//   );
// };

// GridProjectDesktop.propTypes = {
//   project: PropTypes.object,
//   className: PropTypes.string,
// };

// export default GridProjectDesktop;
