import { IncomingHttpHeaders } from "http";
import { ConnectionOptions, Document } from "mongoose";

export interface RequestContext {
  body: unknown
  params: unknown,
  query: unknown,
  headers: IncomingHttpHeaders,
}

export interface iExample extends Document {
  slug: string
  title: string
  author: string
  content: string
  tags: string[]
}

export interface MongooseLoaderPluginOptions {
  uri: string,
  options: ConnectionOptions,
}

export interface CustomError extends Error{
  isCustom: boolean,
  msg: string,
  code: number,
}
