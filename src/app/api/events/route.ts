import { NextRequest, NextResponse } from "next/server";
import { mongooseConnect } from "@/lib/mongooseConnect";
import Event from "@/models/Event";

export async function GET(req: Request) {
  try {
    await mongooseConnect();

    const { searchParams } = new URL(req.url);
    const closest = searchParams.get("closest");
    const typeId = searchParams.get("byType");

    let events;

    if (closest) {
      const today = new Date().toISOString().split("T")[0];
      events = await Event.findOne({ date: { $gte: today } }).sort({
        date: 1,
      });
      console.log("EVENT", events);
    } else if (typeId) {
      events = await Event.find({ typeId });
    } else {
      events = await Event.find();
    }

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
