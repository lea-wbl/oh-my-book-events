import { Schema, model, models } from "mongoose";

const EventTypeSchema = new Schema({
  name: { type: String, required: true },
  summary: { type: String, required: true },
  leading: { type: String, required: true },
  description: { type: String, required: true },
});

const EventType = models.EventType || model("EventType", EventTypeSchema);
export default EventType;
