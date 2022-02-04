// https://sequelize.org/v6/manual/validations-and-constraints.html

const validateDisplayName = { notEmpty: true, len: [8, 200] };
const validateEmail = { notNull: true, notEmpty: true, isEmail: true };
const validatePassword = { notEmpty: true, len: [6, 6] };

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    displayName: { type: DataTypes.STRING, validate: validateDisplayName },
    email: { allowNull: false, type: DataTypes.STRING, validate: validateEmail },
    password: { type: DataTypes.STRING, validate: validatePassword },
    image: DataTypes.STRING,
  },
    {
      timestamps: false,
      tableName: 'Users',
    });

  return User;
};
