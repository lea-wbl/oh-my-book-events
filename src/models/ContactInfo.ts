import { Schema, model, models } from "mongoose";

const ContactInfoSchema = new Schema({
  email: { type: String, required: true },
  tel: { type: String, required: false },
  ig: { type: String, required: false },
  tiktok: { type: String, required: false },
});

const ContactInfo =
  models.ContactInfo || model("ContactInfo", ContactInfoSchema);
export default ContactInfo;
