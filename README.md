
# Simple Express API for Account Creation and Deletion  

This is a simple RESTful API built with **Node.js**, **Express**, and **MongoDB**. The API allows users to **create an account, log in,** and **delete their account** while implementing authentication and authorization.  

## Features  

- **User account creation (signup)**  
- **User login with JWT authentication**  
- **Token verification middleware**  
- **Secure password hashing using bcrypt**  
- **User account deletion (protected route)**  
- **Error handling middleware** to manage API errors gracefully  
- **CORS support** for cross-origin requests  
- Uses **MongoDB** for data storage  

---

## Technologies Used  

- **Express.js** – Backend framework  
- **MongoDB & Mongoose** – Database and ODM  
- **bcrypt** – Password hashing  
- **jsonwebtoken** – JWT authentication  
- **cookie-parser** – Handling cookies  
- **CORS** – Handling cross-origin requests  

---


## Project Structure  

```bash
/project-root
├── config/  
│   ├── db.connect.js        # MongoDB connection setup  
│  
├── controllers/  
│   ├── auth.controller.js   # Handles account creation and login  
│   ├── user.controller.js   # Handles user account deletion  
│  
├── middlewares/  
│   ├── auth.middleware.js   # Verifies user authentication before account deletion  
│   ├── error.middleware.js  # Handles errors and prevents app crashes  
│   ├── errorHandler.js      # Sends appropriate error messages to users  
│  
├── models/  
│   ├── user.model.js        # Defines the User schema  
│  
├── routes/  
│   ├── auth.route.js        # Routes for authentication (signup, login)  
│   ├── user.route.js        # Routes for user-related actions (account deletion)  
│  
├── index.js                 # Main entry point of the application  
├── package.json             # Project dependencies  
├── package-lock.json        # Dependency lock file  
├── README.md                # Project documentation

```

## API Endpoints  

### Authentication Routes (`/api/auth`)

| Method | Endpoint   | Description          | Authentication |
|--------|-----------|----------------------|---------------|
| POST   | `api/signup` | Create a new account | ❌           |
| POST   | `api/login`  | User login & get JWT | ❌           |

### **User Routes (`/api/users`)**  

| Method | Endpoint  | Description         | Authentication |
|--------|----------|---------------------|---------------|
| DELETE | `api/user/:id` | Delete user account | ✅ (JWT)      |

## Note:
#### Please note that if a user account has been deleted and the user is trying to use same token to delete his/her account again, the auth middle ware will catch the error and will send a response to the clien that the account does not exist, so no need for the check in deleteUser function inside user.controller.js
## Setup Guide  

```sh
# 1. Clone the repository
git clone <repository-url>
cd <project-folder>

# 2. Install dependencies
npm install

# 3. Set up environment variables
touch .env
echo "MONGO_URI=your_mongo_db_connection_string" >> .env
echo "JWT_SECRET=your_jwt_secret" >> .env

# 4. Start the server
npm start

The server should now be running on http://localhost:3000 (or your specified port).

This format ensures that all setup steps are inside a single **code block**, making it easy to copy and execute. Let me know if you need any modifications!

