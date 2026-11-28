---
title: "MP4 Nedir? Dosya Biçimi, Codec ve Açılmama Sorunları"
titleTemplate: false
description: "MP4 nedir, ne demek? MP4'ün bir kap biçimi olduğunu, içindeki H.264 ve AAC'yi, dosyanın neden açılmadığını ve ffprobe ile nasıl inceleneceğini anlatıyoruz."
headline: "MP4 dosyası ne demek, içinde neler var?"
date: "2026-11-28"
keyword: "mp4 nedir"
lang: "tr"
faq: [{"q": "MP4 ne demek?", "a": "MP4, MPEG-4 Part 14 adlı standardın kısa adıdır. Görüntü, ses ve altyazı gibi parçaları tek dosyada taşıyan bir kap biçimidir. Uzantısı .mp4'tür."}, {"q": "MP4 dosyası neden açılmıyor?", "a": "En sık sebepler: dosya yarım inmiştir, içindeki görüntü codec'ini oynatıcı tanımıyordur ya da dosyanın dizin bölümü bozuktur. Başka bir oynatıcıda denemek ve ffprobe ile incelemek sebebi gösterir."}, {"q": "MP4 ile MOV arasındaki fark nedir?", "a": "İkisi de kap biçimidir ve çoğu zaman aynı codec'leri taşır. MOV, Apple'ın QuickTime biçimidir; MP4 ise ondan türeyen uluslararası standarttır. Telefonlar ikisini de kaydedebilir."}]
---

# MP4 dosyası ne demek, içinde neler var?

<p class="post-meta">Yazan <a href="https://halit.org">Halit Sever</a> · <time datetime="2026-11-28">28 Kasım 2026</time></p>

<p class="lead">MP4, bugün en yaygın video dosyası biçimi. Telefonun çektiği videolar, indirdiğin maç kaydı, mesajla gelen klipler çoğunlukla .mp4 uzantılıdır. Ama MP4 tek başına bir sıkıştırma yöntemi değil, içine görüntü ve ses koyulan bir kaptır. Bu ayrım, bir videonun neden bir cihazda açılıp ötekinde açılmadığını da açıklar.</p>

## Kısaca

MP4, resmi adıyla **MPEG-4 Part 14**, ISO/IEC 14496-14 standardıyla tanımlanan bir dosya biçimidir. Bir MP4 dosyası şunları taşıyabilir:

- bir ya da birkaç **görüntü** akışı,
- bir ya da birkaç **ses** akışı,
- altyazı, bölüm bilgisi, kapak resmi gibi ek parçalar.

Bu yüzden MP4'e **kap** (container) denir. Kabın içindeki görüntü ve ses ayrı ayrı sıkıştırılır. Bu sıkıştırma yöntemlerine **codec** denir.

## Kap ve codec farkı

Bir benzetmeyle: MP4 bir kutu, codec ise kutudaki şeyin nasıl paketlendiği.

| Katman | Örnekler |
| --- | --- |
| Kap | MP4, MOV, MKV, WebM |
| Görüntü codec'i | H.264 (AVC), H.265 (HEVC), AV1 |
| Ses codec'i | AAC, MP3, Opus |

En uyumlu birleşim MP4 içinde H.264 görüntü ve AAC ses. Neredeyse her telefon, tarayıcı ve televizyon bunu oynatır. H.265 aynı kalitede daha küçük dosya verebilir ama her cihaz ve tarayıcı desteklemez.

## Dosyanın içi: kutular

MP4 dosyası "box" (eski adıyla "atom") denen bloklardan oluşur. Üçü önemli:

- `ftyp`: dosyanın türünü söyler.
- `moov`: dizin. Hangi kare nerede, video kaç saniye, hangi codec kullanılmış.
- `mdat`: asıl görüntü ve ses verisi.

Oynatıcı önce `moov` kutusunu okumak zorundadır. Bazı programlar bu kutuyu dosyanın sonuna yazar; o zaman tarayıcı videoyu oynatmak için dosyanın tamamını beklemek zorunda kalır. `-movflags +faststart` seçeneği bu kutuyu başa taşır. Denememizde FFmpeg'in varsayılan çıktısında `mdat` önce, `moov` sonda geliyordu; `faststart` sonrası sıra tersine döndü.

