import React, { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state to show fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log error information to an error tracking service, like Sentry
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Fallback UI in case of error
      return (
        <div>
          <h2>Something went wrong. Please try again later.</h2>
        </div>
      );
    }

    // If no error, render children
    return this.props.children;
  }
}

export default ErrorBoundary;
