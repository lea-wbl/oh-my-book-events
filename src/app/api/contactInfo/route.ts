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
      { error: "Failed to fetch contact info" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const { _id, email, tel, ig, tiktok } = await req.json();
    if (!email) {
      return NextResponse.json(
        { error: "Email and at least one phone number are required" },
        { status: 400 }
      );
    }
    await mongooseConnect();
    const newInfo = await ContactInfo.findByIdAndUpdate(_id, {
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
