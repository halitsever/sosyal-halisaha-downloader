---
title: "TypeScript Nedir? Node.js ile Derlemeden Çalıştırma"
titleTemplate: false
description: "TypeScript nedir, JavaScript'ten farkı ne? Tür denetimi, tsc --noEmit, Node.js'in tür ayıklama özelliği ve ts-node hatası, açık kaynak bir projeden örneklerle."
headline: "TypeScript: türleri olan JavaScript, ve Node.js'in onu doğrudan çalıştırması"
date: "2026-11-28"
keyword: "typescript nedir"
lang: "tr"
faq: [{"q": "TypeScript ile JavaScript arasındaki fark nedir?", "a": "TypeScript, JavaScript'in üstüne tür bilgisi ekler. Türler yalnızca geliştirme sırasında denetlenir; çalışma anında kod yine JavaScript olarak çalışır. Her geçerli JavaScript kodu aynı zamanda geçerli TypeScript'tir."}, {"q": "Node.js TypeScript dosyasını doğrudan çalıştırır mı?", "a": "Evet, tür ayıklama (type stripping) özelliğiyle. Node.js v22.18.0 ve v23.6.0'dan itibaren varsayılan olarak açık. Türleri siler ve kodu çalıştırır, ama türleri denetlemez. enum gibi bazı söz dizimleri için ek bayrak gerekir."}, {"q": "ts-node hatası alıyorum, ne yapmalıyım?", "a": "Bu projede npm run dev komutu ts-node ile çöküyor. Uygulamayı npm start ile çalıştır; bu komut Node.js'in kendi TypeScript desteğini kullanır."}]
---

# TypeScript: türleri olan JavaScript, ve Node.js'in onu doğrudan çalıştırması

<p class="post-meta">Yazan <a href="https://halit.org">Halit Sever</a> · <time datetime="2026-11-28">28 Kasım 2026</time></p>

<p class="lead">TypeScript, JavaScript'e tür bilgisi ekleyen bir dil. Kod çalışmadan önce bir değişkenin sayı mı metin mi olduğunu kontrol eder, hataları erkenden yakalar. Sosyal Halisaha Downloader tamamen TypeScript ile yazılmış ve Node.js onu derleme adımı olmadan çalıştırıyor. Bu yazıda ikisini de o projeden örneklerle anlatıyoruz.</p>

## Kısaca TypeScript

TypeScript, Microsoft'un geliştirdiği açık kaynaklı bir dil. JavaScript'in tamamını kapsar ve üstüne **türler** ekler:

```ts
function karsilama(isim: string): string {
    return `Merhaba ${isim}`;
}

karsilama(42); // hata: number, string parametresine verilemez
```

Bu hata kod çalışmadan, editörde ya da `tsc` komutuyla görülür. Tarayıcı ya da Node.js ise türleri bilmez; türler silinince geriye düz JavaScript kalır.

## Projeden bir örnek: arayüzler

