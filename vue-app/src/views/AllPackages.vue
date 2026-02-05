<template>
    <div>
        <HeroHeaderSimple/>

        <h1 class="text-center mt-20 mb-20 text-3xl text-gray-900 dark:text-white">
        Tous nos forfaits
        </h1>

        <div class="grid xs:gap-5 sm:grid-cols-2 sm:gap-4 lg:gap-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-10 border-gray-100 my-4">
        <div
            v-if="paginatedItems.length > 0"
            v-for="(myPackage, i) in paginatedItems"
            :key="i"
            class="shadow-lg w-full max-w-sm bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700"
        >
            <img
            class="object-cover aspect-[3/2] p-0 rounded-t-lg"
            :src="getFirstImage(myPackage.images)"
            alt="myPackage image"
            loading="lazy"
            />
            <div class="px-5 pb-5">
            <h5 class="text-xl font-semibold tracking-tight mt-5 text-gray-900 dark:text-white mb-2">
                {{ myPackage.name }}
            </h5>
            <p class="text-lg text-gray-900 dark:text-white">
                <strong>Prix : </strong>{{ Number(myPackage.price).toFixed(2) }} $
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
    import HeroHeaderSimple from '../components/HeroHeaderSimple.vue'
    import PackageDataService from '../services/PackageDataService.js'

    export default {
    components: { HeroHeaderSimple },

    data() {
        return {
        inventory: [],
        currentPage: 1,
        itemsPerPage: 8
        }
    },

    computed: {
        totalPages() {
            return Math.ceil(this.inventory.length / this.itemsPerPage)
        },
        paginatedItems() {
            const start = (this.currentPage - 1) * this.itemsPerPage
            const end = start + this.itemsPerPage
            return this.inventory.slice(start, end)
        }
    },

    methods: {   
        goToPage(page) {
            if (page < 1 || page > this.totalPages) return
            this.currentPage = page
        },

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
        async fetchPackages() {
            try {
                const response = await PackageDataService.getAll()
                this.inventory = response.data   // JSON du backend
                } catch (error) {
                    console.error('Erreur en récupérant les packages:', error)
                }
            }
        },

        mounted() {
            this.fetchPackages()   // chargement des données quand le composant monte
        }    
    }
    
</script>