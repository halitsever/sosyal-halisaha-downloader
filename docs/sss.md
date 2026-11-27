---
title: 'Sık sorulan sorular: halısaha maç videosu indirme'
description: Halısaha maç videosu indirme aracı hakkında sık sorulan sorular. Resmi mi, kimin videolarını indirebilirsin, hata mesajları ne anlama gelir, nasıl çözülür?
---

# Sık sorulan sorular

Aracın ne olduğu, ne olmadığı ve takıldığında ne yapacağın üzerine en sık gelen sorular. Kurulum için [Kurulum](/kurulum), kullanım için [Nasıl kullanılır](/nasil-kullanilir) sayfasına bak.

## Bu resmi bir araç mı?

Hayır. Bu proje resmi değildir, sosyalhalisaha.com ile bir bağlantısı yoktur. O şirket tarafından yapılmadı, desteklenmiyor ve onaylanmadı. Halit Sever tarafından yazılmış, MIT lisanslı açık kaynak bir projedir.

## Kimin videolarını indirebilirim?

Araç, kendi oynadığın maçların herkese açık kayıtlarını arşivlemen için yazıldı. Proje eğitim ve kişisel kullanım amaçlıdır. Ticari kullanım ya da içerik dağıtımı için değildir.

Sana ait olmayan içeriği indirmek, paylaşmak ya da arşivlemek, sitenin kullanım koşullarına ve telif ya da kişisel veri yasalarına aykırı olabilir. Videoda başka oyuncular da görünür. Kaydı bir yerde paylaşmadan önce bunu düşün. Sorumluluk aracı çalıştıran kişidedir.

## Ücretli mi?

Hayır. Kaynak kodu GitHub'da açıktır ve MIT lisansıyla dağıtılır. Bir hesap, abonelik ya da anahtar gerekmez. Aracı kendi bilgisayarında sen çalıştırırsın.

## Videolarım ya da bağlantılarım bir yere gönderiliyor mu?

Uygulama senin makinende çalışır. Veritabanı yoktur ve geçmiş tutmaz. Sunucu yalnızca verdiğin adresteki sayfayı okur. Video dosyasını tarayıcın doğrudan kendi adresinden indirir. Sayfa isteği başarısız olursa adres ve hata mesajı, sunucuyu çalıştırdığın terminale yazılır.

Uygulamanın ekranları yazı tipi için Google Fonts'a, hata ekranı ise stil ve logo için dış adreslere bağlanır. Bunlar sayfa görünümü içindir.

## Başka sitelerde çalışır mı?

Kod, adresin yalnızca `https://` ile başlamasına bakar. Yine de okuma kısmı belirli bir sayfa yapısını bekler: `.video-player` içinde `const videoSrc = [...]` tanımlayan bir betik. Bu yapıya sahip olmayan sayfalarda `Script content not found` hatası alırsın.

## Hata mesajları ne anlama geliyor?

Hata ekranındaki ayrıntı satırı sorunun yerini söyler.

| Mesaj | Neden | Ne yapmalı |
| --- | --- | --- |
| `Invalid URL` | Adres `https://` ile başlamıyor. | Bağlantıyı adres çubuğundan eksiksiz kopyala. |
| `Script content not found` | Sayfada video oynatıcı bulunamadı. | Bağlantının maçın video sayfasına ait olduğunu kontrol et. Doğruysa sayfa yapısı değişmiş olabilir. |
| `Video script not found` | Oynatıcı var ama video adresi beklenen biçimde değil. | Sayfa yapısı değişmiş olabilir. Bir issue aç. |
| `Request failed with status code 404` | Sayfa bulunamadı. | Video kaldırılmış ya da bağlantı hatalı olabilir. |
| `timeout of 60000ms exceeded` | Sayfa 60 saniyede yanıt vermedi. | Bağlantını kontrol et ve yeniden dene. |

Son iki mesaj, sayfayı isteyen `axios` kitaplığından gelir. Durum kodu farklı olabilir.

## Dün çalışıyordu, bugün çalışmıyor. Neden?

Araç, karşı sitenin sayfa yapısına bağlıdır. O sayfa güncellenince seçiciler tutmaz ve yukarıdaki hatalardan biri çıkar. [Nasıl çalışır](/nasil-calisir#sayfa-yapısı-degisirse-ne-bozulur) sayfası hangi değişikliğin hangi hataya yol açtığını anlatır. Düzeltme çoğu zaman `src/scraper/video.parser.ts` dosyasında birkaç satırdır.

## Uygulama açılmıyor, ERR_UNKNOWN_FILE_EXTENSION hatası veriyor

Node sürümün TypeScript dosyalarını doğrudan çalıştırmıyor. Node 24 LTS kur ve `npm start` komutunu yeniden çalıştır. Ayrıntısı [Kurulum](/kurulum#err-unknown-file-extension) sayfasında.

## Download düğmesine basınca video sekmede açılıyor

Bazı tarayıcılar, başka bir alan adındaki dosyalar için indirme isteğini yok sayar ve videoyu oynatır. Oynatıcının üç nokta menüsünden ya da videoya sağ tıklayıp "Videoyu farklı kaydet" seçeneğinden dosyayı kaydedebilirsin.

## Telefondan kullanabilir miyim?

Uygulama bir web sayfasıdır, telefona kurulan bir uygulama değildir. Sunucuyu bilgisayarında çalıştırıp aynı ağdaki telefonundan `http://bilgisayarının-ip-adresi:3000` adresini açabilirsin. Uygulamada parola olmadığını unutma ve portu internete açma.

## Arayüz neden İngilizce?

Uygulamanın ekranları İngilizce yazıldı. Metinler `src/pages/` klasöründeki üç EJS dosyasındadır ve kendi kopyanda değiştirebilirsin.

## Bir hata buldum ya da katkı vermek istiyorum

[GitHub'da bir issue aç](https://github.com/halitsever/sosyal-halisaha-downloader/issues). Hata mesajını ve kullandığın Node sürümünü yaz. Kod göndermeden önce depodaki [katkı rehberini](https://github.com/halitsever/sosyal-halisaha-downloader/blob/main/.github/CONTRIBUTING.md) oku. Pull request'ler `main` dalına açılır.
