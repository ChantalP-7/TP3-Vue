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
        type: DataTypes.JSONB,
        allowNull: true
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

