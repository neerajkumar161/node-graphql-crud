import {model, Schema} from 'mongoose'

const user = new Schema(
  {
    firstname: {type: String},
    lastname: {type: String},
    age: {type: Number},
    email: {type: String},
    password: {type: String}
  },
  {timestamps: true}
)

export const userModel = model('user', user)
