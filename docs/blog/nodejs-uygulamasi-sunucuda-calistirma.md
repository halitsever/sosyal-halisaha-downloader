---
title: "PM2 Nedir? Node.js Uygulamasını Sürekli Çalıştır"
titleTemplate: false
description: "PM2 nedir, ne işe yarar? Node.js uygulamasını terminal kapansa da çalışır tutmak, çökünce yeniden başlatmak ve açılışta başlatmak için adım adım kurulum."
headline: "PM2 ile Node.js uygulamasını sunucuda sürekli çalıştırmak"
date: "2026-11-28"
keyword: "pm2 nedir"
lang: "tr"
faq:
  [
    { "q": "PM2 ücretli mi?", "a": "PM2'nin kendisi açık kaynak ve ücretsiz. npm üzerinden kurulur." },
    {
      "q": "PM2 Windows'ta çalışır mı?",
      "a": "PM2 Windows'a da kurulur. Ancak pm2 startup komutu Linux ve macOS'taki başlatma sistemleri için betik üretir; Windows'ta açılışta başlatma için ayrı bir yol gerekir.",
    },
    {
      "q": "Uygulamayı internete açık bir sunucuda çalıştırabilir miyim?",
      "a": "Sosyal Halisaha Downloader'da parola ya da giriş ekranı yok. İnternete açacaksan önüne kendi erişim denetimini koy. En güvenlisi kendi bilgisayarında ya da güvendiğin bir ağda çalıştırmak.",
    },
  ]
---

# PM2 ile Node.js uygulamasını sunucuda sürekli çalıştırmak

<p class="post-meta">Yazan <a href="https://halit.org">Halit Sever</a> · <time datetime="2026-11-28">28 Kasım 2026</time></p>

<p class="lead">Bir Node.js uygulamasını `npm start` ile başlattığında, terminali kapattığın an uygulama da kapanır. Bilgisayar yeniden başladığında kendiliğinden açılmaz, çökerse de öyle kalır. PM2 bu üç sorunu çözen bir süreç yöneticisi. Bu yazı onu Sosyal Halisaha Downloader üzerinde anlatıyor.</p>

## PM2 ne yapar?

[PM2](https://pm2.keymetrics.io/), Node.js uygulamaları için bir süreç yöneticisi. Uygulamayı arka planda çalıştırır ve şunları üstlenir:

- **Arka planda çalışma:** Terminali kapatsan da uygulama çalışmaya devam eder.
- **Yeniden başlatma:** Uygulama çökerse PM2 onu yeniden başlatır.
- **Açılışta başlatma:** Sunucu yeniden başladığında uygulamaları geri açar.
- **Kayıtlar:** Uygulamanın çıktısını dosyalarda tutar, istediğinde gösterir.

## Kurulum

PM2'yi npm ile genel olarak kur:

```bash
npm install -g pm2
```

Sosyal Halisaha Downloader, TypeScript dosyalarını Node'un kendi tür ayıklama özelliğiyle çalıştırır. Bu yüzden sunucuda Node 24 LTS olmalı:

```bash
node -v
```

Projeyi indirip paketleri kur (ayrıntılar [Kurulum](/kurulum) sayfasında):

```bash
git clone https://github.com/halitsever/sosyal-halisaha-downloader.git
cd sosyal-halisaha-downloader
npm i
```

## Uygulamayı PM2 ile başlat

Proje klasöründe:

```bash
pm2 start npm --name halisaha -- start
```

Bu komut `npm start` komutunu `halisaha` adıyla PM2'ye verir. Farklı bir port istiyorsan değişkeni başlatırken ver:

```bash
PORT=8080 pm2 start npm --name halisaha -- start
```

Sunucuda `npm run dev` kullanma. O komut dosya değişikliklerini izleyip uygulamayı yeniden başlatmak için; sunucuda uygulamayı `npm start` başlatır.

## Günlük komutlar

| Komut                  | Ne yapar                                     |
| ---------------------- | -------------------------------------------- |
| `pm2 list`             | Çalışan uygulamaları ve durumlarını gösterir |
| `pm2 logs halisaha`    | Uygulamanın çıktısını canlı izler            |
| `pm2 restart halisaha` | Uygulamayı yeniden başlatır                  |
| `pm2 stop halisaha`    | Uygulamayı durdurur                          |
| `pm2 delete halisaha`  | Uygulamayı PM2 listesinden çıkarır           |

Bir maç sayfası okunamadığında hata satırı buraya düşer. `pm2 logs halisaha` ile `Error scraping video URL` satırlarını görebilirsin.

## Açılışta otomatik başlatma

Linux ya da macOS sunucuda:

```bash
pm2 startup
```

Bu komut, sistemine uygun bir başlatma komutu yazdırır. Yazdırdığı komutu çalıştır. Sonra çalışan uygulama listesini kaydet:

```bash
pm2 save
```

Sunucu yeniden başladığında PM2, kaydettiğin listedeki uygulamaları geri açar.

## Güncelleme

Yeni sürümü almak için:

```bash
git pull
npm i
pm2 restart halisaha
```

## Port dolu uyarısı

Port doluyken bu uygulama `Server is running` yazıp hemen kapanıyor. PM2 kapanan uygulamayı yeniden başlatır, uygulama yine kapanır ve bu döngü sürer. `pm2 list` içinde yeniden başlatma sayısı hızla artıyorsa portu kontrol et. Ayrıntılar [localhost:3000 açılmıyor](/blog/localhost-3000) yazısında.

## Güvenlik

Uygulamada giriş ekranı ya da parola yok. Porta ulaşabilen herkes formu kullanabilir ve sunucuya bir sayfayı okutabilir. Kendi bilgisayarında ya da güvendiğin bir ağda çalıştır. İnternete açık bir sunucuya koyacaksan önüne kendi erişim denetimini ekle.

## Sık sorulan sorular

### PM2 ücretli mi?

PM2'nin kendisi açık kaynak ve ücretsiz. npm üzerinden kurulur.

### PM2 Windows'ta çalışır mı?

PM2 Windows'a da kurulur. Ancak pm2 startup komutu Linux ve macOS'taki başlatma sistemleri için betik üretir; Windows'ta açılışta başlatma için ayrı bir yol gerekir.

### Uygulamayı internete açık bir sunucuda çalıştırabilir miyim?

Sosyal Halisaha Downloader'da parola ya da giriş ekranı yok. İnternete açacaksan önüne kendi erişim denetimini koy. En güvenlisi kendi bilgisayarında ya da güvendiğin bir ağda çalıştırmak.

## İlgili yazılar

- [Web scraping nedir, Node.js ile nasıl yapılır?](/blog/web-scraping-nedir)
- [localhost:3000 adresi ne anlama gelir, açılmazsa ne yapmalı?](/blog/localhost-3000)
- [Kendi maç videonu telefonuna kaydetmek](/blog/videoyu-telefona-kaydetme)
- [Node.js: JavaScript'i tarayıcı dışında çalıştıran ortam](/blog/node-js-nedir)
- [Tüm yazılar](/blog/)
