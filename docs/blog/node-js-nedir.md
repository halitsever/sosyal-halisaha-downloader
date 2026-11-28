---
title: "Node.js Nedir, Ne İşe Yarar? Basit Bir Örnekle"
titleTemplate: false
description: "Node.js nedir, ne işe yarar? V8, npm, LTS sürümleri ve olay döngüsü; küçük bir Express uygulaması üzerinden Node.js'in kurulup çalıştırılmasını anlatıyoruz."
headline: "Node.js: JavaScript'i tarayıcı dışında çalıştıran ortam"
date: "2026-11-28"
keyword: "node js nedir"
lang: "tr"
faq: [{"q": "Node.js bir programlama dili mi?", "a": "Hayır. Dil JavaScript'tir. Node.js, JavaScript'i tarayıcı dışında çalıştıran bir çalışma ortamıdır (runtime). Dosya okuma, ağ bağlantısı gibi tarayıcıda olmayan yetenekleri ekler."}, {"q": "Node.js hangi sürümü kurmalıyım?", "a": "Çoğu kişi için güncel LTS sürümünü. 28 Kasım 2026 itibarıyla Node.js 26 güncel LTS, 24 ve 22 de hâlâ LTS. Sosyal Halisaha Downloader için kurulum sayfası Node 24 LTS öneriyor."}, {"q": "npm nedir?", "a": "Node.js ile birlikte gelen paket yöneticisi. Başkalarının yazdığı kütüphaneleri projene kurar ve package.json dosyasındaki komutları çalıştırır, örneğin npm start."}]
---

# Node.js: JavaScript'i tarayıcı dışında çalıştıran ortam

<p class="post-meta">Yazan <a href="https://halit.org">Halit Sever</a> · <time datetime="2026-11-28">28 Kasım 2026</time></p>

<p class="lead">Node.js, JavaScript kodunu tarayıcı olmadan, doğrudan bilgisayarda ya da sunucuda çalıştıran bir ortamdır. Web sunucuları, komut satırı araçları ve botlar yazmak için kullanılır. Bu blogun konusu olan Sosyal Halisaha Downloader da küçük bir Node.js uygulaması. Node.js'i onun üzerinden anlatıyoruz.</p>

## Kısaca Node.js

JavaScript uzun süre yalnızca tarayıcıda çalıştı. Node.js, Google Chrome'un JavaScript motoru **V8**'i alıp bilgisayarda çalışan bir programa koyar ve buna dosya sistemi, ağ, işlemler gibi tarayıcıda olmayan modüller ekler. Sonuç: aynı dili hem web sayfasında hem sunucuda kullanabilirsin.

