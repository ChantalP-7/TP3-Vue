module.exports = app => {
  const category = require('../controllers/Category.controller.js')
  const router = require('express').Router()

  router.get('/', category.findAll)

  app.use('/api/categories', router)
}