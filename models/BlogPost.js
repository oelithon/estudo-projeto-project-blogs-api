module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('BlogPost', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { allowNull: false, type: DataTypes.STRING },
    content: { allowNull: false, type: DataTypes.STRING },
    userId: { allowNull: false, type: DataTypes.INTEGER },
  },
    {
      timestamps: true,
      createdAt: 'published',
      updatedAt: 'updated',
      tableName: 'BlogPosts',
    });

  Post.associate = (models) => {
    Post.belongsTo(models.User, { as: 'user', foreignKey: 'userId' });
  };

  return Post;
};
