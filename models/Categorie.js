module.exports = (sequelize, DataTypes) => {
  const Categorie = sequelize.define('Categorie', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { allowNull: false, type: DataTypes.STRING },
  },
    {
      timestamps: false,
      tableName: 'Categories',
    });

  return Categorie;
};
