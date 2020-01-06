import React from 'react';

const LoginWelcome = () => (
  <div className="center" style={{ paddingTop: 'calc(40vh - 135px)' }}>
    <div className="h1 mb1 bold">
      Welcome
      <span className="h1" aria-label="Waving hand hello!" role="img">
        {' '}
        👋
      </span>
    </div>
    <div>Sign in with your passcode below.</div>
  </div>
);

export default LoginWelcome;
