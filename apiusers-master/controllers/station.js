//import * as bikeSaved from "mongoose";

'user strict'

const Station = require('../models/station')
//const service = require('../services')
const Bike = require('../models/bike')


function saveStation (req, res) {
    console.log('POST /api/station')
    console.log(req.body) //Mostrar todo el cuerpo (body)

    let station = new Station()
    station.station= req.body.station,
    station.state= req.body.state,
    station.description = req.body.description

    station.save((err, stationStored) => {
        if (err) res.status(500).send({message: `Error al salvar en la BBDD: ${err}`})
    
        res.status(200).send({station: stationStored})
    })
}
function getBikesDeStation(req,res){

    let stationId = req.params.stationId
    Station.findById(stationId,(err, station) => {
        if(err)
            return res.status(500).send({message: `Error al obtener la estacion: ${err}`})

        if(!station)
            return res.status(400).send({message: `La estacion no existe`})

        Bike.find({'_id': { $in: station.bikes}}, function(err, bikesList){
            if(bikesList.length==0)
            {
                return res.status(204).send({message: `La estacion no tiene bicis`})
            }
            else
                return res.status(200).send({bikes: bikesList})
        })
    })

}

function getStations (req, res) {
    Station.find({}, (err, stations) => {
        if (err) return res.status(500).send({message: `Error al realizar la petición: ${err} `})
        if (!stations) return res.status(404).send({message: 'No existen productos'})
       
        //Finalizar petición y comprobar que funciona
        res.send(200,stations)
        
        
    })
}

function getStation (req,res) {
    let stationId = req.params.stationId

    Station.findById(stationId, (err, station) => {
        if (err) return res.status(500).send({message: `Error al realizar la petición: ${err} `})
        if (!station) return res.status(404).send({message: `El station no existe`})

        res.status(200).send({ station })
    })
}

function deleteStation (req,res)  {
    let stationId = req.params.stationId;

    Station.findById(stationId, (err, station) => {
        if (err) res.status(500).send({message: `Error al eliminarlo: ${err}`})
    
        station.remove(err => {
            if (err) res.status(500).send({message: `Error al eliminarlo: ${err}`})
            
            res.status(200).send({message: `station eliminado`})
        })
    })
}

function addSampleStation(req,res){
    console.log("Petició d'afegir estacio mostra")

   let bikeNew= new Bike ({bike: "bichicleta54",kms:250,description: "llantacas",assigned:true})

    bikeNew.save((err, bikeStored) => {
        if (err) res.status(500).send({message: `Error al salvar en la BBDD: ${err}`})

        res.status(200).send({bike: bikeStored})
        let stationNew = new Station({name: "Arc de triomf",state:"available",description: "centrica", bikes: ["5ceb9a11f798f93598beed6c","5ceb9a2ef798f93598beed6d","5ceb9a45f798f93598beed6e","5ceb9a79df48b82ecc1c6deb"]});
        stationNew.save((err, stationStored) => {
            if (err) res.status(500).send({message: `Error al salvar la sattion en la BBDD: ${err}`})
            res.status(200).send({station: stationStored})
        })
    })




}





module.exports = {
    
    saveStation,
    getStations,
    getStation,
    deleteStation,
    addSampleStation,

    
}
