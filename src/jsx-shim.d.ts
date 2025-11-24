// Fallback JSX typing to avoid "no interface 'JSX.IntrinsicElements' exists" errors
// This is a safety net in case @types/react is not loaded in the editor/TS server.
// When React types are available, they will override this.
declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any;
  }
}


