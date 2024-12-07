import React from 'react';
import ReactDOM from 'react-dom';

const ConfirmDialog = ({ isOpen, message, onClose }) => {
  if (!isOpen) return null; // Don't render if dialog is closed

  return ReactDOM.createPortal(
    <div style={styles.overlay}>
      <div style={styles.dialog}>
        <p style={styles.message}>{message}</p>
        <div style={styles.buttons}>
          <button style={styles.confirmButton} onClick={() => onClose(true)}>
            Confirm
          </button>
          <button style={styles.cancelButton} onClick={() => onClose(false)}>
            Cancel
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  dialog: {
    background: 'white',
    borderRadius: '8px',
    padding: '20px',
    textAlign: 'center',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  message: {
    margin: '0 0 20px',
    fontSize: '18px',
  },
  buttons: {
    display: 'flex',
    justifyContent: 'space-around',
  },
  confirmButton: {
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  cancelButton: {
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default ConfirmDialog;
