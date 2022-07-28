const { DataTypes, NOW } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    description: {
      type: DataTypes.TEXT
    },
    rating: {
      type: DataTypes.FLOAT
    },
    releaseDate: {
      type: DataTypes.DATEONLY,
      defaultValue: DataTypes.NOW
    },
    image:{
      type: DataTypes.STRING
    },
    platforms:{
      type: DataTypes.ARRAY(DataTypes.STRING)
    }
  }, { timestamps: false });
};
