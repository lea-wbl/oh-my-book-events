import { Schema, model, models } from "mongoose";

const ImageSchema = new Schema({
  uuid: { type: String, required: true },
  name: { type: String, required: true },
});

const ProgramCardSchema = new Schema({
  image: { type: ImageSchema, required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
});

const EventSchema = new Schema({
  images: [{ type: { uuid: String, name: String } }],
  name: { type: String, required: true },
  type: { type: String, required: true },
  date: { type: Date, required: true },
  timeStart: { type: String, required: true },
  timeEnd: { type: String, required: true },
  location: { type: String, required: true },
  ticketLink: { type: String, required: true },
  tagline: { type: String, required: true },
  description: { type: String, required: true },
  programCards: [{ type: ProgramCardSchema }],
});

const Event = models.Event || model("Event", EventSchema);
export default Event;
