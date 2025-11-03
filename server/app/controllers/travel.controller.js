const db = require('../models') 
const Travel = db.travels

exports.findAll = (req, res) => {
   Travel.findAll()
   .then(data => {
       res.send(data)
   })
   .catch(err => {
       res.status(500).send({
           message:
           err.message || 'Some error occured'
       })
   })
}

exports.create = (req, res) => {
   if(!req.body.name) {
       res.status(400).send({
           message: 'The name is mandatory'
       })
       return;
   }
   Travel.create(req.body)
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
   Travel.findByPk(id)
   .then(data => {
       res.send(data)
   })
   .catch(err => {
       res.status(500).send({
           message:
           err.message || 'Some error occured'
       })
   })
}

exports.update = (req, res) => {
   const id = req.params.id
   Travel.update(req.body, {
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
           err.message || 'Some error occured'
       })
   })
}

exports.delete = (req, res) => {
   const id = req.params.id
   Travel.destroy({
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
           err.message || 'Some error occured'
       })
   })
}