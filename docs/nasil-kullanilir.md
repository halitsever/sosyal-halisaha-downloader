---
title: 'Halısaha maç kaydı nasıl indirilir: adım adım kullanım'
description: Halısaha maç kaydını indirmenin adımları. Maç bağlantısını yapıştır, videoyu önizle ve match-record.mp4 olarak kaydet. Uygulamanın ekran görüntüleriyle.
---

# Halısaha maç kaydı nasıl indirilir

Bu sayfa, uygulamayı kurduktan sonra bir maç videosunu nasıl indireceğini adım adım gösterir. Henüz kurmadıysan önce [Kurulum](/kurulum) sayfasına bak. Buradaki ekran görüntüleri uygulamanın kendisinden alındı.

Araç kendi oynadığın maçların kayıtlarını saklaman için yazıldı. Resmi değildir, sosyalhalisaha.com ile bir bağlantısı yoktur.

## 1' Uygulamayı aç

Sunucu çalışırken tarayıcında `http://localhost:3000` adresine git. Portu değiştirdiysen o portu yaz. Karşına tek bir form gelir.

![Uygulamanın ana sayfası: Video URL alanı ve Download Video düğmesi](/screenshots/home-card.png)

Arayüz İngilizce. Formda bir adres alanı, bir düğme ve kısa bir kullanım uyarısı bulunur.

## 2' Maç sayfasının bağlantısını kopyala

Kendi maçının video sayfasını tarayıcıda aç ve adres çubuğundaki bağlantıyı kopyala. Formdaki örnek, beklenen adresin biçimini gösterir:

```text
https://sosyalhalisaha.com/video-detay/...
```

Adres `https://` ile başlamalı. `http://` ile başlayan ya da eksik yazılmış bir adres kabul edilmez.

## 3' Bağlantıyı yapıştır ve gönder

Bağlantıyı **Video URL** alanına yapıştır. Yanlış yapıştırdıysan alanın sağındaki çarpı düğmesi alanı temizler. Sonra **Download Video** düğmesine bas.

Düğmenin yazısı **Scraping…** olur ve yanında bir yükleme göstergesi döner. Bu sırada sunucu maç sayfasını okur. Yanıt çoğu zaman birkaç saniyede gelir. Sunucu en fazla 60 saniye bekler, sonra hata verir.

## 4' Videoyu önizle

Sayfa okununca **Video ready** başlıklı indirme ekranı açılır.

![İndirme sayfası: video önizlemesi, başlık, yükleyen ve Download düğmesi](/screenshots/download-card.png)

Bu ekranda üç şey görürsün:

- **Video oynatıcı.** Kaydı indirmeden önce izleyebilirsin. Doğru maç olduğunu burada kontrol et.
- **Title.** Maç sayfasındaki başlık. Başlık okunamazsa `No Title Found` yazar.
- **Uploader.** Videoyu yükleyen kişinin adı. Okunamazsa yerinde bir çizgi görünür.

## 5' Dosyayı kaydet

**Download** düğmesine bas. Tarayıcı dosyayı `match-record.mp4` adıyla indirmeye başlar ve dosya, tarayıcının indirilenler klasörüne düşer.

Video dosyası sunucudan geçmez. Tarayıcın onu doğrudan videonun kendi adresinden alır. Bu yüzden indirme hızı senin bağlantına ve videonun bulunduğu sunucuya bağlıdır.

::: tip Video indirilmek yerine yeni sekmede açılırsa
Bazı tarayıcılar başka bir alan adından gelen dosyalarda indirme isteğini dikkate almaz ve videoyu oynatır. Bu durumda oynatıcının üç nokta menüsünden ya da videoya sağ tıklayıp "Videoyu farklı kaydet" seçeneğinden kaydedebilirsin. Dosya adını kendin verirsin.
:::

## Hata sayfası görürsen

Sayfa okunamazsa **Error Occurred** başlıklı bir ekran açılır ve altında hatanın ayrıntısı yazar. En sık görülenler:

| Mesaj | Anlamı |
| --- | --- |
| `Invalid URL` | Adres `https://` ile başlamıyor. |
| `Script content not found` | Verdiğin sayfada video oynatıcı bulunamadı. Bağlantı bir maç video sayfasına ait olmayabilir. |
| `Video script not found` | Oynatıcı var ama video adresi beklenen biçimde değil. |

Her mesajın nedeni ve çözümü [Sık sorulan sorular](/sss#hata-mesajları-ne-anlama-geliyor) sayfasında.

## Kayıtlar nerede durur

Uygulama hiçbir şey saklamaz. Veritabanı yoktur, geçmiş tutulmaz ve sunucuya video yazılmaz. İndirdiğin dosya yalnızca kendi bilgisayarındadır. Başka bir maç için aynı adımları yeni bağlantıyla tekrarla.
