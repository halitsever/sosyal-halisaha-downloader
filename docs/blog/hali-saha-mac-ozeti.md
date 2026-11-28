---
title: "Halı Saha Maç Özeti Nasıl Çıkarılır?"
titleTemplate: false
description: "Halı saha maç kaydından golleri ayırıp kısa bir özet video yap: telefonun kendi düzenleyicisiyle ya da ffmpeg ile, yeniden kodlamadan ve tek komutla."
headline: "Halı saha maç kaydından özet video çıkarmak"
date: "2026-11-28"
keyword: "halı saha maç özeti"
lang: "tr"
faq:
  [
    {
      "q": "ffmpeg ile kesince neden video birkaç saniye erken başlıyor?",
      "a": "-c copy ile kesmek videoyu yeniden kodlamaz, bu yüzden kesim ancak anahtar karelerden başlayabilir. Saniyesi saniyesine kesim için videoyu yeniden kodla.",
    },
    {
      "q": "Özet videoyu paylaşmadan önce neye dikkat etmeliyim?",
      "a": "Özette de diğer oyuncular görünüyor. Herkese açık paylaşacaksan onlara sor ve kaydı yayımlayan platformun kurallarını kontrol et.",
    },
    { "q": "Bilgisayar olmadan özet çıkarabilir miyim?", "a": "Evet. Telefonun galeri uygulamasındaki kırpma aracıyla her gol için ayrı bir kısa video yapabilirsin." },
  ]
---

# Halı saha maç kaydından özet video çıkarmak

<p class="post-meta">Yazan <a href="https://halit.org">Halit Sever</a> · <time datetime="2026-11-28">28 Kasım 2026</time></p>

<p class="lead">Bir saatlik maç kaydında herkesin izlemek istediği birkaç dakika var: goller, kurtarışlar, kaçan penaltı. Bu yazı o anları kesip kısa bir özet video yapmanın iki yolunu anlatıyor: telefonun kendi video düzenleyicisi ve bilgisayarda ffmpeg.</p>

## Önce kaydı bilgisayara ya da telefona al

Özet, elindeki bir dosyadan çıkar. Kendi maçının kaydını Sosyal Halisaha Downloader ile `match-record.mp4` olarak indirebilirsin ([Nasıl kullanılır](/nasil-kullanilir)). Telefona doğrudan kaydetmek için [videoyu telefona kaydetme](/blog/videoyu-telefona-kaydetme) yazısına bak.

Araç resmi değildir ve yalnızca kendi oynadığın maçların kayıtları için yazıldı.

## Anları not al

Kaydı izlerken her anın başlangıç ve bitiş zamanını yaz:

| Olay     | Başlangıç | Bitiş    |
| -------- | --------- | -------- |
| 1. gol   | 00:12:30  | 00:12:48 |
| Kurtarış | 00:27:05  | 00:27:15 |
| 2. gol   | 00:41:10  | 00:41:30 |

Golden birkaç saniye önce başla. Atağın kuruluşu da izlemeye değer.

## Yol 1: Telefonun düzenleyicisi

Hem Android'deki galeri uygulamalarında hem iPhone'daki Fotoğraflar uygulamasında videoyu düzenle seçeneği ve bir kırpma çubuğu var. Her an için:

1. Videoyu aç ve düzenle seçeneğine dokun.
2. Kırpma çubuğunun iki ucunu anın başına ve sonuna çek.
3. Kopya olarak kaydet. Orijinal kayıt silinmesin.

Bu yol her gol için ayrı bir kısa video verir. Hepsini tek videoda birleştirmek için telefonun video düzenleme uygulamasını ya da bilgisayarda ffmpeg'i kullan.

## Yol 2: ffmpeg

[ffmpeg](https://ffmpeg.org/) ücretsiz, açık kaynak bir komut satırı aracı. Windows, macOS ve Linux'ta çalışır.

### Bir anı kesmek

```bash
ffmpeg -ss 00:12:30 -i match-record.mp4 -t 18 -c copy gol1.mp4
```

- `-ss` başlangıç zamanı. Girdiden (`-i`) önce yazılınca ffmpeg doğrudan o noktaya atlar.
- `-t` klibin süresi, saniye olarak. 12:30 ile 12:48 arası 18 saniye.
- `-c copy` videoyu yeniden kodlamaz, saniyeler içinde biter ve kaliteyi düşürmez.

`-c copy` ile kesim ancak bir anahtar kareden başlayabilir. Bu yüzden klip birkaç saniye erken başlayabilir. Tam saniyede kesmek istiyorsan yeniden kodla:

```bash
ffmpeg -ss 00:12:30 -i match-record.mp4 -t 18 -c:v libx264 -c:a aac gol1.mp4
```

Bu daha uzun sürer ama kesim istediğin karede olur.

### Anları tek videoda birleştirmek

Önce her anı ayrı dosya olarak kes (`gol1.mp4`, `kurtaris.mp4`, `gol2.mp4`). Sonra `liste.txt` adında bir dosyaya sırayla yaz:

```text
file 'gol1.mp4'
file 'kurtaris.mp4'
file 'gol2.mp4'
```

Ve birleştir:

```bash
ffmpeg -f concat -safe 0 -i liste.txt -c copy ozet.mp4
```

Parçalar aynı kayıttan ve aynı ayarlarla kesildiyse `-c copy` ile birleşir. Biri yeniden kodlanmış, diğeri kopyalanmışsa hepsini aynı yöntemle kes.

### Sesi kapatmak

Kayıtta konuşmalar varsa ve paylaşmak istemiyorsan `-an` sesi çıkarır:

```bash
ffmpeg -i ozet.mp4 -c copy -an ozet-sessiz.mp4
```

## Paylaşmadan önce

Özet videoda da sahadaki herkes görünüyor. Takım grubunda paylaşmak ile herkese açık bir hesapta paylaşmak farklı şeyler. Herkese açık paylaşacaksan diğer oyunculara sor. [Halı saha maç izle](/blog/hali-saha-mac-izle) yazısında bu konu biraz daha ayrıntılı.

## Sık sorulan sorular

### ffmpeg ile kesince neden video birkaç saniye erken başlıyor?

-c copy ile kesmek videoyu yeniden kodlamaz, bu yüzden kesim ancak anahtar karelerden başlayabilir. Saniyesi saniyesine kesim için videoyu yeniden kodla.

### Özet videoyu paylaşmadan önce neye dikkat etmeliyim?

Özette de diğer oyuncular görünüyor. Herkese açık paylaşacaksan onlara sor ve kaydı yayımlayan platformun kurallarını kontrol et.

### Bilgisayar olmadan özet çıkarabilir miyim?

Evet. Telefonun galeri uygulamasındaki kırpma aracıyla her gol için ayrı bir kısa video yapabilirsin.

## İlgili yazılar

- [Halı saha maçını izlemek ve kaydını saklamak](/blog/hali-saha-mac-izle)
- [localhost:3000 adresi ne anlama gelir, açılmazsa ne yapmalı?](/blog/localhost-3000)
- [Kendi maç videonu telefonuna kaydetmek](/blog/videoyu-telefona-kaydetme)
- [Büyük bir maç videosunu ffmpeg ile küçültmek](/blog/video-sikistirma)
- [Tüm yazılar](/blog/)
