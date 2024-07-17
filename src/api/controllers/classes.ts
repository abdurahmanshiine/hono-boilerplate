import responseHandler from "../../utils/response-handler"
import { BaseController } from "./base"

class ClassControllers extends BaseController {
  constructor() {
    super()
  }

  public getAll = () => this.init(async (c) => {
    return responseHandler(c, {
      message: "success",
    })
  })[0]
}

export default new ClassControllers()

