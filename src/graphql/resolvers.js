import bcrypt from 'bcryptjs'
import validator from 'validator'
import jwt from 'jsonwebtoken'
import zoneDate from '../functions/zoneDate'
import fullDate from '../functions/fullDate'
import allDate from '../functions/allDate'
import stringDate from '../functions/stringDate'

import User from '../models/user'
import Password from '../models/password'

const graphqlResolver = {
  login: async function ({ email, password }) {
    const user = await User.findOne({ email })
    if (!user) {
      const error = new Error('Email is incorrect.')
      error.code = 401
      throw error
    }
    const existingPassword = await Password.findOne({ userId: user._id })
    const isEqual = await bcrypt.compare(password, existingPassword.password)
    if (!isEqual) {
      const error = new Error('Password is incorrect.')
      error.code = 402
      throw error
    }
    const token = jwt.sign(
      {
        userId: user._id.toString(),
        firstName: user.firstName
      },
      'somesupersecretsecret',
      { expiresIn: '1h' }
    )
    return { token: token, userId: user._id, firstName: user.firstName }
  },
  users: async function () {
    return await User.find()
  },
  newUser: async function ({ input }) {
    if (validator.isEmpty(input.password)) {
      const error = new Error('Invalid input.')
      error.code = 422
      throw error
    }
    if (!validator.isLength(input.password, { min: 5 })) {
      const error = new Error('Password too short!')
      error.code = 422
      throw error
    }
    const existingUser = await User.findOne({ email: input.email })
    if (existingUser) {
      const error = new Error('email is already registered!')
      error.code = 500
      throw error
    }

    const date = new Date()
    const newUser = new User({
      firstName: input.firstName,
      lastName: input.lastName,
      email: input.email,
      active: true,
      createdAt: zoneDate(date)
    })

    const user = await newUser.save()
    const { _id } = user._doc

    const newPassword = new Password({
      userId: _id,
      password: await bcrypt.hash(input.password, 12)
    })
    const setPassword = await newPassword.save()

    return { ...user._doc }
  }
}

export default graphqlResolver
