import { model, Schema } from 'mongoose';

import { iExample } from '../types';

const dataSchema = new Schema({
  title: {
    type: String,
    minLength: 3,
    required: true,
  },
  slug: {
    type: String,
    minLength: 3,
    required: true,
  },
  published: {
    type: Boolean,
    default: false,
  },
  author: {
    type: String,
    minLength: 3,
    required: true,
  },
  content: {
    type: String,
    minLength: 3,
    required: true,
  },
  tags: {
    type: Array,
    items: {
      type: String,
      minLength: 3,
    },
    required: true,
  },
});

dataSchema.pre('validate', function (this: iExample, next) {
  this.slug = this.title.toLowerCase().replaceAll(' ', '-');

  next();
})

export default () => model('example', dataSchema);
