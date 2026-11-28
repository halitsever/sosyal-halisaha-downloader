<script setup lang="ts">
import { withBase } from 'vitepress'
import PitchFooter from './PitchFooter.vue'

const repo = 'https://github.com/halitsever/sosyal-halisaha-downloader'

const board = [
  { label: 'Port', value: '3000' },
  { label: 'Node', value: '24 LTS' },
  { label: 'Dosya adı', value: 'match-record.mp4' },
  { label: 'Lisans', value: 'MIT' },
]

const events = [
  {
    minute: "1'",
    title: 'Depoyu al, paketleri kur',
    text: 'Proje bir Node.js uygulaması. Depoyu bilgisayarına indir ve bağımlılıkları kur.',
    code: 'git clone https://github.com/halitsever/sosyal-halisaha-downloader.git\ncd sosyal-halisaha-downloader\nnpm i',
  },
  {
    minute: "2'",
    title: 'Sunucuyu başlat',
    text: 'Derleme adımı yok. Node, TypeScript dosyalarını doğrudan çalıştırır. Bunun için Node 24 LTS gerekir.',
    code: 'npm start\n\n> node src/index.ts\nServer is running on 3000 port',
  },
  {
    minute: "3'",
    title: 'Maç bağlantısını yapıştır',
    text: 'Tarayıcıda uygulamayı aç ve maç sayfasının adresini Video URL alanına yapıştır. Adres https:// ile başlamalı.',
    code: 'http://localhost:3000',
  },
  {
    minute: "4'",
    title: 'Önizle ve indir',
    text: 'Video, başlığı ve yükleyenin adıyla birlikte açılır. Doğru kayıt olduğunu gördükten sonra Download düğmesine bas.',
    code: 'match-record.mp4',
  },
]

const reads = [
  { selector: '.video-player script', field: 'Video dosyasının adresi' },
  { selector: '.title h3', field: 'Maçın başlığı' },
  { selector: '.owner a', field: 'Videoyu yükleyen kişi' },
  { selector: 'picture img', field: 'Kapak görseli' },
]

const parserCode = `const scriptContent = document.querySelector(".video-player Script")?.innerHTML;
if (!scriptContent) return { error: "Script content not found" };

const match = RegExp(this.videoRegex).exec(scriptContent);
if (!match) return { error: "Video script not found" };

const pageTitle = document.querySelector(".title h3")?.textContent;
const videoOwner = document.querySelector(".owner a")?.textContent;
const thumbnail = (document.querySelector("picture img") as HTMLImageElement | null)?.src;`

const guides = [
  { link: '/kurulum', title: 'Kurulum', text: 'Node sürümü, komutlar ve port ayarı.' },
  { link: '/nasil-kullanilir', title: 'Nasıl kullanılır', text: 'Bağlantıyı yapıştırmaktan dosyayı kaydetmeye kadar, ekran görüntüleriyle.' },
  { link: '/nasil-calisir', title: 'Nasıl çalışır', text: 'Aracın maç sayfasında neye baktığı ve sayfa değişince neyin bozulduğu.' },
  { link: '/sss', title: 'Sık sorulan sorular', text: 'Resmi olup olmadığı, kimin videosunu indirebileceğin ve sık görülen hatalar.' },
  { link: '/mac-videosu-kaydet/', title: 'Maç videoları', text: 'Kendi maç kayıtlarını arşivlemek, düzenlemek ve yedeklemek.' },
  { link: '/blog/', title: 'Blog', text: 'Telefona kaydetme, maç özeti, localhost:3000, PM2 ve web scraping yazıları.' },
]
</script>

