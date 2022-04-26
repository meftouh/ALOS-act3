const Joi = require('joi')



const taskSchema = {
    titre:  Joi.string().min(3).max(50),
    date_de_creation: Joi.string(),
    categories: Joi.string(),
    pays: Joi.string().min(3),
    ville: Joi.string().min(3),

    rue: Joi.string().min(3),
    superficie: Joi.string().min(3),
    prix: Joi.string(),
    pieces:   Joi.number().positive().integer(),
    etage: Joi.number().positive().integer(),
    specifications:  Joi.string(),

    
    user: Joi.string().min(3),
    telephone: Joi.string().min(3),
    email: Joi.string().email().min(3)


  
};

exports.validateTask = (task) => Joi.validate(task, taskSchema);