<script setup lang="ts">
// Root component: owns the document-level i18n concerns (html lang, title,
// meta description) so they follow the language picked in the header.
const { locale, t, restoreLocale } = useLocale()

useHead({
  htmlAttrs: { lang: locale },
  title: () => t.value.meta.title,
  meta: [
    { name: 'description', content: () => t.value.meta.description },
    { property: 'og:title', content: () => t.value.meta.title },
    { property: 'og:description', content: () => t.value.meta.ogDescription },
  ],
})

// Re-apply a previously chosen language once hydrated (see useLocale).
onMounted(restoreLocale)
</script>

<template>
  <div class="relative min-h-screen">
    <AuroraBackground />
    <TheHeader />
    <main>
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ExperienceSection />
      <ProjectsSection />
      <ContactSection />
    </main>
    <TheFooter />
  </div>
</template>
