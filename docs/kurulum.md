---
title: 'Kurulum: halısaha maç videosu indirme aracını çalıştır'
description: Halısaha maç videosu indirme aracını kendi bilgisayarına kur. Gereken Node sürümü, kurulum komutları, port ayarı ve en sık görülen kurulum hataları.
---

# Kurulum: aracı kendi bilgisayarında çalıştır

Sosyal Halisaha Downloader hazır bir site değil, senin çalıştırdığın küçük bir Node.js uygulamasıdır. Kurulum üç komuttan oluşur. Bu sayfa gerekenleri, komutları ve takılabileceğin yerleri anlatır.

::: warning Resmi bir araç değil
Bu proje resmi değildir, sosyalhalisaha.com ile bir bağlantısı yoktur. Kendi maç kayıtlarını saklaman için yazıldı.
:::

## Gerekenler

- **Node.js 24 LTS.** Projede derleme adımı yok. `npm start` komutu `node src/index.ts` çalıştırır ve Node, TypeScript dosyalarını kendi içindeki tür ayıklama özelliğiyle okur. Bu özellik Node 24 LTS sürümünde açık gelir. Bazı Node 22 sürümlerinde kapalıdır ve uygulama açılmaz.
- **npm.** Node ile birlikte gelir.
- **git.** Depoyu indirmek için. İstersen GitHub'dan ZIP olarak da indirebilirsin.
- **İnternet bağlantısı.** Sunucu, verdiğin maç sayfasını internetten okur.

Kurulu Node sürümünü şu komutla görürsün:

```bash
node -v
```

## Depoyu indir ve paketleri kur

```bash
git clone https://github.com/halitsever/sosyal-halisaha-downloader.git
cd sosyal-halisaha-downloader
npm i
```

`npm i` komutu Express, EJS, axios ve jsdom paketlerini kurar. Başka bir ayar dosyası ya da veritabanı gerekmez.

## Sunucuyu başlat

```bash
npm start
```

Her şey yolundaysa terminalde şu satırı görürsün:

```text
Server is running on 3000 port
```

Tarayıcında `http://localhost:3000` adresini aç. Karşına bağlantı yapıştırma formu gelir. Sonrası için [Nasıl kullanılır](/nasil-kullanilir) sayfasına geç.

Sunucuyu durdurmak için terminalde `Ctrl` + `C` tuşlarına bas.

## Portu değiştir

Uygulama `PORT` ortam değişkenini okur. Değişken yoksa `3000` portunu kullanır. Başka bir port için:

```bash
PORT=8080 npm start
```

Windows PowerShell kullanıyorsan önce değişkeni ayarla, sonra başlat:

```powershell
$env:PORT = 8080
npm start
```

## Çalıştığını doğrula

Projenin CI adımı da aynı kontrolü yapar: sunucuyu başlatır ve ana sayfanın yanıt verdiğine bakar. Aynısını ikinci bir terminalde deneyebilirsin:

```bash
curl -I http://localhost:3000/
```

Yanıtın ilk satırında `200 OK` görmelisin.

## Kurulumda sık görülen hatalar

### ERR_UNKNOWN_FILE_EXTENSION

```text
TypeError [ERR_UNKNOWN_FILE_EXTENSION]: Unknown file extension ".ts"
```

Kullandığın Node sürümü TypeScript dosyalarını doğrudan çalıştırmıyor. Node 24 LTS sürümüne geç ve `npm start` komutunu yeniden çalıştır.

### Geliştirme modu

Kodu değiştirirken `npm run dev` kullanabilirsin. Bu komut `node --watch src/index.ts` çalıştırır: Node'un kendi TypeScript desteğiyle başlar ve bir dosyayı kaydettiğinde uygulamayı yeniden başlatır. `npm start` ile aynı Node sürümünü ister.

### Port kullanımda

`3000` portunu başka bir program kullanıyorsa uygulama açılmaz ve şu hatayla kapanır:

```text
Port 3000 is already in use. Stop the program using it or pick another port, for example PORT=8080 npm start.
```

O programı kapat ya da yukarıdaki gibi `PORT` değişkeniyle boş bir port seç.

## Kimler erişebilir

Uygulamada giriş ekranı ya da parola yoktur. Porta ulaşabilen herkes formu kullanabilir ve sunucuya `https://` ile başlayan bir adresi okutabilir. Bu yüzden aracı kendi bilgisayarında ya da güvendiğin bir ağda çalıştır. İnternete açık bir sunucuya koyacaksan önüne kendi erişim denetimini ekle.

## Güncelleme

Yeni sürümü almak için depo klasöründe şu iki komutu çalıştır, sonra sunucuyu yeniden başlat:

```bash
git pull
npm i
```
