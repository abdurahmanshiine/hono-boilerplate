import { file } from "bun";
import { SiteModel } from "../../types/data";

const filename: string = __dirname + "/sites.json"
const data: Array<SiteModel> = JSON.parse(await Bun.file(filename).text())

class SitesRepo {
  private model: Array<SiteModel>;

  constructor() {
    this.model = data
  }

  async createSite(site: SiteModel): Promise<SiteModel> {
    this.model.push(site)
    await Bun.write(filename, JSON.stringify(this.model, null, 2))
    return this.model.filter((u) => u._id === site._id)[0]
  }

  async getAllSites(sortBy = "receiptDate", page = 1): Promise<Array<SiteModel>> {
    return this.model
      .slice((page - 1) * 10, page * 10)
  }

  async getSiteById(id: string): Promise<SiteModel | undefined> {
    return this.model.find((site) => site._id.$oid === id)
  }

  async getSiteByCity(city: string): Promise<SiteModel | undefined> {
    return this.model.find((site) => site.city === city)
  }
}

export default new SitesRepo()
