---
title: "Axios Nedir? Node.js ile HTTP İsteği Örnekleri"
titleTemplate: false
description: "Axios nedir, nasıl kullanılır? Node.js'te GET isteği, axios.create ile ortak ayarlar, zaman aşımı, hata mesajları ve fetch farkı, gerçek proje örnekleriyle."
headline: "Axios ile HTTP isteği atmak: örnekler ve hata yönetimi"
date: "2026-11-28"
keyword: "axios nedir"
lang: "tr"
faq: [{"q": "Axios ne işe yarar?", "a": "Bir adrese HTTP isteği gönderip cevabı almaya yarar: bir web sayfasının HTML'ini indirmek, bir API'den JSON veri çekmek ya da bir forma veri göndermek gibi."}, {"q": "Axios mu fetch mi?", "a": "Node.js 18 ve sonrasında fetch yerleşik geliyor, ek paket gerekmiyor. Axios ise zaman aşımı, ortak ayarlar ve 4xx/5xx cevaplarını hata sayma gibi kolaylıklar sunuyor. Küçük işler için fetch, ayarı çok olan istemciler için axios rahat."}, {"q": "Axios timeout of ms exceeded hatası ne demek?", "a": "İstek, ayarladığın süre içinde tamamlanmadı ve axios onu iptal etti. Hata kodu ECONNABORTED olur. Sunucu yavaşsa süreyi artır, adres yanlışsa adresi düzelt."}]
---

# Axios ile HTTP isteği atmak: örnekler ve hata yönetimi

<p class="post-meta">Yazan <a href="https://halit.org">Halit Sever</a> · <time datetime="2026-11-28">28 Kasım 2026</time></p>

<p class="lead">Axios, JavaScript'te HTTP isteği atmak için kullanılan en bilinen kütüphanelerden biri. Hem tarayıcıda hem Node.js'te çalışır, Promise döndürür ve hata yönetimini kolaylaştırır. Sosyal Halisaha Downloader da maç sayfasını axios ile ister. Bu yazıda axios'u o kod üzerinden ve kendi denediğimiz örneklerle anlatıyoruz.</p>

## Kurulum

```bash
npm install axios
```

Bu projede `package.json` içinde `axios` 1.21.1 sürümüyle kilitli.

## En basit istek

```js
import axios from 'axios';

const response = await axios.get('https://example.com/');
console.log(response.status);  // 200
console.log(response.data);    // sayfanın HTML'i ya da JSON veri
```

Axios cevap JSON ise `data` alanına nesne olarak çözümlenmiş hâlini koyar. HTML ise metin olarak gelir.

## Projedeki kullanım: ortak ayarlı bir istemci

