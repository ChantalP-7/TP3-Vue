<template>
  <div v-if="myPackage" class="flex flex-col lg:flex-row items-center lg:items-start">
    <HeroHeader/>
    <div class="lg:w-1/2 mb-5 lg:mb-5 p-6 ">
      <!-- Affichage de l'image principale -->
      <img class="w-full mb-5 lg:mb-0" :src="currentImage" :alt="myPackage.name" />

      <!-- Galerie d'images -->
      <div class="galerie mt-4 flex space-x-4 overflow-x-auto">
        <img 
          v-for="(image, index) in myPackage.images.slice(1)" 
          :key="index" 
          class="w-24 h-24 object-cover cursor-pointer border-2 border-gray-300 rounded-md"
          :src="image" 
          :alt="`Image ${index + 1}`"
          @click="showImage(image, index + 1)"  
        />
      </div>

      <!-- Navigation entre les images -->
        <div class="flex justify-start gap-50 mt-4">
            <button class="btn-jade" @click="prevImage" :disabled="currentIndex === 0">Précédente</button>
            <button class="btn-jade" @click="nextImage" :disabled="currentIndex === myPackage.images.length - 1">Suivante</button>
        </div>
        
    </div>

    <div class="lg:w-1/2 p-6 ">
      
      <h1 class="text-2xl lg:text-3xl mb-3">{{ myPackage.name }}</h1>
      <div class="text-lg mb-5">
        <p><Strong>Prix : </Strong>{{ myPackage.price.toFixed(2) }} $</p>
      </div>
      <p class="text-lg leading-relaxed mb-5">
       <strong>Description : </strong> {{ myPackage.description }}
      </p>
      <p class="text-lg leading-relaxed mb-5">
       <strong>Catégorie : </strong> {{ getCategoryName(myPackage) }}
      </p>
      <div className="mt-10 flex justify-start gap-15 items-center">
            <button type="submit" @click="updatePackage" class="btn-blue text-white px-4 py-2 rounded-3xl cursor-pointer"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="white" class="bi bi-pencil-square py-0 px-1" viewBox="0 0 16 16">
                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                        </svg></button>
            
            <button type="button" @click="deletePackage" class="btn-tomato text-white px-4 py-2 rounded-3xl cursor-pointer hover:bg-red-600">
                <svg width="30" height="30" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" color="#red"><path d="M0 0h24v24H0z" fill="none"></path><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"></path></svg>
            </button>
        </div>
    </div>
  </div>
  
  <div v-else>
    <p>Le produit n'a pas été trouvé.</p>
  </div>
  
</template>

<script>
export default {
  props: {
    inventory: Array,
    categories: Array,
     
  },
  data() {
    return {
      currentIndex: 0  // Initialisation de l'index de l'image
    }
  },
  computed: {
    // Récupère le produit avec l'ID à partir de l'URL
    myPackage() {      
      const myPackageId = Number(this.$route.params.id);
      return this.inventory.find(myPackage => myPackage.id === myPackageId);
    },
    currentImage() {
      // Renvoie l'image actuelle en fonction de l'index
      if (this.myPackage && this.myPackage.images.length > 0) {
        return this.myPackage.images[this.currentIndex];
      }
      return ''; // Retourne une chaîne vide si aucune image n'est disponible
    },
    // La categorie
    category() {
      if (!this.myPackage || !this.categories) return null
      return this.categories.find(c => c.id === this.myPackage.category_id)
    }
  },
  methods: {
    getCategoryName(pkg) {
    if (!pkg || !this.categories) return 'Non spécifiée'
    
    const cat = this.categories.find(c => c.id === pkg.category_id)
    return cat ? cat.category : 'Non spécifiée'
  },
    showImage(image, index) {
      // Met à jour l'image courante lorsque l'on clique sur une image de la galerie
      this.currentIndex = index;
    },
    prevImage() {
      // Va à l'image précédente si possible
      if (this.currentIndex > 0) {
        this.currentIndex--;
      }
    },
    nextImage() {
      // Va à l'image suivante si possible
      if (this.currentIndex < this.myPackage.images.length - 1) {
        this.currentIndex++;
      }
    },
    methods: {
    updatePackage () {
        PackageDataService.update(this.id ,this.myPackage)
        .then((response) => {
         // console.log(response.data)
          this.updateInv(this.myPackageIndex, this.myPackage )
          this.message = null 
          this.submitted = true    
        })
        .catch((e)=> {
          this.message = e.response.data.message
        })
    },
    deletePackage () {
      PackageDataService.delete(this.id)
       .then(response => {
        this.remove(this.myPackage.name)
        this.removeInv(this.myPackageIndex)
        this.$router.push({ name: 'home' })
       })
       .catch((e) => {
        this.message = e.response.data.message
       })
    }
  }
  }
}
</script>
