
# API

RESTful API built with **Express.js**, **Node.js**, and **MongoDB**. It features JWT-based authentication, user management, product catalog, and order processing functionalities.

## Technologies Used

- **Node.js**
- **Express.js**
- **MongoDB** (Mongoose ODM)
- **JWT (JSON Web Tokens)**
- **Bcrypt.js** (password hashing)
- **dotenv** (environment variable management)
- **TypeScript** (optional depending on your configuration)

---

## Environment Setup

### 1. Clone the Repository

First, clone the repository to your local machine:

```bash
git clone https://github.com/lmromero18/express-api---AT
cd express-API---AT
```

### 2. Install Dependencies

Within the project directory, install all the required dependencies using npm:

```bash
npm install
```

### 3. Run the Server in Development Mode

Once the dependencies are installed, you can start the server in development mode with the following command:

```bash
npm run dev
```

---

## Route Prefix

All API routes are under the following prefix:

```
/api/v1
```

---

## Environment Variables

| Variable                 | Description                         |
| ------------------------ | ----------------------------------- |
| APP_PORT               | Server port                         |
| APP_PREFIX             | Base path for all endpoints         |
| MONGO_URI              | MongoDB connection URI              |
| MONGO_DB_NAME          | MongoDB database name               |

---

# API Sections

### Auth

#### Login

- **Method:** POST  
- **URL:** /api/v1/auth/login
- **Protected:** No

**Request Body (JSON):**

```json
{
  "username": "<USERNAME>",
  "password": "<PASSWORD>"
}
```

**Successful Response (JSON):**

```json
{
  "success": true,
  "message": "Login successful",
  "token": "<JWT TOKEN>"
}
```

---

### Users

#### Create Users

- **Method:** POST  
- **URL:** /api/v1/users
- **Protected:** No

**Request Body (JSON):**

```json
{
  "username": "johndoe432",
  "name": "John",
  "lastName": "Doe",
  "email": "john.doe@exampl234e.com",
  "password": "SecurePass123",
  "confirmPassword": "SecurePass123"
}
```

**Successful Response (JSON):**

```json
{
    "success": true,
    "data": {
        "username": "johndoe432",
        "name": "John",
        "lastName": "Doe",
        "email": "john.doe@exampl234e.com",
        "status": "ACTIVE",
        "_id": "680e5c4b86636ff0f15a658b",
        "createdAt": "2025-04-27T16:33:16.003Z",
        "updatedAt": "2025-04-27T16:33:16.003Z",
        "__v": 0
    }
}
```

#### Update Users

- **Method:** PUT  
- **URL:** /api/v1/users/:username
- **Protected:** Yes

**Request Body (JSON):**

```json
{
  "username": "johndoe432",
  "name": "John",
  "lastName": "Doe",
  "email": "john.doe@example225.com",
  "status": "ACTIVE"
}
```

**Successful Response (JSON):**

```json
{
    "success": true,
    "data": {
        "_id": "680e5c4b86636ff0f15a658b",
        "username": "johndoe432",
        "name": "John",
        "lastName": "Doe",
        "email": "john.doe@example225.com",
        "status": "ACTIVE",
        "password": "$2b$10$v4zc/56Tc/VmB53IZ1owpuLWKxoQ7DoGkNIu4IaJeuIo9F1s7I0Xa",
        "createdAt": "2025-04-27T16:33:16.003Z",
        "updatedAt": "2025-04-27T17:06:42.319Z",
        "__v": 0
    }
}
```

#### Delete Users

- **Method:** DELETE  
- **URL:** /api/v1/users/:username
- **Protected:** Yes

**Successful Response (JSON):**

```json
{
    "success": true,
    "data": {
        "username": "johndoe432",
        "name": "John",
        "lastName": "Doe",
        "email": "john.doe@exampl234e.com",
        "status": "ACTIVE",
        "_id": "680e5c4b86636ff0f15a658b",
        "createdAt": "2025-04-27T16:33:16.003Z",
        "updatedAt": "2025-04-27T16:33:16.003Z",
        "__v": 0
    }
}
```

#### Change User Password

