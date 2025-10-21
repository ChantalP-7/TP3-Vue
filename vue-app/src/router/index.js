import { createRouter, createWebHistory } from 'vue-router'


import Home from '../views/HomeView.vue'
import AddPackage from '../views/AddPackage.vue'
import PackageView from '../views/PackageView.vue'
import AboutUs from '../views/AboutUs.vue'

const routes = [
  { path: '/', name: 'home', component: Home },
  { path: '/add-package', name: 'add-package', component: AddPackage },
  { path: '/package/:id', name: 'package', component: PackageView },  
  { path: '/about-us', name: 'about-us', component: AboutUs } 
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router;