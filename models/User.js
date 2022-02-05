// https://sequelize.org/v6/manual/validations-and-constraints.html

const validateDisplayName = { notNull: true, notEmpty: true, len: [8, 200] };
const validateEmail = { notNull: true, notEmpty: true, isEmail: true };
const validatePassword = { notNull: true, notEmpty: true, len: [6, 6] };

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    displayName: { allowNull: false, type: DataTypes.STRING, validate: validateDisplayName },
    email: { allowNull: false, type: DataTypes.STRING, validate: validateEmail },
    password: { allowNull: false, type: DataTypes.STRING, validate: validatePassword },
    image: DataTypes.STRING,
  },
    {
      timestamps: false,
      tableName: 'Users',
    });

  return User;
};
