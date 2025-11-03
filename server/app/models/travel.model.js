module.exports = (connex, Sequelize) => {
    const Travel = connex.define('travel', {
        name: {
            type: Sequelize.STRING
        },
        images: {
            type: Sequelize.JSON
        },
        price: {
            type: Sequelize.REAL
        },
        description: {
            type: Sequelize.TEXT
        }
    }, {
    timestamps: true // Sequelize crée et met à jour automatiquement createdAt / updatedAt
  }
)
    return Travel
}