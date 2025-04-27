
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

### Products

#### Create Products

- **Method:** POST  
- **URL:** /api/v1/products
- **Protected:** Yes

**Request Body (JSON):**

```json
{
  "name": "Example Product",
  "price": 49.99,
  "description": "This is an example description for the product.",
  "quantity": 100
}
```

**Successful Response (JSON):**

```json
{
    "success": true,
    "data": {
        "name": "Example Product 3",
        "price": 49.99,
        "description": "This is an example description for the product.",
        "quantity": 100,
        "_id": "680e8074d46d975d83d17c5f",
        "createdAt": "2025-04-27T19:07:32.858Z",
        "updatedAt": "2025-04-27T19:07:32.858Z",
        "__v": 0
    }
}
```

#### Update Products

- **Method:** POST  
- **URL:** /api/v1/products/:id
- **Protected:** Yes

**Request Body (JSON):**

```json
{
  "name": "Example Product",
  "price": 49.99,
  "description": "This is an example description for the product.",
  "quantity": 900
}
```

**Successful Response (JSON):**

```json
{
    "success": true,
    "data": {
        "_id": "680e7f8040129689aaf78c43",
        "name": "Example Product",
        "price": 49.99,
        "description": "This is an example description for the product.",
        "quantity": 900,
        "createdAt": "2025-04-27T19:03:28.564Z",
        "updatedAt": "2025-04-27T20:36:43.877Z",
        "__v": 0
    }
}
```

#### Delete Product

- **Method:** DELETE  
- **URL:** /api/v1/products/:id
- **Protected:** No

**Successful Response (JSON):**

```json
{
    "success": true,
    "data": {
        "_id": "680e8074d46d975d83d17c5f",
        "name": "Example Product 3",
        "price": 49.99,
        "description": "This is an example description for the product.",
        "quantity": 100,
        "createdAt": "2025-04-27T19:07:32.858Z",
        "updatedAt": "2025-04-27T19:07:32.858Z",
        "__v": 0
    }
}
```

#### Get Products

- **Method:** GET  
- **URL:** /api/v1/products
- **Protected:** No

**Successful Response (JSON):**

```json
{
    "success": true,
    "data": {
        "items": [
            {
                "_id": "680e7f8040129689aaf78c43",
                "name": "Example Product",
                "price": 49.99,
                "description": "This is an example description for the product.",
                "quantity": 99,
                "createdAt": "2025-04-27T19:03:28.564Z",
                "updatedAt": "2025-04-27T19:22:49.312Z",
                "__v": 0
            },
            {
                "_id": "680e8051d46d975d83d17c5c",
                "name": "Example Product 2",
                "price": 49.99,
                "description": "This is an example description for the product.",
                "quantity": 147,
                "createdAt": "2025-04-27T19:06:57.523Z",
                "updatedAt": "2025-04-27T19:22:49.315Z",
                "__v": 0
            }
        ],
        "pagination": {
            "total": 2,
            "page": 1,
            "limit": 20,
            "totalPages": 1
        }
    }
}
```

#### Get Products by ID

- **Method:** GET  
- **URL:** /api/v1/products/:id
- **Protected:** No

**Successful Response (JSON):**

```json
{
    "success": true,
    "data": {
        "_id": "680e8051d46d975d83d17c5c",
        "name": "Example Product 2",
        "price": 49.99,
        "description": "This is an example description for the product.",
        "quantity": 147,
        "createdAt": "2025-04-27T19:06:57.523Z",
        "updatedAt": "2025-04-27T19:33:26.672Z",
        "__v": 0
    }
}
```

### Orders

#### Create Orders

- **Method:** POST  
- **URL:** /api/v1/orders
- **Protected:** Yes

**Request Body (JSON):**

```json
{
  "products": [
    {
      "productId": "680e7f8040129689aaf78c43",
      "quantity": 1
    },
    {
      "productId": "680e8051d46d975d83d17c5c",
      "quantity": 3
    }
  ]
}

```

**Successful Response (JSON):**

```json
{
    "success": true,
    "data": {
        "user": "680e5add6318542217e4aefa",
        "products": [
            {
                "productId": "680e7f8040129689aaf78c43",
                "quantity": 1,
                "_id": "680e96b02a98645c90530487"
            },
            {
                "productId": "680e8051d46d975d83d17c5c",
                "quantity": 3,
                "_id": "680e96b02a98645c90530488"
            }
        ],
        "totalPrice": 199.96,
        "totalQuantity": 4,
        "status": "PENDING",
        "_id": "680e96b02a98645c90530486",
        "createdAt": "2025-04-27T20:42:24.556Z",
        "updatedAt": "2025-04-27T20:42:24.556Z",
        "__v": 0
    }
}
```

