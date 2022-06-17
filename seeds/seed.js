const sequelize = require('../config/connection');
const { User, Question, Song } = require('../models');

const userData = require('./userData.json'); //import seeds data for users
const QuestionData = require('./questions.json'); //import seeds data for Questions
const songData = require('./songs.json')//import seeds data for Songs

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const question of QuestionData) {
    await Question.create({
      ...question,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  const songs = await Song.bulkCreate(songData, {
    returning: true
  })
  process.exit(0);
};

seedDatabase();
