import { NextResponse } from "next/server";
import { mongooseConnect } from "@/lib/mongooseConnect";
import GalleryImg from "@/models/GalleryImg";

export async function GET() {
  try {
    await mongooseConnect();
    console.log('COUCOU');
    
    const galleryImages = await GalleryImg.find().sort({ createdAt: 1 });
    return NextResponse.json(galleryImages);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch gallery images" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const { newImages } = await req.json();
    await mongooseConnect();
    if (newImages.length > 0) {
      await GalleryImg.insertMany(newImages);
    }
    return NextResponse.json(
      { message: "Gallerie photo mise à jour" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update gallery" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  const { uuid } = await req.json();
  await mongooseConnect();
  await GalleryImg.findOneAndDelete({ uuid });
  return NextResponse.json({ message: "Gallery image deleted" });
}
