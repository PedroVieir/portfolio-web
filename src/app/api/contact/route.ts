import { NextRequest, NextResponse } from "next/server";
import { Mailer } from "mailersend";

/**
 * POST /api/contact
 * Handle contact form submissions and send emails via MailerSend
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

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    // Initialize MailerSend
    const apiKey = process.env.MAILERSEND_API_KEY;
    const emailFrom = process.env.CONTACT_EMAIL_FROM;
    const emailTo = process.env.CONTACT_EMAIL_TO;

    if (!apiKey || !emailFrom || !emailTo) {
      console.error("Missing environment variables for email configuration");
      return NextResponse.json(
        { error: "Email service not configured" },
        { status: 500 }
      );
    }

    const mailer = new Mailer({ api_key: apiKey });

    // Send email to admin
    await mailer.email.send({
      from: {
        email: emailFrom,
        name: "Portfolio Contact",
      },
      to: [
        {
          email: emailTo,
          name: "Admin",
        },
      ],
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `,
      text: `
        New Contact Form Submission
        
        Name: ${name}
        Email: ${email}
        Message: ${message}
      `,
    });

    // Send confirmation email to user
    await mailer.email.send({
      from: {
        email: emailFrom,
        name: "Portfolio",
      },
      to: [
        {
          email: email,
          name: name,
        },
      ],
      subject: "Message received - Portfolio",
      html: `
        <h2>Thank you for contacting me!</h2>
        <p>Hi ${name},</p>
        <p>I received your message and will get back to you as soon as possible.</p>
        <p>Best regards,</p>
        <p>Portfolio Team</p>
      `,
      text: `Thank you for contacting me!\n\nHi ${name},\n\nI received your message and will get back to you as soon as possible.\n\nBest regards,\nPortfolio Team`,
    });

    console.log("Contact form submission sent successfully:", { name, email });

    return NextResponse.json(
      { success: true, message: "Message received and email sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send email. Please try again later." },
      { status: 500 }
    );
  }
}
