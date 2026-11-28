---
title: "Port Nedir, Ne Demek? Bilgisayarda Port Numaraları"
titleTemplate: false
description: "Port nedir, ne demek? Ağdaki port numaraları, 80, 443 ve 3000 gibi örnekler, port aralıkları, PORT ayarı ve port dolu hatasının çözümü tek yazıda."
headline: "Bilgisayar ağlarında port: numaralar, aralıklar ve dolu port hatası"
date: "2026-11-28"
keyword: "port nedir"
lang: "tr"
faq: [{"q": "Port ne demek?", "a": "Ağda port, bir bilgisayardaki belirli bir programa giden trafiği gösteren numaradır. IP adresi bilgisayarı, port numarası o bilgisayardaki programı bulur. Numaralar 0 ile 65535 arasındadır."}, {"q": "En bilinen port numaraları hangileri?", "a": "80 HTTP, 443 HTTPS, 22 SSH, 25 e-posta gönderimi (SMTP), 53 DNS. Geliştirme sunucuları ise sıklıkla 3000, 5173 ya da 8080 kullanır."}, {"q": "Port already in use hatası nasıl çözülür?", "a": "O portu kullanan programı bul ve kapat ya da uygulamayı başka bir portta başlat. macOS ve Linux'ta lsof -i :3000, Windows'ta netstat -ano | findstr :3000 komutu portu kimin tuttuğunu gösterir."}]
---

# Bilgisayar ağlarında port: numaralar, aralıklar ve dolu port hatası

<p class="post-meta">Yazan <a href="https://halit.org">Halit Sever</a> · <time datetime="2026-11-28">28 Kasım 2026</time></p>

<p class="lead">Port kelimesi Türkçe aramalarda tıptan donanıma kadar farklı anlamlarla çıkıyor. Bu yazı bilgisayar ağlarındaki portu anlatıyor: bir bilgisayarda çalışan programların ağ trafiğini birbirinden ayırmaya yarayan numarayı. localhost:3000 gibi adreslerdeki 3000 de bir port numarası.</p>

## IP adresi ve port

Bir ağdaki her cihazın bir **IP adresi** vardır. Ama bir bilgisayarda aynı anda tarayıcı, e-posta programı, bir oyun ve belki küçük bir web sunucusu çalışır. Gelen bir paketin hangisine ait olduğunu **port numarası** söyler.

Bir benzetme: IP adresi apartmanın adresi, port numarası dairenin numarası.

Port numaraları TCP ve UDP protokollerinde 16 bitlik bir sayıdır, yani 0 ile 65535 arasında olur.

## Port aralıkları

İnternet numaralarını yöneten IANA, RFC 6335 ile portları üç gruba ayırır:

| Aralık | Adı | Örnek |
| --- | --- | --- |
| 0 - 1023 | Sistem portları (iyi bilinen portlar) | 80 HTTP, 443 HTTPS, 22 SSH |
| 1024 - 49151 | Kullanıcı (kayıtlı) portları | 3306 MySQL, 5432 PostgreSQL |
| 49152 - 65535 | Dinamik ya da özel portlar | işletim sisteminin geçici bağlantılar için seçtikleri |

Linux'ta 1024 altındaki portları dinlemek için genellikle yönetici yetkisi gerekir. Geliştirme sunucularının 3000, 5173 ya da 8080 gibi yüksek numaralar seçmesinin bir sebebi bu.

## Adreste port

Tarayıcıya `https://example.com` yazdığında port yazmazsın, çünkü HTTPS için varsayılan 443'tür; HTTP için 80. Varsayılan dışında bir port kullanılıyorsa adrese iki nokta üst üsteyle eklenir:

```text
http://localhost:3000
```

Burada `localhost` bilgisayarın kendisi, `3000` port numarası. Bu adresin parçaları ve açılmama sebepleri [localhost:3000 yazısında](/blog/localhost-3000) tek tek anlatılıyor.

## Bir program portu nasıl kullanır?

Sunucu programı bir portu **dinler** (listen). Sosyal Halisaha Downloader'da bu iş [src/config/app.config.ts](https://github.com/halitsever/sosyal-halisaha-downloader/blob/main/src/config/app.config.ts) ve [src/index.ts](https://github.com/halitsever/sosyal-halisaha-downloader/blob/main/src/index.ts) dosyalarında:

