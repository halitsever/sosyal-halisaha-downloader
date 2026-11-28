import { defineConfig } from 'vitepress'
import { copyFileSync } from 'node:fs'
import { join } from 'node:path'

const site = 'https://projects.halit.org/sosyal-halisaha-downloader/'
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

/** BlogPosting and breadcrumbs for posts, FAQPage for any page that shows its FAQ. */
function pageJsonLd(fm: Record<string, any>, url: string) {
  const graph: object[] = []
  if (fm.date) {
    graph.push(
      {
        '@type': 'BlogPosting',
        headline: fm.headline ?? fm.title,
        description: fm.description,
        url,
        mainEntityOfPage: url,
        datePublished: fm.date,
        dateModified: fm.date,
        inLanguage: 'tr',
        image: `${site}og.png`,
        keywords: fm.keyword,
        author,
        publisher: author,
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name, item: site },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: `${site}blog/` },
          { '@type': 'ListItem', position: 3, name: fm.headline ?? fm.title, item: url },
        ],
      },
    )
  }
  if (fm.faq?.length) {
    graph.push({
      '@type': 'FAQPage',
      mainEntity: fm.faq.map((f: { q: string; a: string }) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a.replace(/<[^>]+>|`/g, '') },
      })),
    })
  }
  return graph.length ? { '@context': 'https://schema.org', '@graph': graph } : null
}

/** The home page and /en/ are the only pair that mirror each other. */
const alternates: Record<string, true> = { 'index.md': true, 'en/index.md': true }

export default defineConfig({
  /** llms.txt lives at the repo root, so the build copies it into the site instead of keeping a second copy. */
  buildEnd(siteConfig) {
    copyFileSync(join(siteConfig.root, '..', 'llms.txt'), join(siteConfig.outDir, 'llms.txt'))
  },
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
    /** Cloudflare Web Analytics, one token for every page on projects.halit.org. */
    ['script', { defer: '', src: 'https://static.cloudflareinsights.com/beacon.min.js', 'data-cf-beacon': '{"token": "dd7e54d3f48841c187d72d9dbb92a6b6"}' }],
    ['link', { rel: 'icon', href: '/sosyal-halisaha-downloader/favicon-32.png', sizes: '32x32', type: 'image/png' }],
    ['link', { rel: 'icon', href: '/sosyal-halisaha-downloader/favicon.svg', type: 'image/svg+xml' }],
    ['link', { rel: 'apple-touch-icon', href: '/sosyal-halisaha-downloader/apple-touch-icon.png' }],
    ['meta', { name: 'theme-color', content: '#072b1b' }],
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
      ['meta', { property: 'og:type', content: pageData.frontmatter.date ? 'article' : 'website' }],
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
    const ld = pageJsonLd(pageData.frontmatter, url)
    if (ld) pageData.frontmatter.head.push(['script', { type: 'application/ld+json' }, JSON.stringify(ld)])
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
          { text: 'Blog', link: '/blog/', activeMatch: '^/blog/' },
          { text: 'English', link: '/en/' },
        ],
        sidebar: {
          '/blog/': [
            {
              text: 'Blog',
              items: [
                { text: 'Tüm yazılar', link: '/blog/' },
                { text: 'Halı saha maç izle', link: '/blog/hali-saha-mac-izle' },
                { text: 'Telefona kaydetme', link: '/blog/videoyu-telefona-kaydetme' },
                { text: 'Maç özeti çıkarma', link: '/blog/hali-saha-mac-ozeti' },
                { text: 'localhost:3000', link: '/blog/localhost-3000' },
                { text: 'PM2 ile çalıştırma', link: '/blog/nodejs-uygulamasi-sunucuda-calistirma' },
                { text: 'Web scraping nedir', link: '/blog/web-scraping-nedir' },
                { text: 'Web scraping yasal mı', link: '/blog/web-scraping-yasal-mi' },
                { text: 'EJS şablonları', link: '/blog/ejs-sablon' },
                { text: 'Video sıkıştırma', link: '/blog/video-sikistirma' },
                { text: 'MP4 nedir', link: '/blog/mp4-nedir' },
                { text: 'Node.js nedir', link: '/blog/node-js-nedir' },
                { text: 'Axios nedir', link: '/blog/axios-nedir' },
                { text: 'Port nedir', link: '/blog/port-nedir' },
                { text: 'TypeScript nedir', link: '/blog/typescript-nedir' },
              ],
            },
            {
              text: 'Belgeler',
              items: [
                { text: 'Maç videoları', link: '/mac-videosu-kaydet/' },
                { text: 'Kurulum', link: '/kurulum' },
                { text: 'Nasıl kullanılır', link: '/nasil-kullanilir' },
              ],
            },
          ],
          '/': [
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
            {
              text: 'Daha fazlası',
              items: [
                { text: 'Maç videoları', link: '/mac-videosu-kaydet/' },
                { text: 'Blog', link: '/blog/' },
              ],
            },
          ],
        },
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
