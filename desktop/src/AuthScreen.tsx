import { useState } from "react";

import {
  ArrowLeft,
  Code2,
  Eye,
  EyeOff,
  Lock,
  Mail,
  User,
} from "lucide-react";

type AuthMode = "login" | "signup";

type AuthScreenProps = {
  mode: AuthMode;
  onBack: () => void;
  onSuccess: (user: {
    name: string;
    email: string;
  }) => void;
};

export default function AuthScreen({
  mode,
  onBack,
  onSuccess,
}: AuthScreenProps) {
  const [authMode, setAuthMode] =
    useState<AuthMode>(mode);

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  const isLogin =
    authMode === "login";

  function switchMode() {
    setAuthMode(
      isLogin
        ? "signup"
        : "login"
    );

    setError("");
    setSuccess("");
    setPassword("");
  }

  function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError("");
    setSuccess("");

    /*
     * LOGIN
     */

    if (isLogin) {
      if (!email.trim()) {
        setError(
          "Please enter your email."
        );
        return;
      }

      if (!password) {
        setError(
          "Please enter your password."
        );
        return;
      }

      /*
       * Temporary local login.
       *
       * API will be connected later.
       */

      const loggedInUser = {
        name:
          email
            .trim()
            .split("@")[0] ||
          "Developer",

        email:
          email.trim(),
      };

      onSuccess(
        loggedInUser
      );

      return;
    }

    /*
     * SIGN UP
     */

    if (!name.trim()) {
      setError(
        "Please enter your name."
      );
      return;
    }

    if (!email.trim()) {
      setError(
        "Please enter your email."
      );
      return;
    }

    if (!password) {
      setError(
        "Please enter your password."
      );
      return;
    }

    if (password.length < 6) {
      setError(
        "Password must be at least 6 characters."
      );
      return;
    }

    /*
     * Temporary local signup.
     *
     * Real account creation will be
     * connected later.
     */

    setSuccess(
      "Account created successfully."
    );

    setTimeout(() => {
      setAuthMode("login");
      setPassword("");
      setSuccess(
        "Account created successfully. You can now sign in."
      );
    }, 500);
  }

  return (
    <main className="auth-screen">

      <div className="auth-container">

        {/* BACK */}

        <button
          type="button"
          className="auth-back"
          onClick={onBack}
        >
          <ArrowLeft
            size={16}
          />

          <span>
            Back to DevKit
          </span>
        </button>

        {/* AUTH CARD */}

        <div className="auth-card">

          {/* LOGO */}

          <div className="auth-logo">
            <Code2
              size={22}
            />
          </div>

          {/* HEADING */}

          <div className="auth-heading">

            <h1>
              {isLogin
                ? "Welcome back"
                : "Create your account"}
            </h1>

            <p>
              {isLogin
                ? "Sign in to continue to DevKit."
                : "Create your DevKit account and get started."}
            </p>

          </div>

          {/* FORM */}

          <form
            className="auth-form"
            onSubmit={
              handleSubmit
            }
          >

            {/* NAME */}

            {!isLogin && (
              <div className="auth-field">

                <label htmlFor="name">
                  Name
                </label>

                <div className="auth-input-wrapper">

                  <User
                    size={17}
                  />

                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(
                      event
                    ) =>
                      setName(
                        event.target.value
                      )
                    }
                    placeholder="Your name"
                    autoComplete="name"
                  />

                </div>

              </div>
            )}

            {/* EMAIL */}

            <div className="auth-field">

              <label htmlFor="email">
                Email
              </label>

              <div className="auth-input-wrapper">

                <Mail
                  size={17}
                />

                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(
                    event
                  ) =>
                    setEmail(
                      event.target.value
                    )
                  }
                  placeholder="you@example.com"
                  autoComplete="email"
                />

              </div>

            </div>

            {/* PASSWORD */}

            <div className="auth-field">

              <label htmlFor="password">
                Password
              </label>

              <div className="auth-input-wrapper">

                <Lock
                  size={17}
                />

                <input
                  id="password"
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  value={password}
                  onChange={(
                    event
                  ) =>
                    setPassword(
                      event.target.value
                    )
                  }
                  placeholder="••••••••"
                  autoComplete={
                    isLogin
                      ? "current-password"
                      : "new-password"
                  }
                />

                <button
                  type="button"
                  className="auth-password-toggle"
                  onClick={() =>
                    setShowPassword(
                      (current) =>
                        !current
                    )
                  }
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >
                  {showPassword ? (
                    <EyeOff
                      size={17}
                    />
                  ) : (
                    <Eye
                      size={17}
                    />
                  )}
                </button>

              </div>

            </div>

            {/* ERROR */}

            {error && (
              <div className="auth-error">
                {error}
              </div>
            )}

            {/* SUCCESS */}

            {success && (
              <div className="auth-success">
                {success}
              </div>
            )}

            {/* SUBMIT */}

            <button
              type="submit"
              className="auth-submit"
            >
              {isLogin
                ? "Sign in"
                : "Create account"}
            </button>

          </form>

          {/* SWITCH */}

          <div className="auth-switch">

            <span>
              {isLogin
                ? "Don't have an account?"
                : "Already have an account?"}
            </span>

            <button
              type="button"
              onClick={
                switchMode
              }
            >
              {isLogin
                ? "Create account"
                : "Sign in"}
            </button>

          </div>

          {/* TERMS */}

          <div className="auth-terms">
            By continuing, you agree to
            DevKit&apos;s terms and conditions.
          </div>

        </div>
      </div>

    </main>
  );
}