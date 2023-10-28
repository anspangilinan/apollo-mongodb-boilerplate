const jsonSerializer = (doc: any, ret: any) => {
  ret.id = ret._id.toString();
  delete ret._id;
  delete ret.__v;
  return ret;
};

export const defaultSchemaOptions = {
  _id: true,
  timestamps: { createdAt: "timestamp", updatedAt: false },
  toJSON: { transform: jsonSerializer },
};
