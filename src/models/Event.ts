import { Schema, model, models } from "mongoose";

const EventSchema = new Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  date: { type: String, required: true },
  timeStart: { type: String, required: true },
  timeEnd: { type: String, required: true },
  location: { type: String, required: true },
  ticketLink: { type: String, required: true },
  tagline: { type: String, required: true },
  description: { type: String, required: true },
  programCards: {
    type: [
      {
        title: { type: String, required: true },
        content: { type: String, required: true },
      },
    ],
    default: [],
  },
});

const Event = models.Event || model("Event", EventSchema);
export default Event;
