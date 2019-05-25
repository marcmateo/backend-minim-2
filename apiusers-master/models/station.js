'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt-nodejs') //Librería para encriptar la contraseña
const crypto = require('crypto')


const StationSchema = new Schema ({
    //_id: String,
    name: String,
    state: String,
    description: String,
    bikes: [{type: mongoose.Schema.Types.ObjectId, ref: 'Bikes',unique: false}]
  
})



module.exports = mongoose.model('Station', StationSchema)
