---
title: "localhost:3000 Nedir, Neden Açılmıyor?"
titleTemplate: false
description: "localhost:3000 nedir, neden açılmıyor? Sunucu kapalı, port dolu, https yazılmış ya da başka cihazdan açılıyor olabilir. Node.js örneğiyle tek tek çözümleri."
headline: "localhost:3000 adresi ne anlama gelir, açılmazsa ne yapmalı?"
date: "2026-11-28"
keyword: "localhost 3000"
lang: "tr"
faq:
  [
    { "q": "localhost ile 127.0.0.1 aynı şey mi?", "a": "Çoğu sistemde evet. localhost, bilgisayarın kendisini gösteren ad. IPv4'te 127.0.0.1, IPv6'da ::1 adresine karşılık gelir." },
    {
      "q": "localhost:3000 adresini telefondan açabilir miyim?",
      "a": "Hayır. Telefonda localhost telefonun kendisi demek. Bilgisayardaki uygulamayı açmak için bilgisayarın yerel ağdaki IP adresini kullan, örneğin `http://192.168.1.20:3000`.",
    },
    { "q": "Adresin başına https yazınca neden açılmıyor?", "a": "Uygulama düz HTTP ile çalışıyor ve sertifikası yok. Adresi `http://` ile başlat." },
  ]
---

# localhost:3000 adresi ne anlama gelir, açılmazsa ne yapmalı?

<p class="post-meta">Yazan <a href="https://halit.org">Halit Sever</a> · <time datetime="2026-11-28">28 Kasım 2026</time></p>

<p class="lead">localhost:3000, bilgisayarında çalışan bir programın tarayıcıya açtığı kapıdır. Node.js ile yazılmış pek çok uygulama, Sosyal Halisaha Downloader da dahil, varsayılan olarak bu adresi kullanır. Adres açılmadığında sebep neredeyse her zaman aşağıdakilerden biridir.</p>

## Adresin parçaları

`http://localhost:3000` üç parçadan oluşur:

- **http://** Bağlantı şekli. Yerel geliştirme sunucuları genellikle şifresiz HTTP kullanır.
- **localhost** "Bu bilgisayar" demek. Ağa çıkmadan aynı makinedeki programa bağlanırsın. IPv4'te `127.0.0.1`, IPv6'da `::1` adresine karşılık gelir.
- **3000** Port numarası. Aynı bilgisayarda birden fazla sunucu çalışabilir; port, hangisine bağlanacağını söyler.

Sosyal Halisaha Downloader portu `PORT` ortam değişkeninden okur. Değişken yoksa 3000 kullanır:

```ts
this.port = parseInt(process.env.PORT ?? "3000");
```

## "Bağlantı reddedildi" ya da "Bu siteye ulaşılamıyor"

Tarayıcı bu hatayı, o portta dinleyen bir program olmadığında verir. Sırayla kontrol et:

### 1. Sunucu çalışıyor mu?

Uygulamayı başlattığın terminale bak. Sosyal Halisaha Downloader açılınca şu satırı yazar:

```text
Server is running on 3000 port
```

Terminal komut satırına geri döndüyse sunucu kapanmış demektir. Terminali kapatmak ya da `Ctrl` + `C` da sunucuyu durdurur.

### 2. Doğru komutla mı başlattın?

Bu projede uygulama `npm start` ile başlar ve Node 24 LTS ister. Eski bir Node sürümünde `ERR_UNKNOWN_FILE_EXTENSION` hatası alırsın. Port başka bir programdaysa uygulama `Port 3000 is already in use` yazıp kapanır. İkisi de [Kurulum](/kurulum) sayfasında anlatılıyor.

### 3. Port başka bir programda mı?

3000 portunu başka bir uygulama kullanıyorsa yenisi orada dinleyemez. Bu projede dikkat edilecek bir ayrıntı var: port doluyken uygulama yine `Server is running on 3000 port` yazıp hemen kapanır ve terminal komut satırına döner. Sunucu çalışıyor gibi görünür ama çalışmıyordur.

Portu kimin kullandığını bul:

```bash
# macOS ve Linux
lsof -i :3000

# Windows (PowerShell ya da komut istemi)
netstat -ano | findstr :3000
```

Ya o programı kapat ya da uygulamayı başka portta başlat:

```bash
PORT=8080 npm start
```

Sonra adresi `http://localhost:8080` olarak aç.

### 4. Adresi doğru mu yazdın?

- `https://localhost:3000` çalışmaz, çünkü uygulamanın sertifikası yok. `http://` yaz.
- Port numarasını kontrol et. `PORT` ile değiştirdiysen yeni numarayı kullan.

## Başka bir cihazdan açmak

localhost her cihazda o cihazın kendisi demek. Telefonda `localhost:3000` yazarsan telefon kendine bağlanmaya çalışır. Bilgisayardaki uygulamaya ulaşmak için bilgisayarın yerel ağdaki IP adresini kullan:

```text
http://192.168.1.20:3000
```

Bu uygulama yalnızca kendi bilgisayarında değil, tüm ağ arayüzlerinde dinler; aynı Wi-Fi'deki bir telefon bu adresle ona ulaşabilir. Adım adım anlatım [videoyu telefona kaydetme](/blog/videoyu-telefona-kaydetme) yazısında.

Uygulamada parola yok. Ağına bağlanabilen herkes formu kullanabilir. Portu internete açma.

## Sunucu açık kalsın istiyorsan

Terminal kapanınca uygulama da kapanır. Bilgisayar ya da sunucu açıldığında kendiliğinden başlasın istiyorsan [PM2 yazısına](/blog/nodejs-uygulamasi-sunucuda-calistirma) bak.

## Sık sorulan sorular

### localhost ile 127.0.0.1 aynı şey mi?

Çoğu sistemde evet. localhost, bilgisayarın kendisini gösteren ad. IPv4'te 127.0.0.1, IPv6'da ::1 adresine karşılık gelir.

### localhost:3000 adresini telefondan açabilir miyim?

Hayır. Telefonda localhost telefonun kendisi demek. Bilgisayardaki uygulamayı açmak için bilgisayarın yerel ağdaki IP adresini kullan, örneğin `http://192.168.1.20:3000`.

### Adresin başına https yazınca neden açılmıyor?

Uygulama düz HTTP ile çalışıyor ve sertifikası yok. Adresi `http://` ile başlat.

## İlgili yazılar

- [Web scraping nedir, Node.js ile nasıl yapılır?](/blog/web-scraping-nedir)
- [PM2 ile Node.js uygulamasını sunucuda sürekli çalıştırmak](/blog/nodejs-uygulamasi-sunucuda-calistirma)
- [Kendi maç videonu telefonuna kaydetmek](/blog/videoyu-telefona-kaydetme)
- [Bilgisayar ağlarında port: numaralar, aralıklar ve dolu port hatası](/blog/port-nedir)
- [Tüm yazılar](/blog/)
