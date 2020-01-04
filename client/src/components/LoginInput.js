/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import PropTypes from 'prop-types';
import { ARROW_RIGHT_IMAGE } from '../util/UI';

/**
 * An animated text input used exclusively for the login component
 * @param {Function} onSubmit Triggered when arrow button is clicked or enter key is pressed.
 * @param {Function} onChange Triggers when the input's value (content) changes.
 * @param {Function} onKeyPress Triggered every time a key is pressed while input has focus.
 * @param {Boolean} isSubmitVisible True if passcode's non-empty-space-length is > 0, else false.
 * @param {Boolean} isSubmitting True when onSubmit has not yet received a response, else false.
 */
const LoginInput = ({
  onSubmit,
  onChange,
  onKeyPress,
  isSubmitVisible,
  isSubmitting,
}) => {
  const onInputFocus = ev => {
    ev.target.parentNode.classList.add('input--filled');
  };

  const onInputBlur = ev => {
    if (ev.target.value.trim() === '') {
      ev.target.parentNode.classList.remove('input--filled');
    }
  };

  return (
    <span className="input input--nao">
      <input
        maxLength="17"
        onKeyPress={onKeyPress}
        onBlur={onInputBlur}
        onFocus={onInputFocus}
        onChange={onChange}
        className="input__field input__field--nao"
        type="text"
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
      />
      <label className="input__label input__label--nao">
        <span className="input__label-content input__label-content--nao">
          Passcode
        </span>
      </label>
      <button
        disabled={isSubmitting}
        type="button"
        style={{ backgroundColor: 'transparent' }}
        id="login-submit"
        onClick={onSubmit}
        className={`pl2 pb2 pt1 mt2 absolute right-0 border-none ${
          isSubmitVisible ? 'display-block' : 'display-none'
        } ${isSubmitting ? 'active' : ''}`}
      >
        <img src={ARROW_RIGHT_IMAGE} style={{ width: '22px' }} alt="submit" />
      </button>
      <svg
        className="graphic graphic--nao"
        width="300%"
        height="100%"
        viewBox="0 0 1200 60"
        preserveAspectRatio="none"
      >
        <path d="M0,56.5c0,0,298.666,0,399.333,0C448.336,56.5,513.994,46,597,46c77.327,0,135,10.5,200.999,10.5c95.996,0,402.001,0,402.001,0" />
      </svg>
    </span>
  );
};

LoginInput.propTypes = {
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
  onKeyPress: PropTypes.func,
  isSubmitVisible: PropTypes.bool,
  isSubmitting: PropTypes.bool,
};

export default LoginInput;
