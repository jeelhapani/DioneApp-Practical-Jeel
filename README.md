# DioneApp-Practical-Jeel

git clone https://github.com/jeelhapani/DioneApp-Practical-Jeel.git

- Install Dependencies
npm install

- Create a .env file in root directory
PORT=
JWT_TOKEN=""
DB_URL=""

- Run Project
npm start

- Server will start at:
http://localhost:port



API Curl

-User API
- Register User
curl --location "$BASE_URL/api/register" \
--header "Content-Type: application/json" \
--data '{
  "name": "joo",
  "email": "joo@gmail.com",
  "password": "12345"
}'

- Login User
curl --location "$BASE_URL/api/login" \
--header "Content-Type: application/json" \
--data '{
  "email": "test@gmail.com",
  "password": "12345"
}'

- Get User Profile
curl --location "$BASE_URL/api/profile" \
--header "Authorization: Bearer $TOKEN"



- Posts Api
- Create Post
curl --location "$BASE_URL/api/posts" \
--header "Authorization: Bearer $TOKEN" \
--header "Content-Type: application/json" \
--data '{
  "caption": "test caption"
}'

- Get Post List
curl --location "$BASE_URL/api/postsList?limit=2&skip=1" \
--header "Authorization: Bearer $TOKEN"

- Like a Post
curl --location "$BASE_URL/api/posts/:id/like" \
--header "Authorization: Bearer $TOKEN"

- Get Posts by User
curl --location "$BASE_URL/api/posts/user/:userId" \
--header "Authorization: Bearer $TOKEN"



Folder Structure

project-root/
│
├── config/
│   └── db.js
│       └── MongoDB database connection
│
├── helper/
│   ├── joiCheck.js
│   │   └── Common Joi validation helpers
│   │
│   ├── joiSchema.js
│   │   └── Joi request schemas
│   │
│   ├── joiValidate.js
│   │   └── Middleware to validate request body
│   │
│   ├── redis.client.js
│   │   └── Redis client connection
│   │
│   └── verify.Token.js
│       └── JWT authentication middleware
│
├── route_controller/
│   ├── user.js
│   │   └── User controller (request/response handling)
│   │
│   └── post.js
│       └── Post controller (request/response handling)
│
├── routes/
│   └── index.routes.js
│       └── Central API route definitions
│
├── services/
│   ├── user/
│   │   ├── user.model.js
│   │   │   └── User Mongoose schema
│   │   │
│   │   └── user.services.js
│   │       └── User business logic & DB operations
│   │
│   └── post/
│       ├── post.model.js
│       │   └── Post Mongoose schema
│       │
│       └── post.services.js
│           └── Post business logic & DB operations
│
├── node_modules/
│   └── Project dependencies
│
├── .env
│   └── Environment variables
│
├── .gitignore
│   └── Git ignored files
│
├── app.js
│   └── Express app configuration & middleware setup
│
├── index.js
│   └── Application entry point
│
├── package.json
│   └── Project metadata & scripts
│
└── package-lock.json
│   └── Dependency lock file
│
└── README.md
    └── Project details