## Bir MP4'ün içinde ne var?

FFmpeg ile birlikte gelen `ffprobe` dosyayı açmadan anlatır:

```bash
ffprobe -v error -show_entries stream=codec_name,width,height -of csv=p=0 match-record.mp4
```

Denediğimiz 720p dosyada çıktı şuydu:

```text
h264,1280,720
aac
```

İlk satır görüntü: H.264, 1280x720. İkinci satır ses: AAC.

## MP4 neden açılmaz?

**Dosya yarım inmiştir.** İndirme ya da kopyalama yarıda kaldıysa `moov` kutusu hiç yazılmamış olabilir. Dosya boyutu beklenenden küçükse yeniden indir.

**Codec desteklenmiyordur.** Dosya MP4 ama içi H.265 ya da AV1 ise eski bir cihaz oynatamayabilir. ffprobe ile codec'e bak. Gerekirse [video sıkıştırma yazısındaki](/blog/video-sikistirma) komutla H.264'e çevir.

**Dosya adı doğru, içerik değil.** Uzantıyı `.mp4` yapmak dosyayı MP4 yapmaz. Bir web sayfası ya da hata mesajı yanlışlıkla `.mp4` adıyla kaydedilmiş olabilir. ffprobe "Invalid data found" derse dosya gerçekten video değildir.

**Oynatıcı eskidir.** VLC gibi geniş codec desteği olan bir oynatıcıda dene.

## Maç kaydı ve MP4

Sosyal Halisaha Downloader, maç sayfasındaki video adresini okuyup tarayıcına verir. İndirme düğmesi dosya için `match-record.mp4` adını önerir. Tarayıcılar bu öneriyi yalnızca aynı alan adındaki dosyalarda dikkate aldığı için video bazen başka bir adla iner ya da yeni sekmede açılır. Araç videoyu dönüştürmez ya da yeniden kodlamaz ([Nasıl çalışır](/nasil-calisir)). Yani elindeki dosya, sitenin yayınladığı dosyanın aynısıdır. Araç resmi değildir ve yalnızca kendi kayıtların için düşünülmüştür.

Dosya büyükse [video sıkıştırma](/blog/video-sikistirma), sadece golleri ayırmak istiyorsan [maç özeti](/blog/hali-saha-mac-ozeti) yazısına geç.

## MP4 mü, MOV mu, MKV mi?

- **MP4:** en geniş uyum. Paylaşmak için ilk tercih.
- **MOV:** Apple'ın QuickTime biçimi. iPhone kayıtlarında sık görülür. İçerik çoğu zaman aynıdır; yeniden kodlamadan MP4'e alınabilir: `ffmpeg -i video.mov -c copy video.mp4`.
- **MKV:** çok sayıda ses ve altyazı akışını rahat taşır, ama telefonlarda ve tarayıcılarda desteği daha zayıftır.

## Sık sorulan sorular

### MP4 ne demek?

MP4, MPEG-4 Part 14 adlı standardın kısa adıdır. Görüntü, ses ve altyazı gibi parçaları tek dosyada taşıyan bir kap biçimidir. Uzantısı .mp4'tür.

### MP4 dosyası neden açılmıyor?

En sık sebepler: dosya yarım inmiştir, içindeki görüntü codec'ini oynatıcı tanımıyordur ya da dosyanın dizin bölümü bozuktur. Başka bir oynatıcıda denemek ve ffprobe ile incelemek sebebi gösterir.

### MP4 ile MOV arasındaki fark nedir?

İkisi de kap biçimidir ve çoğu zaman aynı codec'leri taşır. MOV, Apple'ın QuickTime biçimidir; MP4 ise ondan türeyen uluslararası standarttır. Telefonlar ikisini de kaydedebilir.

## İlgili yazılar

- [Büyük bir maç videosunu ffmpeg ile küçültmek](/blog/video-sikistirma)
- [Kendi maç videonu telefonuna kaydetmek](/blog/videoyu-telefona-kaydetme)
- [Halı saha maç kaydından özet video çıkarmak](/blog/hali-saha-mac-ozeti)
- [Tüm yazılar](/blog/)
