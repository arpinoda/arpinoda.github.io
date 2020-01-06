import React from 'react';
import ResponsiveLayout from './ResponsiveLayout';

const LoginWelcome = () => {
  const content = (
    <>
      <div className="h1 mb1 bold">
        Welcome
        <span className="h1" aria-label="Waving hand hello!" role="img">
          {' '}
          👋
        </span>
      </div>
      <div>Sign in with your passcode below.</div>
    </>
  );

  return (
    <ResponsiveLayout
      breakpoint={500}
      renderDesktop={() => (
        <div className="center" style={{ marginTop: 'calc(50vh - 200px)' }}>
          {content}
        </div>
      )}
      renderMobile={() => <div className="center mt3">{content}</div>}
    />
  );
};

export default LoginWelcome;
