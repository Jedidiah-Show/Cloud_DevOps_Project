const { Sequelize, DataTypes } = require('sequelize');
const path = require('path');

// Create SQLite database in the backend folder
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: path.join(__dirname, 'ruach.db'),
    logging: false // optional: turn off SQL logs
});

// Define DailyEntry model
const DailyEntry = sequelize.define('DailyEntry', {
    date: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    anchor: DataTypes.STRING,
    priority: DataTypes.TEXT,
    habits: DataTypes.TEXT,       // will store JSON string
    alignment: DataTypes.STRING
});

// Define Reflection model
const Reflection = sequelize.define('Reflection', {
    date: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    insight: DataTypes.TEXT
});

// Initialize DB
async function initDB() {
    await sequelize.sync();
    console.log("SQLite DB initialized");
}

module.exports = { sequelize, DailyEntry, Reflection, initDB };
