---
title: "Web Scraping Nedir? Basit Bir Node.js Örneği"
titleTemplate: false
description: "Web scraping nedir, nasıl çalışır? Bir sayfayı axios ile isteyip jsdom ile okuyan gerçek bir Node.js örneği üzerinden adım adım ve sınırlarıyla anlatım."
headline: "Web scraping nedir, Node.js ile nasıl yapılır?"
date: "2026-11-28"
keyword: "web scraping nedir"
lang: "tr"
faq:
  [
    {
      "q": "Web scraping ile API kullanmak arasındaki fark ne?",
      "a": "API, sitenin programlar için sunduğu, biçimi belli bir veri kapısıdır. Scraping ise insanlar için hazırlanmış HTML sayfasını okur. API varsa onu kullanmak hem daha sağlam hem de genellikle kurallara daha uygundur.",
    },
    {
      "q": "Node.js ile scraping için hangi kütüphaneler kullanılır?",
      "a": "Bu örnekte sayfayı istemek için axios, HTML'i ayrıştırmak için jsdom kullanılıyor. JavaScript ile sonradan yüklenen sayfalar için ise gerçek bir tarayıcıyı yöneten araçlar gerekir.",
    },
    { "q": "Web scraping yasal mı?", "a": "Kısa bir evet ya da hayır cevabı yok. Sitenin kullanım koşulları, kişisel veri ve telif kuralları belirleyici. Ayrıntı ayrı bir yazıda." },
  ]
---

# Web scraping nedir, Node.js ile nasıl yapılır?

<p class="post-meta">Yazan <a href="https://halit.org">Halit Sever</a> · <time datetime="2026-11-28">28 Kasım 2026</time></p>

<p class="lead">Web scraping, bir web sayfasındaki bilgiyi bir programla okuyup kullanılabilir hale getirmek demek. Tarayıcının ekranda gösterdiğini program HTML olarak alır ve içinden ihtiyacı olan parçayı çıkarır. Bu yazı kavramı, küçük ve gerçek bir örnek üzerinden anlatıyor: Sosyal Halisaha Downloader'ın maç sayfasından video adresini bulan kodu.</p>

## Kısaca nasıl çalışır?

Her scraping işi üç adımdan oluşur:

1. **İste:** Program, sayfanın adresine bir HTTP isteği gönderir ve HTML'i alır.
2. **Ayrıştır:** HTML metni, içinde arama yapılabilen bir belge ağacına dönüştürülür.
3. **Çıkar:** Ağaçtan istenen parça seçilir: bir başlık, bir fiyat, bir video adresi.

Sosyal Halisaha Downloader'da bu üç adım iki dosyada duruyor: [`video.scraper.ts`](https://github.com/halitsever/sosyal-halisaha-downloader/blob/main/src/scraper/video.scraper.ts) ve [`video.parser.ts`](https://github.com/halitsever/sosyal-halisaha-downloader/blob/main/src/scraper/video.parser.ts).

## 1. Sayfayı istemek

```ts
const pageResponse = await axios.get(this.videoUrl);
```

İstek, tarayıcıya benzeyen başlıklarla ve 60 saniyelik zaman aşımıyla gider. Bu ayarlar `src/http.client.ts` ve `src/config/scraper.config.ts` dosyalarında. Oturum açılmaz, çerez gönderilmez; yalnızca herkese açık sayfanın HTML'i alınır.

İstekten önce tek bir kontrol var: adres `https://` ile başlamalı.

```ts
if (!this.videoUrl.startsWith("https://")) return false;
```

## 2. HTML'i ayrıştırmak

```ts
const { document } = new JSDOM(html).window;
```

jsdom, tarayıcıdaki `document` nesnesinin Node.js içinde çalışan bir benzerini kurar. Böylece tarayıcıda alışık olduğun `querySelector` gibi yöntemleri sunucuda kullanabilirsin.

