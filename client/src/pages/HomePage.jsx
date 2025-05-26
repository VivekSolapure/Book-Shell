// // src/pages/HomePage.jsx
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import BookCard from '../components/BookCard';

// const HomePage = () => {
//   const [featuredBooks, setFeaturedBooks] = useState([]);

//   useEffect(() => {
//     axios.get('/api/books?page=1&limit=8')
//       .then(res => setFeaturedBooks(res.data.books))
//       .catch(err => console.error(err));
//   }, []);

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-bold mb-4">📚 Featured Books</h1>
//       <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
//         {featuredBooks.map((book,id) => (
//           <BookCard key={id} book={book} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default HomePage;
