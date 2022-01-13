import {userModel} from '../models/user'
import {postModel} from './../models/post'

export const createPostResolver = async (
  parent: any,
  args: any,
  context: any
) => {
  const user = await userModel.findOne({_id: args.userId}).lean()
  if (!user) throw new Error('User not exists!')
  let post = await postModel.create(args)
  return {
    message: 'Post created!',
    post
  }
}

export const getPostResolver = async (parent: any, args: any, context: any) => {
  const post = await postModel.findOne({_id: args.id}).lean()
  if (!post) throw new Error('No Post exists!')
  return post
}

export const getAllPostsResolver = async (
  parent: any,
  args: any,
  context: any
) => {
  const allPosts = await postModel.find({}).lean()
  if (!allPosts.length) throw new Error('No posts exists!')
  return allPosts
}
