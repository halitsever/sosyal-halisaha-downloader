---
title: "EJS Nedir? Express ile Basit Şablon Örneği"
titleTemplate: false
description: "EJS nedir, Express ile nasıl kullanılır? Etiketler, res.render ile veri gönderme ve HTML kaçışı, küçük bir açık kaynak uygulamanın gerçek şablonları üzerinden."
headline: "EJS ile Express uygulamasına basit bir arayüz yazmak"
date: "2026-11-28"
keyword: "ejs"
lang: "tr"
faq:
  [
    {
      "q": "EJS ile React arasındaki fark ne?",
      "a": "EJS sayfayı sunucuda bir kez üretir ve tarayıcıya hazır HTML gönderir. React gibi kütüphaneler arayüzü tarayıcıda bileşenlerle yönetir. Birkaç ekranlık bir araç için EJS yeterlidir.",
    },
    {
      "q": "<%= ile <%- arasındaki fark ne?",
      "a": "<%= değeri HTML için kaçışlayarak yazar, < ve & gibi karakterler zararsız hale gelir. <%- değeri olduğu gibi yazar. Kullanıcıdan gelen veride her zaman <%= kullan.",
    },
    { "q": "EJS dosyaları nerede durur?", "a": "Express'te views ayarıyla belirttiğin klasörde. Bu projede src/pages klasöründe." },
  ]
---

# EJS ile Express uygulamasına basit bir arayüz yazmak

<p class="post-meta">Yazan <a href="https://halit.org">Halit Sever</a> · <time datetime="2026-11-28">28 Kasım 2026</time></p>

<p class="lead">EJS (Embedded JavaScript), HTML'in içine JavaScript yazmanı sağlayan bir şablon motoru. Ayrı bir ön yüz çatısı kurmadan, sunucuda sayfa üretmenin en yalın yollarından biri. Sosyal Halisaha Downloader'ın üç ekranı da EJS ile yazılmış. Bu yazı EJS'i o ekranlar üzerinden anlatıyor.</p>

## Express'e EJS'i tanıtmak

Uygulamanın tamamı [`src/index.ts`](https://github.com/halitsever/sosyal-halisaha-downloader/blob/main/src/index.ts) dosyasında. EJS iki satırla bağlanıyor:

```ts
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/pages"));
```

İlki şablon motorunu seçer, ikincisi şablonların klasörünü. Artık `res.render('index')` çağrısı `src/pages/index.ejs` dosyasını HTML'e çevirip gönderir.

## Sayfaya veri göndermek

Ana sayfada veri yok, düz form:

```ts
app.get("/", (req, res) => {
  res.render("index");
});
```

İndirme ekranı ise okunan maç bilgisini alır:

```ts
return void res.render("download", {
  data: scrapedData,
});
```

İkinci parametredeki nesnenin alanları şablonda değişken olarak görünür. Şablonda `data.video.title` yazınca maçın başlığına ulaşırsın.

## Etiketler

| Etiket       | Ne yapar                                                     |
| ------------ | ------------------------------------------------------------ |
| `<% ... %>`  | JavaScript çalıştırır, çıktı vermez. Koşul ve döngüler için. |
| `<%= ... %>` | Değeri HTML için kaçışlayarak yazar.                         |
| `<%- ... %>` | Değeri olduğu gibi, kaçışsız yazar.                          |
| `<%# ... %>` | Yorum. Çıktıya girmez.                                       |

Projenin indirme ekranından gerçek bir örnek:

```html
<video src="<%= data?.video?.videoUrl %>" controls></video> <span class="v"><%= data?.video?.title || '—' %></span>
```

Başlık yoksa bir çizgi gösterilir. Hata ekranı da aynı şekilde hatayı yazar:

```html
<a><%= error %></a>
```

## Kaçışlama neden önemli?

`<%=` değerdeki `<`, `>`, `&`, `"` ve `'` karakterlerini HTML varlıklarına çevirir. Böylece maç başlığında `<script>` yazsa bile tarayıcı onu kod olarak değil metin olarak gösterir. Dışarıdan gelen her veride `<%=` kullan. `<%-` yalnızca kendi ürettiğin, güvendiğin HTML için.

Bir ayrıntı daha var: `<%=` HTML için kaçışlar, JavaScript için değil. Bir `<script>` etiketinin içinde HTML varlıkları çözülmez. Projenin indirme ekranı eskiden adresi `'<%= data.video.videoUrl %>'` diye yazıyordu; adresteki `&` betiğe `&amp;` olarak geçiyor ve bağlantı bozuluyordu. Şimdi değeri JSON olarak yazıyor:

```html
a.href = <%- JSON.stringify(data.video.videoUrl ?? '').replace(/</g, '\\u003c') %>;
```

`JSON.stringify` tırnakları ve `&` karakterini JavaScript'te geçerli bir dizgiye çevirir. `<` karakterini `\u003c` yapmak da adresin içindeki bir `</script>` parçasının betiği erkenden kapatmasını önler. `<video src="...">` satırı ise bir HTML özniteliği olduğu için `<%=` ile doğru çalışır.

## EJS ne zaman yeterli?

Bu projede üç ekran var: form, indirme ekranı ve hata ekranı. Her biri tek bir istekle üretiliyor ve tarayıcıda karmaşık bir durum tutulmuyor. Böyle bir araç için EJS:

- Derleme adımı istemez.
- Tek bir npm paketiyle gelir.
- Sunucudan gelen veriyi doğrudan sayfaya yazar.

Arayüz büyüyüp tarayıcıda çok fazla etkileşim gerektirdiğinde bileşen tabanlı bir kütüphaneye geçmek mantıklı olur.

## Kendin dene

Arayüz metinleri İngilizce ve `src/pages/` klasöründeki üç dosyada. Kendi kopyanda Türkçeye çevirmek EJS'e başlamak için iyi bir alıştırma. Uygulamayı çalıştırmak için [Kurulum](/kurulum), nasıl çalıştığı için [Nasıl çalışır](/nasil-calisir) sayfasına bak.

## Sık sorulan sorular

### EJS ile React arasındaki fark ne?

EJS sayfayı sunucuda bir kez üretir ve tarayıcıya hazır HTML gönderir. React gibi kütüphaneler arayüzü tarayıcıda bileşenlerle yönetir. Birkaç ekranlık bir araç için EJS yeterlidir.

### <%= ile <%- arasındaki fark ne?

<%= değeri HTML için kaçışlayarak yazar, < ve & gibi karakterler zararsız hale gelir. <%- değeri olduğu gibi yazar. Kullanıcıdan gelen veride her zaman <%= kullan.

### EJS dosyaları nerede durur?

Express'te views ayarıyla belirttiğin klasörde. Bu projede src/pages klasöründe.

## İlgili yazılar

- [Web scraping nedir, Node.js ile nasıl yapılır?](/blog/web-scraping-nedir)
- [localhost:3000 adresi ne anlama gelir, açılmazsa ne yapmalı?](/blog/localhost-3000)
- [PM2 ile Node.js uygulamasını sunucuda sürekli çalıştırmak](/blog/nodejs-uygulamasi-sunucuda-calistirma)
- [TypeScript: türleri olan JavaScript, ve Node.js'in onu doğrudan çalıştırması](/blog/typescript-nedir)
- [Tüm yazılar](/blog/)