<template>
  <div class="lp">
    <section class="lp-hero">
      <div class="lp-wrap">
        <div class="lp-hero__top">
          <div class="lp-hero__copy">
            <h1>Halısaha maç videonu indir</h1>
            <p class="lp-lede">
              Kendi bilgisayarında ya da sunucunda çalışan küçük bir web uygulaması. Maç sayfasının bağlantısını
              yapıştırırsın, kaydı önizlersin ve dosyayı bilgisayarına kaydedersin.
            </p>
            <div class="lp-actions">
              <a class="lp-btn lp-btn--solid" :href="withBase('/kurulum')">Kurulumu gör</a>
              <a class="lp-btn lp-btn--line" :href="repo">
                <svg viewBox="0 0 16 16" width="18" height="18" aria-hidden="true">
                  <path
                    fill="currentColor"
                    d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"
                  />
                </svg>
                Kaynak kod
              </a>
            </div>
          </div>

          <div class="lp-hero__side">
            <dl class="lp-board">
              <div v-for="row in board" :key="row.label" class="lp-board__row">
                <dt>{{ row.label }}</dt>
                <dd>{{ row.value }}</dd>
              </div>
            </dl>
            <p class="lp-unofficial">
              <span class="card-mark" aria-hidden="true"></span>
              Bu araç resmi değildir, sosyalhalisaha.com ile bir bağlantısı yoktur.
            </p>
          </div>
        </div>

        <div class="lp-pitch">
          <svg class="lp-pitch__box" viewBox="0 0 110 280" aria-hidden="true">
            <path d="M0 20H82V260H0M0 92H30V188H0M82 104A42 42 0 0 1 82 176" />
            <circle class="spot" cx="56" cy="140" r="2.5" />
          </svg>

          <figure class="lp-half">
            <figcaption>
              <span class="lp-half__name">İlk yarı</span>
              <span class="lp-half__what">Maç sayfasının bağlantısını yapıştır</span>
            </figcaption>
            <img
              :src="withBase('/screenshots/home-card.png')"
              width="590"
              height="550"
              alt="Uygulamanın ana sayfası: Video URL alanı ve Download Video düğmesi"
            />
          </figure>

          <div class="lp-pitch__centre" aria-hidden="true">
            <svg viewBox="0 0 200 200">
              <circle cx="100" cy="100" r="98" />
            </svg>
            <img :src="withBase('/logo.svg')" width="34" height="34" alt="" />
          </div>

          <figure class="lp-half">
            <figcaption>
              <span class="lp-half__name">İkinci yarı</span>
              <span class="lp-half__what">Kaydı önizle ve indir</span>
            </figcaption>
            <img
              :src="withBase('/screenshots/download-card.png')"
              width="590"
              height="650"
              alt="İndirme sayfası: video önizlemesi, başlık, yükleyen ve Download düğmesi"
            />
          </figure>

          <svg class="lp-pitch__box lp-pitch__box--right" viewBox="0 0 110 280" aria-hidden="true">
            <path d="M0 20H82V260H0M0 92H30V188H0M82 104A42 42 0 0 1 82 176" />
            <circle class="spot" cx="56" cy="140" r="2.5" />
          </svg>
        </div>
      </div>
    </section>

    <section class="lp-section">
      <div class="lp-wrap">
        <h2>Kurulumdan indirmeye dört adım</h2>
        <p class="lp-intro">
          Uygulama senin makinende çalışır. Kayıt olmak ya da bir hesap açmak gerekmez, çünkü ortada bir servis yok.
        </p>
        <ol class="lp-events">
          <li v-for="event in events" :key="event.minute" class="lp-event">
            <span class="lp-event__minute">{{ event.minute }}</span>
            <div class="lp-event__body">
              <h3>{{ event.title }}</h3>
              <p>{{ event.text }}</p>
            </div>
            <pre class="lp-code"><code>{{ event.code }}</code></pre>
          </li>
        </ol>
      </div>
    </section>

    <section class="lp-section lp-section--lined">
      <div class="lp-wrap">
        <div class="lp-reads">
          <div>
            <h2>Araç maç sayfasında neye bakar</h2>
            <p class="lp-intro">
              Sunucu, verdiğin adresteki sayfayı bir kez indirir ve içinden dört şeyi okur. Video dosyası sunucudan
              geçmez, tarayıcın onu doğrudan kendi adresinden alır.
            </p>
          </div>
          <table class="lp-table">
            <thead>
              <tr>
                <th scope="col">Sayfadaki yer</th>
                <th scope="col">Okunan bilgi</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in reads" :key="row.selector">
                <td><code>{{ row.selector }}</code></td>
                <td>{{ row.field }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <figure class="lp-source">
          <figcaption>src/scraper/video.parser.ts</figcaption>
          <pre class="lp-code"><code>{{ parserCode }}</code></pre>
        </figure>
        <p class="lp-note">
          Bu yerler karşı sitenin sayfa yapısına bağlıdır. Sayfa değişirse indirme bozulur.
          <a :href="withBase('/nasil-calisir')">Ayrıntısı Nasıl çalışır sayfasında.</a>
        </p>
      </div>
    </section>

    <section class="lp-section lp-section--lined">
      <div class="lp-wrap lp-fair">
        <h2><span class="card-mark card-mark--big" aria-hidden="true"></span>Resmi bir araç değil</h2>
        <div class="lp-fair__text">
          <p>
            Bu proje sosyalhalisaha.com tarafından yapılmadı ve onunla bir bağlantısı yoktur. Eğitim ve kişisel
            kullanım için yazılmış açık kaynak bir örnektir. Ticari kullanım ya da içerik dağıtımı için değildir.
          </p>
          <p>
            Amacı, kendi oynadığın maçların herkese açık kayıtlarını arşivleyebilmen. Sana ait olmayan içeriği
            indirmek, paylaşmak ya da arşivlemek sitenin kullanım koşullarına, telif ve kişisel veri yasalarına
            aykırı olabilir.
            <a :href="withBase('/sss')">Sık sorulan sorularda daha fazlası var.</a>
          </p>
        </div>
      </div>
    </section>

    <section class="lp-section lp-section--lined">
      <div class="lp-wrap">
        <h2>Rehber</h2>
        <ul class="lp-guides">
          <li v-for="guide in guides" :key="guide.link">
            <a :href="withBase(guide.link)">
              <span class="lp-guides__title">{{ guide.title }}</span>
              <span class="lp-guides__text">{{ guide.text }}</span>
            </a>
          </li>
        </ul>
        <p class="lp-note">
          Developer and prefer English? <a :href="withBase('/en/')" hreflang="en">Read the English overview.</a>
        </p>
      </div>
    </section>

    <div class="lp-wrap">
      <PitchFooter />
    </div>
  </div>
</template>
