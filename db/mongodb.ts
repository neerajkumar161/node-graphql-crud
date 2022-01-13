import config from 'config'
import {connect} from 'mongoose'

const MONGO_URI: string = config.get('db_url')

export const connectMongoDB = async () => {
  try {
    const res = await connect(MONGO_URI)
    if (res) console.log('Connected to MongoDB')
  } catch (error) {
    console.log('MongoDB connection error', error)
  }
}
