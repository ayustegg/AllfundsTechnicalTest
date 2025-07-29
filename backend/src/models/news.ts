import mongoose, { Schema } from "mongoose";

const NewsSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: String,
  date: { type: Date, default: Date.now },
  content: String,
  author: String,
  archiveDate: Date,
});

const news = mongoose.model("News", NewsSchema);

export default news;
