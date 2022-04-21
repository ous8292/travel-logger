import mongoose from "mongoose";
const { Schema } = mongoose;

//making a variable to hold required object -> makes it more reusable
const requiredString = {
  type: String,
  require: true,
};

const logEntrySchema = new Schema(
  {
    title: requiredString,
    description: String,
    comments: String,
    rating: {
      type: Number,
      min: 0,
      max: 10,
      default: 0,
    },
    latitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
    image: String,
    visitedDate: {
      required: true,
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = logEntrySchema;
