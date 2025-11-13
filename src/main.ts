import './style.css'
import { init as initTs } from './template'
// Keep the JS template import on-demand if a consumer chooses to run it
import('./template.js').then(({ init: _initJs }) => {
  // Not called by default. Reference kept to avoid unused import errors.
})

// Optionally call `initTs()` on load by uncommenting below to make the app run automatically
document.addEventListener('DOMContentLoaded', () => {
  initTs()
})
