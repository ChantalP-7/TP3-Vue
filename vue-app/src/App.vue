<template>
  <div class="max-w-screen-xl mx-auto">
    <nav class="bg-white border-gray-200 dark:bg-gray-900">
      <div class="flex flex-wrap items-center justify-between mx-auto p-4">
        <div class="flex items-center space-x-3 rtl:space-x-reverse">
          <h2 class="self-center text-4xl  whitespace-nowrap dark:text-white">Nomades Go!</h2>
        </div>
        <div class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-user">
          <ul class="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <router-link to="/" class="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500" aria-current="page">Accueil</router-link>
            </li>
            <li>
              <router-link to="/about-us" class="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500">À propos</router-link>
            </li>
            <li>
              <router-link to="/add-package" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Ajoute un forfait</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <!-- Vue Router View -->
    <router-view :inventory="inventory" />

    <!-- Footer -->
    <Footer />
  </div>
</template>

<script>
import Footer from './components/MainFooter.vue'
import myPackage from './myPackage.json'

export default {
  components: {
    Footer
  },
  data() {
    return {
      inventory: myPackage
    }
  }
}
</script>
