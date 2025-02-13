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
      { error: "Failed to fetch questions" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const { question, answer } = await req.json();
    if (!question || !answer) {
      return NextResponse.json(
        { error: "Question and answer are required" },
        { status: 400 }
      );
    }

    await mongooseConnect();
    const newQuestion = await Question.create({ question, answer });

    return NextResponse.json(newQuestion);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to add question" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  const { id } = await req.json();
  await mongooseConnect();
  await Question.findByIdAndDelete(id);
  return NextResponse.json({ message: "Question deleted" });
}
