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
    const hi = document.documentElement.lang === "hi";
    if (this.state.failed)
      return (
        <main className="loading-screen">
          <Mia pose="face" />
          <h1>{hi ? "थोड़ा रुकें।" : "A small pause."}</h1>
          <p>
            {hi
              ? "यह पेज नहीं खुला। पहले से सेव की गई प्रगति को बदला नहीं गया है।"
              : "This screen could not open. Previously saved progress has not been changed."}
          </p>
          <button
            className="button green"
            onClick={() => window.location.reload()}
          >
            {hi ? "फिर खोलें" : "Try opening again"}
          </button>
        </main>
      );
    return this.props.children;
  }
}
