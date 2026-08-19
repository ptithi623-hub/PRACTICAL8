import React, { useState } from "react";

function Calculator() {
  const [display, setDisplay] = useState("0");
  const [history, setHistory] = useState("");

  const press = (value) => {

    // Clear
    if (value === "AC") {
      setDisplay("0");
      setHistory("");
      return;
    }

    // Backspace
    if (value === "⌫") {
      setDisplay(
        display.length > 1
          ? display.slice(0, -1)
          : "0"
      );
      return;
    }

    // Percentage
    if (value === "%") {
      try {
        const result = parseFloat(display) / 100;
        setDisplay(String(result));
      } catch {
        setDisplay("Error");
      }
      return;
    }

    // Calculate
    if (value === "=") {
      try {

        // Convert calculator symbols to JavaScript symbols
        let expression = display
          .replace(/×/g, "*")
          .replace(/÷/g, "/")
          .replace(/−/g, "-");

        const result = Function(
          `"use strict"; return (${expression})`
        )();

        setHistory(display + " =");
        setDisplay(String(result));

      } catch {
        setDisplay("Error");
      }

      return;
    }

    // If Error or 0, start new number
    if (display === "0" || display === "Error") {
      setDisplay(value);
    } else {
      setDisplay(display + value);
    }
  };

  const buttons = [
    ["AC", "⌫", "%", "÷"],
    ["7", "8", "9", "×"],
    ["4", "5", "6", "−"],
    ["1", "2", "3", "+"],
    [".", "0", "00", "="],
  ];

  return (
    <div className="page">

      <div className="orb orb1"></div>
      <div className="orb orb2"></div>
      <div className="orb orb3"></div>

      <div className="calculator">

        <div className="top">

          <div>
            <span>CALC / 01</span>
            <h1>CALCULATOR</h1>
          </div>

          <div className="dot">
            
          </div>

        </div>

        {/* Display */}

        <div className="display">

          <div className="history">
            {history || "READY TO CALCULATE"}
          </div>

          <div className="answer">
            {display}
          </div>

        </div>

        <div className="miniInfo">
          <span>SMART CALCULATOR</span>
          <span>● ONLINE</span>
        </div>

        {/* Buttons */}

        <div className="buttons">

          {buttons.flat().map((button, index) => {

            const isOperator =
              ["÷", "×", "−", "+"].includes(button);

            const isSpecial =
              ["AC", "⌫", "%"].includes(button);

            const isEqual =
              button === "=";

            return (
              <button
                key={index}
                onClick={() => press(button)}
                className={`
                  key
                  ${isOperator ? "operator" : ""}
                  ${isSpecial ? "special" : ""}
                  ${isEqual ? "equal" : ""}
                `}
              >
                {button}
              </button>
            );
          })}

        </div>

        <div className="bottom">

          <span>PRECISION</span>

          <div className="line">
            <div></div>
          </div>

          <span>v1.0</span>

        </div>

      </div>

      <style>{`

        * {
          box-sizing: border-box;
        }

        body {
          margin: 0;
          font-family: Arial, sans-serif;
        }

        .page {
          min-height: 100vh;

          display: flex;
          align-items: center;
          justify-content: center;

          position: relative;
          overflow: hidden;

          background:
            linear-gradient(
              135deg,
              #f8fbff,
              #ffffff,
              #f8f5ff
            );
        }

        .orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(2px);
          opacity: .65;

          animation: float 7s ease-in-out infinite;
        }

        .orb1 {
          width: 240px;
          height: 240px;

          background: #e4f3ff;

          left: -80px;
          top: -70px;
        }

        .orb2 {
          width: 190px;
          height: 190px;

          background: #eee7ff;

          right: -60px;
          bottom: -50px;

          animation-delay: 1s;
        }

        .orb3 {
          width: 75px;
          height: 75px;

          background: #e1f8ee;

          right: 20%;
          top: 15%;

          animation-delay: 2s;
        }

        @keyframes float {

          0%, 100% {
            transform: translateY(0);
          }

          50% {
            transform: translateY(-20px);
          }

        }

        .calculator {
          width: 360px;

          padding: 25px;

          position: relative;
          z-index: 5;

          background: rgba(255,255,255,.9);

          border: 1px solid #e8edf2;

          border-radius: 30px;

          box-shadow:
            0 30px 70px rgba(70,90,110,.14);

          backdrop-filter: blur(15px);
        }

        .top {
          display: flex;
          justify-content: space-between;
          align-items: center;

          margin-bottom: 20px;
        }

        .top span {
          color: #a1adb7;

          font-size: 7px;

          letter-spacing: 2px;
        }

        .top h1 {
          margin: 5px 0 0;

          color: #2d4051;

          font-size: 23px;
        }

        .dot {
          width: 42px;
          height: 42px;

          display: flex;
          align-items: center;
          justify-content: center;

          border-radius: 13px;

          background:
            linear-gradient(
              135deg,
              #e8f4ff,
              #f1eaff
            );

          color: #7698b4;

          font-size: 19px;
        }

        .display {
          min-height: 120px;

          padding: 20px;

          display: flex;
          flex-direction: column;
          justify-content: flex-end;

          text-align: right;

          border-radius: 20px;

          background: #f7fafc;

          border: 1px solid #e8edf1;

          overflow: hidden;
        }

        .history {
          min-height: 15px;

          color: #a4afb8;

          font-size: 8px;

          letter-spacing: 1px;
        }

        .answer {
          margin-top: 8px;

          color: #2e4152;

          font-size: 36px;

          font-weight: 600;

          white-space: nowrap;

          overflow-x: auto;
        }

        .miniInfo {
          display: flex;

          justify-content: space-between;

          padding: 13px 3px;

          color: #a1adb7;

          font-size: 6px;

          letter-spacing: 1.5px;
        }

        .miniInfo span:last-child {
          color: #68ae88;
        }

        .buttons {
          display: grid;

          grid-template-columns:
            repeat(4, 1fr);

          gap: 10px;
        }

        .key {
          height: 57px;

          border: none;

          border-radius: 15px;

          background: #f7f9fb;

          color: #455767;

          font-size: 15px;

          font-weight: 600;

          cursor: pointer;

          border: 1px solid #edf0f3;

          transition: .2s;
        }

        .key:hover {
          transform: translateY(-3px);

          background: white;

          box-shadow:
            0 8px 18px rgba(60,80,100,.1);
        }

        .key:active {
          transform: scale(.92);
        }

        .special {
          color: #7890a2;

          background: #f0f5f8;
        }

        .operator {
          background: #eef6ff;

          color: #6792b6;
        }

        .equal {
          background:
            linear-gradient(
              135deg,
              #779bb8,
              #8da7bd
            );

          color: white;

          border: none;
        }

        .bottom {
          display: flex;

          align-items: center;

          gap: 10px;

          margin-top: 20px;

          color: #a6b0b8;

          font-size: 6px;

          letter-spacing: 1.5px;
        }

        .line {
          flex: 1;

          height: 2px;

          background: #edf0f2;

          border-radius: 5px;
        }

        .line div {
          width: 35%;

          height: 100%;

          background: #a8bfd1;

          border-radius: 5px;
        }

        @media (max-width: 450px) {

          .calculator {
            width: 92%;
            padding: 20px;
          }

          .key {
            height: 53px;
          }

          .answer {
            font-size: 31px;
          }

        }

      `}</style>

    </div>
  );
}

export default Calculator;