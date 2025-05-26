# Book Review App

A full-stack MERN (MongoDB, Express, React, Node.js) application for browsing, searching, reviewing, and managing books. Users can register, log in, browse books, filter by category, search by title, and leave reviews.

---

## Features
- User registration and login (JWT authentication)
- Browse paginated list of books
- Search books by title (server-side)
- Filter books by category (server-side)
- View book details and reviews
- Add reviews to books
- User profile management
- Responsive UI with Tailwind CSS

---

## Tech Stack
- **Frontend:** React, Tailwind CSS
- **Backend:** Node.js, Express
- **Database:** MongoDB (Atlas recommended)

---

## Getting Started

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd <your-repo-directory>
```

### 2. Install dependencies
#### Backend
```bash
cd server
npm install
```
#### Frontend
```bash
cd ../client
npm install
```

### 3. Environment Variables
Create a `.env` file in the `server` directory:
```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
NODE_ENV=production
```

### 4. Build the React App
```bash
cd client
npm run build
```

### 5. Start the Server
```bash
cd ../server
node server.js
```

The server will serve the React build and API on the same port (default: 5000).

---

## Deployment
- Deploy to platforms like **Render**, **Railway**, **Heroku**, or your own VPS.
- Set environment variables (`MONGO_URI`, `JWT_SECRET`, etc.) in your host's dashboard.
- Make sure to build the React app before deploying.

---

## Folder Structure
```
client/         # React frontend
  src/
  public/
  ...
server/         # Express backend
  routes/
  models/
  config/
  books.json    # (optional) Book data
  ...
```

---

## API Endpoints (examples)
- `POST /api/auth/register` — Register a new user
- `POST /api/auth/login` — Login
- `GET /api/books` — Get paginated books
- `GET /api/books/search?query=...` — Search books by title
- `GET /api/books/filter?category=...` — Filter books by category
- `GET /api/books/:isbn` — Get book details
- `POST /api/reviews` — Add a review

---

## Customization
- Update categories in `Navbar.jsx` as needed
- Add more features or improve UI as desired

---

## License
MIT 