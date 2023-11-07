import { model, Schema } from "mongoose";
import { defaultSchemaOptions } from "../../../helpers/mongoose/defaults/schemaOptions";
import { ISample } from "./sample.types";

const sampleSchema = new Schema<ISample>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
  },
  {
    ...defaultSchemaOptions,
  }
);

export const SampleModel = model<ISample>("Sample", sampleSchema);