Araç, maç sayfasından çıkardığı bilgiyi bir **interface** ile tanımlıyor. [src/domain/video/video.type.ts](https://github.com/halitsever/sosyal-halisaha-downloader/blob/main/src/domain/video/video.type.ts):

```ts
export interface IVideo {
    videoUrl?: string;
    title?: string;
    videOwner?: string;
    thumbnail?: string;
}

export interface IVideoResponse {
    error?: string;
    video?: IVideo;
}
```

`?` alanın olmayabileceğini söyler. `scrape()` fonksiyonu `Promise<IVideoResponse>` döndürür; ya `error` ya `video` doludur. Kodu yazan kişi `video.title` yerine yanlışlıkla `video.titel` yazarsa TypeScript bunu hemen işaretler. (Alan adındaki `videOwner` yazımı projede gerçekten böyle; tür denetimi tutarlı yazıldığı sürece sorun çıkarmaz.)

## Tür denetimi: tsc --noEmit

`package.json` içindeki komut:

```json
"typecheck": "tsc --noEmit"
```

`tsc`, TypeScript derleyicisi. `--noEmit` dosya üretmeden yalnızca denetim yapar. Ayarlar [tsconfig.json](https://github.com/halitsever/sosyal-halisaha-downloader/blob/main/tsconfig.json) dosyasında; `strict: true` sıkı denetimi açar. Projenin CI iş akışı her push ve pull request'te `npm run typecheck` çalıştırıyor. Biz de 28 Kasım 2026'da Node.js 24 ile çalıştırdık, hatasız bitti.

Kilit dosyasındaki TypeScript sürümü 7.0.2.

## Node.js TypeScript'i nasıl çalıştırıyor?

Eskiden TypeScript'i çalıştırmak için önce `tsc` ile JavaScript'e derlemek ya da ts-node gibi bir araç kullanmak gerekiyordu. Artık Node.js'in kendi desteği var. Bu projenin başlatma komutu:

```json
"start": "node src/index.ts"
```

[Node.js TypeScript belgesine](https://nodejs.org/api/typescript.html) göre:

- **Tür ayıklama** (type stripping) v23.6.0'da ve v22.18.0'da varsayılan olarak açıldı, v24.12.0'da kararlı hâle geldi.
- Node.js türleri silip kodu çalıştırır, **türleri denetlemez**. Denetim için yine `tsc` gerekir.
- `tsconfig.json` dosyasını okumaz.
- Silinebilir (erasable) olmayan söz dizimi, örneğin `enum` ve çalışan kod içeren `namespace`, `--experimental-transform-types` bayrağı olmadan çalışmaz.
- `import` satırlarında dosya uzantısı zorunludur: `import './dosya.ts'`.

Projede bu son kural görülüyor: `import logger from './logger.ts';`. `tsconfig.json` içindeki `allowImportingTsExtensions` ayarı, `tsc`'nin bu uzantılara izin vermesi için.

Node.js 22.18'den eski bir sürümde `npm start` çalışmaz. [Kurulum sayfası](/kurulum) bu yüzden Node 24 LTS öneriyor; nedenini [Node.js nedir yazısı](/blog/node-js-nedir) da anlatıyor.

## ts-node ve npm run dev

`package.json` bir de `dev` komutu içeriyor:

```json
"dev": "npx ts-node src/index.ts"
```

Bu komut şu an çalışmıyor. 28 Kasım 2026'da projenin kilitli paketleriyle Node.js 22 ve Node.js 24 üzerinde denedik; ikisinde de şu hatayla durdu:

```text
TypeError: Cannot read properties of undefined (reading 'fileExists')
```

Hata ts-node 10.9.2'nin içinden geliyor ve iki Node sürümünde de aynı; yani sorun Node sürümünde değil, ts-node ile projedeki TypeScript 7.0.2'nin birlikte çalışmamasında görünüyor. Depoda henüz düzeltilmedi. Uygulamayı `npm start` ile çalıştır.

## TypeScript öğrenmeye değer mi?

Küçük bir projede bile faydası görülüyor: TypeScript kısmı birkaç yüz satır olan bu araçta her fonksiyon ne alıp ne döndürdüğünü türlerle söylüyor. Başlamak için ayrı bir kurulum da gerekmiyor: güncel bir Node.js ile `.ts` uzantılı bir dosya yazıp `node dosya.ts` ile çalıştırabilirsin. Türleri denetlemek istediğinde `npm install -D typescript` ve `npx tsc --noEmit` yeter.

Aracın EJS şablonları ise TypeScript değil, düz HTML ve JavaScript; onlar [EJS yazısında](/blog/ejs-sablon) anlatılıyor.

## Sık sorulan sorular

### TypeScript ile JavaScript arasındaki fark nedir?

TypeScript, JavaScript'in üstüne tür bilgisi ekler. Türler yalnızca geliştirme sırasında denetlenir; çalışma anında kod yine JavaScript olarak çalışır. Her geçerli JavaScript kodu aynı zamanda geçerli TypeScript'tir.

### Node.js TypeScript dosyasını doğrudan çalıştırır mı?

Evet, tür ayıklama (type stripping) özelliğiyle. Node.js v22.18.0 ve v23.6.0'dan itibaren varsayılan olarak açık. Türleri siler ve kodu çalıştırır, ama türleri denetlemez. enum gibi bazı söz dizimleri için ek bayrak gerekir.

### ts-node hatası alıyorum, ne yapmalıyım?

Bu projede npm run dev komutu ts-node ile çöküyor. Uygulamayı npm start ile çalıştır; bu komut Node.js'in kendi TypeScript desteğini kullanır.

## İlgili yazılar

- [Node.js: JavaScript'i tarayıcı dışında çalıştıran ortam](/blog/node-js-nedir)
- [Axios ile HTTP isteği atmak: örnekler ve hata yönetimi](/blog/axios-nedir)
- [EJS ile Express uygulamasına basit bir arayüz yazmak](/blog/ejs-sablon)
- [Tüm yazılar](/blog/)
