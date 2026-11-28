---
title: "Halı Saha Maç Videoları: Kendi Kaydını Sakla"
description: Halı saha maç videolarını kendi arşivinde sakla. Maç bağlantısını yapıştır, kaydı önizle ve indir. Kendi bilgisayarında çalışan, resmi olmayan bir araç.
faq:
  - q: Bu araç resmi mi?
    a: Hayır. Sosyal Halisaha Downloader resmi değildir ve sosyalhalisaha.com ile bir bağlantısı yoktur. Kendi maç kayıtlarını saklaman için yazılmış açık kaynak bir projedir.
  - q: Başkalarının maç videolarını indirebilir miyim?
    a: Araç yalnızca kendi oynadığın maçların kayıtları için yazıldı. Sana ait olmayan içeriği indirmek, paylaşmak ya da arşivlemek sitenin kullanım koşullarına, telif ve kişisel veri yasalarına aykırı olabilir.
  - q: Videolarım bir yere yükleniyor mu?
    a: Hayır. Uygulama senin bilgisayarında çalışır, veritabanı yoktur ve geçmiş tutmaz. Video dosyasını tarayıcın doğrudan videonun kendi adresinden indirir.
  - q: Telefonda kullanabilir miyim?
    a: Aracı bilgisayarında çalıştırıp aynı Wi-Fi ağındaki telefonundan bilgisayarın IP adresiyle açabilirsin. Telefona ayrıca bir uygulama kurman gerekmez.
---

# Halı saha maç videolarını kendi arşivinde sakla

Kameralı sahada oynadığın maçın kaydı internette yayımlanır, ama ne kadar süre yayında kalacağını sen belirlemezsin. Sosyal Halisaha Downloader, kendi maç kayıtlarını bilgisayarına ya da telefonuna kaydetmen için yazılmış açık kaynak bir araç. Kendi bilgisayarında çalışır, hesap ya da ücret istemez.

::: warning Resmi bir araç değil
Bu proje resmi değildir, sosyalhalisaha.com ile bir bağlantısı yoktur. Yalnızca kendi oynadığın maçların kayıtları için yazıldı. Sana ait olmayan içeriği indirmek, paylaşmak ya da arşivlemek sitenin kullanım koşullarına, telif ve kişisel veri yasalarına aykırı olabilir.
:::

## Nasıl görünüyor?

Uygulamada tek bir form var. Maç sayfasının bağlantısını yapıştırırsın:

![Uygulamanın ana sayfası: Video URL alanı ve Download Video düğmesi](/screenshots/home-card.png)

Uygulama sayfayı okur ve kaydı önizlemen için gösterir. Başlığı ve yükleyeni kontrol edip indirirsin:

![İndirme ekranı: video önizlemesi, maç başlığı, yükleyen ve Download düğmesi](/screenshots/download-card.png)

Ekran görüntüleri uygulamanın kendisinden alındı. Arayüz İngilizce.

## Üç adımda kur

1. **Node.js 24 LTS kur.** Uygulama TypeScript dosyalarını Node'un kendi özelliğiyle çalıştırır, bu yüzden Node 24 gerekir.
2. **Depoyu indir ve paketleri kur:**

   ```bash
   git clone https://github.com/halitsever/sosyal-halisaha-downloader.git
   cd sosyal-halisaha-downloader
   npm i
   ```

3. **Başlat ve aç:** `npm start` komutunu çalıştır, tarayıcıda `http://localhost:3000` adresine git.

Takılırsan [Kurulum](/kurulum) sayfası port ayarını ve sık görülen hataları anlatıyor. Adres açılmıyorsa [localhost:3000 açılmıyor](/blog/localhost-3000) yazısına bak.

## Arşivini düzenli tut

- **Dosyayı yeniden adlandır.** Her video `match-record.mp4` adıyla iner. İndirir indirmez tarih ve saha adıyla değiştir, örneğin `2026-11-21-kadikoy-sali.mp4`.
- **Tek klasörde topla.** Yıl ya da sezon klasörleri, eski bir maçı bulmayı kolaylaştırır.
- **Yedekle.** Maç kayıtları büyük dosyalar. Önemli olanları harici bir diske ya da kendi bulut alanına kopyala.
- **Özet çıkar.** Bir saatlik kaydın en iyi anlarını kısa bir videoda topla: [halı saha maç özeti](/blog/hali-saha-mac-ozeti).
- **Telefona al.** Bilgisayardaki aracı telefondan açıp videoyu doğrudan telefona kaydedebilirsin: [videoyu telefona kaydetme](/blog/videoyu-telefona-kaydetme).

## Diğer oyuncular da kayıtta

Videoda sahadaki herkes görünür. Kendin için saklamak ile herkese açık paylaşmak farklı şeyler. Paylaşmadan önce diğer oyunculara sor ve kaydı yayımlayan platformun kurallarına bak. Ayrıntılar [web scraping yasal mı](/blog/web-scraping-yasal-mi) yazısında.

## Sık sorulan sorular

### Bu araç resmi mi?

Hayır. Sosyal Halisaha Downloader resmi değildir ve sosyalhalisaha.com ile bir bağlantısı yoktur. Kendi maç kayıtlarını saklaman için yazılmış açık kaynak bir projedir.

### Başkalarının maç videolarını indirebilir miyim?

Araç yalnızca kendi oynadığın maçların kayıtları için yazıldı. Sana ait olmayan içeriği indirmek, paylaşmak ya da arşivlemek sitenin kullanım koşullarına, telif ve kişisel veri yasalarına aykırı olabilir.

### Videolarım bir yere yükleniyor mu?

Hayır. Uygulama senin bilgisayarında çalışır, veritabanı yoktur ve geçmiş tutmaz. Video dosyasını tarayıcın doğrudan videonun kendi adresinden indirir.

### Telefonda kullanabilir miyim?

Aracı bilgisayarında çalıştırıp aynı Wi-Fi ağındaki telefonundan bilgisayarın IP adresiyle açabilirsin. Telefona ayrıca bir uygulama kurman gerekmez.
