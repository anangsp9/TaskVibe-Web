import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import styled from "styled-components";
import { motion } from "framer-motion";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const signUp = async () => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      alert(error.message);
      return;
    }

    alert("Account created!");
  };

  const login = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message);
      return;
    }

    navigate("/", { replace: true });
  };

  return (
    <StyledWrapper>
      <div className="login-page">
        <motion.div
          className="wrapper"
          initial={{ opacity: 0, y: 25, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: 0.5,
            ease: "easeOut",
          }}
        >
          <div className="card-switch">
            <label className="switch">
              <input type="checkbox" className="toggle" />
              <span className="slider" />
              <span className="card-side" />

              <div className="flip-card__inner">
                {/* Front - Login */}
                <div className="flip-card__front">
                  <div className="title">Log In</div>

                  <form
                    className="flip-card__form"
                    onSubmit={(e) => e.preventDefault()}
                  >
                    <input
                      className="flip-card__input"
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />

                    <input
                      className="flip-card__input"
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />

                    <button
                      type="button"
                      className="flip-card__btn"
                      onClick={login}
                    >
                      Log In
                    </button>
                  </form>
                </div>

                {/* Back - Sign Up */}
                <div className="flip-card__back">
                  <div className="title">Sign Up</div>

                  <form
                    className="flip-card__form"
                    onSubmit={(e) => e.preventDefault()}
                  >
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
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />

                    <input
                      className="flip-card__input"
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />

                    <button
                      type="button"
                      className="flip-card__btn"
                      onClick={signUp}
                    >
                      Sign Up
                    </button>
                  </form>
                </div>
              </div>
            </label>
          </div>
        </motion.div>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .login-page {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background:
      radial-gradient(
        circle at top left,
        rgba(99, 102, 241, 0.12),
        transparent 30%
      ),
      radial-gradient(
        circle at bottom right,
        rgba(79, 70, 229, 0.1),
        transparent 30%
      ),
      #f9f9ff;
    padding: 20px;
    overflow: hidden;
  }

  .wrapper {
    --input-focus: #4f46e5;
    --font-color: #323232;
    --font-color-sub: #6b7280;
    --bg-color: #ffffff;
    --main-color: #323232;
  }

  .card-switch {
    width: 360px;
    height: 520px; /* sebelumnya 460px */
    position: relative;
    padding-top: 60px; /* ruang untuk switch */
    box-sizing: border-box;
  }

  .switch {
    position: relative;
    width: 100%;
    height: 100%;
    display: block;
  }

  .toggle {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .card-side::before {
    position: absolute;
    content: "Log in";
    left: 50px;
    top: -10px;
    width: 100px;
    text-decoration: underline;
    color: var(--font-color);
    font-weight: 700;
    font-size: 15px;
  }

  .card-side::after {
    position: absolute;
    content: "Sign up";
    right: 40px;
    top: -10px;
    width: 100px;
    text-decoration: none;
    color: var(--font-color);
    font-weight: 700;
    font-size: 15px;
  }

  .toggle:checked ~ .card-side::before {
    text-decoration: none;
  }

  .toggle:checked ~ .card-side::after {
    text-decoration: underline;
  }

  .slider {
    position: absolute;
    top: -10px;
    left: 50%;
    width: 50px;
    height: 20px;
    transform: translateX(-50%);

    cursor: pointer;
    border: 2px solid var(--main-color);
    border-radius: 8px;
    background: white;
    box-shadow: 4px 4px var(--main-color);
    transition: 0.3s;
    z-index: 10;
  }

  .slider::before {
    content: "";
    position: absolute;
    width: 20px;
    height: 20px;
    left: -2px;
    bottom: 2px;
    border-radius: 6px;
    border: 2px solid var(--main-color);
    background: white;
    box-shadow: 0 3px 0 var(--main-color);
    transition: 0.3s;
  }

  .toggle:checked + .slider {
    background: var(--input-focus);
  }

  .toggle:checked + .slider::before {
    transform: translateX(30px);
  }

  /* ===== Flip Card ===== */

  .flip-card__inner {
    position: relative;
    top: 0;
    width: 360px;
    height: 430px;
    text-align: center;
    transition: transform 0.7s ease;
    transform-style: preserve-3d;
  }

  .toggle:checked ~ .flip-card__inner {
    transform: rotateY(180deg);
  }

  .flip-card__front,
  .flip-card__back {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    box-sizing: border-box;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    padding: 32px;

    background: #ffffff;
    border-radius: 24px;
    border: 1px solid #e5e7eb;

    box-shadow:
      0 20px 50px rgba(79, 70, 229, 0.08),
      0 8px 20px rgba(0, 0, 0, 0.05);

    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;

    overflow: hidden;
  }

  .flip-card__back {
    transform: rotateY(180deg);
  }

  .title {
    margin-bottom: 30px;
    font-size: 2rem;
    font-weight: 700;
    color: #111827;
  }

  .flip-card__form {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  /* ===== Input ===== */

  .flip-card__input {
    width: 100%;
    max-width: 100%;
    height: 48px;
    padding: 0 16px;
    border: 1px solid #d1d5db;
    border-radius: 14px;
    background: #f8faff;
    color: #1f2937;
    font-size: 15px;
    font-weight: 500;
    outline: none;
    transition: all 0.2s ease;
    box-sizing: border-box;
  }

  .flip-card__input::placeholder {
    color: #9ca3af;
  }

  .flip-card__input:focus {
    border-color: #4f46e5;
    background: #ffffff;
    box-shadow: 0 0 0 4px rgba(79, 70, 229, 0.12);
  }

  .flip-card__input:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  /* ===== Button ===== */

  .flip-card__btn {
    margin-top: 10px;
    width: 100%;
    height: 48px;
    border: none;
    border-radius: 14px;
    background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
    color: white;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.25s ease;
    box-shadow: 0 10px 25px rgba(79, 70, 229, 0.25);
  }

  .flip-card__btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 14px 30px rgba(79, 70, 229, 0.35);
  }

  .flip-card__btn:active {
    transform: scale(0.98);
  }
`;
