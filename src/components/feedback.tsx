"use client";

import { useEffect, useState } from "react";

export default function Feedback() {
  const FEEDBACK_WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbz46tqjxLBZ974pPCJIV9NUqpoFbUtRXS7uaO692lizvbB3EEtbbVvjkZPxi4DNJeuO/exec';
  const [visible, setVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [text, setText] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    function onScroll() {
      // Show button after user scrolls down 80px
      setVisible(window.scrollY > 80);
    }

    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function open() {
    setShowModal(true);
    setSubmitted(false);
    setText("");
  }

  function close() {
    setShowModal(false);
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    // Send feedback to Apps Script (fire-and-forget). Keep showing thanks locally.
    try {
      fetch(FEEDBACK_WEB_APP_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ feedback: text, anonymous: true }),
      }).catch(() => {
        // ignore network errors for no-cors opaque requests
      });
    } catch (err) {
      // silent
    }

    setSubmitted(true);
    setText("");
    setTimeout(() => setShowModal(false), 1200);
  }

  return (
    <>
      <button
        aria-label="Feedback"
        className={`feedback-button ${visible ? "feedback-visible" : ""}`}
        onClick={open}
      >
        Feedback
      </button>

      {showModal && (
        <div className="feedback-modal-backdrop" onClick={close}>
          <div className="feedback-modal" onClick={(e) => e.stopPropagation()}>
            {!submitted ? (
              <form onSubmit={submit} className="feedback-form">
                <h3>Send Feedback </h3>
                <p style={{ margin: '6px 0 12px', color: '#6b7280', fontSize: 13 }}>
                  Your feedback is anonymous
                </p>
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Tell us what you liked or what can be better..."
                  rows={6}
                  className="feedback-textarea"
                  required
                />
                <div className="feedback-actions">
                  <button type="button" className="btn secondary" onClick={close}>
                    Cancel
                  </button>
                  <button type="submit" className="btn primary">
                    Submit
                  </button>
                </div>
              </form>
            ) : (
              <div className="feedback-thanks">Thanks for the feedback!</div>
            )}
          </div>
        </div>
      )}
      <style jsx>{`
        .feedback-button {
          position: fixed;
          right: 18px;
          bottom: 18px;
          transform: translateY(80px);
          opacity: 0;
          transition: transform 200ms ease, opacity 200ms ease;
          z-index: 60;
          background: #111827;
          color: white;
          border: none;
          padding: 10px 14px;
          border-radius: 999px;
          box-shadow: 0 6px 18px rgba(17,24,39,0.2);
          cursor: pointer;
          font-weight: 600;
        }

        .feedback-visible {
          transform: translateY(0);
          opacity: 1;
        }

        .feedback-modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 70;
        }

        .feedback-modal {
          background: white;
          max-width: 720px;
          width: 92%;
          border-radius: 12px;
          padding: 20px;
          box-shadow: 0 10px 40px rgba(2,6,23,0.2);
        }

        .feedback-form h3 {
          margin: 0 0 8px 0;
          font-size: 18px;
        }

        .feedback-textarea {
          width: 100%;
          padding: 10px;
          border-radius: 8px;
          border: 1px solid #e5e7eb;
          resize: vertical;
          font-size: 14px;
        }

        .feedback-actions {
          display: flex;
          gap: 8px;
          justify-content: flex-end;
          margin-top: 12px;
        }

        .btn {
          border-radius: 8px;
          padding: 8px 12px;
          border: none;
          cursor: pointer;
        }

        .btn.primary {
          background: #111827;
          color: white;
        }

        .btn.secondary {
          background: #f3f4f6;
          color: #111827;
        }

        .feedback-thanks {
          text-align: center;
          padding: 28px 8px;
          font-size: 18px;
        }
      `}</style>
    </>
  );
}
