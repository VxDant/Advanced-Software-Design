const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const nodemailer = require("nodemailer");
const dotenv = require("dotenv").config();
const cors = require("cors");

const users = require("./users");

app.use(express.json(), cors());

app.get("/", (req, res) => {
  res.send("Hello World!!!!!!!!");
});

app.get("/users", (req, res) => {
  res.json(users); // Serve the users data as JSON
});

app.post("/send", async (req, res) => {
  try {
    /*
    {
      to: RECEIVER_MAIL_ID,
      subject: SUBJECT_OF_THE_MAIL,
      text: MAIN_CONTENT
    }
    */
    const { to, subject, text } = req.body;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "deniljoshypj@gmail.com",
        pass: "awan waoo qxkp svhd",
      },
    });

    const info = await transporter.sendMail({
      from: "deniljoshypj@gmail.com", // sender address
      to, // list of receivers
      subject, // Subject line
      text, // plain text body
      //html: "<b>Change?</b>", // html body
    });

    console.log("Message sent: %s", info.messageId);
    return res.status(200).json({ message: "success" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