#### Update Order

- **Method:** POST  
- **URL:** /api/v1/orders/:id
- **Protected:** Yes

**Request Body (JSON):**

```json
{
  "products": [
    {
      "productId": "680e7f8040129689aaf78c43", 
      "quantity": 2
    },
    {
      "productId": "680e8051d46d975d83d17c5c", 
      "quantity": 1
    }
  ]
}

```

**Successful Response (JSON):**

```json
{
    "success": true,
    "data": {
        "_id": "680e8263327d99759a6580d1",
        "user": "680e5add6318542217e4aefa",
        "products": [
            {
                "productId": "680e7f8040129689aaf78c43",
                "quantity": 2,
                "_id": "680e87f50c50adbb7ec0bb1c"
            },
            {
                "productId": "680e8051d46d975d83d17c5c",
                "quantity": 1,
                "_id": "680e87f50c50adbb7ec0bb1d"
            }
        ],
        "totalPrice": 149.97,
        "totalQuantity": 3,
        "status": "PENDING",
        "createdAt": "2025-04-27T19:15:47.046Z",
        "updatedAt": "2025-04-27T19:39:33.614Z",
        "__v": 0
    }
}
```

#### Update Order Status

- **Method:** POST  
- **URL:** /api/v1/orders/:id
- **Protected:** Yes

**Request Body (JSON):**

```json
{
  "status": "CONFIRMED"
}
```

**Successful Response (JSON):**

```json
{
    "success": true,
    "data": {
        "_id": "680e8263327d99759a6580d1",
        "user": "680e5add6318542217e4aefa",
        "products": [
            {
                "productId": {
                    "_id": "680e7f8040129689aaf78c43",
                    "name": "Example Product",
                    "price": 49.99,
                    "description": "This is an example description for the product.",
                    "quantity": 96,
                    "createdAt": "2025-04-27T19:03:28.564Z",
                    "updatedAt": "2025-04-27T19:33:26.670Z",
                    "__v": 0
                },
                "quantity": 2,
                "_id": "680e87f50c50adbb7ec0bb1c"
            },
            {
                "productId": {
                    "_id": "680e8051d46d975d83d17c5c",
                    "name": "Example Product 2",
                    "price": 49.99,
                    "description": "This is an example description for the product.",
                    "quantity": 147,
                    "createdAt": "2025-04-27T19:06:57.523Z",
                    "updatedAt": "2025-04-27T19:33:26.672Z",
                    "__v": 0
                },
                "quantity": 1,
                "_id": "680e87f50c50adbb7ec0bb1d"
            }
        ],
        "totalPrice": 149.97,
        "totalQuantity": 3,
        "status": "CONFIRMED",
        "createdAt": "2025-04-27T19:15:47.046Z",
        "updatedAt": "2025-04-27T19:46:20.300Z",
        "__v": 0
    }
}
```

#### Get Orders

- **Method:** GET  
- **URL:** /api/v1/orders
- **Protected:** Yes

**Successful Response (JSON):**

