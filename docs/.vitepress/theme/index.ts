import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import { h } from 'vue'
// Geist is the face the app itself uses. Barlow Condensed carries the scoreboard figures.
import '@fontsource-variable/geist'
import '@fontsource-variable/geist-mono'
import '@fontsource/barlow-condensed/500.css'
import '@fontsource/barlow-condensed/600.css'
import '@fontsource/barlow-condensed/700.css'
import './custom.css'
import Landing from './Landing.vue'
import PitchFooter from './PitchFooter.vue'

export default {
  extends: DefaultTheme,
  Layout: () =>
    h(DefaultTheme.Layout, null, {
      // Doc pages have a sidebar, where the stock footer never renders.
      'doc-after': () => h(PitchFooter, { compact: true }),
    }),
  enhanceApp({ app }) {
    app.component('Landing', Landing)
  },
} satisfies Theme
