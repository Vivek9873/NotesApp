import express from "express"
import { createNotes, deleteNote, editNotes } from "../controllers/notes-controller.js";
import authMiddleware from "../middleware/auth-middleware.js";

const notesRouter = express.Router();

notesRouter.post("/createnote", authMiddleware, createNotes);
notesRouter.post("/editnotes/:noteId", authMiddleware, editNotes);
notesRouter.post("/deletenotes", authMiddleware, deleteNote);

export default notesRouter;