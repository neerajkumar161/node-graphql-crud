import {model, Schema} from 'mongoose'

const post = new Schema(
  {
    caption: {type: String},
    description: {type: String},
    userId: {type: Schema.Types.ObjectId, ref: 'user'}
  },
  {timestamps: true}
)

export const postModel = model('post', post)
