import {loadFilesSync} from '@graphql-tools/load-files'
import {mergeTypeDefs} from '@graphql-tools/merge'
import {makeExecutableSchema} from '@graphql-tools/schema'
import * as path from 'path'
import {
  createPostResolver,
  getAllPostsResolver,
  getPostResolver
} from './resolvers/post'
import {
  createUserResolver,
  deleteUserResolver,
  getAllUsersResolver,
  getUserByIdResolver,
  updateUserResolver
} from './resolvers/user'

const ROOT_SCHEMA_PATH = loadFilesSync(path.join(__dirname, './schemas'))

const TypeDefinition = mergeTypeDefs(ROOT_SCHEMA_PATH)

const resolvers = () => {
  return {
    Query: {
      getAllUsers: getAllUsersResolver,
      getAllPost: getAllPostsResolver,
      getUser: getUserByIdResolver,
      getPost: getPostResolver
    },
    Mutation: {
      createUser: createUserResolver,
      updateUser: updateUserResolver,
      deleteUser: deleteUserResolver,
      createPost: createPostResolver
    }
  }
}

const schema = () =>
  makeExecutableSchema({
    typeDefs: [TypeDefinition],
    resolvers: resolvers()
  })

export const mainSchema = schema()
