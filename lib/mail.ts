import "server-only";
import nodemailer from "nodemailer";

type SendVerificationEmailParams = {
  email: string;
  username: string;
  token: string;
};

export class MailConfigurationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "MailConfigurationError";
  }
}

export function isMailConfigured() {
  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = process.env.SMTP_PORT;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const smtpFrom = process.env.SMTP_FROM;
  const isPlaceholderConfig =
    smtpHost === "smtp.example.com" ||
    smtpUser === "user@example.com" ||
    smtpPass === "smtp-password" ||
    smtpFrom === "Training Tracker <noreply@example.com>";

  return Boolean(
    smtpHost &&
      smtpPort &&
      smtpUser &&
      smtpPass &&
      smtpFrom &&
      !isPlaceholderConfig,
  );
}

export async function sendVerificationEmail({
  email,
  username,
  token,
}: SendVerificationEmailParams) {
  const appUrl = process.env.APP_URL ?? "http://localhost:3000";
  const verificationLink = `${appUrl}/verify-email?token=${token}`;

  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = process.env.SMTP_PORT;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const smtpFrom = process.env.SMTP_FROM;

  if (!isMailConfigured()) {
    throw new MailConfigurationError(
      "SMTP is not configured. Set real SMTP_* values in .env.",
    );
  }

  const transporter = nodemailer.createTransport({
    host: smtpHost!,
    port: Number(smtpPort),
    secure: Number(smtpPort) === 465,
    auth: {
      user: smtpUser!,
      pass: smtpPass!,
    },
  });

  await transporter.sendMail({
    from: smtpFrom!,
    to: email,
    subject: "Verify your Training Tracker account",
    html: `
      <p>Hello ${username},</p>
      <p>Click the button below to verify your email address:</p>
      <p><a href="${verificationLink}" style="padding:10px 14px;background:#34d399;color:#0f172a;text-decoration:none;border-radius:8px;">Verify Email</a></p>
      <p>If the button does not work, use this link: ${verificationLink}</p>
    `,
  });
}
