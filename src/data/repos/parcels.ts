import { IParcel, IShipment } from "../../types/api";
import { ParcelModel, CustomerModel, SiteModel, BusModel } from "../../types/data";

const parcelsFilename: string = __dirname + "/parcels.json"
const customersFilename: string = __dirname + "/customers.json"
const sitesFilename: string = __dirname + "/sites.json"
const busesFilename: string = __dirname + "/buses.json"
const shipmentsFilename: string = __dirname + "/shipments.json"

const parcelsData: Array<ParcelModel> = JSON.parse(await Bun.file(parcelsFilename).text())
const customersData: Array<CustomerModel> = JSON.parse(await Bun.file(customersFilename).text())
const sitesData: Array<SiteModel> = JSON.parse(await Bun.file(sitesFilename).text())
const busesData: Array<BusModel> = JSON.parse(await Bun.file(busesFilename).text())
const shipmentsData: Array<IShipment> = JSON.parse(await Bun.file(shipmentsFilename).text())

class ParcelsRepo {
  private model: Array<ParcelModel>;
  private customersModel: Array<CustomerModel>;
  private sitesModel: Array<SiteModel>;
  private busesModel: Array<BusModel>;
  private shipmentsModel: Array<IShipment>;

  constructor() {
    this.model = parcelsData;
    this.customersModel = customersData;
    this.sitesModel = sitesData;
    this.busesModel = busesData;
    this.shipmentsModel = shipmentsData;
  }

  async createParcel(parcel: ParcelModel): Promise<ParcelModel> {
    this.model.push(parcel)
    await Bun.write(parcelsFilename, JSON.stringify(this.model, null, 2))
    return this.model.filter((u) => u._id === parcel._id)[0]
  }

  async getAllParcels(sortBy = "receiptDate", page = 1): Promise<Array<IParcel>> {
    let parcels: IParcel[] = this.model
      .slice((page - 1) * 10, page * 10) as unknown as IParcel[]

    parcels = parcels.map((parcel, index) => {
      parcel.senderInfo = {
        fullName: this.customersModel[index % this.customersModel.length].fullName,
        phoneNumber: this.customersModel[index % this.customersModel.length].phoneNumber,
      };
      parcel.recipientInfo = {
        fullName: this.customersModel[(index * 2 + 1) % this.customersModel.length].fullName,
        phoneNumber: this.customersModel[(index * 2 + 1) % this.customersModel.length].phoneNumber,
      }
      parcel.originSite = this.sitesModel[index % this.sitesModel.length].city;
      parcel.destinationSite = this.sitesModel[(index * 2 + 1) % this.sitesModel.length].city;
      parcel.shipmentId = this.shipmentsModel[(index * 2 + 1) % this.shipmentsModel.length]._id.$oid;
      parcel.shipmentTrackingNumber = this.shipmentsModel[(index * 2 + 1) % this.sitesModel.length].trackingNumber;
      parcel.busNumber = this.busesModel[index % this.busesModel.length].busNumber;

      return parcel;
    })

    return parcels
  }

  async getParcelsByRoute(originSite: string, destinationSite: string, sortBy: string = "receiptDate", page: number = 1): Promise<Array<IParcel>> {
    let parcels: IParcel[] = this.model as unknown as IParcel[]

    parcels = parcels.map((parcel, index) => {
      parcel.senderInfo = {
        fullName: this.customersModel[index % this.customersModel.length].fullName,
        phoneNumber: this.customersModel[index % this.customersModel.length].phoneNumber,
      };
      parcel.recipientInfo = {
        fullName: this.customersModel[(index * 2 + 1) % this.customersModel.length].fullName,
        phoneNumber: this.customersModel[(index * 2 + 1) % this.customersModel.length].phoneNumber,
      }
      parcel.originSite = this.sitesModel[index % this.sitesModel.length].city;
      parcel.destinationSite = this.sitesModel[(index * 2 + 1) % this.sitesModel.length].city;
      parcel.shipmentId = this.shipmentsModel[(index * 2 + 1) % this.shipmentsModel.length]._id.$oid;
      parcel.shipmentTrackingNumber = this.shipmentsModel[(index * 2 + 1) % this.sitesModel.length].trackingNumber;
      parcel.busNumber = this.busesModel[index % this.busesModel.length].busNumber;

      return parcel;
    })

    return parcels.filter((parcel) => parcel.originSite === originSite && parcel.destinationSite === destinationSite).slice((page - 1) * 20, page * 20)
  }

  async getParcelById(id: string): Promise<IParcel | undefined> {
    let parcel: IParcel | undefined = this.model.find((parcel) => parcel._id.$oid === id) as unknown as IParcel

    const index: number = Math.floor(Math.random() * 20);

    parcel.senderInfo = {
      fullName: this.customersModel[index % this.customersModel.length].fullName,
      phoneNumber: this.customersModel[index % this.customersModel.length].phoneNumber,
    };
    parcel.recipientInfo = {
      fullName: this.customersModel[(index * 2 + 1) % this.customersModel.length].fullName,
      phoneNumber: this.customersModel[(index * 2 + 1) % this.customersModel.length].phoneNumber,
    }
    parcel.originSite = this.sitesModel[index % this.sitesModel.length].city;
    parcel.destinationSite = this.sitesModel[(index * 2 + 1) % this.sitesModel.length].city;
    parcel.shipmentId = this.shipmentsModel[(index * 2 + 1) % this.shipmentsModel.length]._id.$oid;
    parcel.shipmentTrackingNumber = this.shipmentsModel[(index * 2 + 1) % this.sitesModel.length].trackingNumber;
    parcel.busNumber = this.busesModel[index % this.busesModel.length].busNumber;

    return parcel
  }

  async getParcelByTrackingNumber(trackingNumber: string): Promise<ParcelModel | undefined> {
    return this.model.find((parcel) => parcel.trackingNumber === trackingNumber)
  }
}

export default new ParcelsRepo()
