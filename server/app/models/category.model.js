module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define('categories', {
        id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
        },
        category: {
        type: DataTypes.STRING,
        allowNull: false
        }
    }, {
        timestamps: false
    })

    return Category
}

/*module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('category', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'categories',
    timestamps: false
  });
  return Category;
};*/

