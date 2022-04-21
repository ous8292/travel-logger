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
      min: -90,
      max: 90,
    },
    longitude: {
      type: Number,
      required: true,
      min: -180,
      max: 180,
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

const LogEntry = mongoose.model("LogEntry", logEntrySchema);

module.exports = LogEntry;
