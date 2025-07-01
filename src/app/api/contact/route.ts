import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Debug environment variables
    console.log("Environment check:", {
      EMAIL_USER: process.env.EMAIL_USER ? "✓ Set" : "✗ Missing",
      EMAIL_PASSWORD: process.env.EMAIL_PASSWORD ? "✓ Set" : "✗ Missing",
      NODE_ENV: process.env.NODE_ENV,
    });

    // Validación básica
    if (!body.from_name || !body.from_email || !body.message) {
      return NextResponse.json(
        { error: "Campos requeridos faltantes" },
        { status: 400 }
      );
    }

    // Validación de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.from_email)) {
      return NextResponse.json({ error: "Email inválido" }, { status: 400 });
    }

    // Verificar configuración
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
      console.error("Email configuration missing");
      return NextResponse.json(
        {
          error:
            "Configuración del servidor incompleta. Credenciales de email no configuradas.",
          fallback: true,
        },
        { status: 500 }
      );
    }

    // Simplified single configuration
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Test the connection
    console.log("Testing SMTP connection...");
    try {
      await transporter.verify();
      console.log("SMTP connection verified successfully");
    } catch (verifyError: any) {
      console.error("SMTP verification failed:", verifyError);
      return NextResponse.json(
        {
          error: "Error de conexión al servidor de email",
          details:
            process.env.NODE_ENV === "development"
              ? verifyError.message
              : undefined,
          fallback: true,
        },
        { status: 500 }
      );
    }

    // Preparar el contenido del email
    const subject = body.subject || "Nuevo mensaje desde el portfolio";

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // Send to yourself
      replyTo: body.from_email,
      subject: `[PORTFOLIO] ${subject}`,
      text: `
Nuevo mensaje desde el portfolio

INFORMACIÓN DEL CLIENTE:
Nombre: ${body.from_name}
Email: ${body.from_email}
Presupuesto: ${body.budget || "No especificado"}
Timeline: ${body.timeline || "No especificado"}

MENSAJE:
${body.message}

---
Enviado el: ${new Date().toLocaleString("es-AR")}
      `,
      html: `
        <h2>Nuevo mensaje desde el portfolio</h2>
        <p><strong>Nombre:</strong> ${body.from_name}</p>
        <p><strong>Email:</strong> ${body.from_email}</p>
        <p><strong>Asunto:</strong> ${subject}</p>
        <p><strong>Presupuesto:</strong> ${body.budget || "No especificado"}</p>
        <p><strong>Timeline:</strong> ${body.timeline || "No especificado"}</p>
        
        <h3>Mensaje:</h3>
        <div style="background: #f5f5f5; padding: 15px; border-radius: 5px;">
          ${body.message.replace(/\n/g, "<br>")}
        </div>
        
        <p><small>Enviado el: ${new Date().toLocaleString("es-AR")}</small></p>
      `,
    };

    console.log("Sending email...", {
      from: mailOptions.from,
      to: mailOptions.to,
      subject: mailOptions.subject,
    });

    // Enviar email
    const info = await transporter.sendMail(mailOptions);

    console.log("Email sent successfully:", info.messageId);

    return NextResponse.json({
      success: true,
      message: "Email enviado correctamente",
      messageId: info.messageId,
    });
  } catch (error: any) {
    console.error("Email sending error:", {
      name: error.name,
      message: error.message,
      code: error.code,
      stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
    });

    // Specific error handling
    let errorMessage = "Error interno del servidor";
    let isAuthError = false;

    if (error.code === "EAUTH" || error.message?.includes("Invalid login")) {
      errorMessage =
        "Error de autenticación. Verifica las credenciales de Gmail y que uses App Password.";
      isAuthError = true;
    } else if (error.code === "ENOTFOUND") {
      errorMessage = "Error de conexión al servidor de Gmail";
    } else if (error.code === "ETIMEDOUT") {
      errorMessage = "Timeout en el envío del email";
    }

    return NextResponse.json(
      {
        error: errorMessage,
        fallback: isAuthError,
        alternativeContact: "matquadev@gmail.com",
        details:
          process.env.NODE_ENV === "development"
            ? {
                message: error.message,
                code: error.code,
                name: error.name,
              }
            : undefined,
      },
      { status: 500 }
    );
  }
}