```json
{
    "success": true,
    "data": {
        "items": [
            {
                "_id": "680e8263327d99759a6580d1",
                "user": "680e5add6318542217e4aefa",
                "products": [
                    {
                        "productId": "680e7f8040129689aaf78c43",
                        "quantity": 2,
                        "_id": "680e87f50c50adbb7ec0bb1c"
                    },
                    {
                        "productId": "680e8051d46d975d83d17c5c",
                        "quantity": 1,
                        "_id": "680e87f50c50adbb7ec0bb1d"
                    }
                ],
                "totalPrice": 149.97,
                "totalQuantity": 3,
                "status": "PENDING",
                "createdAt": "2025-04-27T19:15:47.046Z",
                "updatedAt": "2025-04-27T19:39:33.614Z",
                "__v": 0
            },
            {
                "_id": "680e828e327d99759a6580d5",
                "user": "680e5add6318542217e4aefa",
                "products": [
                    {
                        "productId": "680e7f8040129689aaf78c43",
                        "quantity": 1,
                        "_id": "680e828e327d99759a6580d6"
                    },
                    {
                        "productId": "680e8051d46d975d83d17c5c",
                        "quantity": 3,
                        "_id": "680e828e327d99759a6580d7"
                    }
                ],
                "totalPrice": 199.96,
                "totalQuantity": 4,
                "status": "PENDING",
                "createdAt": "2025-04-27T19:16:30.491Z",
                "updatedAt": "2025-04-27T19:16:30.491Z",
                "__v": 0
            },
            {
                "_id": "680e840969a3cb322fad95c2",
                "user": "680e5add6318542217e4aefa",
                "products": [
                    {
                        "productId": "680e7f8040129689aaf78c43",
                        "quantity": 1,
                        "_id": "680e840969a3cb322fad95c3"
                    },
                    {
                        "productId": "680e8051d46d975d83d17c5c",
                        "quantity": 3,
                        "_id": "680e840969a3cb322fad95c4"
                    }
                ],
                "totalPrice": 199.96,
                "totalQuantity": 4,
                "status": "PENDING",
                "createdAt": "2025-04-27T19:22:49.306Z",
                "updatedAt": "2025-04-27T19:22:49.306Z",
                "__v": 0
            },
            {
                "_id": "680e85d55709a17ce1f9a325",
                "user": "680e5add6318542217e4aefa",
                "products": [
                    {
                        "productId": "680e7f8040129689aaf78c43",
                        "quantity": 1,
                        "_id": "680e85d55709a17ce1f9a326"
                    },
                    {
                        "productId": "680e8051d46d975d83d17c5c",
                        "quantity": 3,
                        "_id": "680e85d55709a17ce1f9a327"
                    }
                ],
                "totalPrice": 199.96,
                "totalQuantity": 4,
                "status": "PENDING",
                "createdAt": "2025-04-27T19:30:29.529Z",
                "updatedAt": "2025-04-27T19:30:29.529Z",
                "__v": 0
            },
            {
                "_id": "680e8643aed53ca32a2caeb9",
                "user": "680e5add6318542217e4aefa",
                "products": [
                    {
                        "productId": "680e7f8040129689aaf78c43",
                        "quantity": 1,
                        "_id": "680e8643aed53ca32a2caeba"
                    },
                    {
                        "productId": "680e8051d46d975d83d17c5c",
                        "quantity": 3,
                        "_id": "680e8643aed53ca32a2caebb"
                    }
                ],
                "totalPrice": 199.96,
                "totalQuantity": 4,
                "status": "PENDING",
                "createdAt": "2025-04-27T19:32:19.986Z",
                "updatedAt": "2025-04-27T19:32:19.986Z",
                "__v": 0
            },
            {
                "_id": "680e8686aed53ca32a2caece",
                "user": "680e5add6318542217e4aefa",
                "products": [
                    {
                        "productId": "680e7f8040129689aaf78c43",
                        "quantity": 1,
                        "_id": "680e8686aed53ca32a2caecf"
                    },
                    {
                        "productId": "680e8051d46d975d83d17c5c",
                        "quantity": 3,
                        "_id": "680e8686aed53ca32a2caed0"
                    }
                ],
                "totalPrice": 199.96,
                "totalQuantity": 4,
                "status": "PENDING",
                "createdAt": "2025-04-27T19:33:26.668Z",
                "updatedAt": "2025-04-27T19:33:26.668Z",
                "__v": 0
            }
        ],
        "pagination": {
            "total": 6,
            "page": 1,
            "limit": 20,
            "totalPages": 1
        }
    }
}
```

#### Get Orders by ID

- **Method:** GET  
- **URL:** /api/v1/orders/:id
- **Protected:** Yes

**Successful Response (JSON):**

```json
{
    "success": true,
    "data": {
        "_id": "680e8263327d99759a6580d1",
        "user": "680e5add6318542217e4aefa",
        "products": [
            {
                "productId": "680e7f8040129689aaf78c43",
                "quantity": 2,
                "_id": "680e87f50c50adbb7ec0bb1c"
            },
            {
                "productId": "680e8051d46d975d83d17c5c",
                "quantity": 1,
                "_id": "680e87f50c50adbb7ec0bb1d"
            }
        ],
        "totalPrice": 149.97,
        "totalQuantity": 3,
        "status": "PENDING",
        "createdAt": "2025-04-27T19:15:47.046Z",
        "updatedAt": "2025-04-27T19:39:33.614Z",
        "__v": 0
    }
}
```

#### Get Orders by User ID

- **Method:** GET  
- **URL:** /api/v1/orders/search/:userId
- **Protected:** yes

**Successful Response (JSON):**

