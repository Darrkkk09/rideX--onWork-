const express = require("express");
const route = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const authmodel = require("./Zoro-Task-1/model");



 function MWverifyToken(req, res, next) {
  const token = req.header('token');
  if (!token) return res.status(401).json({ mess: 'No token provided' });

  try {
    const decode = jwt.verify(token, process.env.JWT_KEY);
    req.userId = decode.id;
    next();
  } catch {
    return res.status(401).json({ mess: 'Invalid token' });
  }
}



route.post(
  "/register",
  body("email").isEmail().withMessage(" enter valid email"),
  body("password")
    .isLength({ min: 4 })
    .withMessage("Pass must be at least 4 characters"),
  async (req, res) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
      return res.status(400).json({ errors: err.array() });
    }

    const { name, email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send("Please provide all");
    }
    try {
      const hash = await bcrypt.hash(password, 15);
      const user = new authmodel({
        name,
        email,
        password: hash,
      });
      await user.save();
      res.status(201).json({
        mess: "User registered sucessfully",
        user: {
          name,
          email, 
        },
      });
    } catch (error) {
      res.status(500).send("Servr error");
    }
  }
);

route.post('/login', [
    body('email').isEmail().withMessage('Please enter valid email'),
    body('password').isLength({ min: 4 }).withMessage('Password shuld be 4 char')
], async (req, res) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
        return res.status(400).json({ errors: err.array() });
    }

    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).send('Please provide all');
    }

    try {
        const user = await authmodel.findOne({ email });
        if (!user) {
            return res.status(400).send('invalid info');
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(400).send('invalid info');
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_KEY);
        res.json({ token });
    } catch (error) {
        res.status(500).send('Server error');
    }
});
route.get('/user', async (req, res) => {
    const token = req.header('token');
    if (!token) {
        return res.status(401).send(' token auth required ');
    }

    try {
        const decode = jwt.verify(token, process.env.JWT_KEY);
        const user = await authmodel.findById(decode.id).select('-password');
        if (!user) {
            return res.status(404).send('user not found');
        }
        res.json(user);
    } catch (error) {
        res.status(500).send('token error');
    }
});

route.put('/change-password', MWverifyToken , async (req, res) => {
  const { oldPass, newPass } = req.body;

  if (!oldPass || !newPass) {
    return res.status(400).json({ mess: 'Both old and new pass req' });
  }

  if (oldPass === newPass) {
    return res.status(400).json({ mess: 'New pass must be different from old pass' });
  }
  try {
    const user = await authmodel.findById(req.userId);
    const match = await bcrypt.compare(oldPass, user.password);
    if (!match) {
      return res.status(401).json({ mess: 'old password is incorrect' });
    }

    const hashed = await bcrypt.hash(newPass, 10);
    user.password = hashed;
    await user.save();

    res.json({ mess: 'paswsord changed successfully' });
  } catch (err) {
    res.status(500).json({ mess: 'Server error' });
  }
});


route.delete('/delete', MWverifyToken, async (req, res) => {
    try {
        const user = await authmodel.findByIdAndDelete(req.userId);
        if (!user) {
            return res.status(404).json({ mess: 'User not found' });
        }
        res.json({ mess: 'User deleted successfully' });
    }
    catch (err) {
        res.status(500).json({ mess: 'Server error' });
    }

});


module.exports = route;
