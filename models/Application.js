const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class Application extends Model {}

Application.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    interview1_date: {
      type: DataTypes.DATEONLY,
    },

    interview2_date: {
      type: DataTypes.DATEONLY,
    },

    interview3_date: {
      type: DataTypes.DATEONLY,
    },

    interview4_date: {
      type: DataTypes.DATEONLY,
    },

    offer: {
      type: DataTypes.BOOLEAN,
    },

    accepted: {
      type: DataTypes.BOOLEAN,
    },

    position_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'position',
        key: 'id',
      },
    },

    resume_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'resume',
        key: 'id',
      },
    },

    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
  },

  {
    //TABLE CONFIGURATION OPTIONS GO HERE

    // pass in our imported sequelize connection

    sequelize,

    // don't pluralize name of database table

    freezeTableName: true,

    //use underscores instead of camel-casing

    underscored: true,

    // make it so our model name stays lowercase in the database

    modelName: 'application',
  }
);

module.exports = Application;
