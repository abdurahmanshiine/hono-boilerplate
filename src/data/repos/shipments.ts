import { ParcelsRepo } from ".";
import { IShipment } from "../../types/api";
import { BusModel, ShipmentModel, SiteModel } from "../../types/data";

const shipmentsFilename: string = __dirname + "/shipments.json"
const sitesFilename: string = __dirname + "/sites.json"
const busesFilename: string = __dirname + "/buses.json"

const shipmentsData: Array<ShipmentModel> = JSON.parse(await Bun.file(shipmentsFilename).text())
const sitesData: Array<SiteModel> = JSON.parse(await Bun.file(sitesFilename).text())
const busesData: Array<BusModel> = JSON.parse(await Bun.file(busesFilename).text())

class ShipmentsRepo {
  private model: Array<ShipmentModel>;
  private sitesModel: Array<SiteModel>;
  private busesModel: Array<BusModel>;

  constructor() {
    this.model = shipmentsData;
    this.sitesModel = sitesData;
    this.busesModel = busesData;
  }

  async createShipment(shipment: ShipmentModel): Promise<ShipmentModel> {
    this.model.push(shipment)
    await Bun.write(shipmentsFilename, JSON.stringify(this.model, null, 2))
    return this.model.filter((u) => u._id === shipment._id)[0]
  }

  async getAllShipments(sortBy = "receiptDate", page = 1): Promise<Array<IShipment>> {
    let shipments: IShipment[] = this.model
      .slice((page - 1) * 10, page * 10) as unknown as IShipment[]

    shipments = shipments.map((shipment, index) => {
      shipment.originSite = this.sitesModel[index % this.sitesModel.length].city;
      shipment.destinationSite = this.sitesModel[(index * 2 + 1) % this.sitesModel.length].city;
      shipment.bus = {
        number: this.busesModel[index % this.busesModel.length].busNumber,
        plateNumber: this.busesModel[(index * 2 + 1) % this.busesModel.length].plateNumber,
        driverName: this.busesModel[index % this.busesModel.length].driverName,
        driverPhoneNumber: this.busesModel[(index * 2 + 1) % this.busesModel.length].driverPhoneNumber,
      }

      return shipment;
    })

    return shipments
  }

  async getShipmentById(id: string): Promise<IShipment | undefined> {
    const shipment: IShipment | undefined = this.model.find((shipment) => shipment._id.$oid === id) as unknown as IShipment;

    const index: number = Math.floor(Math.random() * 100);

    shipment.originSite = this.sitesModel[index % this.sitesModel.length].city;
    shipment.destinationSite = this.sitesModel[(index * 2 + 1) % this.sitesModel.length].city;
    shipment.bus = {
      number: this.busesModel[index % this.busesModel.length].busNumber,
      plateNumber: this.busesModel[(index * 2 + 1) % this.busesModel.length].plateNumber,
      driverName: this.busesModel[index % this.busesModel.length].driverName,
      driverPhoneNumber: this.busesModel[(index * 2 + 1) % this.busesModel.length].driverPhoneNumber,
    }
    shipment.parcels = await ParcelsRepo.getAllParcels()

    return shipment;
  }
}

export default new ShipmentsRepo()
