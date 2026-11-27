<script setup lang="ts">
import { computed } from 'vue'
import { useData, withBase } from 'vitepress'

defineProps<{ compact?: boolean }>()

const { lang } = useData()
const repo = 'https://github.com/halitsever/sosyal-halisaha-downloader'

const t = computed(() =>
  lang.value === 'en'
    ? {
        notice: 'This is not an official tool and is not affiliated with sosyalhalisaha.com. It exists so you can keep recordings of your own matches.',
        source: 'Source code',
        issues: 'Report a problem',
        other: 'Türkçe',
        otherLink: '/',
        license: 'MIT licence',
        by: 'Written by',
      }
    : {
        notice: 'Bu araç resmi değildir, sosyalhalisaha.com ile bir bağlantısı yoktur. Kendi maç kayıtlarını saklaman için yazıldı.',
        source: 'Kaynak kod',
        issues: 'Sorun bildir',
        other: 'English',
        otherLink: '/en/',
        license: 'MIT lisansı',
        by: 'Geliştiren',
      },
)
</script>

<template>
  <footer class="pitch-footer" :class="{ compact }">
    <p class="pitch-footer__notice">
      <span class="card-mark" aria-hidden="true"></span>
      {{ t.notice }}
    </p>
    <nav class="pitch-footer__links" aria-label="Footer">
      <a :href="repo">{{ t.source }}</a>
      <a :href="`${repo}/issues`">{{ t.issues }}</a>
      <a :href="withBase(t.otherLink)">{{ t.other }}</a>
    </nav>
    <p class="pitch-footer__meta">
      {{ t.license }}. {{ t.by }} <a href="https://github.com/halitsever">Halit Sever</a>.
    </p>
  </footer>
</template>
