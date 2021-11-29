const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const { body, validationResult } = require('express-validator');

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
.isLength({min:5}), 
body ("message", "write a message")
  .exists()
  .isLength({min:3})] ,
(req,res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
})




app.listen(port, () => {
    console.log(`listening at port http://localhost:${port}`);
  });