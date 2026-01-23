import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  company?: string;
  website?: string;
  service?: string;
  budget?: string;
  timeline?: string;
  message: string;
  newsletter?: boolean;
  turnstileToken: string;
}

async function verifyTurnstileToken(token: string): Promise<boolean> {
  const secretKey = Deno.env.get("TURNSTILE_SECRET_KEY");
  if (!secretKey) {
    console.error("TURNSTILE_SECRET_KEY not configured");
    return false;
  }

  const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      secret: secretKey,
      response: token,
    }),
  });

  const data = await response.json();
  console.log("Turnstile verification result:", data.success);
  return data.success === true;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const formData: ContactFormData = await req.json();
    console.log("Received contact form submission:", formData.email);

    // Verify Turnstile CAPTCHA token
    const { turnstileToken } = formData;
    if (!turnstileToken) {
      return new Response(
        JSON.stringify({ error: "CAPTCHA verification required" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const isValidToken = await verifyTurnstileToken(turnstileToken);
    if (!isValidToken) {
      return new Response(
        JSON.stringify({ error: "CAPTCHA verification failed" }),
        { status: 403, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const { firstName, lastName, email, phone, company, website, service, budget, timeline, message, newsletter } = formData;

    const submittedAt = new Date().toLocaleString("en-US", {
      timeZone: "America/Los_Angeles",
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    // Notification email to Brand Orbit
    const notificationEmailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #3b82f6, #8b5cf6); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
          .content { background: #f9fafb; padding: 20px; border: 1px solid #e5e7eb; }
          .field { margin-bottom: 15px; }
          .label { font-weight: bold; color: #374151; }
          .value { color: #4b5563; margin-top: 4px; }
          .message-box { background: white; padding: 15px; border-radius: 8px; border: 1px solid #e5e7eb; margin-top: 10px; }
          .footer { background: #1f2937; color: #9ca3af; padding: 15px; text-align: center; border-radius: 0 0 8px 8px; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 style="margin: 0;">New Contact Form Submission</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">Someone has reached out through your website</p>
          </div>
          <div class="content">
            <div class="field">
              <div class="label">Name</div>
              <div class="value">${firstName} ${lastName}</div>
            </div>
            <div class="field">
              <div class="label">Email</div>
              <div class="value"><a href="mailto:${email}">${email}</a></div>
            </div>
            ${phone ? `
            <div class="field">
              <div class="label">Phone</div>
              <div class="value"><a href="tel:${phone}">${phone}</a></div>
            </div>
            ` : ""}
            ${company ? `
            <div class="field">
              <div class="label">Company</div>
              <div class="value">${company}</div>
            </div>
            ` : ""}
            ${website ? `
            <div class="field">
              <div class="label">Website</div>
              <div class="value"><a href="${website.startsWith("http") ? website : `https://${website}`}" target="_blank">${website}</a></div>
            </div>
            ` : ""}
            ${service ? `
            <div class="field">
              <div class="label">Service Interested In</div>
              <div class="value">${service}</div>
            </div>
            ` : ""}
            ${budget ? `
            <div class="field">
              <div class="label">Budget Range</div>
              <div class="value">${budget}</div>
            </div>
            ` : ""}
            ${timeline ? `
            <div class="field">
              <div class="label">Timeline</div>
              <div class="value">${timeline}</div>
            </div>
            ` : ""}
            <div class="field">
              <div class="label">Project Details</div>
              <div class="message-box">${message.replace(/\n/g, "<br>")}</div>
            </div>
            <div class="field">
              <div class="label">Newsletter Subscription</div>
              <div class="value">${newsletter ? "Yes, subscribed" : "No"}</div>
            </div>
          </div>
          <div class="footer">
            <p>Submitted on ${submittedAt}</p>
            <p>Brand Orbit Contact Form</p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Confirmation email to the user
    const confirmationEmailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #3b82f6, #8b5cf6); color: white; padding: 30px 20px; border-radius: 8px 8px 0 0; text-align: center; }
          .header h1 { margin: 0; font-size: 24px; }
          .header p { margin: 10px 0 0 0; opacity: 0.9; }
          .content { background: #ffffff; padding: 30px 20px; border: 1px solid #e5e7eb; border-top: none; }
          .greeting { font-size: 18px; color: #1f2937; margin-bottom: 20px; }
          .message { color: #4b5563; margin-bottom: 25px; }
          .summary-box { background: #f9fafb; padding: 20px; border-radius: 8px; border: 1px solid #e5e7eb; margin-bottom: 25px; }
          .summary-title { font-weight: bold; color: #374151; margin-bottom: 15px; font-size: 16px; }
          .summary-item { display: flex; margin-bottom: 10px; }
          .summary-label { font-weight: 600; color: #6b7280; min-width: 120px; }
          .summary-value { color: #1f2937; }
          .cta-section { text-align: center; padding: 20px 0; }
          .response-time { background: #ecfdf5; border: 1px solid #a7f3d0; padding: 15px; border-radius: 8px; text-align: center; color: #065f46; margin-bottom: 25px; }
          .contact-info { background: #f3f4f6; padding: 20px; border-radius: 8px; margin-top: 20px; }
          .contact-info h3 { margin: 0 0 10px 0; color: #374151; font-size: 14px; }
          .contact-info p { margin: 5px 0; color: #6b7280; font-size: 14px; }
          .footer { background: #1f2937; color: #9ca3af; padding: 20px; text-align: center; border-radius: 0 0 8px 8px; font-size: 12px; }
          .footer a { color: #60a5fa; text-decoration: none; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Thank You for Reaching Out!</h1>
            <p>We've received your message and are excited to connect</p>
          </div>
          <div class="content">
            <p class="greeting">Dear ${firstName},</p>
            <p class="message">
              Thank you for contacting Brand Orbit! We've successfully received your inquiry and our team is already reviewing your project details.
            </p>
            
            <div class="response-time">
              <strong>⏰ Expected Response Time:</strong> Within 24 hours
            </div>
            
            <div class="summary-box">
              <div class="summary-title">📋 Your Submission Summary</div>
              ${service ? `
              <div class="summary-item">
                <span class="summary-label">Service:</span>
                <span class="summary-value">${service}</span>
              </div>
              ` : ""}
              ${budget ? `
              <div class="summary-item">
                <span class="summary-label">Budget:</span>
                <span class="summary-value">${budget}</span>
              </div>
              ` : ""}
              ${timeline ? `
              <div class="summary-item">
                <span class="summary-label">Timeline:</span>
                <span class="summary-value">${timeline}</span>
              </div>
              ` : ""}
              <div class="summary-item">
                <span class="summary-label">Message:</span>
                <span class="summary-value">${message.length > 100 ? message.substring(0, 100) + "..." : message}</span>
              </div>
            </div>
            
            <p class="message">
              In the meantime, feel free to explore our <a href="https://brandorbit.lovable.app/case-studies" style="color: #3b82f6;">case studies</a> to see how we've helped other businesses achieve their goals.
            </p>
            
            <div class="contact-info">
              <h3>Need to reach us sooner?</h3>
              <p>📧 Email: brandorbit1@gmail.com</p>
              <p>📍 Based in Los Angeles, CA</p>
            </div>
          </div>
          <div class="footer">
            <p>© ${new Date().getFullYear()} Brand Orbit. All rights reserved.</p>
            <p>
              <a href="https://brandorbit.lovable.app">Visit our website</a>
            </p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Send both emails concurrently
    const [notificationResponse, confirmationResponse] = await Promise.all([
      resend.emails.send({
        from: "Brand Orbit <onboarding@resend.dev>",
        to: ["brandorbit1@gmail.com"],
        subject: `New Contact Form Submission from ${firstName} ${lastName}`,
        html: notificationEmailHtml,
        reply_to: email,
      }),
      resend.emails.send({
        from: "Brand Orbit <onboarding@resend.dev>",
        to: [email],
        subject: "Thank you for contacting Brand Orbit!",
        html: confirmationEmailHtml,
      }),
    ]);

    console.log("Notification email sent:", notificationResponse);
    console.log("Confirmation email sent:", confirmationResponse);

    return new Response(JSON.stringify({ 
      success: true, 
      data: { 
        notification: notificationResponse, 
        confirmation: confirmationResponse 
      } 
    }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error in send-contact-notification function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
