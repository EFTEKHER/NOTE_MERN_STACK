import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import NoteDetailPage from "./pages/NoteDetailPage.jsx";
import CreatePage from "./pages/CreatePage.jsx";
import EditPage from "./pages/EditPage.jsx";
import Footer from "./components/Footer.jsx";


export default function App() {
  return (
    <div data-theme="forest">
  
    <Routes>

      <Route path="/" element={<HomePage />} />
      <Route path="/notes/:id" element={<NoteDetailPage />} />
      <Route path="/create" element={<CreatePage />} />
      <Route path="/edit/:id" element={<EditPage />} />
      <Route path="*" element={<div className="min-h-screen flex items-center justify-center text-3xl font-bold">404 - Page Not Found</div>} />
      
    </Routes>
    <Footer />
    </div>
  );
}