```ts
this.port = parseInt(process.env.PORT ?? '3000');
```

```ts
app.listen(AppConfig.port, () => {
    logger.info(`Server is running on ${AppConfig.port} port`);
});
```

`PORT` ortam değişkeni verilmezse 3000 kullanılır. Başka bir port için:

```bash
PORT=8080 npm start
```

Windows PowerShell'de: `$env:PORT=8080; npm start`.

## Port dolu: EADDRINUSE

Bir portu aynı anda yalnızca bir program dinleyebilir. İkinci program aynı portu açmaya çalışınca Node.js `EADDRINUSE` (address already in use) hatası üretir.

Bu projede dikkat edilecek bir ayrıntı var. 28 Kasım 2026'da Node.js 24 ile denedik: uygulama 3000 portunda çalışırken ikinci bir kopyasını aynı portta başlattık. İkinci kopya yine `Server is running on 3000 port` yazdı ve çıkış kodu 0 ile, yani hata yokmuş gibi kapandı. Uygulama, dinleme hatasını kontrol etmiyor; bu bir hata ve depoda henüz düzeltilmedi. Mesaj gelse bile terminal hemen komut satırına dönüyorsa port doludur.

Portu kimin tuttuğunu bul:

```bash
# macOS ve Linux
lsof -i :3000

# Windows
netstat -ano | findstr :3000
```

Ya o programı kapat ya da uygulamayı başka bir portta başlat.

## Port açmak ne demek?

"Port açmak" iki farklı şey için söylenir:

- **Güvenlik duvarında izin vermek.** Bilgisayardaki ya da sunucudaki güvenlik duvarı, dışarıdan o porta gelen bağlantıya izin verir.
- **Modemde yönlendirme (port forwarding).** İnternetten modeme gelen trafiği evdeki bir bilgisayara iletir.

Sosyal Halisaha Downloader için ikisine de gerek yok. Aynı Wi-Fi'deki telefondan açmak için bilgisayarın yerel IP adresi yeter; [telefona kaydetme yazısı](/blog/videoyu-telefona-kaydetme) adımları gösteriyor. Uygulamayı internete açmak, giriş kontrolü olmayan bir aracı herkese açmak demektir; önerilmez.

## Sık kullanılan portlar

| Port | Ne için |
| --- | --- |
| 22 | SSH, uzak sunucuya bağlanmak |
| 25 | SMTP, sunucular arası e-posta |
| 53 | DNS, alan adlarını IP'ye çevirmek |
| 80 | HTTP |
| 443 | HTTPS |
| 3000 | Node.js ve benzeri geliştirme sunucularında sık seçilen port |
| 8080 | HTTP için sık kullanılan alternatif |

## Sık sorulan sorular

### Port ne demek?

Ağda port, bir bilgisayardaki belirli bir programa giden trafiği gösteren numaradır. IP adresi bilgisayarı, port numarası o bilgisayardaki programı bulur. Numaralar 0 ile 65535 arasındadır.

### En bilinen port numaraları hangileri?

80 HTTP, 443 HTTPS, 22 SSH, 25 e-posta gönderimi (SMTP), 53 DNS. Geliştirme sunucuları ise sıklıkla 3000, 5173 ya da 8080 kullanır.

### Port already in use hatası nasıl çözülür?

O portu kullanan programı bul ve kapat ya da uygulamayı başka bir portta başlat. macOS ve Linux'ta lsof -i :3000, Windows'ta netstat -ano | findstr :3000 komutu portu kimin tuttuğunu gösterir.

## İlgili yazılar

- [localhost:3000 adresi ne anlama gelir, açılmazsa ne yapmalı?](/blog/localhost-3000)
- [Node.js: JavaScript'i tarayıcı dışında çalıştıran ortam](/blog/node-js-nedir)
- [PM2 ile Node.js uygulamasını sunucuda sürekli çalıştırmak](/blog/nodejs-uygulamasi-sunucuda-calistirma)
- [Tüm yazılar](/blog/)
