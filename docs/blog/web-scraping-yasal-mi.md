---
title: "Web Scraping Yasal mı? Dikkat Edilecekler"
titleTemplate: false
description: "Web scraping yasal mı? Cevap duruma bağlı. Kullanım koşulları, robots.txt, KVKK ve telif açısından genel bir bakış ve bu projenin kendine koyduğu sınırlar."
headline: "Web scraping yasal mı? Kullanım koşulları, KVKK ve telif"
date: "2026-11-28"
keyword: "web scraping laws"
lang: "tr"
faq:
  [
    {
      "q": "robots.txt yasal bir engel mi?",
      "a": "robots.txt, sitelerin otomatik tarayıcılara hangi yollara girmemelerini istediğini bildirdiği bir standart (RFC 9309). Kendisi bir yasa değil, ama sitenin isteğini gösterir ve kullanım koşullarıyla birlikte değerlendirilir.",
    },
    {
      "q": "Kendi maç videomu indirmek serbest mi?",
      "a": "Kaydı yayımlayan platformun kullanım koşulları ve videoda görünen diğer kişilerin hakları belirleyici. Platform kendi indirme seçeneğini sunuyorsa en güvenli yol odur.",
    },
    {
      "q": "Herkese açık bir sayfadaki veri serbestçe kullanılabilir mi?",
      "a": "Hayır, herkese açık olması tek başına yeterli değil. Kişisel veri içeriyorsa KVKK, bir eser içeriyorsa telif hukuku devreye girer.",
    },
  ]
---

# Web scraping yasal mı? Kullanım koşulları, KVKK ve telif

<p class="post-meta">Yazan <a href="https://halit.org">Halit Sever</a> · <time datetime="2026-11-28">28 Kasım 2026</time></p>

<p class="lead">Bir sayfayı programla okumak teknik olarak her zaman mümkün. Okumanın, saklamanın ve paylaşmanın serbest olup olmadığı ise başka bir soru. Bu yazı hukuki danışmanlık değil. Konuyu belirleyen başlıkları ve Sosyal Halisaha Downloader'ın kendine koyduğu sınırları özetliyor. Kendi durumun için bir hukukçuya danış.</p>

## Tek bir cevap yok

"Web scraping yasal mı?" sorusunun cevabı, neyi okuduğuna, nasıl okuduğuna ve okuduğunla ne yaptığına göre değişir. Aynı kod, bir durumda sorunsuz, başka bir durumda kurallara aykırı olabilir. Aşağıdaki başlıklar, bir scraping işine bakarken sorulması gereken soruları gösteriyor.

## 1. Sitenin kullanım koşulları

Her sitenin kendi kullanım koşulları var. Birçoğu otomatik araçlarla veri toplamayı, içeriği indirmeyi ya da yeniden yayımlamayı sınırlar. Koşulları kabul ederek bir hesap açtıysan bu kurallar seni bağlar. Scraping'e başlamadan önce okunacak ilk belge budur.

## 2. robots.txt

