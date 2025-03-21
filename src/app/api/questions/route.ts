import { NextRequest, NextResponse } from "next/server";
import { mongooseConnect } from "@/lib/mongooseConnect";
import Question from "@/models/Question";

export async function GET() {
  try {
    await mongooseConnect();

    const questions = await Question.find();

    return NextResponse.json(questions);
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur lors de la récupération des questions" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const { id, question, answer } = await req.json();

    if (!id) {
      return NextResponse.json(
        { message: "L'ID est manquant" },
        { status: 400 }
      );
    }

    if (!question || !answer) {
      return NextResponse.json(
        { message: "Tous les champs sont requis" },
        { status: 400 }
      );
    }

    await mongooseConnect();

    const updatedQuestion = await Question.findByIdAndUpdate(
      id,
      { question, answer },
      { new: true, runValidators: true }
    );

    if (!updatedQuestion) {
      return NextResponse.json(
        { message: "Question non trouvée" },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedQuestion, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Erreur lors de la mise à jour de la question" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const { question, answer } = await req.json();

    if (!question || !answer) {
      return NextResponse.json(
        { error: "Tous les champs sont requis" },
        { status: 400 }
      );
    }

    await mongooseConnect();

    const newQuestion = await Question.create({ question, answer });

    return NextResponse.json(newQuestion, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur lors de l'ajout de la question" },
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

    const deletedQuestion = await Question.findByIdAndDelete(id);

    if (!deletedQuestion) {
      return NextResponse.json(
        { message: "Question non trouvée" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Question supprimée" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Erreur lors de la suppression de la question" },
      { status: 500 }
    );
  }
}
