import { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

interface ContactFormData {
  from_name: string;
  from_email: string;
  subject: string;
  message: string;
  budget: string;
  timeline: string;
  service_type: string;
  service_base_price: string;
  service_total_price: string;
  service_duration: string;
  service_addons: string;
  addons_count: number;
  timestamp: string;
  client_type: string;
  recaptcha_token: string;
}

async function verifyRecaptcha(token: string): Promise<boolean> {
  try {
    const response = await fetch(
      "https://www.google.com/recaptcha/api/siteverify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`,
      }
    );

    const data = await response.json();
    return data.success;
  } catch (error) {
    console.error("Error verifying reCAPTCHA:", error);
    return false;
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const {
      from_name,
      from_email,
      subject,
      message,
      budget,
      timeline,
      service_type,
      service_base_price,
      service_total_price,
      service_duration,
      service_addons,
      addons_count,
      timestamp,
      client_type,
      recaptcha_token,
    }: ContactFormData = req.body;

    // Verify reCAPTCHA
    if (!recaptcha_token) {
      return res.status(400).json({
        error: "reCAPTCHA token is required",
        message: "Por favor, verifica que no eres un robot",
      });
    }

    const isRecaptchaValid = await verifyRecaptcha(recaptcha_token);
    if (!isRecaptchaValid) {
      return res.status(400).json({
        error: "reCAPTCHA verification failed",
        message:
          "Verificación de seguridad fallida. Por favor, intenta nuevamente.",
      });
    }

    // ...existing code... (rest of the email sending logic)

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `[PORTFOLIO] ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 10px; margin-bottom: 20px;">
            <h1 style="margin: 0; font-size: 24px;">✨ ${client_type}</h1>
            <p style="margin: 10px 0 0 0; opacity: 0.9;">Nuevo mensaje desde tu portfolio</p>
          </div>
          
          <div style="background: #f8f9fa; padding: 25px; border-radius: 8px; margin-bottom: 20px;">
            <h2 style="color: #333; margin-top: 0;">📋 Información del Cliente</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr style="border-bottom: 1px solid #dee2e6;">
                <td style="padding: 12px 0; font-weight: bold; color: #495057;">Nombre:</td>
                <td style="padding: 12px 0; color: #6c757d;">${from_name}</td>
              </tr>
              <tr style="border-bottom: 1px solid #dee2e6;">
                <td style="padding: 12px 0; font-weight: bold; color: #495057;">Email:</td>
                <td style="padding: 12px 0; color: #6c757d;">${from_email}</td>
              </tr>
              <tr style="border-bottom: 1px solid #dee2e6;">
                <td style="padding: 12px 0; font-weight: bold; color: #495057;">Presupuesto:</td>
                <td style="padding: 12px 0; color: #6c757d;">${budget}</td>
              </tr>
              <tr style="border-bottom: 1px solid #dee2e6;">
                <td style="padding: 12px 0; font-weight: bold; color: #495057;">Timeline:</td>
                <td style="padding: 12px 0; color: #6c757d;">${timeline}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; font-weight: bold; color: #495057;">Fecha:</td>
                <td style="padding: 12px 0; color: #6c757d;">${timestamp}</td>
              </tr>
            </table>
          </div>

          ${
            service_type !== "Consulta general"
              ? `
          <div style="background: #e8f5e8; padding: 25px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #28a745;">
            <h2 style="color: #155724; margin-top: 0;">🎯 Detalles del Servicio</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr style="border-bottom: 1px solid #c3e6cb;">
                <td style="padding: 12px 0; font-weight: bold; color: #155724;">Servicio:</td>
                <td style="padding: 12px 0; color: #155724;">${service_type}</td>
              </tr>
              <tr style="border-bottom: 1px solid #c3e6cb;">
                <td style="padding: 12px 0; font-weight: bold; color: #155724;">Precio Base:</td>
                <td style="padding: 12px 0; color: #155724;">${service_base_price}</td>
              </tr>
              <tr style="border-bottom: 1px solid #c3e6cb;">
                <td style="padding: 12px 0; font-weight: bold; color: #155724;">Precio Total:</td>
                <td style="padding: 12px 0; color: #155724; font-weight: bold;">${service_total_price}</td>
              </tr>
              <tr style="border-bottom: 1px solid #c3e6cb;">
                <td style="padding: 12px 0; font-weight: bold; color: #155724;">Duración:</td>
                <td style="padding: 12px 0; color: #155724;">${service_duration}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; font-weight: bold; color: #155724;">Add-ons (${addons_count}):</td>
                <td style="padding: 12px 0; color: #155724;">${service_addons}</td>
              </tr>
            </table>
          </div>
          `
              : ""
          }

          <div style="background: #fff; padding: 25px; border-radius: 8px; border: 1px solid #dee2e6;">
            <h2 style="color: #333; margin-top: 0;">💬 Mensaje</h2>
            <div style="background: #f8f9fa; padding: 20px; border-radius: 5px; border-left: 4px solid #007bff;">
              <p style="margin: 0; color: #495057; line-height: 1.6; white-space: pre-wrap;">${message}</p>
            </div>
          </div>

          <div style="background: #e7f3ff; padding: 20px; border-radius: 8px; margin-top: 20px; text-align: center;">
            <p style="margin: 0; color: #0056b3; font-weight: bold;">🔒 Mensaje verificado con reCAPTCHA</p>
            <p style="margin: 5px 0 0 0; color: #0056b3; font-size: 14px;">Este mensaje ha pasado la verificación de seguridad</p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({
      success: true,
      message: "Email sent successfully",
    });
  } catch (error) {
    console.error("Error sending email:", error);
    return res.status(500).json({
      error: "Failed to send email",
      message:
        "Hubo un error al enviar el mensaje. Por favor, intenta nuevamente.",
    });
  }
}
