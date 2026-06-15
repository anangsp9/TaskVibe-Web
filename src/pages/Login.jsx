import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, registerUser } from "../services/authService";
import { StyledWrapper } from "../styles/Login.styles";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

export default function Login() {
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const [signUpForm, setSignUpForm] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const { error } = await loginUser(loginForm.email, loginForm.password);

      if (error) {
        toast.error(error.message);
        return;
      }

      navigate("/", { replace: true });
    } catch (err) {
      toast.error(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const { error } = await registerUser(
        signUpForm.email,
        signUpForm.password,
      );

      if (error) {
        toast.error(error.message);
        return;
      }

      toast.success("Account created! Check your email.");
    } catch (err) {
      toast.error(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <StyledWrapper>
      <div
        className="
    min-h-dvh
    flex
    items-center
    justify-center
    px-4
    py-6
    overflow-hidden
  "
        style={{
          background: `
      radial-gradient(circle at top left, rgba(99,102,241,0.12), transparent 30%),
      radial-gradient(circle at bottom right, rgba(79,70,229,0.1), transparent 30%),
      #f9f9ff
    `,
        }}
      >
        <motion.div
          className="wrapper w-full max-w-[320px] sm:max-w-[360px] md:max-w-[380px]"
          initial={{ opacity: 0, y: 25, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: 0.5,
            ease: "easeOut",
          }}
        >
          <div className="card-switch">
            <input id="auth-toggle" type="checkbox" className="toggle" />
            <label htmlFor="auth-toggle" className="switch">
              <span className="slider" />
              <span className="card-side" />
            </label>

            <div className="flip-card__inner">
              {/* Front - Login */}
              <div className="flip-card__front">
                <div className="title">Log In</div>

                <form className="flip-card__form" onSubmit={handleLogin}>
                  <input
                    className="flip-card__input"
                    type="email"
                    placeholder="Email"
                    value={loginForm.email}
                    onChange={(e) =>
                      setLoginForm({
                        ...loginForm,
                        email: e.target.value,
                      })
                    }
                    required
                    autoComplete="email"
                    disabled={loading}
                  />

                  <input
                    className="flip-card__input"
                    type="password"
                    placeholder="Password"
                    value={loginForm.password}
                    onChange={(e) =>
                      setLoginForm({
                        ...loginForm,
                        password: e.target.value,
                      })
                    }
                    required
                    autoComplete="current-password"
                    disabled={loading}
                  />

                  <button
                    type="submit"
                    className="flip-card__btn"
                    disabled={loading}
                  >
                    {loading ? "Loading..." : "Log In"}
                  </button>
                </form>
              </div>

              {/* Back - Sign Up */}
              <div className="flip-card__back">
                <div className="title">Sign Up</div>

                <form className="flip-card__form" onSubmit={handleSignUp}>
                  <input
                    className="flip-card__input"
                    type="text"
                    placeholder="Name (Coming Soon)"
                    disabled
                  />

                  <input
                    className="flip-card__input"
                    type="email"
                    placeholder="Email"
                    value={signUpForm.email}
                    onChange={(e) =>
                      setSignUpForm({
                        ...signUpForm,
                        email: e.target.value,
                      })
                    }
                    required
                    autoComplete="email"
                    disabled={loading}
                  />

                  <input
                    className="flip-card__input"
                    type="password"
                    placeholder="Password"
                    value={signUpForm.password}
                    onChange={(e) =>
                      setSignUpForm({
                        ...signUpForm,
                        password: e.target.value,
                      })
                    }
                    required
                    autoComplete="new-password"
                    disabled={loading}
                  />

                  <button
                    type="submit"
                    className="flip-card__btn"
                    disabled={loading}
                  >
                    {loading ? "Loading..." : "Sign Up"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </StyledWrapper>
  );
}
