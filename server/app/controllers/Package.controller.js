const db = require('../models')
const Package = db.packages

exports.findAll = async (req, res) => {
  try {
    const packages = await Package.findAll()
    res.send(packages)
  } catch (err) {
    res.status(500).send({
      message: err.message || 'Erreur lors de la récupération des forfaits'
    })
  }
}

/*exports.create = (req, res) => {

    if(!req.body.name){
        res.status(400).send({
            message: 'The name is required'
        })
        return
    }
    // console.log(req.body)
    Package.create(req.body)
    .then(data => {
        res.send(data)
    })
    .catch(err => {
        res.status(500).send({
        message: 'Could not insert the data'
        })
    })
}*/


    exports.create = async (req, res) => {
    try {
        console.log('REQ BODY:', req.body)

        const categoryId = Number(req.body.category_id)

        if (!req.body.name) {
        return res.status(400).send({ message: 'Le nom est obligatoire' })
        }

        if (!categoryId) {
        return res.status(400).send({ message: 'Catégorie invalide' })
        }

        let images = req.body.images
        if (typeof images === 'string') {
        try {
            images = JSON.parse(images)
        } catch {
            images = []
        }
        }

        console.log(req.body.category_id)
        
        const newPackage = await Package.create({
        name: req.body.name,
        description: req.body.description || '',
        price: Number(req.body.price) || 0,
        category_id: categoryId,
        images
        })

        res.status(201).send(newPackage)
    } catch (err) {
        console.error(err)
        res.status(500).send({ message: err.message })
    }
    }

    // Récupérer les 6 forfaits les plus récents
    exports.findRecent = async (req, res) => {
        try {
            const recentPackages = await Package.findAll({
            order: [['createdAt', 'DESC']], 
            limit: 6 
            })
            res.json(recentPackages)
        } catch (err) {
            res.status(500).json({ message: err.message })
        }
    }

exports.findOne = async (req, res) => {
  try {
    const id = req.params.id
    const pkg = await Package.findByPk(id)
    if (!pkg) return res.status(404).send({ message: 'Forfait non trouvé' })
    res.send(pkg)
  } catch (err) {
    res.status(500).send({ message: err.message || 'Erreur lors de la récupération du forfait' })
  }
}

/*exports.update = async (req, res) => {
  try {
    const id = req.params.id
    let images = req.body.images

    if (typeof images === 'string') {
      try {
        images = JSON.parse(images)
      } catch {
        images = [images]
      }
    }

    const [updated] = await Package.update(
      {
        name: req.body.name,
        description: req.body.description,
        price: Number(req.body.price),
        category: req.body.category,
        images: []
      },
      { where: { id } }
    )

    if (updated) {
      const updatedPackage = await Package.findByPk(id)
      res.send({ message: 'Forfait mis à jour', package: updatedPackage })
    } else {
      res.status(404).send({ message: 'Forfait non trouvé' })
    }
  } catch (err) {
    res.status(500).send({ message: err.message || 'Impossible de mettre à jour le forfait' })
  }
}*/

exports.update = async (req, res) => {
  try {
    const id = req.params.id
    const updatedFields = {
      name: req.body.name,
      description: req.body.description,
      price: Number(req.body.price),
      category_id: req.body.category_id
    }

    // Mettre à jour les images seulement si elles sont présentes
    if (req.body.images !== undefined) {
      let images = req.body.images
      if (typeof images === 'string') {
        try {
          images = JSON.parse(images)
        } catch {
          images = [images]
        }
      }
      updatedFields.images = images
    }

    const [updated] = await Package.update(updatedFields, { where: { id } })

    if (updated) {
      const updatedPackage = await Package.findByPk(id)
      res.send({ message: 'Forfait mis à jour', package: updatedPackage })
    } else {
      res.status(404).send({ message: 'Forfait non trouvé' })
    }
  } catch (err) {
    res.status(500).send({ message: err.message || 'Impossible de mettre à jour le forfait' })
  }
}

exports.delete = async (req, res) => {
  try {
    const id = req.params.id
    const deleted = await Package.destroy({ where: { id } })
    if (deleted) {
      res.send({ message: 'Forfait supprimé avec succès' })
    } else {
      res.status(404).send({ message: 'Forfait non trouvé' })
    }
  } catch (err) {
    res.status(500).send({ message: err.message || 'Impossible de supprimer le forfait' })
  }
}
