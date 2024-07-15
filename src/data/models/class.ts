import BaseModel from "./base";
import { Validator, IClass, Models } from "../../types/data";

export default class ClassModel extends BaseModel<IClass> {
  constructor() {
    const validator: Validator = {
      $jsonSchema: {
        bsonType: "object",
        title: "Student Object Validation",
        required: ["name", "year"],
        properties: {
          name: {
            bsonType: "string",
            description: "'name' must be a string and is required"
          },
          year: {
            bsonType: "int",
            minimum: 2017,
            maximum: 3017,
            description: "'year' must be an integer in [ 2017, 3017 ] and is required"
          },
          gpa: {
            bsonType: ["double"],
            description: "'gpa' must be a double if the field exists"
          }
        }
      }
    }
    super(Models.classes, validator);
  }
}
