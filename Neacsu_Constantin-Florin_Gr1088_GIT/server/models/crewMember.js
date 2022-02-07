const Sequelize = require('sequelize');
const db = require('../sequelize');
const Movie = require('./movie.js');

const CrewMember = db.define(
    'crewMember',{
        id:{
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        name:{
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                min: 5
            }
        },
        role:{
            type: Sequelize.STRING,
            allowNull: false,
            
        }
    },{
        timestamps: false,
        createdAt: false,
        updatedAt:false,
        
    }
)

Movie.hasMany(CrewMember, { foreignKey: 'movieId' });
CrewMember.belongsTo(Movie, { foreignKey: 'movieId'});

module.exports = CrewMember;
