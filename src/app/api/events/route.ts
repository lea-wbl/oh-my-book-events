import { NextRequest, NextResponse } from "next/server";
import { mongooseConnect } from "@/lib/mongooseConnect";
import Event from "@/models/Event";

export async function GET(req: Request) {
  try {
    await mongooseConnect();

    const { searchParams } = new URL(req.url);
    const closest = searchParams.get("closest");
    const typeId = searchParams.get("byType");

    const today = new Date().toISOString().split("T")[0];

    let events;

    if (closest) {
      events = await Event.findOne({ date: { $gte: today } }).sort({
        date: 1,
      });
    } else if (typeId) {
      events = await Event.find({ typeId });
    } else {
      events = await Event.find({ date: { $gte: today } }).sort({
        date: "ascending",
      });
    }

    return NextResponse.json(events);
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur lors de la récupération des événements" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const eventData = await req.json();

    if (!eventData._id) {
      return NextResponse.json(
        { message: "L'ID est manquant" },
        { status: 400 }
      );
    }

    const hasEmptyField = Object.values(eventData).some(
      (value: any) => value.length === 0
    );

    if (hasEmptyField) {
      return NextResponse.json(
        { error: "Tous les champs sont requis" },
        { status: 400 }
      );
    }

    await mongooseConnect();

    const updatedEvent = await Event.findByIdAndUpdate(
      eventData._id,
      eventData,
      { new: true, runValidators: true }
    );

    if (!updatedEvent) {
      return NextResponse.json(
        { message: "Événement non trouvé" },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedEvent, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Erreur lors de la mise à jour de l'événement" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const eventData = await req.json();

    const hasEmptyField = Object.values(eventData).some(
      (value: any) => value.length === 0
    );

    if (hasEmptyField) {
      return NextResponse.json(
        { error: "Tous les champs sont requis" },
        { status: 400 }
      );
    }

    await mongooseConnect();

    const newEvent = await Event.create(eventData);

    return NextResponse.json(newEvent, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur lors de l'ajout de l'événement" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  const { id } = await req.json();
  await mongooseConnect();
  await Event.findByIdAndDelete(id);
  return NextResponse.json({ message: "Event type deleted" });
}
