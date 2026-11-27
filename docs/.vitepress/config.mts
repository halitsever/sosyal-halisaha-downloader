import { defineConfig } from 'vitepress'

const site = 'https://halitsever.github.io/sosyal-halisaha-downloader/'
const name = 'Sosyal Halisaha Downloader'
const repo = 'https://github.com/halitsever/sosyal-halisaha-downloader'
const license = 'https://opensource.org/licenses/MIT'
const author = { '@type': 'Person', name: 'Halit Sever', url: 'https://github.com/halitsever' }

const description =
  'Halısaha maç videonu kendi bilgisayarında çalışan açık kaynak bir araçla indir. Maç bağlantısını yapıştır, kaydı önizle ve kaydet. Resmi bir araç değildir.'

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareSourceCode',
      '@id': `${site}#source`,
      name,
      description,
      url: site,
      image: `${site}og.png`,
      inLanguage: 'tr',
      codeRepository: repo,
      programmingLanguage: 'TypeScript',
      runtimePlatform: 'Node.js',
      license,
      author,
    },
  ],
}

/** The home page and /en/ are the only pair that mirror each other. */
const alternates: Record<string, true> = { 'index.md': true, 'en/index.md': true }

export default defineConfig({
  /** keeps the page hash map out of every page's HTML, which Semrush reads as a low text-to-HTML ratio */
  metaChunk: true,
  base: '/sosyal-halisaha-downloader/',
  lang: 'tr',
  title: name,
  titleTemplate: ':title',
  description,
  cleanUrls: true,
  appearance: 'force-dark',
  sitemap: { hostname: site },

  head: [
    /** Cloudflare Web Analytics, one token for every page on halitsever.github.io. */
    ['script', { defer: '', src: 'https://static.cloudflareinsights.com/beacon.min.js', 'data-cf-beacon': '{"token": "dd7e54d3f48841c187d72d9dbb92a6b6"}' }],
    ['link', { rel: 'icon', href: '/sosyal-halisaha-downloader/favicon-32.png', sizes: '32x32', type: 'image/png' }],
    ['link', { rel: 'icon', href: '/sosyal-halisaha-downloader/favicon.svg', type: 'image/svg+xml' }],
    ['link', { rel: 'apple-touch-icon', href: '/sosyal-halisaha-downloader/apple-touch-icon.png' }],
    ['meta', { name: 'theme-color', content: '#072b1b' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:site_name', content: name }],
    ['meta', { property: 'og:image', content: `${site}og.png` }],
    ['meta', { property: 'og:image:width', content: '1280' }],
    ['meta', { property: 'og:image:height', content: '640' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:image', content: `${site}og.png` }],
    ['script', { type: 'application/ld+json' }, JSON.stringify(jsonLd)],
  ],

  transformPageData(pageData) {
    const title = pageData.frontmatter.title ?? pageData.title
    const url = site + pageData.relativePath.replace(/(^|\/)index\.md$/, '$1').replace(/\.md$/, '')
    const english = pageData.relativePath.startsWith('en/')
    pageData.frontmatter.head ??= []
    pageData.frontmatter.head.push(
      ['link', { rel: 'canonical', href: url }],
      ['meta', { property: 'og:url', content: url }],
      ['meta', { property: 'og:title', content: title }],
      ['meta', { property: 'og:description', content: pageData.frontmatter.description ?? description }],
      ['meta', { property: 'og:locale', content: english ? 'en_US' : 'tr_TR' }],
    )
    if (alternates[pageData.relativePath]) {
      pageData.frontmatter.head.push(
        ['link', { rel: 'alternate', hreflang: 'tr', href: site }],
        ['link', { rel: 'alternate', hreflang: 'en', href: `${site}en/` }],
        ['link', { rel: 'alternate', hreflang: 'x-default', href: site }],
      )
    }
  },

  transformHtml(html) {
    return html.replace(/<meta name="generator"[^>]*>\s*/g, '')
  },

  markdown: {
    theme: 'github-dark-default',
    container: {
      tipLabel: 'İpucu',
      infoLabel: 'Bilgi',
      warningLabel: 'Dikkat',
      dangerLabel: 'Uyarı',
      detailsLabel: 'Ayrıntılar',
    },
  },

  locales: {
    root: {
      label: 'Türkçe',
      lang: 'tr',
      themeConfig: {
        nav: [
          { text: 'Kurulum', link: '/kurulum' },
          { text: 'Nasıl kullanılır', link: '/nasil-kullanilir' },
          { text: 'Nasıl çalışır', link: '/nasil-calisir' },
          { text: 'Sık sorulan sorular', link: '/sss' },
          { text: 'English', link: '/en/' },
        ],
        sidebar: [
          {
            text: 'Başlangıç',
            items: [
              { text: 'Kurulum', link: '/kurulum' },
              { text: 'Nasıl kullanılır', link: '/nasil-kullanilir' },
            ],
          },
          {
            text: 'Ayrıntılar',
            items: [
              { text: 'Nasıl çalışır', link: '/nasil-calisir' },
              { text: 'Sık sorulan sorular', link: '/sss' },
            ],
          },
        ],
        outline: { label: 'Bu sayfada' },
        docFooter: { prev: 'Önceki sayfa', next: 'Sonraki sayfa' },
        returnToTopLabel: 'Başa dön',
        sidebarMenuLabel: 'Menü',
        langMenuLabel: 'Dil seç',
        skipToContentLabel: 'İçeriğe geç',
        notFound: {
          title: 'Sayfa bulunamadı',
          quote: 'Aradığın sayfa taşınmış ya da hiç var olmamış olabilir.',
          linkLabel: 'Ana sayfaya dön',
          linkText: 'Ana sayfaya dön',
        },
      },
    },
    en: {
      label: 'English',
      lang: 'en',
      link: '/en/',
      description:
        'Unofficial, self-hosted Node.js web app (Express, EJS) for saving your own football match recordings. Not affiliated with sosyalhalisaha.com.',
      themeConfig: {
        nav: [
          { text: 'Türkçe', link: '/' },
        ],
        outline: { label: 'On this page' },
      },
    },
  },

  themeConfig: {
    logo: { src: '/logo.svg', alt: '', width: 24, height: 24 },
    // The English side is one page, so the switcher goes to each locale's root.
    i18nRouting: false,
    socialLinks: [{ icon: 'github', link: repo }],
  },
})
