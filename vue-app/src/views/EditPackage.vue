<template>
	<div>
		<HeroHeaderSimple />
		<div class="min-h-screen flex items-center justify-center border-t border-gray-100">
			<div class="formulaire border mt-2 p-6 rounded-md w-full md:w-2/3 lg:w-1/2 xl:w-1/3">      
				<h2 class="text-2xl font-semibold mb-6">Édite le forfait</h2>      
				<form @submit.prevent="handleSubmit">
					<div class="mb-4">
						<label for="myPackageName" class="block text-sm font-xlarge text-gray-900">Name</label>
						<input v-model="myPackage.name" type="text" id="myPackageName" class="mt-1 p-2 border w-full rounded-md" required />
					</div>          
					<div class="mb-4">
						<label for="myPackagePrice" class="block text-sm font-md text-gray-700">Price (CAD)</label>
						<input v-model.number="myPackage.price" type="text" id="myPackagePrice" class="mt-1 p-2 border w-full rounded-md" required />
					</div>
					<div class="mb-4">
						<label for="myPackageDescription" class="block text-sm font-md text-gray-900">Description</label>
						<textarea v-model="myPackage.description" id="myPackageDescription" rows="8" class="mt-1 p-2 border w-full rounded-md" required></textarea>
					</div>
					<div class="form-control mt-5">  
						<label class="font-medium text-gray-700" for="">sélectionne une catégorie</label>          
							<select v-model="myPackage.category_id" id="myPackageCategorie" class="select-form mt-1 p-2 border w-full rounded-md" required>
								<option name disabled value="" selected>Sélectionne une catégorie</option>
								<option class="cursor-pointer" v-for="c in categories" :key="c.id" :value="c.id">{{ c.category }}</option>
							</select>
							</div> 
							<div class="ligneBasse">
									<p></p>
							</div>         
					<div>
					<label class="block b-2">Entre des images URLs - maximum 5</label>
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
							class="bg-red-500 text-white rounded-full px-2 py-1 text-sm hover:bg-red-600 cursor-pointer"
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
						<button type="submit" :disabled="isSubmitting" class="btn-jade text-white px-4 py-2 rounded cursor-pointer">{{ isSubmitting ? "Simulation..." : "Enregistrer" }}</button>
						<div v-if="message" class="text-green-600 font-semibold mt-4">{{ message }}</div>
					</div>         
				</form>
			</div>			
		</div>
	</div>
	<transition name="fade">
	<div 
		v-if="showModal" 
		class="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50"
		@click.self="showModal = false"
	>
		<div class="bg-white p-6 rounded-2xl shadow-lg max-w-md text-center transform transition-all duration-300 scale-100 transform transition-all duration-300 scale-95">
		
		<h2 class="text-xl font-bold mb-4">Projet étudiant (simulation)</h2>
		
		<p class="mb-4">
			Ce projet est une démonstration.  
			Les modifications ne sont pas enregistrées.
		</p>

		<button 
			@click="showModal = false"
			class="btn-jade text-white px-4 py-2 rounded cursor-pointer"
		>
			Fermer
		</button>

		</div>
	</div>
</transition>
</template>
<script>
import HeroHeaderSimple from '../components/HeroHeaderSimple.vue'
import PackageDataService from '../services/PackageDataService'

export default {
components: { HeroHeaderSimple },
	props:['inventory', 'updateInv', 'removeInv', 'remove'],
	data () {
		
		return{
			message: null,
			submitted: false,
			
			showModal: false,
			isSubmitting: false,

			myPackage: {
				name: '',
				price: '',
				description: '',
				images: [],
				category_id: null
			},       
			categories: [],
			id: this.$route.params.id
		}
	},
	mounted() {
	PackageDataService.getAllCategories()
		.then(res => { this.categories = res.data })
		.catch(err => console.error(err))

	PackageDataService.get(this.id)
	.then(response => {
		const data = response.data

		if (typeof data.images === 'string') {
			try {
				data.images = JSON.parse(data.images)
			} catch (e) {
				console.error('JSON images invalide', e)
				data.images = []
			}
		}

		this.myPackage = data
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
	methods: {
		/*removeImage(index) {
			this.myPackage.images.splice(index, 1)
		},*/
		/*updatePackage () {
				PackageDataService.update(this.id ,this.myPackage)
				.then((response) => {
				 // console.log(response.data)
					this.updateInv(this.myPackageIndex, this.myPackage )
					this.message = "Forfait ajouté avec succès !"
					this.submitted = true    
				})
				.catch((e)=> {
					this.message = e.response.data.message
				})
		},*/
		handleSubmit() {
			this.isSubmitting = true
			this.showModal = true

			// Empêche toute modification réelle
			setTimeout(() => {
				this.isSubmitting = false
			}, 3500)
		}
	}
	
}
</script>