
# Express API - Backend Project

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

## Necessary Environment Variables

Make sure to create a `.env` file in the root of the project with the following content:

```env
APP_PORT=5000
MONGO_URI=mongodb://localhost:27017
MONGO_DB_NAME=expressAPI
```

---

# API Sections

## Authentication

### Login

**Endpoint:**  
```http
POST /api/v1/auth/login
```

**Expected Body (JSON):**

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

