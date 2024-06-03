import { Schema, model } from 'mongoose';

export const postSchema = new Schema(
  {
    postFormat: { type: String, required: true },
    title: { type: String, required: true },
    featureImg: { type: String, required: true },
    date: { type: String, required: true },
    category: { type: String, required: true },
    categoryName: { type: String, required: true },
    categoryImg: { type: String, required: true },
    postViews: { type: Number, required: true },
    readTime: { type: String, required: true },
    authorName: { type: String, required: true },
    authorImg: { type: String, required: true },
    authorDesignation: { type: String, required: true },
    authorBio: { type: String, required: true },
    authorSocial: [{}],
    tags: [String],
    content: { type: String, required: true },
    uuid: { type: String, required: true },
    slug: { type: String, required: true }
  },
  {
    timestamps: true,
  }
);

export const Post = model('Post', postSchema);
