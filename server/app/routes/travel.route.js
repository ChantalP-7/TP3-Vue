module.exports = app => {
    const travel = require('../controllers/travel.controller.js')
    const router = require('express').Router()
    router.get('/', travel.findAll)
    router.post('/', travel.create)
    router.get('/:id', travel.findOne)
    router.delete('/:id', travel.delete)
    router.put('/:id', travel.update)
    app.use('/api/travel', router)
}