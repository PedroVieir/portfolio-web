import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/contact
 * Handle contact form submissions
 * 
 * TODO: Implement email sending or database storage
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // Validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // TODO: Send email or save to database
    // For now, just return success
    console.log("Contact form submission:", { name, email, message });

    return NextResponse.json(
      { success: true, message: "Message received" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
