'use strict';
module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define('Book', {
    id: {
      type: DataTypes.INTEGER, 
      primaryKey:true
    },
    title: {
      type: DataTypes.STRING, 
      validate: {
        notEmpty: true
      }
    },
    author: {
      type: DataTypes.STRING, 
      validate: {
        notEmpty: true
      }
    },
    genre: DataTypes.STRING,
    year: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {});
  Book.associate = function(models) {
    // associations can be defined here
  };
  return Book;
};