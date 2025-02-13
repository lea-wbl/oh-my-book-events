import { NextRequest, NextResponse } from "next/server";
import { mongooseConnect } from "@/lib/mongooseConnect";
import Event from "@/models/Event";

export async function GET() {
  try {
    await mongooseConnect();
    const events = await Event.find();
    return NextResponse.json(events);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch events" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    await mongooseConnect();
    const eventData = await req.json();
    console.log("Received event data:", eventData);
    const newEvent = await Event.create(eventData);

    return NextResponse.json(newEvent, { status: 201 });
  } catch (error) {
    console.error("Error saving event:", error);
    return NextResponse.json({ error: "Failed to add event" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  const { id } = await req.json();
  await mongooseConnect();
  await Event.findByIdAndDelete(id);
  return NextResponse.json({ message: "Event type deleted" });
}
