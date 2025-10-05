import { PenSquare, TrashIcon, ViewIcon } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { formatDate } from "../lib/utils.js";
import { toast } from "react-hot-toast";
import api from "../lib/axios.js";
import { useNavigate } from "react-router-dom";

const NoteCard = ({ note,setNotes }) => {
  const navigate = useNavigate();
  const handleDelete = async (e, noteId) => {
    if (!window.confirm("Are you sure you want to delete this note?")) {
      return;
    } 
    e.preventDefault();
    try {
      await api.delete(`/notes/${noteId}`);
      toast.success("Note deleted successfully");
      setNotes((prevNotes) => prevNotes.filter((note) => note._id !== noteId));
     
    } catch (error) {
      toast.error(`Failed to delete note ${error.message}`);
    }
  };

  const edit = async (e, noteId) => {
    e.preventDefault();
    navigate(`/edit/${noteId}`);
  };
  return (
    <Link
      to={`/notes/${note._id}`}
      className="card bg-base-100 hover:shadow-lg tg duration-300 border-t-4 border-solid border-[#00FF9D] p-4 rounded-lg"
    >
      <div className="card-body bg-slate-600/10 rounded-lg">
        <h3 className="card-title text-lg font-bold text-base-content">
          {note.title}
        </h3>
        <p className="text-sm text-base-content/70 line-clamp-3">
          {note.content}
        </p>
        <div className="card-actions justify-between items-center mt-4">
          <span className="text-xs text-base-content/60">
            {formatDate(new Date(note.updatedAt))}
          </span>
          <div className="flex items-center gap-2">
            <button
              className="btn btn-sm btn-secondary text-white hover:bg-secondary-focus"
              onClick={(e) => edit(e, note._id)}
            >
              <PenSquare className="w-4 h-4 text-base-content/70" />
            </button>
            <button
              className="btn btn-sm btn-error text-white hover:bg-primary-focus"
              onClick={(e) => handleDelete(e, note._id)}
            >
              <TrashIcon className="w-4 h-4 text-base-content hover:text-base-content/10" />
            </button>
            
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NoteCard;
