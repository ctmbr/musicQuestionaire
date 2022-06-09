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
    // user_id: {
    //   type: DataTypes.INTEGER,
    //   references: {
    //     model: 'user',
    //     key: 'id',
    //   },
    // },
    question: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    answers: {
      type: DataTypes.STRING,
      allowNull: false,
      // validate: {
      //   isIn: [['Hip Hop', 'Country', 'Rock', 'Pop']]
      // }
    },
  },
  {
    hooks: {
      beforeValidate: async (newQuestionData) => {
        newQuestionData.answers = JSON.stringify(newQuestionData.answers);
        return newQuestionData;
      },
      beforeUpdate: async (updatedQuestionData) => {
        updatedQuestionData.answers = JSON.stringify(updatedQuestionData.answers);
        return updatedQuestionData;
      },
      afterFind: async (foundQuestionData) => {
        console.log(foundQuestionData)
        foundQuestionData = foundQuestionData.map(item => {
          item.answers = JSON.parse(item.answers);
          return item;
        });
        return foundQuestionData;
      }
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'question',
  }
);

module.exports = Question;
