const Sequelize = require('sequelize');
const db = require('../sequelize');

const Movie = db.define(
    'movie',{
        id:{
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        titlu:{
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                min: 3
            }
        },
        categorie:{
            type: Sequelize.ENUM,
            allowNull: false,
            values: ['Horror', 'Actiune', 'Fantasy', 'Comedie']
                
            
        },
        data_publicarii:{
                type: Sequelize.DATE
                
        }
    },
    {
        timestamps: false,
        createdAt: false,
        updatedAt:false
    }
)

module.exports = Movie;