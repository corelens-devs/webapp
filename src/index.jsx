
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './css/main.css'
import ErrorBoundary from './components/ErrorBoundary.jsx'

const legacyPathToHashRoute = {
  "/contact/account-deletion": "/account-deletion",
  "/account-deletion": "/account-deletion",
};

if (!window.location.hash) {
  const path = window.location.pathname.replace(/\/+$/, "") || "/";
  if (legacyPathToHashRoute[path]) {
    const target = `/#${legacyPathToHashRoute[path]}${window.location.search || ""}`;
    window.location.replace(target);
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
)
