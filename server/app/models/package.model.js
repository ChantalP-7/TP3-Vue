

module.exports = (sequelize, connex) => {
  const Package = sequelize.define('package', {
    id: {
      type: connex.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: connex.STRING,
      allowNull: false
    },
    images: {
      type: connex.JSON
    },
    price: {
      type: connex.REAL,
      allowNull: false
    },
    description: {
      type: connex.TEXT
    },
    category_id: {
      type: connex.INTEGER,
      allowNull: true
    }
  }, {
    tableName: 'packages',
    timestamps: true // crée createdAt / updatedAt
  })

  return Package
}