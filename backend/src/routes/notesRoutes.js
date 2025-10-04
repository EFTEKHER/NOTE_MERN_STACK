import express from 'express';

const router = express.Router();
import { getAllNotes } from '../controllers/notesController.js';
import { getNoteById } from '../controllers/notesController.js';
import { createNote } from '../controllers/notesController.js';
import { updateNote } from '../controllers/notesController.js';
import { deleteNote } from '../controllers/notesController.js';

router.get('/', getAllNotes);
router.get('/:id', getNoteById);
router.post('/', createNote);
router.put('/:id', updateNote);
router.delete('/:id', deleteNote);



export default router;



//     res.status(201).json({ message: 'Note created successfully!' });
// });
// router.put('/:id', (req, res) => {
//     const { id } = req.params;
//     console.log(`Updating note with ID: ${id}`);
//     res.status(200).json({ message: `Note with ID ${id} updated successfully!` });
// });
// router.delete('/:id', (req, res) => {
//     const { id } = req.params;
//     console.log(`Deleting note with ID: ${id}`);
//     res.status(200).json({ message: `Note with ID ${id} deleted successfully!` });
// });