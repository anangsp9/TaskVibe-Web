import styled from "styled-components";

export default function Loader() {
  return (
    <StyledWrapper>
      <div className="terminal-loader">
        <div className="terminal-header">
          <div className="terminal-title">Status</div>

          <div className="terminal-controls">
            <div className="control close" />
            <div className="control minimize" />
            <div className="control maximize" />
          </div>
        </div>

        <div className="text">Loading...</div>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  @keyframes blinkCursor {
    50% {
      border-right-color: transparent;
    }
  }

  @keyframes typeAndDelete {
    0%,
    10% {
      width: 0;
    }

    45%,
    55% {
      width: 6.2em;
    }

    90%,
    100% {
      width: 0;
    }
  }

  .terminal-loader {
    border: 0.1em solid #333;
    background-color: #1a1a1a;
    color: #0f0;
    font-family: "Courier New", Courier, monospace;
    font-size: 1em;
    padding: 1.5em 1em;
    width: 12em;
    border-radius: 4px;
    overflow: hidden;
    position: relative;
    box-sizing: border-box;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
  }

  .terminal-header {
    position: absolute;
    inset: 0 0 auto 0;
    height: 1.5em;
    background: #333;
    padding: 0 0.4em;
    box-sizing: border-box;
  }

  .terminal-title {
    float: left;
    line-height: 1.5em;
    color: #eee;
  }

  .terminal-controls {
    float: right;
  }

  .control {
    display: inline-block;
    width: 0.6em;
    height: 0.6em;
    margin-left: 0.4em;
    border-radius: 50%;
    background: #777;
  }

  .close {
    background: #e33;
  }

  .minimize {
    background: #ee0;
  }

  .maximize {
    background: #0b0;
  }

  .text {
    display: inline-block;
    margin-top: 1.5em;
    white-space: nowrap;
    overflow: hidden;
    border-right: 0.2em solid #0f0;
    animation:
      typeAndDelete 4s steps(11) infinite,
      blinkCursor 0.5s step-end infinite alternate;
  }
`;