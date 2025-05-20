import mongoose from "mongoose"

const MONGO_URL = process.env.MONGO_URL
const MONGO_DB = process.env.MONGO_DB

const cached: {
  connection?: typeof mongoose
  promise?: Promise<typeof mongoose>
} = {}
async function connMongoose() {
  if (!MONGO_URL) {
    throw new Error("Could not find MONGO_URL, please inspect!")
  }
  //everything is good, get the data.
  if (cached.connection) {
    return cached.connection
  }
  if (!cached.promise) {
    const opts = { bufferCommands: false }
    cached.promise = mongoose.connect(`${MONGO_URL}/${MONGO_DB}`, opts)
  }
  try {
    cached.connection = await cached.promise
  } catch (e) {
    cached.promise = undefined
    throw e
  }
  return cached.connection
}
export { connMongoose }