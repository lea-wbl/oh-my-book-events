import { NextRequest, NextResponse } from "next/server";
import { mongooseConnect } from "@/lib/mongooseConnect";
import EventType from "@/models/EventType";

export async function GET(req: NextRequest) {
  try {
    await mongooseConnect();

    const { searchParams } = new URL(req.url);
    const field = searchParams.get("field");
    console.log(field);

    if (field === "name") {
      const types = await EventType.find().select("name");
      return NextResponse.json(types);
    }

    const types = await EventType.find();
    return NextResponse.json(types);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch event types" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const { name, desc, events } = await req.json();
    if (!name || !desc) {
      return NextResponse.json(
        { error: "Name and description are required" },
        { status: 400 }
      );
    }

    await mongooseConnect();
    const newType = await EventType.create({ name, desc, events });

    return NextResponse.json(newType);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to add event type" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  const { id } = await req.json();
  await mongooseConnect();
  await EventType.findByIdAndDelete(id);
  return NextResponse.json({ message: "Event type deleted" });
}
