
var express = require('express');
var router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { token } = require('morgan');
const passport = require("passport");
const users = require('../../database_json/users.json')
const validateRegisterInput =require ('../validation/register')
const validateloginInput =require ('../validation/login')
router.get('/happy', (req, res) => res.send('very happy users! ;)'));

router.get('/', (req,res,next) => {
    res.status(200).json(users)
})

router.get('/:id',  (req, res,next) => {
    const id = parseInt(req.params.id);
    const user = users.find(user => user.id === id)

    if (!user) {
        res.status(500).json({ message: 'The user with the given ID was not found.' });
    }
    res.status(200).send(user);
});


router.delete('/:id', (req, res,next) => {
    const id = req.params.id
    let index = users.findIndex(annonces_vente => annonces_vente.id == id)
  
    users.splice(index, 1)
    if(index){
  
      res.status(200).json(users)
      const data = JSON.stringify(users);
  
          fs.writeFile('database_json/users.json', data, (err) => {
            if (err) throw err;      });
  
  }
  else {
    return res.status(404).json("user_not_found");

}
});

router.post("/register",  function (req, res,next){
const {errors,isValid} =validateRegisterInput(req.body);

const email = users.find(user => user["email"] ==  req.body.email)
if (email){
    errors.email =' Email It really exists'
    return res.status(400).json(errors);

}else {
    var hashedPassword = bcrypt.hashSync(req.body.password, 10);
    const secret = process.env.secret;

    const user = {
        id: users.length + 1,

        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        
    }
    
   
    const payload ={id:user.id,email:user.email,password:user.password,name:user.name}

     jwt.sign(
        payload
        ,            secret,
        { expiresIn: '1d' },
        (err,token)=>{
                res.json({
                    sucess:true,
                    token :'Bearer ' +token
                
                });

            }

        );
        const fs = require('fs');

  
    let new_user = {
        ...user,
        "id": users.length + 1
    }
    let new_users = [
        ...users,
        new_user
    ]
    let data = JSON.stringify(new_users);
    
    fs.writeFile('database_json/users.json', data, (err) => {
        if (err) throw err;
        console.log('Data written to file');
    });
    
    console.log('This is after the write call');
              
        }
        
});
router.post("/login", (req, res,next) => {
    const {errors,isValid} =validateloginInput(req.body);

       const user = users.find(user => user["email"] ==  req.body.email)

   
       //console.log(user);
       const secret = process.env.secret;

    

    if (!user){
        errors.email ='The user  not found'
        return res.status(400).json(errors);

    }
    else {if (user && bcrypt.compareSync(req.body.password, user.password)) {
        const payload ={id:user.id,email:user.email,password:user.password,name:user.name}
        jwt.sign(
            payload,
            secret,
            { expiresIn: '1d' },
            (err,token)=>{
                res.json({
                    sucess:true,
                    token :'Bearer ' +token
                });

            }

        );

    } else {
        errors.password ='password is wrong!';
    return res.status(400).json(errors);
    }}
    
});





//router_v1.use('/user', usersRoutes);
//router_v1.use('/annonces_vente', annonces_ventesRoutes);

//login
/* Commentaire sur une ligne 

router.post("/login", (request, response,next) => {
    const user1 = {
        id: 1,
        email: "test@tes.com",
        passwordHash:"$2a$10$4lIGzjbzZFTjNCSuMyGLCuLTrRNugPm1Z.HGvKcoIVG1O4ACz0bNK"
       };
       const secret = process.env.secret;

       let a=user1.email
       const email =request.body.email
       
 
    if(a!= email ) {
        return response.status(400).send('The user not found');
    }
    else {if (user1 && bcrypt.compareSync(request.body.passwordHash, user1.passwordHash)) {
        const token = jwt.sign(
            {
                userId: user1.id,
            },
            secret,
            { expiresIn: '1d' }
        );

        response.status(200).send({ user: user1.email, token: token });
    } else {
        response.status(400).send('password is wrong!');
    }}
});
//
router.post("/", (request, response,next) => {

    const { error } = utils.validateTask(request.body);

    if(error) return response.status(400).send("The name should be at least 3 chars long!")

    const task = {
        id: ab.length + 1,
        email: request.body.email,
        passwordHash: bcrypt.hashSync(request.body.passwordHash, 10),

        completed: request.body.completed
    };

    ab.push(task);
    response.status(201).send(task);
});



    
    
       
    */

//put 
module.exports = router;
