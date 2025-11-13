import { mount } from 'svelte'
import App from './App.svelte'

const app = mount(App, {
  target: document.getElementById('app') as HTMLElement,
  props: {
    name: 'Svelte'
  }
})

export default app
