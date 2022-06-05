const { Model, DataTypes, DATE } = require('sequelize');

const sequelize = require('../config/connection');

class Manager extends Model {}

Manager.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    company_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'company',
        key: 'id',
      },
    },
  },
  {
    //TABLE CONFIGURATION OPTIONS GO HERE

    // pass in our imported sequelize connection

    sequelize,

    // don't automatically create created_at/updated_at fields

    timestamps: false,

    // don't pluralize name of database table

    freezeTableName: true,

    //use underscores instead of camel-casing

    underscored: true,

    // make it so our model name stays lowercase in the database

    modelName: 'manager',
  }
);

module.exports = Manager;
