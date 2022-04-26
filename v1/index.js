var express = require('express')
const annonces_ventes = require('../database_json/annonces_ventes.json');

//morgan 
var logger = require("morgan");
const bodyParser = require('body-parser');

var app = express()
const utils = require('./task-Schema.js');

//morgan (dev)
app.use(logger('dev'));

app.use(express.json())
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const { body, validationResult } = require('express-validator');
///POST 
///express-validator
//middlwares

app.post('/annonces_ventes', 
///Sanitization

body('titre').not().isEmpty().trim().escape(),
body('date_de_creation').isDate(),
body('categories').isIn(['villa', 'local', 'bungalow', 'local', 'studio', 'terrain','appartement']),
body('pays').isString(),
body('ville').isString(),
body('rue').isString(),
body('superficie').isString(),
body('prix').isCurrency(),
body('pieces').isInt(),
body('etage').isInt(),
body('specifications').isString(),
body('user').not().trim().escape(),
body('telephone').isMobilePhone(),
body('email').isEmail().normalizeEmail(),


(req, res, next)=>  {
    let content = req.body;
    const errors = validationResult(req);
//Ça pour le test (api test) la condition Il y aura que le (id )et le (titre) Obligatoirement Exister
    if (!content.id && !content.titre) { 
        return res.status(400).send("annonces_ventes not created");

    }
    ////fin

    
    ////
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            errors: errors.array()
        });
    } 
    const annonces_vente = {
        id: annonces_ventes.length + 1,
        titre: req.body.titre,
        date_de_creation: req.body.date_de_creation,
        categories: req.body.categories,
        pays: req.body.pays,
        ville: req.body.ville,

        rue: req.body.rue,
        superficie: req.body.superficie,
        prix: req.body.prix,
        pieces: req.body.pieces,
        etage: req.body.etage,
        specifications: req.body.specifications,
        user: req.body.user,
        telephone: req.body.telephone,
        email: req.body.email


    }
    
    annonces_ventes.push(annonces_vente);
    res.status(200).json(annonces_vente)
    
});
/// GET 
app.get('/annonces_ventes', (req,res,next) => {
    res.status(200).json(annonces_ventes)
})

/// GET  BY ID
app.get('/annonces_ventes/:id', (req,res,next) => {


  
        const id = parseInt(req.params.id)

        const annonces_vente = annonces_ventes.find(annonces_vente => annonces_vente.id === id)
        if(annonces_vente){

        res.status(200).json(annonces_vente)
    }
    else {
        return res.status(404).json("annonces_ventes_not_found");

    }
  
})


///PUT
app.put('/annonces_ventes/:id',(req, response) => {
    const taskId = req.params.id;
    const task = annonces_ventes.find(task => task.id === parseInt(taskId));
    if(!task) return response.status(404).send("The annonces ventes with the provided ID does not exist.");

    const { error } = utils.validateTask(req.body);
    if(!error) {
        task.titre =req.body.titre,
        task.date_de_creation =req.body.date_de_creation,

   task.categories =req.body.categories,
   task.pays =req.body.pays,   
   task.ville =req.body.ville,

      task.rue =req.body.rue,

   task.superficie =req.body.superficie,
   task.prix =req.body.prix,
   task.pieces =req.body.pieces,
   task.etage =req.body.etage,
   task.specifications =req.body.specifications,

   
   task.user =req.body.user,
   task.telephone =req.body.telephone,
   task.email =req.body.email


     return response.status(200).send(task);
    }
    else {

         response.status(400).send("non_PUT");
    }
  
    
 

  
  });
///delete
app.delete('/annonces_ventes/:id', (req,res,next) => {
    const id = parseInt(req.params.id)
    let annonces_vente = annonces_ventes.find(annonces_vente => annonces_vente.id === id)
    annonces_ventes.splice(annonces_ventes.indexOf(annonces_vente),1)
    if(annonces_vente){

        res.status(200).json(annonces_vente)
    }
    else {
        return res.status(400).json("annonces_ventes_not_found");

    }
})



app.listen(8080, () => {
    console.log("Serveur à l'écoute")
})

module.exports = app;
