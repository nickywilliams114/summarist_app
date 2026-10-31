import React, { useState } from "react";
import PropTypes from "prop-types";
import "./Authentication.css";

// Presentational modal. Every handler may return a promise that resolves to an
// error message (string) to show, or nothing on success.
const Authentication = ({
  onLogin,
  onRegister,
  onGoogleLogin,
  onGuestLogin,
  onForgotPassword,
  onClose,
}) => {
  // "login" | "register" | "forgot"
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const switchMode = (nextMode) => {
    if (loading) return;
    setMode(nextMode);
    setError("");
    setMessage("");
  };

  const runAction = async (action, successMessage) => {
    setLoading(true);
    setError("");
    setMessage("");
    try {
      const result = await action();
      if (result) {
        setError(result);
      } else if (successMessage) {
        setMessage(successMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (mode === "login") {
      runAction(() => onLogin(email, password));
    } else if (mode === "register") {
      runAction(() => onRegister(email, password));
    } else {
      runAction(
        () => onForgotPassword(email),
        "Password reset email sent! Check your inbox.",
      );
    }
  };

  const titles = {
    login: "Log in to Summarist",
    register: "Sign up to Summarist",
    forgot: "Reset your password",
  };
  const submitLabels = {
    login: "Login",
    register: "Sign up",
    forgot: "Send reset password link",
  };

  return (
    <div className="auth-modal__wrapper" onClick={onClose}>
      <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
        <button
          className="auth-modal__close-btn"
          onClick={onClose}
          aria-label="Close modal"
          disabled={loading}
        >
          ✕
        </button>
        <div className="auth-modal-content" aria-busy={loading}>
          <div className="auth__title">{titles[mode]}</div>

          {error && <div className="auth__error">{error}</div>}
          {message && <div className="auth__message">{message}</div>}

          {mode !== "forgot" && (
            <>
              {mode === "login" && (
                <>
                  <button
                    className="btn guest__btn--wrapper"
                    onClick={() => runAction(onGuestLogin)}
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
                </>
              )}

              <button
                className="btn google__btn--wrapper"
                onClick={() => runAction(onGoogleLogin)}
                disabled={loading}
              >
                <figure className="google__icon--mask">
                  <img alt="google" src="/assets/google.png" />
                </figure>
                <div>
                  {mode === "login" ? "Login with Google" : "Sign up with Google"}
                </div>
              </button>

              <div className="divider">
                <span className="divider__text">or</span>
              </div>
            </>
          )}

          <form className="auth__form" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />
            {mode !== "forgot" && (
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
              />
            )}
            <button className="Login" type="submit" disabled={loading}>
              {loading ? (
                <span className="spinner" aria-hidden="true"></span>
              ) : (
                submitLabels[mode]
              )}
            </button>
          </form>

          {mode === "login" && (
            <button
              onClick={() => switchMode("forgot")}
              className="forgot-password-btn"
              disabled={loading}
            >
              Forgot your password?
            </button>
          )}

          <button
            className="auth__switch--btn"
            onClick={() => switchMode(mode === "login" ? "register" : "login")}
          >
            {mode === "login"
              ? "Don't have an account?"
              : "Already have an account?"}
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
