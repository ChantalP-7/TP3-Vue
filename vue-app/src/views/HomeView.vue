<template>
  <div>
    <HeroHeader/>

    <h1 class="text-center mt-20 mb-20 text-3xl text-gray-900 dark:text-white">
      Nos derniers forfaits
    </h1>

    <div class="grid mb-20 xs:gap-5 sm:grid-cols-2 sm:gap-4 lg:gap-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-10 border-gray-100 my-4">
      <div
        
        v-for="(myPackage, i) in recentPackages"
        :key="i"
        class="shadow-lg w-full max-w-sm bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700"
      >
        <img
          class="object-cover aspect-[3/2] p-0 rounded-t-lg"
          :src="getFirstImage(myPackage.images)"
          alt="myPackage image"
        />
        <div class="px-5 pb-5">
          <h5 class="text-xl font-semibold tracking-tight mt-5 text-gray-900 dark:text-white mb-2">
            {{ myPackage.name }}
          </h5>
          <p class="text-lg text-gray-900 dark:text-white">
            <strong>Prix : </strong>{{ myPackage.price.toFixed(2) }} $
          </p>
          
          <button class="btn-jade mt-5">
            <router-link
              :to="{ name: 'package', params: { id: myPackage.id } }"
              class="text-white cursor-pointer hover:underline"
            >
              Voir
            </router-link>
          </button>
        </div>
      </div>
    </div>    
  </div>
</template>
<script>
import HeroHeader from '../components/HeroHeader.vue'
import PackageDataService from '../services/PackageDataService'
export default {
  components: { HeroHeader },
  props: ['inventory'], 

  data() {
    return {
      recentPackages: []
    }
  },
  mounted() {
    PackageDataService.getRecent()
      .then(res => this.recentPackages = res.data)
      .catch(err => console.error(err))
  },
  methods: {   
       // Méthode pour récupérer la première image
    getFirstImage(images) {
      try {
        if (!images) return ''
        // Si images est une string JSON
        const arr = Array.isArray(images) ? images : JSON.parse(images)
        return arr[0] || ''
      } catch (err) {
        console.error('Erreur parsing images:', err)
        return ''
      }
    },     
  }
}
</script>