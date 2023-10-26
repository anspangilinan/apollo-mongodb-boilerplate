import { Schema, model, connect } from "mongoose";

interface ISample {
  name: string;
  email: string;
  avatar?: string;
}

const sampleSchema = new Schema<ISample>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  avatar: String,
});

const Sample = model<ISample>("User", sampleSchema);

export { Sample };
