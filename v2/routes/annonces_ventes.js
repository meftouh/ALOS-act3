var express = require('express');
var router = express.Router();
const passport = require("passport");
const annonces_ventes = require('../../database_json/annonces_ventes.json');
const bodyParser = require('body-parser');

router.use(express.json())
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

const { body, validationResult } = require('express-validator');
const fs = require('fs');
const { route } = require('./users');

//get
router.get('/', (req, res,next) =>{
    res.status(200).json(annonces_ventes)

  });

 //get by id 
 
router.get('/:id',  (req, res,next) => {
  const id = parseInt(req.params.id);
  const annonces_vente = annonces_ventes.find(user => user.id === id)

  if (!annonces_vente) {
      res.status(500).json({ message: 'The annonces_vente with the given ID was not found.' });
  }
  res.status(200).send(annonces_vente);
});
//post



router.post("/"  ,
  body('titre').not().isEmpty().trim().escape().isLength({ min: 5 }).withMessage('must be at least 5 chars long'),
  body('description').trim().escape(),

  body('categories').isIn(['villa', 'local', 'bungalow', 'local', 'studio', 'terrain','appartement']),
  body('pays').trim().isString(),
  body('ville').trim().isString(),
  body('rue').trim().isString(),
  body('superficie').trim().isString(),
  body('prix').isCurrency(),
  body('pieces').isInt(),
  body('etage').isInt(),
  body('specifications').trim().isString(),
  body('picture').isURL(),
  body('telephone').trim().isMobilePhone(),
  body('email').trim().isEmail().normalizeEmail(), passport.authenticate("jwt", { session: false }),

  (req, res, next)=>  {
    const errors = validationResult(req);
     //console.log(user);
     var d = new Date();
     if (!errors.isEmpty()) {
      return res.status(400).json({
          success: false,
          errors: errors.array()
      });
  }
     const annonces_vente = {
      id: annonces_ventes.length + 1,
      id_user:req.user.id,

      date_de_creation:d,
      titre: req.body.titre,
      categories: req.body.categories,
      pays: req.body.pays,
      ville: req.body.ville,
      rue: req.body.rue,
      pieces: req.body.pieces,

      superficie: req.body.superficie,
      prix: req.body.prix,
      etage: req.body.etage,
      specifications: req.body.specifications,
      description: req.body.description,
      picture: req.body.picture,
      telephone: req.body.telephone,
      email: req.body.email,
      user: req.user.name


      
  }
  let new_annonces_vente = {
    ...annonces_vente,
    "id":annonces_ventes.length + 1
}
let new_annonces_ventes = [
    ...annonces_ventes,
    new_annonces_vente
]
let data = JSON.stringify(new_annonces_ventes);

fs.writeFile('database_json/annonces_ventes.json', data, (err) => {
    if (err) throw err;
    console.log('Data written to file');
});

console.log('This is after the write call');
  res.status(200).json(annonces_vente)

  
  console.log('This is after the write call');
 
  
});
//delete

router.delete('/:id', passport.authenticate("jwt", { session: false }), (req, res,next) => {
  const id = req.params.id
  let index = annonces_ventes.findIndex(annonces_vente => annonces_vente.id == id)

  annonces_ventes.splice(index, 1)
  if(index){

    res.status(200).json(annonces_ventes)
    const data = JSON.stringify(annonces_ventes,null, 2)

        fs.writeFile('database_json/annonces_ventes.json', data, (err) => {
          if (err) throw err;      });

}
        
else {
  return res.status(404).json("annonces_ventes_not_found");

}
});
//put

//put 
router.put('/:id', passport.authenticate("jwt", { session: false }),
body('titre').not().isEmpty().trim().escape().isLength({ min: 5 }).withMessage('must be at least 5 chars long'),
body('description').trim().escape(),

body('categories').isIn(['villa', 'local', 'bungalow', 'local', 'studio', 'terrain','appartement']),
body('pays').trim().isString(),
body('ville').trim().isString(),
body('rue').trim().isString(),
body('superficie').trim().isString(),
body('prix').isCurrency(),
body('pieces').isInt(),
body('etage').isInt(),
body('specifications').trim().isString(),
body('picture').isURL(),
body('telephone').trim().isMobilePhone(),
body('email').trim().isEmail().normalizeEmail().withMessage('Email is invalide'),
(req, res,next) => {

  const id = parseInt(req.params.id)

    let index = annonces_ventes.findIndex(annonces_vente => annonces_vente.id == id)
    const data=req.body;

      
  Object.entries(data).map(([key, value]) => {
    annonces_ventes[index][key] = value
});
const new_data = JSON.stringify(annonces_ventes)
fs.writeFile('database_json/annonces_ventes.json', new_data, (err) => {
if (err) throw err;      });
res.status(200).json(new_data)



   

});

module.exports = router;
