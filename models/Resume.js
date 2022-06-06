const { Model, DataTypes, NOW } = require('sequelize');

const sequelize = require('../config/connection');

class Resume extends Model {}

Resume.init(
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
    // Increase maximum string length
    description: {
      type: DataTypes.STRING(1000),
    },

    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },

    created_at: {
      type: DataTypes.NOW,
    },

    updated_at: {
      type: DataTypes.NOW,
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

    modelName: 'resume',
  }
);

module.exports = Resume;
