import React, { useState } from "react";
import PropTypes from "prop-types";
import "./Authentication.css";

const Authentication = ({
  onLogin,
  onRegister,
  onGoogleLogin,
  onGuestLogin,
  onForgotPassword,
  onClose,
}) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);
      const res = onLogin(email, password);
      if (res && typeof res.then === "function") {
        await res;
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = () => onRegister(email, password);
  const handleGoogleLogin = () => onGoogleLogin();
  const handleGuestLogin = () => onGuestLogin();
  const handleForgotPassword = () => onForgotPassword(email);

  return (
    <div className="auth-modal__wrapper">
      <div className="auth-modal">
        <button
          className="auth-modal__close-btn"
          onClick={onClose}
          aria-label="Close modal"
          disabled={loading}
        >
          ✕
        </button>
        <div className="auth-modal-content" aria-busy={loading}>
          <div className="auth__title">
            {isLogin ? "Log in to Summarist" : "Register"}
          </div>

          {isLogin ? (
            <>
              <button
                className="btn guest__btn--wrapper"
                onClick={handleGuestLogin}
                disabled={loading}
              >
                <figure className="guest__icon--mask">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                    width="24"
                    height="24"
                    fill="currentColor"
                  >
                    <path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm-45.7 48C79.8 304 0 383.8 0 482.3c0 16.4 13.3 29.7 29.7 29.7H418.3c16.4 0 29.7-13.3 29.7-29.7 0-98.5-79.8-178.3-178.3-178.3h-91.4z" />
                  </svg>
                </figure>
                <div>Login as a Guest</div>
              </button>

              <div className="divider">
                <span className="divider__text">or</span>
              </div>

              <button
                className="btn google__btn--wrapper"
                onClick={handleGoogleLogin}
                disabled={loading}
              >
                <figure className="google__icon--mask">
                  <img alt="google" src="/assets/google.png" />
                </figure>
                <div>Login with Google</div>
              </button>

              <div className="divider">
                <span className="divider__text">or</span>
              </div>

              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />

              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
              />

              <button
                className="Login"
                onClick={handleLogin}
                disabled={loading}
              >
                {loading ? (
                  <span className="spinner" aria-hidden="true"></span>
                ) : (
                  "Login"
                )}
              </button>

              <button
                onClick={handleForgotPassword}
                className="forgot-password-btn"
                disabled={loading}
              >
                Forgot your password?
              </button>
            </>
          ) : (
            <button onClick={handleRegister} disabled={loading}>
              Register
            </button>
          )}

          <button
            className="auth__switch--btn"
            onClick={() => !loading && setIsLogin(!isLogin)}
          >
            {isLogin
              ? "Don't have an account? Register"
              : "Already have an account? Login"}
          </button>
        </div>
      </div>
    </div>
  );
};

Authentication.propTypes = {
  onLogin: PropTypes.func.isRequired,
  onRegister: PropTypes.func.isRequired,
  onGoogleLogin: PropTypes.func.isRequired,
  onGuestLogin: PropTypes.func.isRequired,
  onForgotPassword: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Authentication;
