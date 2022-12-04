import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  secure: false,
  port: 587,
  auth: {
    user: "dawri2359@gmail.com",
    pass: "agtqvvqyzedmqwib",
  },
  tls: {
    rejectUnauthorized: false,
  },
});

export const sendEmail = (emailOptions) => {
  transporter.sendMail(
    {
      from: emailOptions.from,
      to: emailOptions.to,
      subject: emailOptions.subject,
      html: emailOptions.html,
    },
    (err) => {
      console.log(err);
    }
  );
};
