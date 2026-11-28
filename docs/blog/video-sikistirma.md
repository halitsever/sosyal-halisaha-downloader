---
title: "Video Sıkıştırma: Maç Kaydını Kaliteyi Koruyarak Küçült"
titleTemplate: false
description: "Video sıkıştırma nasıl yapılır? Maç kaydını ffmpeg ile CRF, çözünürlük ve ses ayarlarıyla küçült. Denenmiş komutlar, ölçülmüş boyutlar ve sık yapılan hatalar."
headline: "Büyük bir maç videosunu ffmpeg ile küçültmek"
date: "2026-11-28"
keyword: "video sıkıştırma"
lang: "tr"
faq: [{"q": "Video sıkıştırınca kalite düşer mi?", "a": "Biraz düşer, çünkü sıkıştırma görüntüdeki bazı ayrıntıları atar. ffmpeg'de CRF değerini 23 ile 28 arasında tutarsan fark çoğu zaman telefonda zor görülür. Değer büyüdükçe dosya küçülür, kayıp artar."}, {"q": "Video boyutunu en çok ne küçültür?", "a": "Çözünürlüğü düşürmek. Denememizde 1080p bir videoyu aynı ayarla 720p yapınca dosya yaklaşık dörtte bire indi. Telefonda izlenecek bir maç için 720p çoğu zaman yeterlidir."}, {"q": "Telefonda video sıkıştırabilir miyim?", "a": "Evet, telefonun düzenleyicisi ya da bir uygulama ile. Bu yazı bilgisayardaki ffmpeg yöntemini anlatır; ayarları sen seçtiğin için sonucu daha iyi kontrol edersin."}]
---

# Büyük bir maç videosunu ffmpeg ile küçültmek

<p class="post-meta">Yazan <a href="https://halit.org">Halit Sever</a> · <time datetime="2026-11-28">28 Kasım 2026</time></p>

<p class="lead">Bir saatlik halı saha maç kaydı telefona sığmayabilir, mesajlaşma uygulamasının boyut sınırına takılabilir. Videoyu sıkıştırmak, görüntüyü gözle fark edilmeyecek kadar azaltıp dosyayı birkaç kat küçültmek demek. Bu yazıda ücretsiz ve açık kaynak ffmpeg ile bunun nasıl yapıldığını, denediğimiz komutlar ve ölçtüğümüz boyutlarla anlatıyoruz.</p>

## Önce: hangi video?

Bu yazıdaki komutlar bir MP4 dosyası için. Sosyal Halisaha Downloader'ın indirme düğmesi dosya için `match-record.mp4` adını önerir ([Nasıl kullanılır](/nasil-kullanilir)). Araç resmi değildir, sosyalhalisaha.com ile bağlantısı yoktur ve yalnızca senin kendi maç kayıtların için düşünülmüştür.

## ffmpeg'i kur

