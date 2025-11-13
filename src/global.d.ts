// Custom global type declarations for Svelte + Vite TypeScript setup

declare module '*.svelte' {
  import type { SvelteComponentTyped } from 'svelte'
  export default class Component extends SvelteComponentTyped<any, any, any> {}
}

// Svelte runtime helpers (Svelte 5 features such as $state) may not be
// recognized by TypeScript automatically; declare as `any` to avoid errors.
declare const $state: any
