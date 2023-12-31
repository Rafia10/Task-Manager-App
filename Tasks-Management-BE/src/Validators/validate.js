import Joi from "joi";
 const userValidatorSchema=Joi.object({
        username:Joi.string(),
        email:Joi.string().email(),
        password:Joi.string().min(9)
    })

export default userValidatorSchema