const db = require('../models') 
const Package = db.packages

exports.findAll = (req, res) => {
   Package.findAll()
   .then(data => {
       res.send(data)
   })
   .catch(err => {
       res.status(500).send({
           message:
           err.message || 'Something go wrong'
       })
   })
}

exports.create = (req, res) => {
   if(!req.body.name) {
       res.status(400).send({
           message: 'The name is required'
       })
       return;
   }
   Package.create(req.body)
   .then(data => {
       res.send(data)
   })
   .catch(err => {
       res.status(500).send({
           message: 'Could not insert the data'
       })
   })
}

exports.findOne = (req, res) => {
   const id = req.params.id
   Package.findByPk(id)
   .then(data => {
      if (data) res.send(data)
      else res.status(404).send({ message: 'Package not found' })
    })
   .catch(err => {
       res.status(500).send({
           message:
           err.message || 'Something go wrong'
       })
   })
}

exports.update = (req, res) => {
   const id = req.params.id
   Package.update(req.body, {
       where: {id: id}
   })
   .then(num => {
       if (num == 1){
           res.send({
               message: 'Package updated'
           })
       }else{
           res.send({
               message: 'Package not found'
           })
       }
   })
   .catch(err => {
       res.status(500).send({
           message:
           err.message || 'Something go wrong'
       })
   })
}

exports.delete = (req, res) => {
   const id = req.params.id
   Package.destroy({
       where: {id: id}
   })
   .then(num => {
       if (num == 1){
           res.send({
               message: 'Package deleted'
           })
       }else{
           res.send({
               message: 'Package not found'
           })
       }
   })
   .catch(err => {
       res.status(500).send({
           message:
           err.message || 'Something go wrong'
       })
   })
}