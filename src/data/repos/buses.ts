import { BusModel } from "../../types/data";

const filename: string = __dirname + "/buses.json"
const data: Array<BusModel> = JSON.parse(await Bun.file(filename).text())

class BusesRepo {
  private model: Array<BusModel>;

  constructor() {
    this.model = data
  }

  async createBus(bus: BusModel): Promise<BusModel> {
    this.model.push(bus)
    await Bun.write(filename, JSON.stringify(this.model, null, 2))
    return this.model.filter((u) => u._id === bus._id)[0]
  }

  async getAllBuses(sortBy = "receiptDate", page = 1): Promise<Array<BusModel>> {
    return this.model
      .slice((page - 1) * 10, page * 10);
  }

  async getBusById(id: string): Promise<BusModel | undefined> {
    return this.model.find((bus) => bus._id.$oid === id)
  }

  async getBusByNumber(busNumber: number): Promise<BusModel | undefined> {
    return this.model.find((bus) => bus.busNumber === busNumber)
  }
}

export default new BusesRepo()
