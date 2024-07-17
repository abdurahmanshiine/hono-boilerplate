import { validator } from "hono/validator"
import Joi from "joi"
import { ValidationError } from "../middleware";

class ClassValidators {
  public getAll = () => validator("form", (value, c) => {
    const { value: resp, error } = Joi.object({
      email: Joi.string().email().required(),
    }).validate(value)

    if (error) throw new ValidationError(error.details[0].message);

    return {
      email: resp.email
    }
  })
}

export default new ClassValidators()