Siteler, kök dizinlerindeki `robots.txt` dosyasıyla otomatik tarayıcılara hangi yollara girmemelerini istediklerini bildirir. Bu kuralın biçimi [RFC 9309](https://www.rfc-editor.org/rfc/rfc9309) ile standartlaştı. Dosyanın kendisi bir yasa değildir, ama sitenin isteğini açıkça gösterir. Ona uymak, iyi niyetin en basit göstergesidir.

## 3. Kişisel veriler: KVKK

Türkiye'de kişisel verilerin işlenmesi [6698 sayılı Kişisel Verilerin Korunması Kanunu](https://www.mevzuat.gov.tr/mevzuat?MevzuatNo=6698&MevzuatTur=1&MevzuatTertip=5) ile düzenleniyor. Bir kişinin yüzünün göründüğü video, kimliği belirlenebilir bir kişiye ait bilgi olduğu için kişisel veri sayılır. Halı saha kaydında sahadaki herkes görünür. Bir videoyu kendin için saklamak ile onu herkese açık yayımlamak arasında bu açıdan büyük fark var.

## 4. Telif

[5846 sayılı Fikir ve Sanat Eserleri Kanunu](https://www.mevzuat.gov.tr/mevzuat?MevzuatNo=5846&MevzuatTur=1&MevzuatTertip=3), eserleri ve bunlar üzerindeki hakları düzenler. Bir sayfadaki metin, fotoğraf ya da video bir esere dönüşebilir ve hakları sahibine aittir. Bir içeriği okuyabilmen, onu çoğaltıp dağıtabileceğin anlamına gelmez.

## 5. Karşı sunucuya yük

Saniyede yüzlerce istek gönderen bir program, sitenin çalışmasını bozabilir. Tek bir sayfayı tek bir kez okumak ile siteyi baştan sona taramak aynı şey değil. Tarama hızını sınırlamak hem teknik hem de etik bir gerekliliktir.

## Bu projenin kendine koyduğu sınırlar

Sosyal Halisaha Downloader'ın README dosyasındaki uyarı açık: proje eğitim ve kişisel kullanım amaçlı, ticari kullanım ya da içerik dağıtımı için değil. Sana ait olmayan içeriği indirmek, paylaşmak ya da arşivlemek platformun kullanım koşullarına, telif ve kişisel veri yasalarına aykırı olabilir.

Kod da buna göre yazılmış:

- **Tek sayfa, tek istek.** Araç verdiğin bir adresi bir kez okur. Siteyi taramaz, listeler toplamaz.
- **Oturum yok.** Giriş yapmaz, çerez göndermez; yalnızca herkese açık sayfayı okur.
- **Hedef listesi yok.** Koddaki alan adı listesi bilerek yoruma alınmış. Araç belirli bir siteyi hedef almıyor, yalnızca `https://` ile başlayan adresi kabul ediyor.
- **Hiçbir şey saklanmaz.** Veritabanı yok, geçmiş tutulmaz. Video sunucudan geçmez, tarayıcın onu doğrudan indirir.

Araç resmi değildir, sosyalhalisaha.com ile bir bağlantısı yoktur ve yalnızca kendi oynadığın maçların kayıtları için yazıldı. Sorumluluk aracı çalıştıran kişidedir.

## Kontrol listesi

Bir scraping işine başlamadan önce:

1. Site bir API ya da indirme seçeneği sunuyor mu? Varsa onu kullan.
2. Kullanım koşulları ne diyor?
3. `robots.txt` bu yolu kapatıyor mu?
4. Okuduğun veri kişisel veri ya da başkasına ait bir eser mi?
5. Sonucu yalnızca kendin için mi kullanacaksın, yoksa yayımlayacak mısın?
6. İstek hızın siteyi rahatsız eder mi?

Tekniğin kendisi için [web scraping nedir](/blog/web-scraping-nedir) yazısına bakabilirsin.

## Sık sorulan sorular

### robots.txt yasal bir engel mi?

robots.txt, sitelerin otomatik tarayıcılara hangi yollara girmemelerini istediğini bildirdiği bir standart (RFC 9309). Kendisi bir yasa değil, ama sitenin isteğini gösterir ve kullanım koşullarıyla birlikte değerlendirilir.

### Kendi maç videomu indirmek serbest mi?

Kaydı yayımlayan platformun kullanım koşulları ve videoda görünen diğer kişilerin hakları belirleyici. Platform kendi indirme seçeneğini sunuyorsa en güvenli yol odur.

### Herkese açık bir sayfadaki veri serbestçe kullanılabilir mi?

Hayır, herkese açık olması tek başına yeterli değil. Kişisel veri içeriyorsa KVKK, bir eser içeriyorsa telif hukuku devreye girer.

## İlgili yazılar

- [Halı saha maçını izlemek ve kaydını saklamak](/blog/hali-saha-mac-izle)
- [Web scraping nedir, Node.js ile nasıl yapılır?](/blog/web-scraping-nedir)
- [Halı saha maç kaydından özet video çıkarmak](/blog/hali-saha-mac-ozeti)
- [Tüm yazılar](/blog/)
