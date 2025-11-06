<template>
  <div class="min-h-screen flex items-center justify-center border-t border-gray-300">
    <div class="grid-container border border-gray-300 mt-2 p-6 rounded-md md:w-2/3 lg:w-1/2 xl:w-1/3">
      
      <div v-if="errorMessage" class="bg-red-500 mb-2 text-white p-2 rounded">{{ errorMessage }}</div>
      <h4 class="text-xl font-semibold mb-6">Ajoute un forfait</h4>

      <form class="space-y-4" @submit.prevent="savePackage">
        <!-- Nom du produit -->
        <div class="form-control mt-5">
          <label for="packageName" class="block text-sm font-medium text-gray-700">Nom du produit</label>
          <input v-model="myPackage.name" type="text" id="packageName" class="w-full p-2 border rounded" required />
        </div>

        <!-- Prix -->
        <div class="form-control mt-5">
          <label for="packagePrice" class="block text-sm font-medium text-gray-700">Prix (CAD)</label>
          <input v-model="myPackage.price" type="text" id="packagePrice" class="w-full p-2 border rounded" required />
        </div>

        <!-- Description -->
        <div class="form-control mt-5">
          <label for="packageDescription" class="block text-sm font-medium text-gray-700">Description du forfait</label>
          <textarea v-model="myPackage.description" id="packageDescription" rows="5"  class="w-full p-2 border rounded" required></textarea>
        </div>
        <div class="form-control mt-5">          
          <select v-model="myPackage.category_id" id="packageCategory" class="mt-1 p-2 border w-full rounded-md" required>
            <option disabled value="">Sélectionne une catégorie</option>
            <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.category }}</option>
          </select>
        </div>

        <!-- Images -->
        <div class="mt-5">
          <label class="block text-gray-700 mb-2">Images (URLs, max 5)</label>
          <div v-for="(url, index) in myPackage.images" :key="index" class="form-control mt-2 flex items-center gap-2">
            <input
              v-model.trim="myPackage.images[index]"
              type="url"
              placeholder="https://exemple.com/image.jpg"
              class="flex-1 border text-gray-300 text-sm rounded-lg px-3 py-2 focus:ring focus:ring-blue-300"
            />
            <button type="button" @click="removeImage(index)" class="bg-red-500 text-white rounded-full px-2 py-1 text-sm hover:bg-red-600">✕</button>
          </div>

          <button type="button" @click="addImage" :disabled="myPackage.images.length >= 5" class="mt-2 text-blue-600 hover:text-green-600 disabled:opacity-50">
            + Ajouter une image
          </button>
        </div>

        <!-- Aperçu des images -->
        <div v-if="myPackage.images.length" class="grid grid-cols-3 gap-2 mt-4">
          <img v-for="(img, i) in myPackage.images" :key="'prev-' + i" :src="img" class="w-full h-24 object-cover rounded-lg" />
        </div>
        <div class="mt-6">
          <button type="submit" class="btn-jade text-white px-4 py-2 rounded cursor-pointer">Enregistrer</button>
        </div>
      </form>

      <div v-if="successMessage" class="text-green-600 font-semibold mt-4">{{ successMessage }}</div>
    </div>
  </div>
</template>

<script>
import PackageDataService from '../services/PackageDataService'

export default {
  props: ['addInv'],
  data() {
    return {      
      categories: [],
      myPackage: {
        name: '',
        images: [],
        price: '',
        description: '',
        category_id: null
      },
      errorMessage: '',
      successMessage: ''
    }
  },
  mounted() {    
    PackageDataService.getAllCategories()
      .then(res => {
        this.categories = res.data
      })
      .catch(err => {
        console.error(err)
        this.errorMessage = "Impossible de charger les catégories"
      })
  },
  methods: {
    addImage() {
      if (this.myPackage.images.length < 5) this.myPackage.images.push('')
      else alert('Maximum 5 images autorisées.')
    },
    removeImage(index) {
      this.myPackage.images.splice(index, 1)
    },
    async savePackage() {

      this.errorMessage = ''
      this.successMessage = ''

      // Nettoyer les images vides et les doublons
      this.myPackage.images = [... new Set(this.myPackage.images.filter(url => url.trim() !== ''))]

      // Validation des champs requis
      if (!this.myPackage.name || !this.myPackage.price || !this.myPackage.description || !this.myPackage.category_id) {
          this.errorMessage = "Veuillez remplir tous les champs requis.";
          return;
        }

      // Validation du nombres d'images maximal

      if (this.myPackage.images.length > 5) {
        this.errorMessage = "Vous ne pouvez pas ajouter plus de 5 images."
        return
      }

      // Validation du prix (doit être un nombre)
      if (isNaN(Number(this.myPackage.price)) || Number(this.myPackage.price) <= 0) {
        this.errorMessage = "Veuillez entrer un prix valide.";
        return;
      }

      try {
        const res = await PackageDataService.create(this.myPackage)
        this.addInv && this.addInv(res.data)
        this.successMessage = "Forfait ajouté avec succès !"
        // Réinitialiser le formulaire
        this.myPackage = { name: '', images: [], price: null, description: '', category_id: null }
      } catch (e) {
        console.error(e)
        this.errorMessage = "Erreur lors de l’enregistrement."
      }
    }
  }
}
</script>