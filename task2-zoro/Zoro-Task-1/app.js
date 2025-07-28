const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const authroute = require('../routes');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/auth', authroute);

app.get('/', (req, res) => {
  res.send(`
    <h2> Auth System (Bcrypt + JWT)</h2>
    <p>Test using Postman. All routes prefixed with <code>/auth</code>.</p>

    <hr/>
    <h3>1- Register</h3>
    <b>POST</b> /auth/register<br/>
    <pre>
    {
      "name": "ranjit",
      "email": "ranjit@example.com",
      "password": "1234567"
    }
    </pre>

    <h3>2️- Login</h3>
    <b>POST</b> /auth/login<br/>
    <pre>
    {
      "email": "ranjit@example.com",
      "password": "1234567"
    }
    </pre>

    <h3>3️- Get User Info (Protected)</h3>
    <b>GET</b> /auth/user<br/>
    <b>Headers:</b> token: your.jwt.token

    <h3>4️- Change Password</h3>
    <b>PUT</b> /auth/change-password<br/>
    <b>Headers:</b> token: your.jwt.token<br/>
    <pre>
    {
      "oldPass": "1234567",
      "newPass": "newpass456"
    }
    </pre>

    <h3>5️5- Delete Account</h3>
    <b>DELETE</b> /auth/delete-account<br/>
    <b>Headers:</b> token: your.jwt.token

    <hr/>
    <h3> How to Test ?</h3>
    <ul>
      <li>cd TASK2-ZORO(if it has other folder in folder) </li>
      <li>npm install </li>
      <li>node app.js/npx nodemon app.js</li>
      <li>Register a user</li>
      <li>Login to get the token</li>
      <li>Use the token in <code>Headers → token</code> for protected routes</li>
    </ul>

    <p> For more details, see <b>README.md</b> inside the project folder.</p>
  `);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
