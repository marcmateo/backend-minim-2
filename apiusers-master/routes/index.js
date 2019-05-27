'use strict'

const express = require('express')
const bikeCtrl = require('../controllers/bike')
const stationCtrl = require('../controllers/station')
//const auth = require('../middlewares/auth')
const api = express.Router()

//RUTAS API (GET, POST, PUT, DELETE)

api.post('/bike', bikeCtrl.saveBike)
api.get('/bikes', bikeCtrl.getBikes)
api.get('/bike/:bikeId', bikeCtrl.getBike)
api.delete('/bike/:bikeId', bikeCtrl.deleteBike)
api.get('/bikes/noasignadas',bikeCtrl.getUnassignedBikes)


//CRUD de Stations


api.post('/station', stationCtrl.saveStation)
api.get('/stations', stationCtrl.getStations)
api.get('/station/:stationId', stationCtrl.getStation)
api.delete('/station/:stationId', stationCtrl.deleteStation)

api.get('/afagirMostra',stationCtrl.posarmostra)



module.exports = api

//si vull afegir autoritzacio posem   auth,
// el admin user el podem posar a hardcode del estil q si en 
//registrem amb els nostres mails personals ens doni un token especial
// que ens doni acces a certes opcions del crud propies del UserAdmin
// com delete o veure tots els usuaris (api.get('/users', userCtrl.getUsers))
