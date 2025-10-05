import { ArrowLeftIcon } from 'lucide-react';
import React from 'react'
import {useState} from 'react'
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import api from '../lib/axios';
const CreatePage = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      if(!title || !content){
         toast.error("Title and Content are required");
         return;
      }
      setLoading(true);
      const response = await api.post('/notes', { title, content });
      console.log(response.data);
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 429) {
        toast.error("You are being rate limited. Please try again later.",{
          duration: 4000,
          style: { background: '#1D803E', color: '#fff' }

        });
      }
      toast.error("Failed to create note"); 
    } finally {
      setLoading(false);
      if (!title || !content) {
        toast.error("Title and Content are required");
        
      }
      toast.success("Note created successfully");
      setTitle('');
      setContent('');
    }
  } 

  return (
    <div className='min-h-screen bg-base-200'>
    <div className='container mx-auto px-4 py-4'> 
    <div className='max-w-2xl mx-auto'>
    <Link to="/" className='btn btn-ghost mb-4'>
    <ArrowLeftIcon className='w-4 h-4 mr-2' />
    <h4 className='text-lg font-semibold'>Back to Home</h4>
    </Link>

    <div className="card bg-base-100">
    <div className="card-body">
    
    <h2 className="card-title text-2xl font-bold mb-4">Create New Note</h2>
    <form onSubmit={handleSubmit}>
    <div className="form-control mb-4">
    <label className="label">
    <span className="label-text">Title</span>
    </label>
    <input type="text" placeholder="Note Title" className="input input-bordered w-full" value={title} onChange={(e) => setTitle(e.target.value)} required />
    </div>

    <div className="form-control mb-4">
    <label className="label">
    <span className="label-text">Content</span>
    </label>
    <textarea placeholder="Note Content" className="textarea textarea-bordered w-full h-40 scroll-smooth scroll-my-2" value={content} onChange={(e) => setContent(e.target.value)} required></textarea>
    </div>

    <div className="form-control mb-4">
    <button type="submit" className="btn btn-primary" disabled={loading}>{loading ? 'Creating...' : 'Create Note'}</button>
    </div>
    </form>
    </div>
    </div>
    </div>
        
    </div>
    </div>
  )
}

export default CreatePage
