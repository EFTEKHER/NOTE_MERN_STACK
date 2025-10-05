import express from 'express';

import notesRoutes from './routes/notesRoutes.js';
import connectDB from './config/db.js';
import dotenv from 'dotenv';
import rateLimiter from './middleware/rateLimiter.js';
import cors from 'cors';
import path from 'path';
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// connectDB();
//middleware
const __dirname = path.resolve();
app.use(express.json());
if (process.env.NODE_ENV !== 'production') {
app.use(cors({
  origin: "http://localhost:5173" // Replace with your frontend URL
}));
}

//our simple middleware helps authentication and logging
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});
app.use(rateLimiter);

app.use("/api/notes", notesRoutes);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend", "dist", "index.html"));
  });
}
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
  });
}).catch((error) => {
  console.error('Failed to connect to the database:', error);
  process.exit(1);
});





/*
mongodb+srv://eftekherali2000_db_user:efte2000@cluster0.nkany4k.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

*/

// Sample route
// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });

//Endpoint 
//an endpoint is a combination of a URL and an HTTP method that allows clients to interact with a server.
// app.get('/api/note', (req, res) => { 
//   res.status(200).json({ message: 'There are 20 notes from the backend!' });
// });

// app.post('/api/note', (req, res) => {
//   // Here you would handle the note creation logic
//   res.status(201).json({ message: 'Note created successfully!' });
// });

// app.put('/api/note/:id', (req, res) => {
//   const { id } = req.params;
//   console.log(`Updating note with ID: ${id}`);
//   res.status(200).json({ message: `Note with ID ${id} updated successfully!` });
// })
// app.delete('/api/note/:id', (req, res) => {
//   const { id } = req.params;
//   console.log(`Deleting note with ID: ${id}`);
//   res.status(200).json({ message: `Note with ID ${id} deleted successfully!` });
// });