<template>
  <section
    ref="hero"
    class="hero-header-simple"
    :style="{
      backgroundImage: isVisible
        ? `url(${imageUrl})`
        : `url('data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      height: '300px',
      transition: 'background-image 0.8s ease-in-out'
    }"
  >
  </section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const hero = ref(null)
const isVisible = ref(false)
const overlayVisible = ref(false)
const titleVisible = ref(false)
const imageUrl = 'https://cdn.pixabay.com/photo/2014/04/23/00/15/plantation-330239_640.jpg'

onMounted(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        isVisible.value = true
        // Délai de 5 secondes avant d’afficher l’overlay
        setTimeout(() => {
          overlayVisible.value = true
          setTimeout(() => {
            titleVisible.value = true
          }, 2000)
        }, 3000)
        observer.disconnect()
      }
    },
    { threshold: 0.1 }
  )

  if (hero.value) observer.observe(hero.value)

  onBeforeUnmount(() => observer.disconnect())
})
</script>

<style scoped>
.hero-header {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  overflow: hidden;
}

.overlay {
  transform: translateY(-150px);
  opacity: 0;
  filter: blur(10px);
  transition:
    transform 1.2s cubic-bezier(0.25, 1, 0.5, 1),
    opacity 1.5s ease,
    filter 1.2s ease;
}

.overlay.active {
  transform: translateY(0);
  opacity: 1;
  filter: blur(0);
}

.title-animate {
  transform: translateY(20px);
  opacity: 0;
  transition: transform 0.8s ease, opacity 0.8s ease;
  will-change: transform, opacity;
}

.title-animate.active {
  transform: translateY(0);
  opacity: 1;
}
</style>

