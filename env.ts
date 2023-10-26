const toBool = (val?: string) => {
  return val?.toLowerCase() === "true";
};

const MONGODB = {
  URL: process.env.MONGODB_URL as string,
  DBNAME: process.env.MONGODB_DBNAME as string,
  USE_SSL: toBool(process.env.MONGODB_USE_SSL) as boolean,
};
const JWT = {
  SECRET_KEY: process.env.JWT_SECRET_KEY,
};
const PORT = process.env.PORT;
const FILES = {
  MAX_FILE_SIZE: parseInt(process.env.MAX_FILE_SIZE as string) || 100000000,
  MAX_FILE_COUNT: parseInt(process.env.MAX_FILE_COUNT as string) || 10,
};

export { MONGODB, PORT, JWT, FILES };
