import { Schema, model, models } from "mongoose";

const GalleryImgSchema = new Schema({
  name: { type: String, required: true },
  uuid: { type: String, required: true },
});

const GalleryImg = models.GalleryImg || model("GalleryImg", GalleryImgSchema);
export default GalleryImg;
