'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt-nodejs') //Librería para encriptar la contraseña
const crypto = require('crypto')

//Modelo usuario
const BikeSchema = new Schema ({

    bike:String,
    kms: String,
    assigned: Boolean,
    description: String,
    //station: String,
    //Para que al hacer un GET no se envíe la contraseña
    // signupDate: { type: Date, default: Date.now() },
    // lastLogin: Date
})

//Función que se ejecuta antes de que se salve

module.exports = mongoose.model('Bike', BikeSchema)

