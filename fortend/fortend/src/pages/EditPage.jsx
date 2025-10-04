import React from 'react'
import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeftIcon } from 'lucide-react'
import api from '../lib/axios'
import { toast } from 'react-hot-toast'

const EditPage = () => {
  const { id } = useParams()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const response = await api.get(`/notes/${id}`)
        setTitle(response.data.title)
        setContent(response.data.content)
      } catch (error) {
        toast.error(`Failed to fetch note: ${error.message}`)
      } finally {
        setLoading(false)
      }
    }

    fetchNote()
  }, [id])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    
    try {
      await api.put(`/notes/${id}`, { title, content })
      toast.success("Note updated successfully")
    } catch (error) {
      toast.error(`Failed to update note: ${error.message}`)
    } finally {
      setSubmitting(false)
      // Optionally, redirect to the note detail page or home page
      // window.location.href = `/notes/${id}`; // Redirect to note detail page
      setContent('')
      setTitle('')
     // Redirect to home page 
     //set timeout to 1 second useNavigate from react-router-dom
      setTimeout(() => {
        window.location.href = '/'; // Redirect to home page
      }, 2000);
  

    }
  }

  if (loading) return <div className="min-h-screen bg-base-200 flex items-center justify-center">Loading...</div>

  return (
    <div className='min-h-screen bg-base-200'>
      <div className='container mx-auto px-4 py-4'>
        <div className='max-w-2xl mx-auto'>
          <Link to="/" className='btn btn-ghost mb-4'>
            <ArrowLeftIcon className='w-4 h-4 mr-2' />
            Back to Home
          </Link>

          <div className="card bg-base-100">
            <div className="card-body">
              <h2 className="card-title text-2xl font-bold mb-4">Edit Note</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Title</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Note Title"
                    className="input input-bordered w-full"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>

                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Content</span>
                  </label>
                  <textarea
                    placeholder="Note Content"
                    className="textarea textarea-bordered w-full h-48"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                  ></textarea>
                </div>

                <div className="form-control">
                  <button 
                    type="submit" 
                    className="btn btn-primary"
                    disabled={submitting}
                  >
                    {submitting ? 'Updating...' : 'Update Note'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditPage