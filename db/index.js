// Getting environment
const env = process.env.NODE_ENV || 'development'

// Getting config for environment
const config = require('../knexfile')[env]

// Creating connection to database
const connection = require('knex')(config)

module.exports = connection
