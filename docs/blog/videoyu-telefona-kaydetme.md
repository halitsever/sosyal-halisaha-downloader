---
title: "Maç Videosunu Telefona Kaydetme: Adım Adım"
titleTemplate: false
description: "Maç videonu telefona kaydetmek için bilgisayarda çalışan aracı aynı Wi-Fi'deki telefondan aç, videoyu önizle ve indir. Android ve iPhone için adımlar."
headline: "Kendi maç videonu telefonuna kaydetmek"
date: "2026-11-28"
keyword: "videoyu telefona kaydetme"
lang: "tr"
faq:
  [
    { "q": "Telefona bir uygulama kurmam gerekiyor mu?", "a": "Hayır. Telefonun tarayıcısı yeterli. Aracı bilgisayarda çalıştırırsın, telefondan yalnızca adresini açarsın." },
    {
      "q": "Video bilgisayarın üzerinden mi iner?",
      "a": "Hayır. Araç yalnızca maç sayfasını okur. Video dosyasını telefonun tarayıcısı doğrudan videonun kendi adresinden indirir, bu yüzden telefonun internete bağlı olması gerekir.",
    },
    {
      "q": "Telefonda adres açılmıyor, ne yapmalıyım?",
      "a": "Telefonun ve bilgisayarın aynı Wi-Fi ağında olduğunu, adresin `http://` ile başladığını ve bilgisayarın güvenlik duvarının Node.js'e izin verdiğini kontrol et.",
    },
  ]
---

# Kendi maç videonu telefonuna kaydetmek

<p class="post-meta">Yazan <a href="https://halit.org">Halit Sever</a> · <time datetime="2026-11-28">28 Kasım 2026</time></p>

<p class="lead">Sosyal Halisaha Downloader bir telefon uygulaması değil, bilgisayarında çalışan küçük bir web sayfası. Ama sayfa aynı Wi-Fi ağındaki telefondan da açılabiliyor. Böylece maç kaydını bilgisayara indirip telefona aktarmakla uğraşmadan doğrudan telefonuna kaydedebilirsin.</p>

## Nasıl çalışıyor?

Araç bilgisayarında bir web sunucusu açar. Bu sunucu yalnızca `localhost` üzerinden değil, bilgisayarın tüm ağ bağlantılarından gelen isteklere yanıt verir. Aynı Wi-Fi'deki telefon, bilgisayarın yerel IP adresiyle sayfayı açabilir.

Araç resmi değildir, sosyalhalisaha.com ile bir bağlantısı yoktur ve yalnızca kendi oynadığın maçların kayıtları için yazıldı.

## 1. Aracı bilgisayarda başlat

Kurmadıysan [Kurulum](/kurulum) sayfasındaki adımları izle, sonra proje klasöründe:

```bash
npm start
```

Terminalde `Server is running on 3000 port` satırını gör. Terminal açık kalmalı.

## 2. Bilgisayarın IP adresini bul

```bash
# Windows
ipconfig

# macOS (Wi-Fi)
ipconfig getifaddr en0

# Linux
hostname -I
```

Windows'ta Wi-Fi bağdaştırıcısının altındaki "IPv4 Adresi" satırına bak. Ev ağlarında adres çoğunlukla `192.168.` ile başlar.

## 3. Telefondan aç

Telefonu bilgisayarla aynı Wi-Fi ağına bağla. Tarayıcıya bilgisayarın adresini ve portu yaz:

```text
http://192.168.1.20:3000
```

Adres `http://` ile başlamalı. `localhost` yazma: telefonda localhost, telefonun kendisi demek.

Sayfa açılmazsa:

- **Güvenlik duvarı.** Windows, Node.js ilk kez ağdan bağlantı kabul ederken izin isteyebilir. Özel ağlar için izin ver.
- **Misafir ağı.** Bazı modemlerin misafir ağı cihazların birbirini görmesine izin vermez. İki cihazı da ana ağa bağla.
- **Sunucu kapalı.** Terminalde uygulamanın hâlâ çalıştığını kontrol et. Diğer sebepler [localhost:3000 açılmıyor](/blog/localhost-3000) yazısında.

## 4. Maç bağlantısını yapıştır

Kendi maçının video sayfasını telefonda aç, bağlantıyı kopyala ve formdaki **Video URL** alanına yapıştır. **Download Video** düğmesine bas. Birkaç saniye içinde önizleme ekranı açılır: video, maçın başlığı ve yükleyen.

Önizlemede doğru maç olduğunu kontrol et.

## 5. Videoyu kaydet

**Download** düğmesine bas. Araç tarayıcıya videoyu `match-record.mp4` adıyla indirmesini söyler. Ancak video başka bir alan adında durduğu için birçok tarayıcı bu isteği dikkate almaz ve videoyu yeni bir sekmede oynatır. O durumda:

- **Android (Chrome):** Videonun oynatıcı menüsündeki indirme seçeneğini kullan. Dosya İndirilenler klasörüne düşer.
- **iPhone (Safari):** Paylaş düğmesindeki seçeneklerle videoyu kaydet. Safari'nin indirdiği dosyalar Dosyalar uygulamasındaki İndirilenler klasöründe durur.

Menülerin adı tarayıcı ve sürüme göre değişebilir.

## Video nereden iniyor?

Bilgisayardaki araç yalnızca maç sayfasını okur ve video adresini bulur. Video dosyası bilgisayarın üzerinden geçmez; telefonun tarayıcısı onu doğrudan videonun bulunduğu sunucudan indirir. Bu yüzden mobil veri yerine Wi-Fi kullanmak mantıklı: maç kayıtları büyük dosyalar.

## Güvenlik

Araçta parola yok. Aynı ağa bağlı herkes sayfayı açıp formu kullanabilir. Evde sorun değil, ama kafe ya da yurt gibi ortak ağlarda aracı açık bırakma. İşin bitince terminalde `Ctrl` + `C` ile sunucuyu durdur.

## Sonra ne yapabilirsin?

İndirdiğin dosyayı tarih ve saha adıyla yeniden adlandır. Golleri kısa bir videoda toplamak için [halı saha maç özeti](/blog/hali-saha-mac-ozeti) yazısına bak.

## Sık sorulan sorular

### Telefona bir uygulama kurmam gerekiyor mu?

Hayır. Telefonun tarayıcısı yeterli. Aracı bilgisayarda çalıştırırsın, telefondan yalnızca adresini açarsın.

### Video bilgisayarın üzerinden mi iner?

Hayır. Araç yalnızca maç sayfasını okur. Video dosyasını telefonun tarayıcısı doğrudan videonun kendi adresinden indirir, bu yüzden telefonun internete bağlı olması gerekir.

### Telefonda adres açılmıyor, ne yapmalıyım?

Telefonun ve bilgisayarın aynı Wi-Fi ağında olduğunu, adresin `http://` ile başladığını ve bilgisayarın güvenlik duvarının Node.js'e izin verdiğini kontrol et.

## İlgili yazılar

- [Halı saha maçını izlemek ve kaydını saklamak](/blog/hali-saha-mac-izle)
- [Halı saha maç kaydından özet video çıkarmak](/blog/hali-saha-mac-ozeti)
- [localhost:3000 adresi ne anlama gelir, açılmazsa ne yapmalı?](/blog/localhost-3000)
- [MP4 dosyası ne demek, içinde neler var?](/blog/mp4-nedir)
- [Tüm yazılar](/blog/)
