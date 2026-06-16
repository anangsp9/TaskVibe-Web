import { Plus } from "lucide-react";
import styled from "styled-components";

function AddTaskButton({ onClick, className = "" }) {
  return (
    <StyledWrapper>
      <button type="button" onClick={onClick} className={`button ${className}`}>
        <span>Add Task</span>

        <div className="icon-wrapper">
          <Plus className="plus-icon" strokeWidth={2.5} />
        </div>
      </button>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .button {
    --main-size: 0.9rem;
    --color-text: #ffffff;
    --color-background: #4338ca;
    --color-background-hover: #4f46e5;
    --color-outline: rgba(79, 70, 229, 0.25);
    --color-shadow: rgba(0, 0, 0, 0.2);

    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.6rem;
    border: none;
    border-radius: 999px;
    font-family: inherit;
    font-weight: 500;
    color: var(--color-text);
    background: var(--color-background);
    box-shadow: 0 0 0.3em 0 var(--color-background);
    transition: all 0.3s ease;
  }

  .button:hover {
    background: var(--color-background-hover);
    box-shadow: 0 0 1em 0 var(--color-background);
    animation:
      ripple 1s linear infinite,
      colorize 1s infinite;
  }

  .button:active {
    transform: scale(0.96);
  }

  .button span {
    transition: 0.3s;
  }

  .button:hover span {
    text-shadow: 3px 3px 6px var(--color-shadow);
  }

  .plus-icon {
    width: 1em;
    height: 1em;
  }

  .icon-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.3s ease;
  }

  .button:hover .icon-wrapper {
    transform: rotate(90deg) scale(1.15);
    filter: drop-shadow(3px 3px 3px var(--color-shadow));
  }

  @keyframes colorize {
    0% {
      background: var(--color-background);
    }
    50% {
      background: var(--color-background-hover);
    }
    100% {
      background: var(--color-background);
    }
  }

  @keyframes ripple {
    0% {
      outline: 0em solid transparent;
      outline-offset: -0.1em;
    }
    50% {
      outline: 0.15em solid var(--color-outline);
      outline-offset: 0.15em;
    }
    100% {
      outline: 0.3em solid transparent;
      outline-offset: 0.3em;
    }
  }
`;

export default AddTaskButton;
