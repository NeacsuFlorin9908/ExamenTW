const {Sequelize} = require('sequelize')

const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "./sqlite/examen_neacsu_constantin_florin_db.db",
});

sequelize.sync({alter: true}).then(() => {
    console.log("Syncronized");
})

module.exports = sequelize;