Araç her istekte aynı ayarları kullanmak için bir istemci kuruyor. [src/http.client.ts](https://github.com/halitsever/sosyal-halisaha-downloader/blob/main/src/http.client.ts):

```ts
import axios from 'axios';
import ScraperConfig from './config/scraper.config.ts'

const axiosAdapter = axios.create({
    timeout: 60_000,
    headers: ScraperConfig.baseHeaders
});

export default axiosAdapter;
```

- `axios.create` bir örnek döndürür. Bu örnekle atılan her istek aynı ayarları taşır.
- `timeout: 60_000` isteğe 60 saniye süre tanır. Süre dolarsa istek iptal edilir.
- `headers`, [src/config/scraper.config.ts](https://github.com/halitsever/sosyal-halisaha-downloader/blob/main/src/config/scraper.config.ts) içinde tanımlı, tarayıcıya benzeyen başlıklar: bir Chrome `User-Agent` satırı, `Accept-Language` ve `Sec-Fetch-*` başlıkları.

İstek de tek satır. [src/scraper/video.scraper.ts](https://github.com/halitsever/sosyal-halisaha-downloader/blob/main/src/scraper/video.scraper.ts):

```ts
const pageResponse = await axios.get(this.videoUrl);
const scrapedData = this.parseVideoPage(pageResponse.data);
```

Gelen HTML, jsdom ile okunur. O kısım [web scraping yazısında](/blog/web-scraping-nedir) anlatılıyor. Araç resmi değildir ve yalnızca kendi maç kayıtların için düşünülmüştür.

## Hatalar: denediklerimiz

Kendi bilgisayarımızda küçük bir test sunucusu açıp axios 1.21.1 ile üç durumu denedik (Node.js 24, 28 Kasım 2026):

| Durum | axios ne yaptı |
| --- | --- |
| Sunucu JSON döndü | `data` içinde nesne geldi |
| Sunucu 404 döndü | hata fırlattı: `Request failed with status code 404`, `error.response.status` 404 |
| Sunucu 3 saniye bekledi, `timeout` 1 saniye | hata fırlattı: `ECONNABORTED`, `timeout of 1000ms exceeded` |

Aynı 404 adresine `fetch` ile istek atınca hata fırlamadı; `response.ok` `false`, `response.status` 404 döndü. Bu, ikisi arasındaki en önemli fark.

Hata yakalama:

```js
try {
  const res = await client.get(url);
} catch (error) {
  if (error.response) {
    console.log('Sunucu cevap verdi ama hata:', error.response.status);
  } else if (error.code === 'ECONNABORTED') {
    console.log('Zaman aşımı');
  } else {
    console.log('Bağlantı kurulamadı:', error.message);
  }
}
```

Araç da hatayı yakalıyor ve mesajı ekrana veriyor: `scrape()` içinde `catch` bloğu `error.message` değerini hata sayfasına gönderiyor. Yani adres yanlışsa ya da sayfa yoksa kullanıcı `Request failed with status code 404` gibi bir mesaj görür.

## POST, parametre ve başlık

```js
// sorgu parametresi: https://api.example.com/search?q=mac
await axios.get('https://api.example.com/search', { params: { q: 'mac' } });

// JSON gövde ile POST
await axios.post('https://api.example.com/items', { name: 'Top' });

// tek isteğe özel başlık
await axios.get(url, { headers: { Authorization: 'Bearer ...' } });
```

## Axios mu, fetch mi?

Node.js 18'den beri `fetch` yerleşik. Ek paket kurmadan basit istekler için yeterli. Axios'un sağladıkları:

- `timeout` ayarı tek satır. `fetch` ile `AbortSignal.timeout()` kullanman gerekir.
- 4xx ve 5xx cevapları hata sayılır, `try/catch` ile yakalanır.
- `axios.create` ile ortak ayarlı istemci kurmak kolay.
- İstek ve cevap için araya giren fonksiyonlar (interceptor) tanımlanabilir.

Bu projede axios kullanılmasının pratik sebebi ilk ikisi: 60 saniyelik zaman aşımı ve hatanın tek bir `catch` bloğunda toplanması.

## Dikkat

Tarayıcıya benzeyen başlıklar göndermek bir sitenin kurallarını değiştirmez. Bir siteden veri çekmeden önce kullanım koşullarına bak; [web scraping yasal mı](/blog/web-scraping-yasal-mi) yazısı genel çerçeveyi anlatıyor (hukuki danışmanlık değildir).

## Sık sorulan sorular

### Axios ne işe yarar?

Bir adrese HTTP isteği gönderip cevabı almaya yarar: bir web sayfasının HTML'ini indirmek, bir API'den JSON veri çekmek ya da bir forma veri göndermek gibi.

### Axios mu fetch mi?

Node.js 18 ve sonrasında fetch yerleşik geliyor, ek paket gerekmiyor. Axios ise zaman aşımı, ortak ayarlar ve 4xx/5xx cevaplarını hata sayma gibi kolaylıklar sunuyor. Küçük işler için fetch, ayarı çok olan istemciler için axios rahat.

### Axios timeout of ms exceeded hatası ne demek?

İstek, ayarladığın süre içinde tamamlanmadı ve axios onu iptal etti. Hata kodu ECONNABORTED olur. Sunucu yavaşsa süreyi artır, adres yanlışsa adresi düzelt.

## İlgili yazılar

- [Web scraping nedir, Node.js ile nasıl yapılır?](/blog/web-scraping-nedir)
- [Node.js: JavaScript'i tarayıcı dışında çalıştıran ortam](/blog/node-js-nedir)
- [TypeScript: türleri olan JavaScript, ve Node.js'in onu doğrudan çalıştırması](/blog/typescript-nedir)
- [Tüm yazılar](/blog/)
