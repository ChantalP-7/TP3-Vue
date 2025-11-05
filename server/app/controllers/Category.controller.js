const db = require('../models')
const Category = db.categories

// Récupère toutes les catégories
exports.findAll = async (req, res) => {
  try {
    const categories = await Category.findAll()
    res.json(categories)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}