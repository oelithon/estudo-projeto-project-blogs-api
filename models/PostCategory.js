module.exports = (sequelize, _DataTypes) => {
  const PostCategory = sequelize.define('PostCategory',
    {},
    { timestamps: false, tableName: 'PostsCategories' });

  PostCategory.associate = (models) => {
    models.BlogPost.belongsToMany(models.Categorie, {
      as: 'categoryId',
      through: PostCategory,
      foreignKey: 'postId',
      otherKey: 'categoryId',
    });
    models.Categorie.belongsToMany(models.BlogPost, {
      as: 'postId',
      through: PostCategory,
      foreignKey: 'categoryId',
      otherKey: 'postId',
    });
  };

  return PostCategory;
};
