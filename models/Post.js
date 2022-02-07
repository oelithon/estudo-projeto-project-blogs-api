module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { allowNull: false, type: DataTypes.STRING },
    content: { allowNull: false, type: DataTypes.STRING },
    userId: { allowNull: false, type: DataTypes.INTEGER },
  },
    {
      timestamps: true,
      createdAt: 'published',
      updatedAt: 'updated',
      tableName: 'Posts',
    });

  Post.associate = (models) => {
    Post.hasOne(models.User, { as: 'user', foreignKey: 'id' });
  };

  return Post;
};
