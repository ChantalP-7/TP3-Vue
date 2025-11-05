import http from '../http-common'
class PackageDataService {
    getAll () {
        return http.get('/packages')
    }

    create (data) {
        return http.post('/packages', data)
    }

    get (id) {
        return http.get(`/packages/${id}`)
    }

    update (id, data) {
        return http.put(`/packages/${id}`, data)
    }

    delete (id) {
        return http.delete(`/packages/${id}`)
    }
    
    getAllCategories() {
        return http.get("/categories");
    }

    getRecent() {
    return http.get('/packages/recent')
    }
}
export default new PackageDataService()