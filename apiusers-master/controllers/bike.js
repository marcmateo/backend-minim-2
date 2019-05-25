'user strict'

const Bike = require('../models/bike')
//const service = require('../services')



function saveBike (req, res) {
    console.log('POST /api/bike')
    console.log(req.body) //Mostrar todo el cuerpo (body)

    let bike = new Bike()
    bike.bike= req.body.bike,
    bike.kms= req.body.kms,
    bike.description = req.body.description,
        //bike.station = req.body.station,

    bike.save((err, bikeStored) => {
        if (err) res.status(500).send({message: `Error al salvar en la BBDD: ${err}`})
    
        res.status(200).send({bike: bikeStored})
    })
}


function getBikes (req, res) {
    Bike.find({}, (err, bikes) => {
        if (err) return res.status(500).send({message: `Error al realizar la petición: ${err} `})
        if (!bikes) return res.status(404).send({message: 'No existen productos'})
       
        //Finalizar petición y comprobar que funciona
        res.send(200,bikes)
        
        
    })
}

function getBike (req,res) {
    let bikeId = req.params.bikeId
    
    Bike.findById(bikeId, (err, bike) => {
        if (err) return res.status(500).send({message: `Error al realizar la petición: ${err} `})
        if (!bike) return res.status(404).send({message: `El bike no existe`})
  
        res.status(200).send({ bike })
    })
}


function deleteBike (req,res)  {
    let bikeId = req.params.bikeId

    Bike.findById(bikeId, (err, bike) => {
        if (err) res.status(500).send({message: `Error al eliminarlo: ${err}`})
    
        bike.remove(err => {
            if (err) res.status(500).send({message: `Error al eliminarlo: ${err}`})
            
            res.status(200).send({message: `bike eliminado`})
        })
    })
}

function getUnassignedBikes(req, res){
    Bike.find({assigned: false},(err, result) => {
        if (err) return res.status(500).send(`Error al realizar la petición: ${err} `)
        if (!result) return res.status(404).send(`bike no existe`)
        res.status(200).send(result)
    })
}
module.exports = {
    
    saveBike,
    getBikes,
    getBike,
    getUnassignedBikes,
    deleteBike,
    
}




