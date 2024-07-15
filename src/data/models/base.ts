import { expect } from "bun:test";
import { type Collection, Document } from "mongodb"
import DB from "../index"
import { Validator } from "../../types/data";
import configs from "../../config";

export default class BaseModel<T extends Document> {
  public client?: Collection<T>;
  private coll: string;
  private validator;

  constructor(coll: string, validator: Validator) {
    expect(DB.client).toBeTruthy();
    this.coll = configs.env.prod || configs.env.stag ? "sms_" + coll : coll;
    this.validator = validator
  }

  async init() {
    this.client = await DB.client!.createCollection<T>(this.coll, {
      validator: this.validator as Document,
    })
  }
}
