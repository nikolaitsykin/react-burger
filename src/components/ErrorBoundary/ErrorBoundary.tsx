import React, { ErrorInfo, ReactElement } from "react";

class ErrorBoundary extends React.Component {
  constructor(props: ReactElement) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // You can also log the error to an error reporting service
    console.log("An error has occured!", error, info);
  }

  render() {
    // @ts-ignore
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong</h1>;
    }
    // @ts-ignore
    return this.props.children;
  }
}

export default ErrorBoundary;
