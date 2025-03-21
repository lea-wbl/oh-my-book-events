import { NextRequest, NextResponse } from "next/server";
import { mongooseConnect } from "@/lib/mongooseConnect";
import ContactInfo from "@/models/ContactInfo";

export async function GET(req: NextRequest) {
  try {
    await mongooseConnect();

    const contactInfo = await ContactInfo.find();

    return NextResponse.json(contactInfo);
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur lors de la récupération des informations de contact" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const { _id, email, tel, ig, tiktok } = await req.json();

    if (!email) {
      return NextResponse.json(
        { error: "L'email est requis" },
        { status: 400 }
      );
    }

    await mongooseConnect();

    const updatedInfo = await ContactInfo.findByIdAndUpdate(_id, {
      email,
      tel,
      ig,
      tiktok,
    });

    if (!updatedInfo) {
      return NextResponse.json(
        { message: "Informations de contact non trouvées" },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedInfo, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur lors de la mise à jour des informations de contact" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const { email, tel, ig, tiktok } = await req.json();
    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }
    await mongooseConnect();
    const newInfo = await ContactInfo.create({
      email,
      tel,
      ig,
      tiktok,
    });
    return NextResponse.json(newInfo);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to add event type" },
      { status: 500 }
    );
  }
}
