<template>
  <div>
    <HeroHeader/>
    <h1 class="text-center mt-20 mb-20 text-4xl text-gray-900 dark:text-white">Nos forfaits récents</h1>
    <div class="grid xs:gap-5 sm:grid-cols-2 sm:gap-4 lg:gap-6 lg:grid-cols-3  xl:grid-cols-4 xl:gap-10 border-gray-100 my-4" >
        <div v-if="paginatedItems.length > 0" v-for="(myPackage, i) in paginatedItems" :key="i" class="shadow-lg w-full max-w-sm  bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <img class="object-cover aspect-[3/2] p-0 rounded-t-lg":src="myPackage.images[0]" alt="package image" />
            <div class="px-5 pb-5">
                <h5 class="text-xl font-semibold tracking-tight mt-5 text-gray-900 dark:text-white mb-2">{{ myPackage.name }}</h5>
                <p class="text-lg  text-gray-900 dark:text-white"><strong>Prix : </strong>{{ myPackage.price.toFixed(2) }} $</p>
                <p class="text-lg  text-gray-900 dark:text-white"><strong>Catégorie : </strong>{{ myPackage.category }}</p>
                <button class="btn-jade mt-5">
                    <router-link :to="{ name: 'myPackage', params: { id: myPackage.id } }" class="text-white cursor-pointer hover:underline"> Voir</router-link>
                </button>
                
            </div>
        </div> 
        <div v-else>
      <p>Aucun forfait disponible pour le moment.</p>
    </div>       
    </div>
    <!-- Contrôle de la pagination -->
    <div class="flex justify-center items-center mt-20 mb-20 my-4">
      <button
        v-if="currentPage > 1"
        @click="goToPage(currentPage - 1)"
        class="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-600"
      >
        Précédent
      </button>
      <span class="mx-4 text-lg">Page {{ currentPage }} sur {{ totalPages }}</span>
      <button
        v-if="currentPage < totalPages"
        @click="goToPage(currentPage + 1)"
        class="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-600"
      >
        Suivant
      </button>
    </div>
  </div>
</template>

<script>
import HeroHeader from '../components/HeroHeader.vue'

export default {
  components: {
    HeroHeader
  },
  props: ['inventory'], 
  
data() {
    return {
      currentPage: 1,  // Page actuelle
      itemsPerPage: 8  // Nombre d'éléments par page
    }
  },
  computed: {
    totalPages() {
      // Calcul du nombre total de pages
      return Math.ceil(this.inventory.length / this.itemsPerPage)
    },
    paginatedItems() {
      // Calcule les éléments à afficher pour la page actuelle
      const start = (this.currentPage - 1) * this.itemsPerPage
      const end = start + this.itemsPerPage
      return this.inventory.slice(start, end)
    }
  },
  methods: {
    goToPage(page) {
      if (page < 1 || page > this.totalPages) return  // Eviter les pages invalides
      this.currentPage = page
    }
  }
  
}
</script>