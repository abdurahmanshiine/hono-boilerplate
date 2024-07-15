import { validator } from "hono/validator"
import Joi from "joi"

class AuthValidators {
  public email = () => validator("form", (value, c) => {
    const { value: resp, error } = Joi.object({
      email: Joi.string().email().required(),
    }).validate(value)

    if (error) return c.html(<span id="email-feedback" class="text-xs text-red-500 ml-1" _="on htmx:afterSwap add @disabled to #submit-btn">You must provide a valid email</span>)

    return {
      email: resp.email
    }
  })
}

export default new AuthValidators()
