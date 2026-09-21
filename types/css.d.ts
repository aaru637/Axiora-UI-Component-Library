// AI-ASSISTED: Cursor
// PROMPT: Add CSS module type declarations for side-effect imports
// ACCEPTED-BY: dhinesh

declare module "*.css" {
  const css: string;
  export default css;
}
