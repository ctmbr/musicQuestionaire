const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Question extends Model {
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

Question.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    Question: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    A1: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    A2: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    A3: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    A4: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'question',
  }
);

module.exports = Question;
