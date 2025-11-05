import { createRouter, createWebHistory } from 'vue-router'


import Home from '../views/HomeView.vue'
import AddPackage from '../views/AddPackage.vue'
import AllPackages from '../views/AllPackages.vue'
import AboutUs from '../views/AboutUs.vue'
import EditPackage from '../views/EditPackage.vue'
import PackageView from '../views/PackageView.vue'
/*import UserView from '../views/UserView.vue'
import LoginView from '../views/LoginView.vue'
import IndexUserView from '../views/IndexUserView.vue'*/

const routes = [
  { path: '/', name: 'home', component: Home },
  { path: '/about-us', name: 'about-us', component: AboutUs },
  { path: '/add-package', name: 'add-package', component: AddPackage },
  { path: '/all-packages', name: 'all-packages', component: AllPackages },
  { path: '/package/:id', name: 'package', component: PackageView },
  { path: '/edit-package/:id', name: 'edit-package', component: EditPackage }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router;