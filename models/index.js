'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) { // Check if the configuration specifies an environment variable for the database connection
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs // Read all files in the current directory
  .readdirSync(__dirname) // Synchronously read the contents of the directory
  .filter(file => { // Filter the files to include only JavaScript files that are not the current file and do not have a '.test.js' suffix
    return (
      file.indexOf('.') !== 0 && // Exclude hidden files (those starting with a dot)
      file !== basename && // Exclude the current file (index.js)
      file.slice(-3) === '.js' && // Include only files with a '.js' extension
      file.indexOf('.test.js') === -1 // Exclude test files (those ending with '.test.js')
    );
  })
  .forEach(file => { // For each filtered file, import the model and add it to the 'db' object
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => { // For each model in the 'db' object, check if it has an 'associate' method and call it to set up associations
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
