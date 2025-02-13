import { NextRequest, NextResponse } from "next/server";
import { mongooseConnect } from "@/lib/mongooseConnect";
import Review from "@/models/Review";

export async function GET() {
  try {
    await mongooseConnect();
    const reviews = await Review.find();
    return NextResponse.json(reviews);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch reviews" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const { name, content } = await req.json();
    if (!name || !content) {
      return NextResponse.json(
        { error: "Name and content are required" },
        { status: 400 }
      );
    }

    await mongooseConnect();
    const newReview = await Review.create({ name, content });

    return NextResponse.json(newReview);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to add review" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  const { id } = await req.json();
  await mongooseConnect();
  await Review.findByIdAndDelete(id);
  return NextResponse.json({ message: "Review deleted" });
}
