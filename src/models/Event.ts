import { Schema, model, models } from "mongoose";

const ImageSchema = new Schema({
  uuid: { type: String, required: true },
  name: { type: String, required: true },
});

const EventSchema = new Schema({
  images: [{ type: { uuid: String, name: String } }],
  name: { type: String, required: true },
  type: { type: String, required: true },
  typeId: { type: Schema.Types.ObjectId, ref: "EventType", required: true },
  date: { type: String, required: true },
  timeStart: { type: String, required: true },
  timeEnd: { type: String, required: true },
  location: { type: String, required: false },
  address: { type: String, required: true },
  ticketLink: { type: String, required: true },
});

const Event = models.Event || model("Event", EventSchema);
export default Event;
