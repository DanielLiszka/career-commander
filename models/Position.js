const { now } = require('lodash');
const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class Position extends Model {}

Position.init(
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

    description: {
      type: DataTypes.STRING,
    },

    location: {
      type: DataTypes.STRING,
    },

    close_date: {
      type: DataTypes.DATEONLY,
    },

    company_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'company',
        key: 'id',
      },
    },

    manager_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'manager',
        key: 'id',
      },
    },

    created_at: {
      type: DataTypes.DATE,
      defaultValue: new Date(),
    },

    updated_at: {
      type: DataTypes.DATE,
      defaultValue: new Date(),
    },
  },
  {
    //TABLE CONFIGURATION OPTIONS GO HERE

    // pass in our imported sequelize connection

    sequelize,

    // Want automatically created created_at/updated_at

    timestamps: true,

    // don't pluralize name of database table

    freezeTableName: true,

    //use underscores instead of camel-casing

    underscored: true,

    // make it so our model name stays lowercase in the database

    modelName: 'position',
  }
);

module.exports = Position;
