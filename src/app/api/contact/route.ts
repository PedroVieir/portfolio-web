import { NextRequest, NextResponse } from "next/server";
import { MailerSend, EmailParams, Recipient } from "mailersend";

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

    const mailer = new MailerSend({ apiKey: apiKey });

    // Send email to admin
    const emailParamsAdmin = new EmailParams()
      .setFrom({
        email: emailFrom,
        name: "Portfolio Contact",
      })
      .setTo([
        new Recipient(emailTo, "Admin"),
      ])
      .setSubject(`New Contact Form Submission from ${name}`)
      .setHtml(`
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `)
      .setText(`
        New Contact Form Submission
        
        Name: ${name}
        Email: ${email}
        Message: ${message}
      `);

    await mailer.email.send(emailParamsAdmin);

    // Send confirmation email to user
    const emailParamsUser = new EmailParams()
      .setFrom({
        email: emailFrom,
        name: "Portfolio",
      })
      .setTo([
        new Recipient(email, name),
      ])
      .setSubject("Message received - Portfolio")
      .setHtml(`
        <h2>Thank you for contacting me!</h2>
        <p>Hi ${name},</p>
        <p>I received your message and will get back to you as soon as possible.</p>
        <p>Best regards,</p>
        <p>Portfolio Team</p>
      `)
      .setText(`Thank you for contacting me!\n\nHi ${name},\n\nI received your message and will get back to you as soon as possible.\n\nBest regards,\nPortfolio Team`);

    await mailer.email.send(emailParamsUser);

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
