<template>
    <div>
    <HeroHeader/>
  <div class="min-h-screen flex items-center justify-center border-t border-gray-100">
    <div class="formulaire border mt-2 p-6 rounded-md w-full md:w-2/3 lg:w-1/2 xl:w-1/3">
      <div v-if="message" class="bg-red-500 mb-2 text-white p-2 rounded">{{ message }}</div>
      <h2 class="text-2xl font-semibold mb-6">Édite le forfait</h2>
      <div v-if="!submitted">
            <form @submit.prevent="savePackage" class="">
                <div class="mb-4">
                    <label for="myPackageName" class="block text-sm font-medium text-gray-700">Name</label>
                    <input v-model="myPackage.name" type="text" id="myPackageName" class="mt-1 p-2 border w-full rounded-md" required />
                </div>          
                <div class="mb-4">
                    <label for="myPackagePrice" class="block text-sm font-medium text-gray-700">Price (CAD)</label>
                    <input v-model.number="myPackage.price" type="text" id="myPackagePrice" class="mt-1 p-2 border w-full rounded-md" required />
                </div>
                <div class="mb-4">
                    <label for="myPackageDescription" class="block text-sm font-medium text-gray-700">Description</label>
                    <textarea v-model="myPackage.description" id="myPackageDescription" rows="8" class="mt-1 p-2 border w-full rounded-md" required></textarea>
                </div>
                <div class="form-control mt-5">            
                    <select v-model="myPackage.category_id" id="myPackageCategorie" class="select-form mt-1 p-2 border w-full rounded-md" required>
                        <option disabled value="">Sélectionne une catégorie</option>
                        <option v-for="c in categories" :key="c.id" :value="c.id">{{ c.category }}</option>
                    </select>
                    </div> 
                    <div class="ligneBasse">
                        <p></p>
                    </div>         
                <div>
                <label class="block text-gray-700 mb-2">Images URLs - maximum 5</label>
                <div v-for="(url, index) in myPackage.images" :key="index" class="form-control mt-5 flex items-center gap-2 mb-2">
                    <input
                        v-model="myPackage.images[index]"
                        type="url"
                        placeholder="Entre une image"
                        class="flex-1 border-dotted text-gray-100 text-sm rounded-lg px-3 py-2 focus:ring focus:ring-blue-300"
                    />
                    <button
                        type="button"
                        @click="removeImage(index)"
                        class="bg-red-500 text-white rounded-full px-2 py-1 text-sm hover:bg-red-600"
                    >
                        ✕
                    </button>
                    </div>

                    <button
                    type="button"
                    @click="addImage"
                    :disabled="myPackage.images.length >= 5"
                    class="mt-2 cursor-pointer text-blue-600 decoration-underline py-1 hover:text-green-600 disabled:opacity-50"
                    >
                    + Ajouter une image
                    </button>
                </div>
                <!-- Aperçu de la ou les images -->
                <div v-if="myPackage.images.length" class="grid grid-cols-3 gap-2 mt-4">
                    <img
                    v-for="(img, i) in myPackage.images"
                    :key="'prev-' + i"
                    :src="img"
                    class="w-full h-24 object-cover rounded-lg"
                    @error="onImageError(i)"
                    />
                </div> 
                <div class="mt-6">
          <button type="submit" class="btn-jade text-white px-4 py-2 rounded cursor-pointer">Enregistrer</button>
        </div>         
            </form>
      </div>
      <div v-else>
            <div class="text-green-600 font-semibold mb-4">Forfait modifié !</div>
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
  props:['inventory', 'updateInv', 'removeInv', 'remove'],
  data () {
    return{
      message: null,
      submitted: false,
      myPackage: {
        name: '',
        price: '',
        description: '',
        images: [],
        category_id: null
      },
      categories: [],
      id: parseInt(this.$route.params.id)
    }
  },
  mounted() {
  PackageDataService.getAllCategories()
    .then(res => { this.categories = res.data })
    .catch(err => console.error(err))

  PackageDataService.get(this.id)
    .then(response => {
      this.myPackage = response.data
    })
},
  computed: {
   myPackageIndex () {
      const index = this.inventory.findIndex((p) => {
          return p.id === this.id
      })
      return index
    }
  },
  
}
</script>