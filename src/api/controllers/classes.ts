import { BaseController } from "./base"

class ClassControllers extends BaseController {
  constructor() {
    super()
  }

  public getAll = () => this.init(async (c) => {
    return c.json({
      message: "success",
    }, 200)
  })[0]
}

export default new ClassControllers()

