module.exports = (sequelize, DataTypes) => {
    const Package = sequelize.define('packages', {
        id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
        },
        name: {
        type: DataTypes.STRING,
        allowNull: false
        },
        description: {
        type: DataTypes.TEXT
        },
        price: {
        type: DataTypes.FLOAT,
        allowNull: false
        },
        images: {
        type: DataTypes.JSON
        },
        category_id: {
        type: DataTypes.INTEGER,
        allowNull: false
        }
    }, {
        timestamps: true
    })

    return Package
}

/*module.exports = (sequelize, connex) => {
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
    timestamps: true // crée createdAt / updatedAt
  })

  return Package
}*/

/*module.exports = (sequelize, DataTypes) => {
  const Package = sequelize.define('packages', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: DataTypes.TEXT,
    price: DataTypes.FLOAT,
    category_id: DataTypes.INTEGER,

    images: {
      type: DataTypes.JSON,
      allowNull: false,
      defaultValue: []
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'categories',
        key: 'id'
      }
    }
  })

  return Package
}*/