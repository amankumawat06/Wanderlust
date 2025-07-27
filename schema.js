// Validation for Schema using Joi
const Joi = require('joi');

module.exports.listingSchema = Joi.object({
    listing: Joi.object({
        title : Joi.string().required(),
        description : Joi.string().required(),
        'image.url': Joi.string().allow("",null), 
        'image.filename' : Joi.string().allow("",null),
        category : Joi.string().valid("mountains","cities","amazing pools","farms","trending","rooms","castles","campign","arctic").required(),
        price : Joi.number().required(),
        location : Joi.string().required(),
        country : Joi.string().required(),
    }).required()
})


module.exports.reviewSchema = Joi.object({
    review : Joi.object({
        rating : Joi.number().required().min(1).max(5),
        comment : Joi.string().required(),
    }).required()
})