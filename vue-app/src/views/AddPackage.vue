<template>
  <div class="min-h-screen flex items-center justify-center border-t border-gray-100">
    <div class="border mt-2 p-6 rounded-md w-full md:w-2/3 lg:w-1/2 xl:w-1/3">
      <div class="bg-red-500 mb-2 text-white p-2 rounded">Message d'erreur</div>
      <h2 class="text-2xl font-semibold mb-6">Ajoute un forfait</h2>
      <div>
        <form>
          <div class="mb-4">
            <label for="packageName" class="block text-sm font-medium text-gray-700">Product Name</label>
            <input v-model="package.name" type="text" id="packageName" class="mt-1 p-2 border w-full rounded-md" required />
          </div>
          <div class="mb-4">
            <label for="packagePhoto" class="block text-sm font-medium text-gray-700">Photo</label>
            <input v-model="package.photo" type="text" id="packagePhoto" class="mt-1 p-2 border w-full rounded-md" required />
          </div>
          <div class="mb-4">
            <label for="packagePrice" class="block text-sm font-medium text-gray-700">Prix (CAD)</label>
            <input v-model="package.price" type="text" id="packagePrice" class="mt-1 p-2 border w-full rounded-md" required />
          </div>
          <div class="mb-4">
            <label for="packageDescription" class="block text-sm font-medium text-gray-700">Description du forfait</label>
            <textarea v-model="package.description" id="packageDescription" class="mt-1 p-2 border w-full rounded-md" required></textarea>
          </div>
          <div class="mb-4">
            <label for="packageCategory" class="block text-sm font-medium text-gray-700">Categorie du forfait</label>
            <select v-model="package.categorie" id="packageCategorie" class="mt-1 p-2 border w-full rounded-md" required>
              <option value="">Selectionne une catégorie</option>
              <option value="Footwear">Footwear</option>
              <option value="Accessories">Accessories</option>
              <option value="Electronics">Electronics</option>
              <option value="Home Decor">Home Decor</option>
              <option value="Footwear">Footwear</option>
              <option value="Beauty">Beauty</option>
              <option value="Travel Accessories">Travel Accessories</option>
              <option value="Fashion">Fashion</option>
            </select>
          </div>
          <div class="mb-6">
            <button type="button" @click="savePackage" class="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">
              Enregistrer
            </button>
          </div>
        </form>
      </div>
      <div>
        <div class="text-green-600 font-semibold mb-4">Message de success</div>
        <button class="w-full bg-green-500 text-white p-2 rounded-md hover:bg-green-600">
          Nouveau produit
        </button>
      </div>
    </div>
  </div>
</template>

<script>
//import ProductDataService from '../services/ProductDataService'

export default {
  data () {

    return {
      package: {
        name: "Forfait 1",
        photo: '',
        price: '',
        description: '',
        category: ''
      }
    }
    
      

  },
  /*savePackage () {
      PackageDataService.create(this.package)
        .then((response) => {
          // console.log(response.data)
          this.package.id = response.data.id
          this.addInv(this.package)
          this.message = null
          this.submitted = true
          // this.$router.push({ name: 'home' })
        })
        .catch((e) => {
          //  console.log(e)
          this.message = e.response.data.message
        })
    },
    newPackage () {
      this.submitted = false
      this.package = {}
    }*/
  }

</script>