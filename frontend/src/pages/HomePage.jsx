import React from 'react'
import Navbar from '../components/Navbar.jsx'
import { useState } from 'react'
import RateLimitedUI from '../components/RateLimitedUI.jsx';
import { useEffect } from 'react';
import api from '../lib/axios.js';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';

import NoteCard from '../components/NoteCard.jsx';
const HomePage = () => {
    const [isRateLimited,setIsLimited]=useState(false);
    const [notes,setNotes]=useState([]);
    const [loading,setLoading]=useState(true);
    useEffect(()=>{

        const fetchNotes=async()=>{
            try {
                const response = await api.get('/notes');
                setNotes(response.data);
                console.log(response.data);
            } catch (error) {
                if (error.response && error.response.status === 429) {
                    setIsLimited(true);
                }
                else{
                    toast.error("Failed to fetch notes");
                }
            } finally {
                setLoading(false);
            }
        }

        fetchNotes();
    },[])
  return (
    <div>
      <Navbar />
      
      {isRateLimited && <RateLimitedUI />}
      <div className='max-w-7xl mx-auto p-4 mt-6'>
        {loading && <div className='animate-pulse'>Loading...</div>}
        {!loading && notes.length===0 && <div className='text-center text-lg font-semibold text-base-content/70'>No notes found. Create your first note!</div>}
        {!loading && notes.length>0 && <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
            {notes.map((note)=>(
               <NoteCard key={note._id} note={note}  setNotes={setNotes}/>
            ))}     
        </div>
        }
        </div>
    </div>
  )
}

export default HomePage
