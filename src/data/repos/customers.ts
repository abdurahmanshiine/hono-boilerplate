import { ICustomer } from "../../types/api";
import { ParcelModel, CustomerModel, SiteModel } from "../../types/data";

const customersFilename: string = __dirname + "/customers.json"
const parcelsFilename: string = __dirname + "/parcels.json"
const sitesFilename: string = __dirname + "/sites.json"

const customersData: Array<CustomerModel> = JSON.parse(await Bun.file(customersFilename).text())
const parcelsData: Array<ParcelModel> = JSON.parse(await Bun.file(parcelsFilename).text())
const sitesData: Array<SiteModel> = JSON.parse(await Bun.file(sitesFilename).text())

class CustomersRepo {
  private model: Array<CustomerModel>;
  private parcelsModel: Array<ParcelModel>;
  private sitesModel: Array<SiteModel>;

  constructor() {
    this.model = customersData
    this.parcelsModel = parcelsData;
    this.sitesModel = sitesData
  }

  async createCustomer(customer: CustomerModel): Promise<CustomerModel> {
    this.model.push(customer)
    await Bun.write(customersFilename, JSON.stringify(this.model, null, 2))
    return this.model.filter((u) => u._id === customer._id)[0]
  }

  async getAllCustomers(sortBy = "receiptDate", page = 1): Promise<Array<ICustomer>> {
    let customers: ICustomer[] = this.model
      .slice((page - 1) * 10, page * 10) as unknown as ICustomer[]

    customers = customers.map((customer, index) => {
      customer.latestParcelTrackingNumber = this.parcelsModel[index % this.parcelsModel.length].trackingNumber
      customer.originSite = this.sitesModel[index % this.sitesModel.length].city;
      customer.destinationSite = this.sitesModel[(index * 2 + 1) % this.sitesModel.length].city;
      customer.parcelStatus = this.parcelsModel[index % this.parcelsModel.length].status

      return customer;
    })

    return customers
  }

  async getCustomerById(id: string): Promise<ICustomer | undefined> {
    return this.model.find((customer) => customer._id.$oid === id) as unknown as ICustomer
  }

  async getCustomerByName(fullName: string): Promise<Array<ICustomer>> {
    return this.model.find((customer) => customer.fullName === fullName) as unknown as ICustomer[]
  }

  async getCustomerByPhoneNumber(phoneNumber: string): Promise<ICustomer | undefined> {
    return this.model.find((customer) => customer.phoneNumber === phoneNumber) as unknown as ICustomer
  }
}

export default new CustomersRepo()