## 3. Bilgiyi çıkarmak

Başlık ve yükleyen, sayfadaki belli öğelerden okunur:

```ts
const pageTitle = document.querySelector(".title h3")?.textContent;
const videoOwner = document.querySelector(".owner a")?.textContent;
```

Video adresi ise bir etikette değil, oynatıcının içindeki bir betikte yazılı. Kod önce betiği bulur, sonra düzenli ifadeyle listeyi yakalar:

```ts
const videoRegex = /const\s+videoSrc\s*=\s*(\[.*?\]);/;
```

Yakalanan metin JavaScript biçiminde olduğu için anahtarlar tırnağa alınır ve `JSON.parse` ile okunur. Listenin ilk öğesindeki `url` alanı video adresidir. Adım adım anlatımı [Nasıl çalışır](/nasil-calisir) sayfasında.

## Scraping neden kırılgandır?

Kod, karşı sayfanın yapısını varsayar: `.video-player` içinde bir betik, `.title h3` içinde başlık. Site tasarımını değiştirdiği gün seçiciler boşa düşer ve araç `Script content not found` gibi bir hata verir. Bu, scraping'in doğasında var. Sayfanın sahibi sana bir sözleşme vermedi; ekranda gördüğün, yarın değişebilir.

Bu yüzden:

- Bir API varsa onu kullan.
- Seçicileri tek bir yerde tut. Bu projede hepsi `video.parser.ts` dosyasında.
- Bulunamayan bilgi için bir varsayılan belirle. Kod başlık bulamazsa `No Title Found` yazıyor, hata vermiyor.

## Bu yaklaşım nerede yetmez?

Bu örnek, gereken bilgi sunucudan gelen ilk HTML'in içinde olduğu için çalışıyor. Bazı siteler içeriği sayfa açıldıktan sonra JavaScript ile yükler. O durumda axios ile alınan HTML'de bilgi yoktur ve sayfayı gerçek bir tarayıcıda açan araçlar gerekir. Bunlar daha ağır ve daha yavaştır.

## Sorumluluk

Bir sayfayı programla okumak teknik olarak kolay. Asıl soru, okumaya ve okuduğunu kullanmaya hakkın olup olmadığı. Bu proje yalnızca kendi maç kayıtların için yazıldı ve belirli bir siteyi hedefleyen bir alan adı listesi taşımıyor. Hukuki tarafı [web scraping yasal mı](/blog/web-scraping-yasal-mi) yazısında ele alınıyor.

## Sık sorulan sorular

### Web scraping ile API kullanmak arasındaki fark ne?

API, sitenin programlar için sunduğu, biçimi belli bir veri kapısıdır. Scraping ise insanlar için hazırlanmış HTML sayfasını okur. API varsa onu kullanmak hem daha sağlam hem de genellikle kurallara daha uygundur.

### Node.js ile scraping için hangi kütüphaneler kullanılır?

Bu örnekte sayfayı istemek için axios, HTML'i ayrıştırmak için jsdom kullanılıyor. JavaScript ile sonradan yüklenen sayfalar için ise gerçek bir tarayıcıyı yöneten araçlar gerekir.

### Web scraping yasal mı?

Kısa bir evet ya da hayır cevabı yok. Sitenin kullanım koşulları, kişisel veri ve telif kuralları belirleyici. Ayrıntı ayrı bir yazıda.

## İlgili yazılar

- [Web scraping yasal mı? Kullanım koşulları, KVKK ve telif](/blog/web-scraping-yasal-mi)
- [localhost:3000 adresi ne anlama gelir, açılmazsa ne yapmalı?](/blog/localhost-3000)
- [EJS ile Express uygulamasına basit bir arayüz yazmak](/blog/ejs-sablon)
- [Axios ile HTTP isteği atmak: örnekler ve hata yönetimi](/blog/axios-nedir)
- [Tüm yazılar](/blog/)
