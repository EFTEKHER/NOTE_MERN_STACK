import React from 'react'
import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeftIcon, EditIcon } from 'lucide-react'
import api from '../lib/axios'
import { toast } from 'react-hot-toast'
import { formatDate } from '../lib/utils'

const NoteDetailPage = () => {
  const { id } = useParams()
  const [note, setNote] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const response = await api.get(`/notes/${id}`)
        setNote(response.data)
      } catch (error) {
        toast.error(`Failed to fetch note: ${error.message}`)
      } finally {
        setLoading(false)
      }
    }

    fetchNote()
  }, [id])

  if (loading) return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center">
      <div className="loading loading-spinner loading-lg"></div>
    </div>
  )

  if (!note) return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Note not found</h2>
        <Link to="/" className="btn btn-primary">
          Back to Home
        </Link>
      </div>
    </div>
  )

  return (
    <div className='min-h-screen bg-base-200'>
      <div className='container mx-auto px-4 py-8'>
        <div className='max-w-4xl mx-auto'>
          {/* Header with back button and edit button */}
          <div className='flex justify-between items-center mb-6'>
            <Link to="/" className='btn btn-ghost'>
              <ArrowLeftIcon className='w-4 h-4 mr-2' />
              Back to Notes
            </Link>
            <Link to={`/edit/${note._id}`} className='btn btn-primary'>
              <EditIcon className='w-4 h-4 mr-2' />
              Edit Note
            </Link>
          </div>

          {/* Note Content Card */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              {/* Note Title */}
              <h1 className="card-title text-3xl font-bold text-base-content mb-2">
                {note.title}
              </h1>

              {/* Last Updated Date */}
              <div className="text-sm text-base-content/60 mb-6">
                Last updated: {formatDate(new Date(note.updatedAt))}
              </div>

              {/* Note Content with Scroll */}
              <div className="prose max-w-none">
                <div 
                  className="text-base-content whitespace-pre-wrap max-h-[60vh] overflow-y-auto px-4 py-2"
                  style={{ 
                    wordWrap: 'break-word',
                    overflowWrap: 'break-word'
                  }}
                >
                  {note.content}
                </div>
              </div>

              {/* Created Date */}
              <div className="text-xs text-base-content/40 mt-6 pt-4 border-t border-base-300">
                Created: {formatDate(new Date(note.createdAt))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NoteDetailPage