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
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const formData: ContactFormData = await req.json();
    console.log("Received contact form submission:", formData.email);

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

    const emailHtml = `
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

    const emailResponse = await resend.emails.send({
      from: "Brand Orbit <onboarding@resend.dev>",
      to: ["brandorbit1@gmail.com"],
      subject: `New Contact Form Submission from ${firstName} ${lastName}`,
      html: emailHtml,
      reply_to: email,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true, data: emailResponse }), {
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
