const express = require("express");
const app = express();
const port = process.env.PORT || 3030;
const bodyParser = require('body-parser');
const { body, validationResult } = require('express-validator');
const nodemailer= require ("nodemailer")
const dotenv = require('dotenv');
require("dotenv").config();

app.use(express.static(__dirname + "/public"));


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());



app.post ( "/sendMessage",[ body("alias", "write your full name")
.exists()
.isLength({min:5}),
body ("email", "insert a valid email")
.exists()
.isEmail(),
body ("subject", "please write the subject")
.exists()
.isLength({min:3}), 
body ("message", "write a message")
  .exists()
  .isLength({min:3})] ,
(req,res) => {
  
  const transporter= nodemailer.createTransport ({
    service: 'gmail',
    auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD
    },
    tls: {
      // do not fail on invalid certs
      rejectUnauthorized: false
  },
})

const mailOptions= {
  from: `${req.body.email}`,
  to: `josemendez2204@gmail.com`,
  subject: `message from: ${req.body.alias} reason: ${req.body.subject}`,
  text: `${req.body.message}`

}


transporter.sendMail(mailOptions, (error,info) => {
  if (error) {
      console.log (error) 
      res.send('error')
  } else { 
      console.log ('email sent' + info.response)
      res.send('success')
  }
})

    console.log(req.body)
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors)
      res.status(400).json({ errors: errors.array() });
    }
    return res.status(200).json({ ok: true });
})




app.listen(port, () => {
    console.log(`listening at port http://localhost:${port}`);
  });