import "hono";

// Add properties to the ContextRenderer
declare module "hono" {
  interface ContextRenderer {
    // eslint-disable-next-line @typescript-eslint/prefer-function-type
    (content: string, props: { title: string, enableNavbar: boolean, loggedIn: boolean }): Response;
  }
}


// For JSX to recognize _Hyperscript
declare namespace JSX {
  interface HtmlTag {
    _?: string;
  }
}
