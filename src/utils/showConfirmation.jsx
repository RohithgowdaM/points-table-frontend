import React from 'react';
import { createRoot } from 'react-dom/client';
import ConfirmDialog from './confirmDialog';

const showConfirmation = (message) => {
  return new Promise((resolve) => {
    const container = document.createElement('div');
    document.body.appendChild(container);

    const root = createRoot(container);

    const handleClose = (userResponse) => {
      root.unmount(); // Clean up the React component
      document.body.removeChild(container); // Remove the container
      resolve(userResponse); // Resolve the promise with the user's response
    };

    root.render(
      <ConfirmDialog
        isOpen={true}
        message={message}
        onClose={handleClose}
      />
    );
  });
};

export default showConfirmation;
