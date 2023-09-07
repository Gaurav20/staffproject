const express = require('express');
const mongoose = require('mongoose');
const connect = require('./model/database');
const user = require('./model/schema');
const path = require('path');
const cors = require('cors')


const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));



function generateRandomOTP() {
  const otp = Math.floor(1000 + Math.random() * 9000);
  return otp.toString();
}



app.post('/api/users', async (req, res) => {
  try {
    const { email, name, dob, password } = req.body;

    const newUser = new user({
      email,
      name,
      dob,
      password,
    });
    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }

});

app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await user.findOne({ email, password });
    if (existingUser) {
      res.status(200).json(existingUser);
    } else {
      res.status(401).json({ message: 'invalid email or password' });
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }

});

app.post('/api/check-email-exists', async (req, res) => {
  try {
    const { email } = req.body;

    const existingUser = await user.findOne({ email });
    if (existingUser) {

      res.status(200).json({ exists: true, message: 'send otp on your email' });

    } else {
      res.status(200).json({ exists: false, message: 'plese provide valid information' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/reset-password', async (req, res) => {
  try {
    const { email } = req.body

    const otp = generateRandomOTP();
    console.log(otp);


    const users =await user.findOne({ email })




    if (users) {
      users.otp = otp;
      await users.save();
      return res.status(200).json({ message: "valid user" });
    } else {
      res.status(401).json({ message: 'invalid email' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'server error' });
  }

});




app.post('/api/reset-password-manually', async (req, res) => {
  try {
    const { email, newPassword, otp } = req.body;


    
      // Reset the password
      const existingUser = await user.findOne({email:email,otp:otp});

      if (!existingUser) {
        return res.status(401).json({ message: 'Email not found' });
      }

      existingUser.password = newPassword;
      await existingUser.save();

      return res.status(200).json({ message: 'Password updated successfully!' });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});



app.listen(4000, () => {
  console.log("server running on :4000")
});