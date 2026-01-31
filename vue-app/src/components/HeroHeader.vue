<template>
  <section
    ref="hero"
    class="hero-header"
    :style="{
      backgroundImage: isVisible
        ? `url(${imageUrl})`
        : `url('data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      height: '500px',
      transition: 'background-image 0.6s ease-in-out'
    }"
  >
    <div class="py-8 px-4 mx-auto lg:py-16 lg:px-6">
      <div
        class="overlay sm:text-lg bg-[rgba(31,41,55,0.6)] p-8 rounded-md"
        :class="{ active: overlayVisible  }"
      >
        <h2 class="mb-4 text-4xl tracking-tight text-white title-animate" :class="{ active: titleVisible }">Évadez-vous !</h2>
        <p class="mb-4 text-2xl text-white">
          Des forfaits pour les aventureux, les amoureux de la nature et pour ceux qui veulent se
          dorloter!
        </p>
        <p class="mb-4 text-white text-2xl">
          Profitez de nos rabais surprises à chaque semaine !
        </p>
        <p class="mb-4 text-white text-2xl">
          Cette semaine : Escapade surprise à Hawaïï - 25 % de rabais !
        </p>

        <div class="flex items-center justify-start gap-4">
          <a href="#" class="hover:text-blue-600 text-white">
            <svg width="36" height="36" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path fill="none" d="M0 0h24v24H0z"></path>
              <path
                d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z"
              ></path>
            </svg>
          </a>

          <a href="#" class="hover:text-blue-600 text-white">
            <svg width="28" height="28" role="img" viewBox="0 0 24 24" fill="currentColor">
              <title>TikTok icon</title>
              <path
                d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"
              ></path>
            </svg>
          </a>

          <a href="#" class="hover:text-blue-600 text-white">
            <svg width="28" height="28" role="img" viewBox="0 0 24 24" fill="currentColor">
              <title>Instagram icon</title>
              <path
                d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"
              ></path>
            </svg>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const hero = ref(null)
const isVisible = ref(false)
const overlayVisible = ref(false)
const titleVisible = ref(false)
const imageUrl = 'https://images.pexels.com/photos/772686/pexels-photo-772686.jpeg'

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

/* Animation overlay */
/*.overlay {
  position: relative;
  transform: translateY(-150px); /* déplacement plus marqué */
 /* opacity: 0;
  transition:
    transform 1.2s cubic-bezier(0.25, 1, 0.5, 1),
    opacity 1.2s ease;
  will-change: transform, opacity; /* optimisation GPU */
/*}*/

/*.overlay.active {
  transform: translateY(0);
  opacity: 1;
}*/
</style>

