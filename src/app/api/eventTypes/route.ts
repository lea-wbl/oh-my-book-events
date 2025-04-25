import { NextRequest, NextResponse } from "next/server";
import { mongooseConnect } from "@/lib/mongooseConnect";
import EventType from "@/models/EventType";

export async function GET(req: NextRequest) {
  try {
    await mongooseConnect();

    const { searchParams } = new URL(req.url);
    const field = searchParams.get("field");
    const id = searchParams.get("id");

    if (field === "name") {
      const types = await EventType.find().select("name");
      return NextResponse.json(types);
    }

    if (id) {
      const type = await EventType.findById(id);
      return NextResponse.json(type);
    }

    const types = await EventType.find();

    return NextResponse.json(types);
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur lors de la récupération des types d'événement" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const { id, name, summary, leading, description, images } =
      await req.json();

    if (!id) {
      return NextResponse.json(
        { message: "L'ID est manquant" },
        { status: 400 }
      );
    }

    if (!name || !summary || !leading || !description) {
      return NextResponse.json(
        { message: "Tous les champs sont requis" },
        { status: 400 }
      );
    }

    await mongooseConnect();

    const updatedEventType = await EventType.findByIdAndUpdate(
      id,
      { name, summary, leading, description, images },
      { new: true, runValidators: true }
    );

    if (!updatedEventType) {
      return NextResponse.json(
        { message: "Type d'événement non trouvé" },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedEventType, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Erreur lors de la mise à jour du type d'événement" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const { name, summary, leading, description, images } = await req.json();

    console.log("POST", { name, summary, leading, description, images });

    if (!name || !summary || !leading || !description || images.length === 0) {
      return NextResponse.json(
        { error: "Tous les champs sont requis" },
        { status: 400 }
      );
    }

    await mongooseConnect();

    const newType = await EventType.create({
      name,
      summary,
      leading,
      description,
      images,
    });

    return NextResponse.json(newType, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur lors de l'ajout du type d'événement" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json(
        { message: "L'ID est manquant" },
        { status: 400 }
      );
    }

    await mongooseConnect();

    const deletedEventType = await EventType.findByIdAndDelete(id);

    if (!deletedEventType) {
      return NextResponse.json(
        { message: "Type d'événement non trouvé" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Type d'événement supprimé" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Erreur lors de la suppression du type d'événement" },
      { status: 500 }
    );
  }
}
