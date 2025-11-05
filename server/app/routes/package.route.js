module.exports = app => {
    const package = require('../controllers/Package.controller.js')
    const router = require('express').Router()
    router.get('/', package.findAll)
    router.get('/recent', package.findRecent)
    router.get('/:id', package.findOne)
    router.delete('/:id', package.delete)
    router.put('/:id', package.update)
    
    app.use('/api/packages', router)
}