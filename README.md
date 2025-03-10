# Inventory System Overview

---

## Project Overview

- **Backend:** Node.js with TypeScript & Express  
- **Database:** MongoDB (dockerized)  
- **Authentication:** JWT-based with Role-Based Access Control  
- **Additional Feature:** QR code generation for products

---

## Setup & Configuration

1. **Clone & Install Dependencies**
   - Clone your repository:
     ```bash
     git clone https://github.com/yourusername/your-repo-name.git
     cd your-repo-name
     ```
   - Install the necessary packages:
     ```bash
     npm install
     ```

2. **Create a `.env` File**  
   In the project root, create a file named `.env` with the following content:
   ```dotenv
   PORT=3000
   MONGO_URI=mongodb://localhost:27017/inventory
   JWT_SECRET=your_jwt_secret_here
PORT: The port your server will listen on.
MONGO_URI: MongoDB connection string.
JWT_SECRET: Secret key for signing JWT tokens (replace with a secure secret).
Docker Compose for MongoDB
Ensure Docker is running and use the provided docker-compose.yml to spin up MongoDB:
version: '3.8'
services:
  mongodb:
    image: mongo:latest
    container_name: mongo
    ports:
      - "27017:27017"
    volumes:
      - mongo_data:/data/db
volumes:
  mongo_data:

Start MongoDB with:

docker-compose up -d

Run the Development Server
Start your Node.js server:

npm run dev

Project Structure

```bash
Inventory System Repository
│
├── src/
│   ├── controllers/
│   │   ├── auth.controller.ts
│   │   └── product.controller.ts
│   │
│   ├── middleware/
│   │   ├── auth.middleware.ts
│   │   └── role.middleware.ts
│   │
│   ├── models/
│   │   ├── user.model.ts
│   │   └── product.model.ts
│   │
│   ├── routes/
│   │   ├── auth.routes.ts
│   │   └── product.routes.ts
│   │
│   └── app.ts
│
├── .env
├── docker-compose.yml
├── package.json
└── tsconfig.json
