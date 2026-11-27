---
title: 'Nasıl çalışır: maç videosu indirme aracının iç yapısı'
description: Maç videosu indirme aracı maç sayfasından neyi, nasıl okur? Kullanılan seçiciler, gönderilen istek ve sayfa yapısı değiştiğinde ortaya çıkan hatalar.
---

# Nasıl çalışır: aracın maç sayfasında yaptığı iş

Uygulama küçük bir Express sunucusudur. Verdiğin adresteki sayfayı indirir, içinden video adresini bulur ve sana bir önizleme sayfası gösterir. Bu sayfa o işi kod üzerinden anlatır. Bir şey bozulduğunda nereye bakacağını da buradan öğrenirsin.

## İki adres

Sunucunun tamamı `src/index.ts` dosyasındadır ve iki adrese yanıt verir.

| İstek | Ne yapar |
| --- | --- |
| `GET /` | Bağlantı yapıştırma formunu gösterir. |
| `POST /download` | Formdan gelen `videoUrl` değerini alır, sayfayı okur ve indirme ekranını gösterir. |

`videoUrl` boş gelirse sunucu `400` koduyla `Video URL is required` yanıtını verir. Sayfa okunurken bir hata olursa `500` koduyla hata ekranı açılır.

## Sayfa nasıl istenir

`src/scraper/video.scraper.ts` önce adresi denetler. Tek kural, adresin `https://` ile başlamasıdır. Kodda bir alan adı listesi yoktur. Bu bilinçli bir tercihtir: araç belirli bir siteyi hedef alan bir liste taşımaz.

Sonra sayfa `axios` ile bir kez istenir. İstek, `src/config/scraper.config.ts` içinde tanımlı tarayıcı başlıklarıyla gider ve 60 saniyede yanıt gelmezse kesilir. Oturum açılmaz, çerez gönderilmez. Araç yalnızca herkese açık bir sayfanın HTML içeriğini alır.

## Sayfadan okunanlar

Okuma işi `src/scraper/video.parser.ts` dosyasındadır. HTML, `jsdom` ile ayrıştırılır ve dört yere bakılır.

| Sayfadaki yer | Okunan bilgi | Bulunamazsa |
| --- | --- | --- |
| `.video-player` içindeki `script` | Video dosyasının adresi | Hata verir |
| `.title h3` | Maçın başlığı | `No Title Found` |
| `.owner a` | Videoyu yükleyen | `No Uploader Found` |
| `picture img` | Kapak görseli | `No Thumbnail Found` |

Video adresi doğrudan bir etikette durmaz. Oynatıcının içindeki betikte bir liste olarak tanımlıdır ve araç onu şu iki düzenli ifadeyle çıkarır:

```ts
private readonly videoRegex = /const\s+videoSrc\s*=\s*(\[.*?\]);/;
private readonly clearRegex = /([{,]\s*)(\w+)\s*:/g;
```

İlk ifade `const videoSrc = [...]` satırındaki listeyi yakalar. Liste JavaScript biçiminde yazıldığı için ikinci ifade anahtarları tırnak içine alır, tek tırnaklar da çift tırnağa çevrilir. Böylece metin `JSON.parse` ile okunabilir hale gelir. Listenin ilk öğesindeki `url` alanı video adresidir.

Kapak görseli okunur ama indirme ekranında gösterilmez.

## İndirme ekranı

`src/pages/download.ejs` video adresini bir `<video>` etiketine verir. Başlık ve yükleyen altında listelenir. **Download** düğmesi, aynı adrese giden ve `match-record.mp4` adını öneren bir bağlantı oluşturup tıklar.

Video dosyası sunucuya inmez. Tarayıcın onu doğrudan kendi adresinden alır. Sunucunun okuduğu tek şey maç sayfasının HTML içeriğidir.

## Sayfa yapısı değişirse ne bozulur

Araç, üçüncü taraf bir sayfanın yapısına bağlıdır. O sayfa değiştiğinde araç da bozulur. Belirtiler şöyle olur:

| Sayfadaki değişiklik | Gördüğün sonuç |
| --- | --- |
| `.video-player` sınıfı ya da içindeki betik kalkar | `Script content not found` hatası |
| `videoSrc` değişkeninin adı ya da yazımı değişir | `Video script not found` hatası |
| Liste, çevrildikten sonra geçerli JSON olmaz | Hata ekranında bir JSON ayrıştırma mesajı |
| Liste boş gelir | İndirme ekranı açılır ama oynatıcı boş kalır |
| `.title h3` değişir | Başlık yerine `No Title Found` yazar |
| `.owner a` değişir | Yükleyen yerine bir çizgi görünür |

İndirme bozulduğunda ilk bakılacak yer `src/scraper/video.parser.ts` içindeki seçicilerdir. Çoğu zaman tek bir seçiciyi ya da düzenli ifadeyi güncellemek yeter. Düzeltmeyi bir [pull request](https://github.com/halitsever/sosyal-halisaha-downloader/pulls) olarak gönderebilirsin.

## Dosya yapısı

```text
src/
  index.ts                  Express sunucusu ve iki adres
  http.client.ts            axios ayarı, 60 saniye zaman aşımı
  config/app.config.ts      PORT değeri, varsayılan 3000
  config/scraper.config.ts  istek başlıkları
  scraper/video.scraper.ts  adres denetimi ve sayfa isteği
  scraper/video.parser.ts   seçiciler ve video adresinin çıkarılması
  pages/                    form, indirme ve hata ekranları (EJS)
  assets/football.svg       uygulamanın simgesi
```

## Derleme adımı yok

Proje TypeScript ile yazılıdır ama derlenmez. `npm start`, `node src/index.ts` komutunu çalıştırır ve Node dosyalardaki tür bilgisini kendisi ayıklar. Bu yüzden Node 24 LTS gerekir. Depoda bir test paketi bulunmaz. CI üç şey yapar: `npm ci`, `npm run typecheck` ve sunucunun açılıp ana sayfaya yanıt verdiğini gören kısa bir deneme.
