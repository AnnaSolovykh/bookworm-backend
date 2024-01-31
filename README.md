### Redux Bookshop Project - Backend Repository

Demo: Bookworm Redux Shop

## Project Title: Bookworm 

# Description:
The Bookworm backend is an integral part of the Bookworm full-stack e-commerce solution, developed to work seamlessly with Redux and Node.js. This backend repository supports all the data management and server-side logic required for the Bookworm application.

# Key Features:
+ Robust and secure user authentication using JSON Web Tokens (JWT) and bcryptjs for password hashing.
+ Efficient session management with express-session and connect-mongodb-session.
+ Enhanced security features including CORS, Helmet, and express-rate-limit to safeguard the application.
+ Use of Mongoose for MongoDB object modeling, providing a straightforward solution to manage database operations.
+ Implementing http-status-codes for more readable and maintainable response status codes.
+ Utilization of xss-clean to sanitize user input and prevent cross-site scripting (XSS) attacks.
+ Integrated error handling with express-async-errors for a cleaner and more efficient codebase.

# Technologies Used:
+ bcryptjs for password hashing.
+ connect-mongodb-session for MongoDB-based session storage.
+ cors for handling cross-origin resource sharing.
+ dotenv for managing environment variables.
+ express as the backbone of the Node.js server.
+ express-async-errors for simplified error handling in Express.
+ express-rate-limit for basic request rate limiting.
+ express-session for managing user sessions.
+ helmet for securing HTTP headers.
+ http-status-codes for using symbolic HTTP response status codes.
+ jsonwebtoken for generating JWTs for secure authentication.
+ mongoose for MongoDB object data modeling.
+ nodemon for automatic server restarts during development.
+ xss-clean for sanitizing user input against XSS.
