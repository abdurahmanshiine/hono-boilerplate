import ora from "ora";
import { MongoClient, type Db } from "mongodb";
import { SysComponents } from "../types/logging";
import { ClassModel } from "./models";
import configs from "../config";

class Database {
  public client?: Db;
  private conn?: MongoClient;
  private url: string;

  constructor() {
    this.url = configs.env.prod || configs.env.stag ? `mongodb://${configs.mongo.username}:${configs.mongo.password}@${configs.mongo.url}/${configs.mongo.db}?authSource=admin` : `mongodb://${configs.mongo.url}/${configs.mongo.db}`;
  }

  async connect(): Promise<void> {
    const spinner = ora("")

    try {
      spinner.color = "yellow";
      spinner.text = `[${SysComponents.MONGODB}] Connecting...`;
      spinner.start()

      this.conn = await MongoClient.connect(this.url)
      this.client = this.conn.db(configs.mongo.db)

      spinner.color = "green"
      spinner.text = `[${SysComponents.MONGODB}] Connected`
      spinner.succeed()
    } catch (e) {
      spinner.color = "red"
      spinner.text = `[${SysComponents.MONGODB}] Connection error: ${e}`
      spinner.fail()
      process.exit(1);
    }
  }

  async disconnect(): Promise<void> {
    const spinner = ora("")

    try {
      spinner.color = "yellow";
      spinner.text = `[${SysComponents.MONGODB}] Disconnecting...`;
      spinner.start()
      if (this.conn) await this.conn.close();

      spinner.color = "green"
      spinner.text = `[${SysComponents.MONGODB}] Disconnected`
      spinner.succeed()
    } catch (e) {
      spinner.color = "red"
      spinner.text = `[${SysComponents.MONGODB}] Disconnection error: ${e}`
      spinner.fail()
    }
  }

  async initModels(): Promise<void> {
    const spinner = ora("")
    try {
      spinner.color = "yellow";
      spinner.text = `[${SysComponents.MONGODB}] Initializing models...`;
      spinner.start()

      const models = [
        new ClassModel().init(),
      ];

      await Promise.all(models)

      spinner.color = "green"
      spinner.text = `[${SysComponents.MONGODB}] Initialized models successfully`
      spinner.succeed()
    } catch (e: any) {
      // If the model already exists
      if (e.code === 48) {
        spinner.color = "green"
        spinner.text = `[${SysComponents.MONGODB}] Initialized models successfully`
        spinner.succeed()
        return
      }

      spinner.color = "red"
      spinner.text = `[${SysComponents.MONGODB}] Model initialization failed: ${e}`
      spinner.fail()
      process.exit(1)
    }
  }
}

export default new Database();
