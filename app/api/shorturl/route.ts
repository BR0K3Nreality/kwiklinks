import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(request: NextRequest) {
  try {
    const { originalUrl, expiryInDays } = await request.json();
    const response = await axios.post("https://myuniqueappname12345mick01.azurewebsites.net/api/ShortUrl", {
      originalUrl,
      expiryInDays,
    });
    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json(
      { message: "Error creating shortened URL" },
      { status: 500 }
    );
  }
}
