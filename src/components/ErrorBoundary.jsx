import { Component } from 'react';
import ErrorPage from '../pages/ErrorPage.jsx';

/**
 * ErrorBoundary
 * Wraps any subtree and catches unhandled React render / lifecycle errors.
 * When triggered it renders the 500 ErrorPage with a "Try Again" button
 * that resets the boundary and re-mounts the original children.
 */
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
    this.reset = this.reset.bind(this);
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // You can forward this to an error-tracking service (Sentry, etc.)
    console.error('[ErrorBoundary]', error, info.componentStack);
  }

  reset() {
    this.setState({ hasError: false });
  }

  render() {
    if (this.state.hasError) {
      return (
        <ErrorPage
          code={500}
          isReset={true}
          onReset={this.reset}
        />
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
