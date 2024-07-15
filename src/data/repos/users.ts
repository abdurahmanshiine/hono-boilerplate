import { UserModel, SiteModel } from "../../types/data";
import { IUser } from "../../types/api";

const usersFilename: string = __dirname + "/users.json"
const sitesFilename: string = __dirname + "/sites.json"

const usersData: Array<UserModel> = JSON.parse(await Bun.file(usersFilename).text())
const sitesData: Array<SiteModel> = JSON.parse(await Bun.file(sitesFilename).text())

class UsersRepo {
  private model: Array<UserModel>;
  private sitesModel: Array<SiteModel>;

  constructor() {
    this.model = usersData;
    this.sitesModel = sitesData;
  }

  async createUser(user: UserModel): Promise<UserModel> {
    this.model.push(user)
    await Bun.write(usersFilename, JSON.stringify(this.model, null, 2))
    return this.model.filter((u) => u._id === user._id)[0]
  }

  async getUserByEmail(email: string): Promise<UserModel | undefined> {
    return this.model.find((user) => user.email === email)
  }

  async getUserByPhoneNumber(phoneNumber: string): Promise<UserModel | undefined> {
    return this.model.find((user) => user.phoneNumber === phoneNumber)
  }

  async getAllUsers(sortBy = "receiptDate", page = 1): Promise<Array<IUser>> {
    let uses: IUser[] = this.model
      .slice((page - 1) * 10, page * 10) as unknown as IUser[]

    uses = uses.map((user, index) => {
      user.gender = user.gender.toLowerCase() as "male" | "female"
      user.assignedSite = this.sitesModel[(index * 2 + 3) % this.sitesModel.length].city;

      return user;
    })

    return uses
  }

  async getUserById(id: string): Promise<IUser | undefined> {
    let user: IUser | undefined = this.model.find((user) => user._id.$oid === id) as unknown as IUser;

    user.gender = user.gender.toLowerCase() as "male" | "female"
    user.assignedSite = this.sitesModel[(Math.floor(Math.random() * this.sitesModel.length) * 2 + 3) % this.sitesModel.length].city;

    return user
  }

  async setActivationToken(userId: string, token: string, expiration: Date): Promise<void> {
    this.model = this.model.map(user => {
      if (user._id.$oid === userId) {
        user.verificationToken = token;
        user.verificationTokenExpiration = expiration
      }
      return user
    })

    await Bun.write(usersFilename, JSON.stringify(this.model, null, 2))
  }
}

export default new UsersRepo()
