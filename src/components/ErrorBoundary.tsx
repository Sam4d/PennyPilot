import { Component } from "react";
import type { ReactNode } from "react";
import Mia from "./Mia";
export default class ErrorBoundary extends Component<
  { children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    if (this.state.failed)
      return (
        <main className="loading-screen">
          <Mia pose="face" />
          <h1>A small pause.</h1>
          <p>
            Penny Pilot couldn’t open this screen. Your saved learning is still
            on this device.
          </p>
          <button
            className="button green"
            onClick={() => window.location.reload()}
          >
            Try opening again
          </button>
        </main>
      );
    return this.props.children;
  }
}
