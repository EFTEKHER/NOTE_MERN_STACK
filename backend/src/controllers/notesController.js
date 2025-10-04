import Note from "../models/Note.js";
export async function getAllNotes(req, res) {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.status(200).json(notes);
  } catch (error) {
    console.error("Error fetching notes:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export const getNoteById = async(req, res) => {
    try{
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
      
    }
    else{
        res.status(200).json(note);
    }
    }
    catch (error) {
      console.error("Error fetching note:", error);
      res.status(500).json({ message: "Internal server error" });
    }

};

export const createNote = async (req, res) => {
  const { title, content } = req.body;
  console.log(`Creating note with title: ${title} and content: ${content}`);
  // Here you would handle the note creation logic
  const newNote = new Note({ title, content });
  const savedNote = await newNote.save();
  res
    .status(201)
    .json({ message: "Note created successfully!", note: savedNote });
};

export const updateNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const updatedNote = await Note.findByIdAndUpdate(req.params.id, {
      title,
      content,
    },{new: true});
    if (!updatedNote) {
      return res.status(404).json({ message: "Note not found" });
    } else {
      console.log(`Updating note with ID: ${req.params.id}`);
      res.status(200).json({
        message: `Note with ID ${req.params.id} updated successfully!`,
        note: updatedNote,
      });
    }
  } catch (error) {
    console.error("Error updating note:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteNote = async (req, res) => {
  try{

  const deletedNote = await Note.findByIdAndDelete(req.params.id,{
    new: true
  });
  console.log(`Deleting note with ID: ${req.params.id}`);
  if (!deletedNote) {
    return res.status(404).json({ message: "Note not found" });
  }

  else{
    res.status(200).json({ message: `Note with ID ${req.params.id} deleted successfully!`, note: deletedNote });
  }
  }
    catch (error) {
    console.error("Error deleting note:", error);
    res.status(500).json({ message: "Internal server error" });
  
}};