Node.js açık kaynaktır, [nodejs.org](https://nodejs.org) adresinden indirilir.

## Ne işe yarar?

- **Web sunucuları ve API'ler.** Express gibi kütüphanelerle.
- **Komut satırı araçları.** `npm`, `npx` ve birçok geliştirici aracı Node.js ile yazılmıştır.
- **Botlar ve otomasyon.** Telegram ya da Discord botları, zamanlanmış işler.
- **Web scraping.** Bir sayfayı indirip içinden bilgi çıkarmak, [web scraping yazısında](/blog/web-scraping-nedir) anlatıldığı gibi.

## Bir örnek: Sosyal Halisaha Downloader

Aracın tamamı birkaç dosya. Giriş noktası [src/index.ts](https://github.com/halitsever/sosyal-halisaha-downloader/blob/main/src/index.ts), Express ile bir sunucu açar:

```ts
const app = express();
app.set('view engine', 'ejs');
app.get('/', (req, res) => {
    res.render('index');
});
app.listen(AppConfig.port, (error) => {
    if (error) {
        logger.error(`Port ${AppConfig.port} is already in use. ...`);
        process.exit(1);
    }
    logger.info(`Server is running on ${AppConfig.port} port`);
});
```

Sen `npm start` yazınca Node.js bu dosyayı çalıştırır, 3000 numaralı portu dinlemeye başlar ve tarayıcıda `http://localhost:3000` açılır. Port kavramı [port nedir yazısında](/blog/port-nedir), adresin kendisi [localhost:3000 yazısında](/blog/localhost-3000) anlatılıyor.

Kullandığı paketler `package.json` dosyasında yazılı: sunucu için Express, sayfalar için EJS, istek atmak için axios, HTML okumak için jsdom.

## npm ve package.json

Node.js'i kurunca **npm** de gelir. İki işi var:

1. **Paket kurmak.** `npm install` (ya da kilit dosyasına sadık kalmak için `npm ci`), `package.json` içindeki bağımlılıkları `node_modules` klasörüne indirir.
2. **Komut çalıştırmak.** `package.json` içindeki `scripts` bölümünü çalıştırır:

```json
"scripts": {
  "start": "node src/index.ts",
  "dev": "node --watch src/index.ts",
  "test": "node --test src/test/*.test.ts",
  "typecheck": "tsc --noEmit"
}
```

`npm start` bu projede uygulamayı başlatan komut. `npm run dev` aynı dosyayı `--watch` ile çalıştırır ve bir dosyayı kaydettiğinde uygulamayı yeniden başlatır. `npm test` ise Node'un yerleşik test aracıyla testleri çalıştırır. Kurulum adımları [Kurulum](/kurulum) sayfasında.

## Olay döngüsü

Node.js'in en çok anlatılan özelliği tek iş parçacıklı **olay döngüsü**. Kod bir ağ isteği başlattığında cevabı beklerken durmaz, başka işlere devam eder; cevap gelince ilgili fonksiyon çalışır. Araçta `await axios.get(...)` satırı bunun örneği: maç sayfası gelene kadar sunucu başka istekleri karşılayabilir.

Bunun bir bedeli var: uzun süren bir hesaplama tüm sunucuyu bekletir. Node.js bu yüzden ağ ve dosya işleri çok olan uygulamalarda güçlü, ağır hesaplamalarda zayıftır.

## Hangi sürüm?

Node.js'in çift numaralı sürümleri **LTS** (uzun süreli destek) olur. Node.js'in sürüm listesine göre 28 Kasım 2026 itibarıyla:

| Sürüm | Durum |
| --- | --- |
| 26 | Güncel LTS |
| 24 | LTS |
| 22 | LTS |
| 25 | LTS olmayan sürüm |

Bu proje TypeScript dosyalarını derlemeden çalıştırır. Node.js bunu v22.18.0 ve v23.6.0'dan itibaren varsayılan olarak yapıyor; daha eski bir 22 sürümünde uygulama açılmaz. Ayrıntısı [TypeScript nedir](/blog/typescript-nedir) yazısında.

## Kurulum

- **Windows ve macOS:** nodejs.org'daki LTS yükleyicisi.
- **macOS, Homebrew ile:** `brew install node`
- **Linux:** dağıtımın paketleri eski olabilir; nodejs.org'daki talimatları ya da bir sürüm yöneticisini (nvm gibi) kullan.

Kurulumu doğrula:

```bash
node -v
npm -v
```

Sonrası için aracın [Kurulum](/kurulum) sayfası adım adım ilerliyor. Uygulamanın sunucuda sürekli açık kalması istenirse [PM2 yazısı](/blog/nodejs-uygulamasi-sunucuda-calistirma) devreye giriyor.

## Sık sorulan sorular

### Node.js bir programlama dili mi?

Hayır. Dil JavaScript'tir. Node.js, JavaScript'i tarayıcı dışında çalıştıran bir çalışma ortamıdır (runtime). Dosya okuma, ağ bağlantısı gibi tarayıcıda olmayan yetenekleri ekler.

### Node.js hangi sürümü kurmalıyım?

Çoğu kişi için güncel LTS sürümünü. 28 Kasım 2026 itibarıyla Node.js 26 güncel LTS, 24 ve 22 de hâlâ LTS. Sosyal Halisaha Downloader için kurulum sayfası Node 24 LTS öneriyor.

### npm nedir?

Node.js ile birlikte gelen paket yöneticisi. Başkalarının yazdığı kütüphaneleri projene kurar ve package.json dosyasındaki komutları çalıştırır, örneğin npm start.

## İlgili yazılar

- [TypeScript: türleri olan JavaScript, ve Node.js'in onu doğrudan çalıştırması](/blog/typescript-nedir)
- [Axios ile HTTP isteği atmak: örnekler ve hata yönetimi](/blog/axios-nedir)
- [PM2 ile Node.js uygulamasını sunucuda sürekli çalıştırmak](/blog/nodejs-uygulamasi-sunucuda-calistirma)
- [Tüm yazılar](/blog/)