- **macOS:** `brew install ffmpeg`
- **Windows:** [ffmpeg.org](https://ffmpeg.org/download.html) indirme sayfasında bağlantısı verilen derlemelerden birini kur.
- **Linux:** dağıtımının paket yöneticisiyle, örneğin `sudo apt install ffmpeg`.

Kurulduğunu `ffmpeg -version` ile kontrol et.

## Tek komutla sıkıştırma

```bash
ffmpeg -i match-record.mp4 -c:v libx264 -crf 26 -preset medium -c:a aac -b:a 128k -movflags +faststart mac-kucuk.mp4
```

Parça parça:

| Parça | Ne yapar |
| --- | --- |
| `-c:v libx264` | Görüntüyü H.264 ile yeniden kodlar. Hemen her cihaz oynatır |
| `-crf 26` | Kalite ayarı. Küçük sayı daha iyi kalite ve daha büyük dosya demek |
| `-preset medium` | Hız ve sıkıştırma dengesi. `slow` daha küçük dosya verir ama daha uzun sürer |
| `-c:a aac -b:a 128k` | Sesi 128 kbit/sn AAC yapar. Konuşma ve tezahürat için yeterli |
| `-movflags +faststart` | Dosyanın dizinini başa alır, video tamamı inmeden oynamaya başlar |

## CRF kaç olmalı?

[FFmpeg'in H.264 rehberine](https://trac.ffmpeg.org/wiki/Encode/H.264) göre CRF 0 ile 51 arasındadır, varsayılan 23'tür, 17-18 neredeyse kayıpsız görünür ve mantıklı aralık 17-28'dir. Değeri 6 artırmak dosya boyutunu kabaca yarıya indirir. Rehberin tavsiyesi şu: kabul edebileceğin en yüksek CRF değerini seç.

Maç videosu için pratik başlangıç: 23 ile dene, telefonda izle, iyiyse 26 ya da 28'e çık.

## Ölçtüğümüz boyutlar

28 Kasım 2026'da FFmpeg 6.1.1 ile 20 saniyelik, 1080p, 30 fps bir deneme videosu (FFmpeg'in kendi `testsrc2` deseni, sesli) hazırlayıp sıkıştırdık:

| Ayar | Boyut |
| --- | --- |
| Kaynak dosya | 66,1 MB |
| 1080p, CRF 23 | 16,0 MB |
| 1080p, CRF 28 | 7,8 MB |
| 720p, CRF 28 | 2,1 MB |
| 1080p, H.265 (x265), CRF 28 | 12,1 MB |

Deneme deseni gerçek bir maç görüntüsü değil; çimen, hareket ve ışık sonucu değiştirir. Tabloyu kesin bir tahmin olarak değil, ayarların birbirine göre etkisi olarak oku.

Son satır şunu da gösteriyor: CRF sayıları kodlayıcılar arasında aynı anlama gelmez. x265 için 28, x264 için 28 ile aynı kalite ya da aynı boyut demek değildir.

## Çözünürlüğü düşürmek

En büyük kazanç buradan gelir. 1080p yerine 720p:

```bash
ffmpeg -i match-record.mp4 -vf scale=-2:720 -c:v libx264 -crf 26 -preset medium -c:a aac -b:a 128k -movflags +faststart mac-720p.mp4
```

`scale=-2:720` yüksekliği 720 piksel yapar, genişliği oranı koruyarak ve çift sayıya yuvarlayarak hesaplar. Kodlayıcı tek sayılı genişlik kabul etmediği için `-1` yerine `-2` kullanıyoruz.

## Daha kısa bir video

Bütün maçı göndermek zorunda değilsin. Sadece golleri ayırmak için [maç özeti yazısındaki](/blog/hali-saha-mac-ozeti) yöntemle önce parçaları kes, sonra bu yazıdaki komutla sıkıştır. Kısa bir videoyu sıkıştırmak hem daha hızlı hem daha küçük sonuç verir.

## Sık yapılan hatalar

- **Aynı dosyanın üstüne yazmak.** Çıktıya girdiyle aynı adı verme. ffmpeg dosyayı okurken üstüne yazamaz.
- **`-c copy` ile sıkıştırmaya çalışmak.** `-c copy` yeniden kodlamadan kopyalar; boyut değişmez. Kesmek için iyidir, sıkıştırmak için değil.
- **CRF'yi çok yükseltmek.** 35 üstü değerlerde çimen bulanıklaşır, top kaybolur. Önce çözünürlüğü düşürmeyi dene.
- **Ses ayarını unutmak.** Ses çoğu zaman küçük bir pay tutar ama kaynakta yüksek bit hızlıysa `-b:a 128k` fark yaratır.

## Paylaşmadan önce

Videoda başka oyuncular da var. Sıkıştırılmış hâlini bir gruba ya da sosyal medyaya koymadan önce onlara sor. [Halı saha maçını izleme ve saklama yazısı](/blog/hali-saha-mac-izle) bu konuyu ayrıntılı anlatıyor. Videoyu telefona almak için de [telefona kaydetme rehberine](/blog/videoyu-telefona-kaydetme) bakabilirsin.

## Sık sorulan sorular

### Video sıkıştırınca kalite düşer mi?

Biraz düşer, çünkü sıkıştırma görüntüdeki bazı ayrıntıları atar. ffmpeg'de CRF değerini 23 ile 28 arasında tutarsan fark çoğu zaman telefonda zor görülür. Değer büyüdükçe dosya küçülür, kayıp artar.

### Video boyutunu en çok ne küçültür?

Çözünürlüğü düşürmek. Denememizde 1080p bir videoyu aynı ayarla 720p yapınca dosya yaklaşık dörtte bire indi. Telefonda izlenecek bir maç için 720p çoğu zaman yeterlidir.

### Telefonda video sıkıştırabilir miyim?

Evet, telefonun düzenleyicisi ya da bir uygulama ile. Bu yazı bilgisayardaki ffmpeg yöntemini anlatır; ayarları sen seçtiğin için sonucu daha iyi kontrol edersin.

## İlgili yazılar

- [MP4 dosyası ne demek, içinde neler var?](/blog/mp4-nedir)
- [Halı saha maç kaydından özet video çıkarmak](/blog/hali-saha-mac-ozeti)
- [Kendi maç videonu telefonuna kaydetmek](/blog/videoyu-telefona-kaydetme)
- [Tüm yazılar](/blog/)
