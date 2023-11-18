import { withMongoDBConnection } from "./utils/mongodbConnect";

const sampleSeedScript = async () => {
  // Write or invoke your seeder code here
};

withMongoDBConnection(sampleSeedScript)();
