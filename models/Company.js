const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class Company extends Model {}

Company.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    //TABLE CONFIGURATION OPTIONS GO HERE

    // pass in our imported sequelize connection

    sequelize,

    // don't pluralize name of database table

    freezeTableName: true,

    // don't automatically create created_at/updated_at fields

    timestamps: false,

    //use underscores instead of camel-casing

    underscored: true,

    // make it so our model name stays lowercase in the database

    modelName: 'company',
  }
);

module.exports = Company;
