import nodemailer from "nodemailer";

export async function POST(request: {
  json: () =>
    | PromiseLike<{ name: any; email: any; subject: any; message: any }>
    | { name: any; email: any; subject: any; message: any };
}) {
  // Récupère les données envoyées depuis le formulaire
  const { name, email, subject, message } = await request.json();

  // Configuration de Nodemailer
  const transporter = nodemailer.createTransport({
    service: "gmail", // ou le service de ton choix (ex. : SMTP)
    auth: {
      user: process.env.NEXT_PUBLIC_EMAIL_USER, // Ton email d'envoi
      pass: process.env.NEXT_PUBLIC_EMAIL_PASS, // Ton mot de passe ou un "App Password"
    },
  });

  const mailOptions = {
    from: email,
    to: process.env.NEXT_PUBLIC_EMAIL_USER,
    subject: `${name} - ${subject}`,
    text: message,
    // html: `<p>${message.replace(/\n/g, "<br>")}</p>`, // HTML pour un affichage plus joli
    replyTo: email,
  };

  try {
    // Envoi de l'email
    await transporter.sendMail(mailOptions);
    return new Response(
      JSON.stringify({ message: "Email sent successfully" }),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "Failed to send email" }), {
      status: 500,
    });
  }
}
