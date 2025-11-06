<template>
  <div class="max-w-screen-xl mx-auto">
    <nav class="bg-white border-gray-200 dark:bg-gray-900">
      <div class="flex flex-wrap items-center justify-between mx-auto p-4">
        <div class="flex items-center space-x-3 rtl:space-x-reverse">
          <h2 class="self-center text-4xl  whitespace-nowrap dark:text-white">Nomades Go!</h2>
        </div>
        <!--Mobile-->
        <button 
        @click="isMenuOpen = !isMenuOpen"
        type="button"
        class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
        aria-controls="navbar-user"
        :aria-expanded="isMenuOpen"
      >
        <span class="sr-only">Ouvrir le menu principal</span>
        <svg class="w-6 h-6" :class="{ 'hidden': isMenuOpen }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                d="M4 6h16M4 12h16M4 18h16"/>
        </svg>
        <svg class="w-6 h-6" :class="{ 'hidden': !isMenuOpen }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>
      <!--Fin mobile-->
        <div  :class="[
          'w-full md:block md:w-auto md:order-1 transition-all duration-300 ease-in-out',
          isMenuOpen ? 'block' : 'hidden'
        ]" id="navbar-user">
          <ul class="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <router-link to="/" class="block py-2 px-3 rounded hover:bg-gray-100 
         md:bg-transparent md:text-blue-700 md:p-0 
         md:hover:text-blue-700 dark:text-white 
         md:dark:hover:text-blue-500 dark:hover:text-white" aria-current="page">Accueil</router-link>
            </li>
            <li>
              <router-link to="/about-us" class="block py-2 px-3 rounded hover:bg-gray-100 
         md:bg-transparent md:text-blue-700 md:p-0 
         md:hover:text-blue-700 dark:text-white 
         md:dark:hover:text-blue-500 dark:hover:text-whit">À propos</router-link>
            </li>
            <li>
              <router-link to="/all-packages" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Tous les forfait</router-link>
            </li>
            <li>
              <router-link to="/add-package" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Ajoute un forfait</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <!-- Vue Router View -->
    <router-view 
      :inventory="inventory" 
      :categories="categories" 
      :addInv="addInventory"
      :updateInv="updateInventory"
      :removeInv="removeInventory"
    />

    <!-- Footer -->
    <Footer />
  </div>
</template>

<script>
import Footer from './components/MainFooter.vue'
//import myPackage from './myPackage.json'
import PackageDataService from './services/PackageDataService'
export default {  
  components: {
    Footer
  },
  data() {
    return {
      inventory: [],
      categories: [],
      isMenuOpen: false
    }
  },
  mounted() {
  PackageDataService.getAll()
    .then(res => {
      this.inventory = res.data
    })
    .catch(err => console.error(err))

  PackageDataService.getAllCategories()
    .then(res => {
      this.categories = res.data
    })
    .catch(err => console.error(err))
},
  methods: {
     addInventory (p) {
      this.inventory.push(p)
    },
    updateInventory (index, data){
      this.inventory[index] = data
    },
    removeInventory (index){
      this.inventory.splice(index, 1);
    }
  }
}
</script>