- **Method:** PUT  
- **URL:** /api/v1/users/change-password/:username
- **Protected:** Yes

**Request Body (JSON):**

```json
{
  "oldPassword": "<OLD_PASSWORD>",
  "newPassword": "<NEW_PASSWORD>"
}

```

**Successful Response (JSON):**

```json
{
    "success": true,
    "data": {
        "_id": "680e5add6318542217e4aefa",
        "username": "johndoe",
        "name": "John",
        "lastName": "Doe",
        "email": "john.doe@example.com",
        "status": "ACTIVE",
        "password": "$2b$10$2ZhGmUDKbhHTT.Lr0lhgw.IhppkUUy6RxkOpguS/VMuVqRQe5jYoq",
        "createdAt": "2025-04-27T16:27:09.018Z",
        "updatedAt": "2025-04-27T20:30:48.077Z",
        "__v": 0
    }
}
```

#### Get Users

- **Method:** GET  
- **URL:** /api/v1/users
- **Protected:** Yes

**Successful Response (JSON):**

```json
{
    "success": true,
    "data": {
        "items": [
            {
                "_id": "680e5add6318542217e4aefa",
                "username": "johndoe",
                "name": "John",
                "lastName": "Doe",
                "email": "john.doe@example.com",
                "status": "ACTIVE",
                "password": "$2b$10$xNjP36vR9UAPdR9OTxpVl.gQjKtYdGAuP8YDNjs3HeKPimsLzdjeO",
                "createdAt": "2025-04-27T16:27:09.018Z",
                "updatedAt": "2025-04-27T16:27:09.018Z",
                "__v": 0
            },
            {
                "_id": "680e5b6637251507c97231ac",
                "username": "johndoe2",
                "name": "John",
                "lastName": "Doe",
                "email": "john.doe@exampl2e.com",
                "status": "ACTIVE",
                "password": "$2b$10$jtyGGerhD7MkqiyqCtPDV.9dytLD5i9cKAau1pAJSBr8FI.9.27my",
                "createdAt": "2025-04-27T16:29:26.130Z",
                "updatedAt": "2025-04-27T16:29:26.130Z",
                "__v": 0
            },
            {
                "_id": "680e5bde5c12cc93c44ecc2c",
                "username": "johndoe32",
                "name": "John",
                "lastName": "Doe",
                "email": "john.doe@exampl23e.com",
                "status": "ACTIVE",
                "password": "$2b$10$qvb0gNaOvDzZ641KpsanrOxDs0RGjCNWNc2tifT3lhF1fbsUNONAO",
                "createdAt": "2025-04-27T16:31:26.743Z",
                "updatedAt": "2025-04-27T16:31:26.743Z",
                "__v": 0
            },
            {
                "_id": "680e5c4b86636ff0f15a658b",
                "username": "johndoe432",
                "name": "John",
                "lastName": "Doe",
                "email": "john.doe@example22.com",
                "status": "INACTIVE",
                "password": "$2b$10$G1ggrlWkTc1lm7Li186nlO5naR0CkApIpQCXdmCbyemHE61vKi7ka",
                "createdAt": "2025-04-27T16:33:16.003Z",
                "updatedAt": "2025-04-27T19:33:26.364Z",
                "__v": 0
            }
        ],
        "pagination": {
            "total": 4,
            "page": 1,
            "limit": 20,
            "totalPages": 1
        }
    }
}
```

#### Delete Users

- **Method:** GET  
- **URL:** /api/v1/users/:username
- **Protected:** Yes

**Successful Response (JSON):**

```json
{
    "success": true,
    "data": {
        "_id": "680e5c4b86636ff0f15a658b",
        "username": "johndoe432",
        "name": "John",
        "lastName": "Doe",
        "email": "john.doe@example225.com",
        "status": "ACTIVE",
        "password": "$2b$10$G1ggrlWkTc1lm7Li186nlO5naR0CkApIpQCXdmCbyemHE61vKi7ka",
        "createdAt": "2025-04-27T16:33:16.003Z",
        "updatedAt": "2025-04-27T17:15:22.306Z",
        "__v": 0
    }
}
```