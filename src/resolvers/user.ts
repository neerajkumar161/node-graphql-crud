import {userModel} from '../models/user'

export const createUserResolver = async (
  parent: any,
  args: any,
  context: any
) => {
  let user = await userModel.find({email: args.email}).lean()
  if (user.length) throw new Error('User already exists!')
  user = await userModel.create(args)
  if (!user) throw new Error('User creation failed')
  return {
    message: 'User created!',
    user
  }
}

export const updateUserResolver = async (
  parent: any,
  args: any,
  context: any
) => {
  let user = await userModel.findOne({email: args.email}).lean()
  if (!user) throw new Error('User not exists!')
  const updateUser = {email: user.email, ...args}
  user = await userModel
    .findByIdAndUpdate(user._id, updateUser, {new: true})
    .lean()
  return {
    message: 'User updated successfully!',
    user
  }
}

export const getUserByIdResolver = async (
  parent: any,
  args: any,
  context: any
) => {
  const user = await userModel.findOne({_id: args.id}).lean()
  if (!user) throw new Error('No user exists!')
  return user
}

export const getAllUsersResolver = async (
  parent: any,
  args: any,
  context: any
) => {
  const allUsers = await userModel.find({}).lean()
  if (!allUsers.length) throw new Error('No users exists!')
  return allUsers
}

export const deleteUserResolver = async (
  parent: any,
  args: any,
  context: any
) => {
  let user = await userModel.findOne({email: args.email})
  if (!user) throw new Error('User not exists!')
  await userModel.findOneAndRemove({_id: user._id})
  return {message: 'User Deleted!'}
}
