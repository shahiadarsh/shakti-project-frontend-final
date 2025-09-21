import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

// Import the Redux store
import { store } from './app/store';

// Import the main App component
import App from './App';

// Import your global styles (assuming you named it main.css as we discussed)
import './index.css';

// Get the root DOM element
const container = document.getElementById('root');

// Ensure the container element exists before proceeding
if (container) {
  // Create a root for the React application
  const root = createRoot(container);

  // Render the entire application
  root.render(
    <React.StrictMode>
      {/* 
        1. The <Provider> component makes the Redux store available to any
           nested components that need to access the Redux store.
      */}
      <Provider store={store}>
        {/* 
          2. The <BrowserRouter> component enables client-side routing
             for your entire application.
        */}
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </React.StrictMode>
  );
} else {
  // Log an error if the root element isn't found in your index.html
  console.error("Failed to find the root element. Make sure your public/index.html has an element with id='root'.");
}