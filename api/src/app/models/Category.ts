import {model, Schema} from 'mongoose';

export const Category = model('Categoy', new Schema({
  name: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
}));
