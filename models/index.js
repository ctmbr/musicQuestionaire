const User = require('./User');
const Question = require('./Question');
const Playlist = require('./playlist')
// Users Updated answers to each question
User.hasOne(Question, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Question.belongsTo(User, {
  foreignKey: 'user_id'
});

// A User can change their answers to the questions and create a new instance of a playlist
User.hasMany(Playlist, {
  foreignKey: 'user_id'
});

module.exports = { User, Question, Playlist};
