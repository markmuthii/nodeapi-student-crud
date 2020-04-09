const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE);

const User = sequelize.define('students', {
  firstName: {
    type: Sequelize.STRING,
    unique: false,
    allowNull: false,
  },
  lastName: {
    type: Sequelize.STRING,
    unique: false,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  phone: {
    type: Sequelize.STRING,
    unique: false,
    allowNull: false,
  },
  studentId: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  city: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

// create all the defined tables in the specified database.
sequelize
  .sync()
  .then(() => console.log('Students table has been created, if none existed.'))
  .catch((error) => console.log('This error occured:', error));

module.exports = User;
