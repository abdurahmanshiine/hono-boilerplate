import { Factory, createFactory } from 'hono/factory'
import { H } from 'hono/types'

export class BaseController {
  protected factory: Factory<any, any> = createFactory()

  protected init(handler: H<any, any, {}>) {
    return this.factory.createHandlers(handler)
  }
}
