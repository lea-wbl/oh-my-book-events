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
      { error: "Échec lors de la récupération des avis" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const { id, name, content } = await req.json();

    if (!id) {
      return NextResponse.json(
        { message: "L'ID est manquant" },
        { status: 400 }
      );
    }

    if (!name || !content) {
      return NextResponse.json(
        { message: "Tous les champs sont requis" },
        { status: 400 }
      );
    }

    await mongooseConnect();

    const updatedReview = await Review.findByIdAndUpdate(
      id,
      { name, content },
      { new: true, runValidators: true }
    );

    if (!updatedReview) {
      return NextResponse.json({ message: "Avis non trouvé" }, { status: 404 });
    }

    return NextResponse.json(updatedReview, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Erreur lors de la mise à jour de l'avis" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const { name, content } = await req.json();

    if (!name || !content) {
      return NextResponse.json(
        { error: "Tous les champs sont requis" },
        { status: 400 }
      );
    }

    await mongooseConnect();

    const newReview = await Review.create({ name, content });

    return NextResponse.json(newReview, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Échec lors de l'ajout de l'avis" },
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

    const deletedReview = await Review.findByIdAndDelete(id);

    if (!deletedReview) {
      return NextResponse.json({ message: "Avis non trouvé" }, { status: 404 });
    }

    return NextResponse.json({ message: "Avis supprimé" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Erreur lors de la suppression de l'avis" },
      { status: 500 }
    );
  }
}
