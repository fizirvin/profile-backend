import { Schema, model } from 'mongoose'

const passwordSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  password: {
    type: String,
    required: true
  }
})

export default model('Password', passwordSchema)