```json
{
    "success": true,
    "data": {
        "items": [
            {
                "_id": "680e8263327d99759a6580d1",
                "user": "680e5add6318542217e4aefa",
                "products": [
                    {
                        "productId": "680e7f8040129689aaf78c43",
                        "quantity": 2,
                        "_id": "680e87f50c50adbb7ec0bb1c"
                    },
                    {
                        "productId": "680e8051d46d975d83d17c5c",
                        "quantity": 1,
                        "_id": "680e87f50c50adbb7ec0bb1d"
                    }
                ],
                "totalPrice": 149.97,
                "totalQuantity": 3,
                "status": "PENDING",
                "createdAt": "2025-04-27T19:15:47.046Z",
                "updatedAt": "2025-04-27T19:39:33.614Z",
                "__v": 0
            },
            {
                "_id": "680e828e327d99759a6580d5",
                "user": "680e5add6318542217e4aefa",
                "products": [
                    {
                        "productId": "680e7f8040129689aaf78c43",
                        "quantity": 1,
                        "_id": "680e828e327d99759a6580d6"
                    },
                    {
                        "productId": "680e8051d46d975d83d17c5c",
                        "quantity": 3,
                        "_id": "680e828e327d99759a6580d7"
                    }
                ],
                "totalPrice": 199.96,
                "totalQuantity": 4,
                "status": "PENDING",
                "createdAt": "2025-04-27T19:16:30.491Z",
                "updatedAt": "2025-04-27T19:16:30.491Z",
                "__v": 0
            },
            {
                "_id": "680e840969a3cb322fad95c2",
                "user": "680e5add6318542217e4aefa",
                "products": [
                    {
                        "productId": "680e7f8040129689aaf78c43",
                        "quantity": 1,
                        "_id": "680e840969a3cb322fad95c3"
                    },
                    {
                        "productId": "680e8051d46d975d83d17c5c",
                        "quantity": 3,
                        "_id": "680e840969a3cb322fad95c4"
                    }
                ],
                "totalPrice": 199.96,
                "totalQuantity": 4,
                "status": "PENDING",
                "createdAt": "2025-04-27T19:22:49.306Z",
                "updatedAt": "2025-04-27T19:22:49.306Z",
                "__v": 0
            },
            {
                "_id": "680e85d55709a17ce1f9a325",
                "user": "680e5add6318542217e4aefa",
                "products": [
                    {
                        "productId": "680e7f8040129689aaf78c43",
                        "quantity": 1,
                        "_id": "680e85d55709a17ce1f9a326"
                    },
                    {
                        "productId": "680e8051d46d975d83d17c5c",
                        "quantity": 3,
                        "_id": "680e85d55709a17ce1f9a327"
                    }
                ],
                "totalPrice": 199.96,
                "totalQuantity": 4,
                "status": "PENDING",
                "createdAt": "2025-04-27T19:30:29.529Z",
                "updatedAt": "2025-04-27T19:30:29.529Z",
                "__v": 0
            },
            {
                "_id": "680e8643aed53ca32a2caeb9",
                "user": "680e5add6318542217e4aefa",
                "products": [
                    {
                        "productId": "680e7f8040129689aaf78c43",
                        "quantity": 1,
                        "_id": "680e8643aed53ca32a2caeba"
                    },
                    {
                        "productId": "680e8051d46d975d83d17c5c",
                        "quantity": 3,
                        "_id": "680e8643aed53ca32a2caebb"
                    }
                ],
                "totalPrice": 199.96,
                "totalQuantity": 4,
                "status": "PENDING",
                "createdAt": "2025-04-27T19:32:19.986Z",
                "updatedAt": "2025-04-27T19:32:19.986Z",
                "__v": 0
            },
            {
                "_id": "680e8686aed53ca32a2caece",
                "user": "680e5add6318542217e4aefa",
                "products": [
                    {
                        "productId": "680e7f8040129689aaf78c43",
                        "quantity": 1,
                        "_id": "680e8686aed53ca32a2caecf"
                    },
                    {
                        "productId": "680e8051d46d975d83d17c5c",
                        "quantity": 3,
                        "_id": "680e8686aed53ca32a2caed0"
                    }
                ],
                "totalPrice": 199.96,
                "totalQuantity": 4,
                "status": "PENDING",
                "createdAt": "2025-04-27T19:33:26.668Z",
                "updatedAt": "2025-04-27T19:33:26.668Z",
                "__v": 0
            }
        ],
        "pagination": {
            "total": 6,
            "page": 1,
            "limit": 20,
            "totalPages": 1
        }
    }
}
```