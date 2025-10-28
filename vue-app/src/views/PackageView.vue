<template>
  <div v-if="myPackage" class="flex flex-col lg:flex-row items-center lg:items-start">
    <div class="lg:w-1/2 mb-5 lg:mb-0 p-6">
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

    <div class="lg:w-1/2 p-6">
      
      <h1 class="text-2xl lg:text-3xl font-bold mb-3">{{ myPackage.name }}</h1>
      <div class="text-lg mb-5">
        <p><Strong>Prix : </Strong>{{ myPackage.price.toFixed(2) }} $</p>
      </div>
      <p class="text-lg leading-relaxed mb-5">
       <strong>Description : </strong> {{ myPackage.description }}
      </p>
      <p class="text-lg leading-relaxed mb-5">
       <strong>Catégorie : </strong> {{ myPackage.category }}
      </p>
    </div>
  </div>
  <div v-else>
    <p>Le produit n'a pas été trouvé.</p>
  </div>
</template>

<script>
export default {
  props: ['inventory'],
  data() {
    return {
      currentIndex: 0  // Initialisation de l'index de l'image
    }
  },
  computed: {
    // Récupère le produit avec l'ID à partir de l'URL
    myPackage() {      
      const myPackageId = this.$route.params.id;
      return this.inventory.find(myPackage => myPackage.id === myPackageId);
    },
    currentImage() {
      // Renvoie l'image actuelle en fonction de l'index
      if (this.myPackage && this.myPackage.images.length > 0) {
        return this.myPackage.images[this.currentIndex];
      }
      return ''; // Retourne une chaîne vide si aucune image n'est disponible
    }
  },
  methods: {
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
    }
  }
}
</script>
