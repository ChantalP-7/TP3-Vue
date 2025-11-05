const dbConfig = require('../config/db.config.js')
const Sequelize = require('sequelize')
const connex = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host:dbConfig.HOST,
    dialect: dbConfig.dialect,
    port: 3306,
    operatorAliases: false
})
const db = {}
db.Sequelize = Sequelize
db.connex = connex
db.packages = require('./package.model.js')(connex, Sequelize)
db.categories = require("./category.model.js")(connex, Sequelize);

db.packages.belongsTo(db.categories, { foreignKey: 'category_id', as: 'category' });
db.categories.hasMany(db.packages, { foreignKey: 'category_id', as: 'packages' });

module.exports = db