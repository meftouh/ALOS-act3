var express = require('express');
var router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const profiles = require('../../database_json/profiles.json');
const annonces_ventes = require('../../database_json/annonces_ventes.json');

const bodyParser = require('body-parser');

const passport = require("passport");
const fs = require('fs');

const { body, validationResult } = require('express-validator');
//

router.use(express.json())
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

//get annonces_ventes dans le profile
router.get('/annonces_ventes', passport.authenticate("jwt", { session: false }),(req,res,next) => {
  const id= req.user.id;

  const annonces_vente = annonces_ventes.find(user => user.id_user === id)
if(annonces_vente){
  
b=annonces_ventes.filter((m) => m.id_user==id);

res.status(200).json(b);


}else {
  res.status(404).json("The annonces_vente  not found.")

}

})
//put
router.put('/', passport.authenticate("jwt", { session: false }),
(req, res,next) => {
  const id= req.user.id;
    let index = profiles.findIndex(profile => profile.id_user == id)
    console.log(id);
  
      const data=req.body;
      Object.entries(data).map(([key, value]) => {
        profiles[index][key] = value
    });
    const new_data = JSON.stringify(profiles);
fs.writeFile('database_json/profiles.json', new_data, (err) => {
  if (err) throw err;      });
  res.status(200).json(new_data)
     
});
 //get by id ( pour admin)
 router.get('/:id',  (req, res,next) => {
  const id = parseInt(req.params.id);
  const user = profiles.find(user => user.id === id)

  if (!user) {
      res.status(500).json({ message: 'The profile with the given ID was not found.' });
  }
  res.status(200).send(user);
});

 //get  (pour admin)
 router.get('/', (req,res,next) => {
  res.status(200).json(profiles)
})
//post profile

router.post("/"  ,
  
  body('bio').trim().isString(),
  body('picture').not().isURL(),
  body('telephone').trim().isMobilePhone(),
  body('email').trim().isEmail().normalizeEmail(), passport.authenticate("jwt", { session: false }),

  (req, res, next)=>  {
      const id_user= req.user.id;


      const index = profiles.findIndex(obj => obj["id_user"]==id_user);

      console.log(index);
      
      if (!index){
        res.status(404).json("profile existe");

      }
      else {
        const errors = validationResult(req);
        //console.log(user);
        var d = new Date();
        if (!errors.isEmpty()) {
         return res.status(400).json({
             success: false,
             errors: errors.array()
         });
     }
        const profile = {
         id: profiles.length + 1,
         id_user:req.user.id,
         user: req.user.name,
   
         date_de_creation:d,
         bio: req.body.bio,
         picture: req.body.picture,
         telephone: req.body.telephone,
         email: req.body.email
   
   
   
         
     }
   
   
     let new_profile = {
       ...profile,
       "id":profiles.length + 1
   }
   let new_profiles = [
       ...profiles,
       new_profile
   ]
   let data = JSON.stringify(new_profiles);
   
   fs.writeFile('database_json/profiles.json', data, (err) => {
       if (err) throw err;
       console.log('Data written to file');
   });
   
     res.status(200).json(new_profile);

      }

    
    
     

  //
 
});
module.exports = router;
