# 🔐 Auth API with Bcrypt & JWT (Internship Task Submission)

This is a Node.js Express backend that supports user authentication using **bcrypt for password hashing** and **JWT for token-based authetication**. It includes all basic auth features and is ready to test via Postman.

---

##  Project Structure (ZIP Contents)

task2-zoro/
│
├── app.js 
├── routes.js # All routes (register, login, user, change password, delete)
├── model.js # Mongoose schema for user
├── .env # env variables (MONGO_URI, JWT_SECRET)
├── package.json # Project dependencies
├
│ 
└── README.md


---

## ⚙️ Requirements

- Node.js (v18+)
- MongoDB (running locally on default port)

---

##  Setup Instructions

### 1.  Unzip and Open

Unzip the project folder and open in **VS Code or terminal**.

### 2. Install Dependencies

npm install

### 3. Start Server

node app.js
# or for dev:
npx nodemon app.js

### 4. Test via Postman
- Register a new user: POST auth/register with JSON body (name, email, password)

- Login: POST auth/login with JSON body (email, password)

- Get user data: GET auth/user

- Change password: PUT auth/user with JSON body (oldPass, newPass)

- Delete user: DELETE auth/user

### 5. API ENDPOINTS
-register - body json format : {
    

  "name": "ranjit",
  "email": "ranjit@example.com",
  "password": "1234567"

}


-login - body json format : {
  "email": "ranjit@example.com",
  "password": "1234567"
}

response : {
    "token": "JWT_TOKEN_HERE"
}
-get user - in HeADERS :  {
    token: AFTER_LOGIN_TOKEN_HERE
}




